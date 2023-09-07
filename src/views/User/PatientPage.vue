<template>
  <div class="patient__page">
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <!-- 头部信息 -->
    <div class="patient__page__change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient__page__list">
      <div
        class="patient__item"
        v-for="item in list"
        :key="item.id"
        :class="{ selected: patientId == item.id }"
        @click="selectPatient(item)"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******$2') }}</span>
          <span class="sex">{{ item.gender ? '男' : '女' }}</span>
          <span class="age">{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="handleEdit(item)"><cp-icons name="user-edit"></cp-icons></div>
        <div class="tag" v-if="item.defaultFlag">默认</div>
      </div>
      <div class="patient__add" v-if="list && list.length < 6" @click="showPopup">
        <cp-icons name="user-add"></cp-icons>
        <div>添加患者</div>
      </div>
      <div class="patient__tip">
        <span>最多可添加6人</span>
      </div>
    </div>
    <!-- 底部按钮 -->
    <van-button
      class="patient__page__next"
      v-if="isChange"
      type="primary"
      block
      round
      @click="handleNext"
      >下一步</van-button
    >
    <!-- 右侧弹出 -->
    <van-popup v-model:show="show" position="right">
      <cp-nav-bar
        :back="backPopup"
        :title="PatientFrom.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        @click-right="clickRight"
      ></cp-nav-bar>
      <van-form autocomplete="off">
        <van-cell-group inset>
          <van-field v-model="PatientFrom.name" label="真实姓名" placeholder="请输入真实姓名" />
          <van-field v-model="PatientFrom.idCard" label="身份证号" placeholder="请输入身份证号" />
          <van-field label="性别">
            <template #input>
              <cp-radio-btn :options="options" v-model="PatientFrom.gender"></cp-radio-btn>
            </template>
          </van-field>
          <van-field label="默认就诊人">
            <template #input>
              <van-checkbox v-model="defaultFlag"></van-checkbox>
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
      <van-action-bar v-if="PatientFrom.id">
        <van-action-bar-button @click="remove">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores'
import { showToast, showConfirmDialog } from 'vant'
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/patient'
import { ref, onMounted, computed } from 'vue'
import type { PatientList, PatientType } from '@/types/user'
import Validator from 'id-validator'
// 是否为选择患者
const route = useRoute()
const router = useRouter()
const store = useConsultStore()
const isChange = computed(() => route.query.isChange === '1')
const handleNext = () => {
  if (!patientId.value) return showToast('请选择就诊患者')
  store.setPatientId(patientId.value)
  router.push('/consult/pay')
}
// 默认选中
const patientId = ref<string>()
const selectPatient = (item: PatientType) => {
  if (isChange.value) {
    patientId.value = item.id
  }
}
// 控制弹出层显示隐藏
const show = ref(false)
// 开启弹出层
const showPopup = () => {
  show.value = true
  PatientFrom.value = { ...initPatient }
}
// 关闭弹出层
const backPopup = () => {
  show.value = false
}

// 编辑
const handleEdit = (obj: PatientType) => {
  show.value = true
  PatientFrom.value = { ...obj }
}
const initPatient: PatientType = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
const PatientFrom = ref<PatientType>({ ...initPatient })
// 删除
const remove = () => {
  showConfirmDialog({
    title: '温馨提示',
    message: `您确定要删除${PatientFrom.value.name}患者信息吗？`,
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then(async () => {
      const patientRes = await delPatient(PatientFrom.value.id as string)
      await initPatientList()
      if (patientRes.code === 10000) {
        showToast('删除成功')
      } else {
        showToast(patientRes.message)
      }
      show.value = false
      // on confirm
    })
    .catch(() => {
      // on cancel
    })
}
// 保存
const clickRight = async () => {
  if (!PatientFrom.value.name) return showToast('请输入真实姓名')
  if (!PatientFrom.value.idCard) return showToast('请输入身份证号')
  const validator = new Validator()
  if (!validator.isValid(PatientFrom.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validator.getInfo(PatientFrom.value.idCard)
  if (PatientFrom.value.gender !== sex) return showToast('性别和身份证不符')
  const patientRes = PatientFrom.value.id
    ? await editPatient({
        name: PatientFrom.value.name,
        idCard: PatientFrom.value.idCard,
        gender: PatientFrom.value.gender,
        defaultFlag: PatientFrom.value.defaultFlag,
        id: PatientFrom.value.id
      })
    : await addPatient(PatientFrom.value)
  await initPatientList()
  if (patientRes.code === 10000) {
    showToast(PatientFrom.value.id ? '编辑成功' : '添加成功')
  } else {
    showToast(patientRes.message)
  }
  show.value = false
}

const defaultFlag = computed({
  get() {
    return PatientFrom.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    PatientFrom.value.defaultFlag = value ? 1 : 0
  }
})
// 创建一个变量，保存患者列表
const list = ref<PatientList>()

// 初始化列表数据
const initPatientList = async () => {
  const patientRes = await getPatientList()
  // console.log('patientRes', patientRes)
  list.value = patientRes.data
  // 设置默认选中的ID，当页面为选择患者并且有患者信息
  if (isChange.value && list.value?.length) {
    const defPatient = list.value.find((item) => item.defaultFlag === 1)
    patientId.value = defPatient ? defPatient.id : list.value[0].id
  }
}
onMounted(() => {
  initPatientList()
})
</script>

<style lang="scss" scoped>
.patient__page {
  padding: 46px 0 80px;

  &__change {
    padding: 15px;

    > h3 {
      font-weight: normal;
      margin-bottom: 5px;
    }

    > p {
      color: var(--cp-text3);
    }
  }

  &__next {
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 16px;
    margin-bottom: 30px;
    // 覆盖vant的主题色
    --van-button-primary-background: var(--cp-primary);
    --van-button-primary-border-color: var(--cp-primary);
  }

  ::v-deep() {
    .van-popup {
      width: 100%;
      height: 100%;
    }

    .van-action-bar {
      padding: 0 10px;
      margin-bottom: 10px;

      .van-button {
        color: var(--cp-price);
        background-color: var(--cp-bg);
      }
    }

    .van-form {
      margin-top: 46px;
    }
  }

  &__list {
    padding: 15px;

    .selected {
      border-color: var(--cp-primary) !important;
      background: #e8f8f6 !important;
    }

    .patient__item {
      background: var(--cp-bg);
      padding: 15px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      position: relative;
      border: 1px solid var(--cp-bg);
      transition: all 0.3s;
      overflow: hidden;

      .info {
        display: flex;
        flex-wrap: wrap;
        flex: 1;

        span {
          color: var(--cp-tip);
          margin-right: 20px;
          line-height: 30px;

          &.name {
            font-size: 16px;
            color: var(--cp-text1);
            width: 80px;
            margin-right: 0;
          }

          &.id {
            width: 180px;
            color: var(--cp-text1);
          }
        }
      }

      .icon {
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
      }

      .tag {
        position: absolute;
        background: var(--cp-primary);
        color: #fff;
        font-size: 10px;
        width: 30px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 3px;
        right: 60px;
        top: 21px;
      }
    }

    .patient__add {
      background: var(--cp-bg);
      color: var(--cp-primary);
      padding: 15px 0;
      border-radius: 8px;
      text-align: center;

      .cp-icon {
        font-size: 24px;
      }
    }

    .patient__tip {
      color: var(--cp-tag);
      padding: 12px 0;
    }
  }
}
</style>
