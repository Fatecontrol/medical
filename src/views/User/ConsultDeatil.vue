<template>
  <div class="consult__detail__page" v-if="detailInfo">
    <cp-nav-bar title="问诊详情"></cp-nav-bar>
    <div class="detail__header">
      <div class="text">
        <h3>图文问诊{{ detailInfo.payment }} 元</h3>
        <span
          class="sta"
          :class="{
            orange: detailInfo.status === OrderType.ConsultPay,
            green: detailInfo.status === OrderType.ConsultChat
          }"
          >{{ detailInfo.statusValue }}</span
        >
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="avatar" src="../../assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>{{ detailInfo.docInfo?.name }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail__patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${detailInfo.patientInfo?.name} | ${
            detailInfo.patientInfo?.gender ? '男' : '女'
          } | ${detailInfo.patientInfo?.age}岁`"
        />
        <van-cell
          title="患病时⻓"
          :value="`${getIllnessTimeText(detailInfo.illnessTime as number)}`"
        />
        <van-cell
          title="就诊情况"
          :value="`${getConsultFlagText(detailInfo.consultFlag as number)}`"
        />
        <van-cell title="病情描述" :label="detailInfo.illnessDesc" />
      </van-cell-group>
    </div>
    <div class="detail__order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value> <span class="copy">复制</span> {{ detailInfo.orderNo }} </template>
        </van-cell>
        <van-cell title="创建时间" :value="detailInfo.createTime" />
        <van-cell title="应付款" :value="`￥${detailInfo.payment}`" />
        <van-cell title="优惠券" :value="`-￥${detailInfo.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${detailInfo?.pointDeduction}`" />
        <van-cell title="实付款" :value="`￥${detailInfo?.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="detail__action van-hairline--top">
      <div class="price">
        <span>需付款</span> <span>￥{{ detailInfo.actualPayment }}</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round>继续支付</van-button>
    </div>
  </div>
  <!-- 骨架 -->
  <div class="consult__detail__page" v-else>
    <cp-nav-bar title="问诊详情" /> <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { OrderType } from '@/enum'
import { getOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
const route = useRoute()
// 获取订单id
const orderId = route.params.id as string
// 获取订单数据详情
const detailInfo = ref<ConsultOrderItem>()
const initOrderDetail = async () => {
  const orderRes = await getOrderDetail(orderId)
  console.log('orderRes', orderRes)
  detailInfo.value = orderRes.data
}
onMounted(() => {
  initOrderDetail()
})
</script>

<style lang="scss" scoped>
.consult__detail__page {
  padding: 46px 0 110px 0;
  .detail__header {
    height: 140px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 135px;
      background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
      border-bottom-left-radius: 150px 20px;
      border-bottom-right-radius: 150px 20px;
    }
    padding: 15px;
    .text {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 3px;
      .sta {
        color: var(--cp-tag);
        font-weight: 500;
        font-size: 16px;
        &.green {
          color: var(--cp-primary);
        }
        &.orange {
          color: #f2994a;
        }
      }
      .tip {
        width: 100%;
        color: var(--cp-text3);
        margin-top: 5px;
      }
    }
    .card {
      height: 74px;
      background-color: #fff;
      border-radius: 8px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
      .avatar {
        width: 38px;
        height: 38px;
      }
      .doc {
        flex: 1;
        padding-left: 15px;
        > span {
          display: block;
          font-size: 16px;
          &:last-child {
            font-size: 13px;
            color: var(--cp-text3);
          }
        }
      }
      .van-icon {
        color: var(--cp-tip);
      }
    }
  }
  .detail__patient {
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--cp-bg);
    }
  }
  .detail__order {
    > h3 {
      padding: 10px 18px;
      font-weight: normal;
    }
    .copy {
      padding: 2px 10px;
      border: 1px solid var(--cp-primary);
      background-color: var(--cp-plain);
      color: var(--cp-primary);
      font-size: 12px;
      border-radius: 12px;
      margin-right: 10px;
    }
    :deep(.van-cell__title) {
      width: 70px;
      flex: none;
    }
    .price :deep(.van-cell__value) {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
  .detail__action {
    height: 65px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: flex-end;
    padding: 0 15px;
    box-sizing: border-box;
    .price {
      flex: 1;
      > span:last-child {
        font-size: 18px;
        color: var(--cp-price);
        padding-left: 5px;
      }
    }
    .van-button {
      margin-left: 10px;
      padding-left: 17px;
      padding-right: 17px;
    }
    :deep(.van-button--default) {
      background-color: var(--cp-bg);
      color: var(--cp-text3);
    }
  }
  .van-cell {
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>
