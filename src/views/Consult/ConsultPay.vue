<template>
  <div class="consult__pay" v-if="patientInfo">
    <div class="consult__pay__info">
      <cp-nav-bar title="支付"></cp-nav-bar>
      <p class="tit">图文问诊 {{ payInfo?.payment }}元</p>
      <img class="img" src="../../assets/avatar-doctor.svg" alt="" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo?.couponDeduction.toFixed(2)}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo?.pointDeduction.toFixed(2)}`" />
      <van-cell
        title="实付款"
        :value="`￥${payInfo?.actualPayment.toFixed(2)}`"
        class="pay-price"
      />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patientInfo?.name} | ${patientInfo?.gender ? '男' : '女'} | ${patientInfo?.age}`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="isAgree" checked-color="var(--cp-primary)" icon-size="18px"
        >我已同意 <span class="text">支付协议</span></van-checkbox
      >
    </div>
    <van-submit-bar
      button-type="primary"
      :price="payInfo?.actualPayment ? payInfo?.actualPayment * 100 : payInfo?.actualPayment"
      button-text="立即支付"
      text-align="left"
      :loading="loading"
      @submit="onSubmit"
    />
    <!-- 动作面板 -->
    <cp-pay-sheet
      v-model:show="show"
      :onClose="onClose"
      :orderId="orderId"
      :actualPayment="payInfo?.actualPayment"
    ></cp-pay-sheet>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { showToast, showConfirmDialog, showDialog } from 'vant'
import { useConsultStore } from '@/stores'
import { getConsultOrderPre, createConsultOrder } from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import type { ConsultOrderPreData } from '@/types/consult'
import type { PatientType } from '@/types/user'
import { ref, onMounted } from 'vue'
const router = useRouter()
const store = useConsultStore()
// 协议 我同意
const isAgree = ref<boolean>(false)
// 动作面板
const show = ref<boolean>(false)
/* // 支付方式
const paymentMethod = ref<0 | 1>() */
// 支付信息
const payInfo = ref<ConsultOrderPreData>()
// 患者信息
const patientInfo = ref<PatientType>()
const loading = ref(false)
const orderId = ref('')
// 获取订单
const onSubmit = async () => {
  if (!isAgree.value) return showToast('请先勾选我已同意')
  try {
    loading.value = true
    const orderRes = await createConsultOrder(store.consult)
    // console.log('orderRes', orderRes)
    orderId.value = orderRes.data.id

    // TODO 清空pinia中存储的订单状态
    store.clear()

    show.value = true
    // store.clear()
  } finally {
    loading.value = false
  }
}
// 生成订单不可关闭支付抽屉
const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then(() => {
      // on confirm
      return false
    })
    .catch(() => {
      // on cancel
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
/* // 跳转到支付页面
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: '跳转支付'
  })
  const payRes = await getConsultOrderPayUrl({
    paymentMethod: paymentMethod.value,
    orderId: orderId.value,
    payCallback: 'http://localhost/room'
  })
  // console.log('payRes', payRes)
  window.location.href = payRes.data.payUrl
} */
// 获取支付信息
const loadData = async () => {
  const payRes = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  // console.log('payRes', payRes)

  payInfo.value = payRes.data
}
// 获取患者信息
const loadPatient = async () => {
  if (!store.consult.patientId) return
  const patientRes = await getPatientDetail(store.consult.patientId)
  // console.log('patientRes', patientRes)
  patientInfo.value = patientRes.data
}
onMounted(() => {
  loadData()
  loadPatient()
  if (
    !store.consult.type ||
    !store.consult.illnessType ||
    !store.consult.depId ||
    !store.consult.patientId
  ) {
    return showDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付',
      closeOnPopstate: false
    }).then(() => {
      // on confirm
      router.push('/')
    })
  }
})
// 生成订单信息不可回退
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})
</script>

<style lang="scss" scoped>
.consult__pay {
  padding: 46px 0 50px 0;

  &__info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;

    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }

    .desc {
      flex: 1;

      > span {
        display: block;
        color: var(--cp-tag);

        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }

  .pay-price {
    ::v-deep() {
      .vam-cell__title {
        font-size: 16px;
      }

      .van-cell__value {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }

  .pay-space {
    height: 12px;
    background-color: var(--cp-bg);
  }

  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      color: var(--cp-primary);
    }
  }

  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
      // 覆盖vant的主题色
      --van-button-primary-background: var(--cp-primary);
      --van-button-primary-border-color: var(--cp-primary);
    }
  }

  .pay-type {
    .amount {
      padding: 20px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }

    .btn {
      padding: 15px;

      .van-button {
        // 覆盖vant的主题色
        --van-button-primary-background: var(--cp-primary);
        --van-button-primary-border-color: var(--cp-primary);
      }
    }

    .van-cell {
      align-items: center;

      .cp-icon {
        margin-right: 10px;
        font-size: 18px;
      }

      .van-checkbox:deep(.van-checkbox__icon) {
        font-size: 16px;
      }
    }
  }
}
</style>
