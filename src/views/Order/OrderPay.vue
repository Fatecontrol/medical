<template>
  <div class="order__pay__page">
    <cp-nav-bar title="药品支付" backgroundcolor="var(--cp-primary)"></cp-nav-bar>
    <div class="order__address">
      <p class="area">
        <van-icon name="location" />
        <span>{{ `${address?.province}${address?.city}${address?.county}` }}</span>
      </p>
      <p class="detail">{{ address?.addressDetail }}</p>
      <p>
        {{ address?.receiver }}
        {{ address?.mobile.replace(/^(\d{3})(?:\d{4})(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>
    <!-- <div class="order__medical">
      <div class="header">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item van-hairline--top" v-for="item in orderPre?.medicines" :key="item.id">
        <img class="img" :src="item.avatar" alt="" />
        <div class="info">
          <p class="name">
            <span>{{ item.name }}</span>
            <span>{{ item.quantity }}</span>
          </p>
          <p class="size">
            <van-tag v-if="item.prescriptionFlag === 1">处方药</van-tag>
            <span>{{ item.specs }}</span>
          </p>
          <p class="price">￥{{ item.amount }}</p>
        </div>
        <div class="desc">{{ item.usageDosag }}</div>
      </div>
    </div> -->
    <OrderMedical :medicines="orderPre?.medicines!"></OrderMedical>
    <div class="order__detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${orderPre?.payment}`" />
        <van-cell title="运费" :value="`￥${orderPre?.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${orderPre?.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${orderPre?.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="order__tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox icon-size="16px" v-model="isAgree"
        >我已同意<a href="javascript:;">支付协议</a></van-checkbox
      >
    </div>
    <van-submit-bar
      :price="orderPre?.actualPayment ? orderPre?.actualPayment * 100 : orderPre?.actualPayment"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
      @submit="onSubmit"
      :loading="loading"
    />
    <!-- 动作面板 -->
    <cp-pay-sheet
      v-model:show="show"
      :onClose="onClose"
      :orderId="orderId"
      :actualPayment="orderPre?.actualPayment ? orderPre?.actualPayment : 0"
      payCallback="http://localhost/order/pay/result"
    ></cp-pay-sheet>
  </div>
</template>

<script setup lang="ts">
import { getMedicalOrderPre, getAddressList, createMedicalOrder } from '@/services/order'
import type { OrderPre, AddressItem } from '@/types/order'
// 引入药品列表组件
import OrderMedical from './components/OrderMedical.vue'
import { showToast, showConfirmDialog } from 'vant'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isAgree = ref(false)
const orderPre = ref<OrderPre>()
const address = ref<AddressItem>()
const HnadleGetMedicalOrderPre = async () => {
  const orderPreRes = await getMedicalOrderPre({ prescriptionId: route.query.id as string })
  console.log('orderPreRes', orderPreRes)
  orderPre.value = orderPreRes.data
}
const HandleGetAddressList = async () => {
  const addressRes = await getAddressList()
  // console.log('addressRes', addressRes)

  if (addressRes.data.length) {
    const defAddress = addressRes.data.find((item: any) => item.isDefault === 0)
    if (defAddress) address.value = defAddress
    else address.value = addressRes.data[0]
  }
}
onMounted(() => {
  HnadleGetMedicalOrderPre()
  HandleGetAddressList()
})
// 动作面板
const show = ref(false)
const loading = ref(false)
const orderId = ref('')

const onSubmit = async () => {
  if (!isAgree.value) return showToast('请先勾选我已同意')
  if (!address.value?.id) return showToast('请选择收货地址')
  if (!orderPre.value?.id) return showToast('未找到处方')
  // 如果没有药品订单ID
  if (!orderId.value) {
    loading.value = true
    try {
      const medicalRes = await createMedicalOrder({
        id: orderPre.value.id,
        addressId: address.value.id,
        couponId: orderPre.value.couponId
      })
      console.log('medicalRes', medicalRes)

      // 打开抽屉
      if (medicalRes.code === 10000) orderId.value = medicalRes.data.id
      show.value = true
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  } else {
    show.value = true
  }
}
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
      router.push('/room')
      return true
    })
}
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: var(--cp-primary);
  .van-nav-bar__arrow,
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(.van-cell) {
  .van-cell__title {
    font-size: 16px;
  }
  .van-cell__value {
    font-size: 16px;
  }
  &.price {
    .van-cell__value {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}
:deep(.van-submit-bar) {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .van-button {
    width: 200px;
  }
}
.order__pay__page {
  padding: 46px 0 65px;
  .order__address {
    padding: 15px 15px 0 15px;
    background-color: #fff;
    font-size: 13px;
    .area {
      color: var(--cp-tag);
      margin-bottom: 5px;
      .van-icon-location {
        color: #ff7702;
        font-size: 14px;
      }
    }
    .detail {
      font-size: 17px;
      margin-bottom: 5px;
      font-weight: 600;
    }
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--cp-bg);
      margin: 0 -15px;
      margin-top: 15px;
    }
  }
  /* .order__medical {
    background-color: #fff;
    padding: 0 15px;
    .header {
      display: flex;
      height: 54px;
      align-items: center;
      > h3 {
        font-size: 16px;
        font-weight: normal;
      }
      > small {
        font-size: 13px;
        color: var(--cp-tag);
        margin-left: 10px;
      }
    }

    .item {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      .img {
        width: 80px;
        height: 70px;
        border-radius: 2px;
        overflow: hidden;
      }
      .info {
        padding-left: 15px;
        width: 250px;
        .name {
          display: flex;
          font-size: 5px;
          margin-bottom: 5px;
          > span:first-child {
            width: 200px;
          }
          > span:last-child {
            width: 50px;
            text-align: right;
          }
        }
        .size {
          margin-bottom: 5px;
          .van-tag {
            background-color: var(--cp-primary);
            vertical-align: middle;
          }
          span:not(.van-tag) {
            margin-left: 10px;
            color: var(--cp-tag);
            vertical-align: middle;
          }
        }
        .price {
          font-size: 16px;
          color: #eb5757;
        }
      }
      .desc {
        width: 100%;
        background-color: var(--cp-bg);
        border-radius: 4px;
        margin-top: 10px;
        padding: 4px 10px;
        color: var(--cp-tip);
      }
    }
  } */
  .order__tip {
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
    .tip {
      font-size: 12px;
      color: var(--cp-tag);
      width: 100%;
      margin-bottom: 30px;
      &::before {
        content: '';
        color: var(--cp-price);
        font-size: 14px;
      }
    }
    .van-checkbox {
      a {
        color: var(--cp-primary);
      }
    }
  }
}
</style>
