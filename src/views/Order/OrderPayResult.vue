<template>
  <div class="order__pay__result__page" v-if="order?.id">
    <cp-nav-bar title="药品支付结果"></cp-nav-bar>
    <div class="result error" v-if="order?.status === OrderType.ConsultPay">
      <van-icon name="clear"></van-icon>
      <p class="price">￥ {{ order.actualPayment }}</p>
      <p class="status">支付失败</p>
      <p class="tip">订单支付失败，可以点击查看订单继续支付，如有疑问联系客服~</p>
      <div class="btn">
        <van-button type="primary" :to="`/order/${order.id}`">查看订单</van-button>
        <van-button :to="`/room?orderId=${order.roomId}`">返回诊室</van-button>
      </div>
    </div>
    <div class="result" v-else>
      <van-icon name="checked"></van-icon>
      <p class="price">￥ {{ order?.actualPayment }}</p>
      <p class="status">支付成功</p>
      <p class="tip">订单支付成功，已通知药房尽快发出， 请耐心等待~</p>
      <div class="btn">
        <van-button type="primary" :to="`/order/${order?.id}`">查看订单</van-button>
        <van-button :to="`/room?orderId=${order?.roomId}`">返回诊室</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMedicalOrderDetail } from '@/services/order'
import { OrderType } from '@/enum'
import type { OrderDetail } from '@/types/order'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const order = ref<OrderDetail>()
const handleGetMedicalOrderDetail = async () => {
  const resultRes = await getMedicalOrderDetail(route.query.orderId as string)
  console.log('resultRes', resultRes)
  order.value = resultRes.data
}
onMounted(() => {
  handleGetMedicalOrderDetail()
})
</script>

<style lang="scss" scoped>
.order__pay__result__page {
  padding-top: 46px;
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-icon {
      font-size: 75px;
      color: var(--cp-primary);
      margin-top: 60px;
    }
    .price {
      font-size: 22px;
      margin-top: 10px;
    }
    .status {
      color: var(--cp-text3);
    }
    .tip {
      color: var(--cp-tip);
      width: 240px;
      text-align: center;
      margin-top: 20px;
    }
    .btn {
      margin-top: 60px;
      .van-button--primary {
        margin-right: 20px;
      }
    }
  }
  & .error {
    .van-icon {
      color: var(--cp-price);
    }
  }
}
</style>
