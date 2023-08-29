<template>
  <div class="patient__page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient__page__list">
      <div class="patient__item" v-for="item in list" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******$2') }}</span>
          <span class="sex">{{ item.gender ? '男' : '女' }}</span>
          <span class="age">{{ item.age }}岁</span>
        </div>
        <div class="icon"><cp-icons name="user-edit"></cp-icons></div>
        <div class="tag" v-if="item.defaultFlag">默认</div>
      </div>
      <div class="patient__add" v-if="list && list.length < 6">
        <cp-icons name="user-add"></cp-icons>
        <div>添加患者</div>
      </div>
      <div class="patient__tip">
        <span>最多可添加6人</span>
      </div>
    </div>
    <cp-radio-btn></cp-radio-btn>
  </div>
</template>

<script setup lang="ts">
import { getPatientList } from '@/services/patient'
import { ref, onMounted } from 'vue'
import type { PatientList } from '@/types/user'
// 创建一个变量，保存患者列表
const list = ref<PatientList>()

// 初始化列表数据
const initPatientList = async () => {
  const patientRes = await getPatientList()
  console.log('patientRes', patientRes)
  list.value = patientRes.data
}
onMounted(() => {
  initPatientList()
})
</script>

<style lang="scss" scoped>
.patient__page {
  padding: 46px 0 80px;
  &__list {
    padding: 15px;
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
