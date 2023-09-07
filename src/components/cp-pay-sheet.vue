<template>
  <van-action-sheet
    :show="show"
    title="请选择支付方式"
    :close-on-popstate="false"
    :closeable="false"
    :beforeClose="onClose"
    @update:show="emits('update:show', $event)"
  >
    <div class="pay-type">
      <p class="amount">￥{{ actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon>
            <cp-icons name="consult-wechat"></cp-icons>
          </template>
          <template #extra>
            <van-checkbox
              :checked="paymentMethod === 0"
              checked-color="var(--cp-primary)"
            ></van-checkbox>
          </template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon>
            <cp-icons name="consult-alipay"></cp-icons>
          </template>
          <template #extra>
            <van-checkbox
              :checked="paymentMethod === 1"
              checked-color="var(--cp-primary)"
            ></van-checkbox>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button type="primary" round block @click="handlePay">立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { getConsultOrderPayUrl } from '@/services/consult'
import { showToast } from 'vant'
import { ref } from 'vue'
const props = defineProps<{
  show: boolean
  orderId: string
  actualPayment: number
  onClose?: () => void
  payCallback: string
}>()
const emits = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()
// 支付方式 1:支付宝 0:微信
const paymentMethod = ref<0 | 1>()
// 发起支付
const handlePay = async () => {
  if (!paymentMethod.value) return showToast('请选择支付方式')
  const payRes = await getConsultOrderPayUrl({
    paymentMethod: paymentMethod.value,
    orderId: props.orderId,
    payCallback: props.payCallback
  })

  window.location.href = payRes.data.payUrl
}
</script>

<style lang="scss" scoped>
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
</style>
