<template>
  <template v-for="(item, index) in list" :key="index">
    <div class="room__message msg__illness" v-if="item.msgType === MsgType.CardPat">
      <div class="patient van-heirline--bottom">
        <p>
          {{ item.msg.consultRecord?.patientInfo.name }}
          {{ item.msg.consultRecord?.patientInfo.genderValue }}
          {{ item.msg.consultRecord?.patientInfo.age }}
        </p>
        <p>
          {{ getIllnessTimeText(item.msg.consultRecord?.patientInfo.illnessTime!) }} |
          {{ getConsultFlagText(item.msg.consultRecord?.patientInfo.illnessType!) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ item.msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18" @click="previewImg(item.msg.consultRecord?.pictures!)">点击查看</van-col>
      </van-row>
    </div>
    <!-- 通用消息提示 -->
    <div class="room__message msg__tip" v-if="item.msgType === MsgType.Notify">
      <div class="content">
        <span>{{ item.msg.content }}</span>
      </div>
    </div>
    <!-- 温馨提示 -->
    <div class="room__message msg__tip" v-if="item.msgType === MsgType.NotifyTip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ item.msg.content }}</span>
      </div>
    </div>
    <!-- 取消 -->
    <div
      class="room__message msg__tip msg__tip__cancel"
      v-if="item.msgType === MsgType.NotifyCancel"
    >
      <div class="content">
        <span>{{ item.msg.content }}</span>
      </div>
    </div>

    <!-- 发送文字 -->
    <div
      class="room__message msg__to"
      v-if="item.msgType === MsgType.MsgText && item.from === store.user?.id"
    >
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <div class="pao">{{ item.msg.content }}</div>
      </div>
      <van-image :src="item.fromAvatar" />
    </div>

    <!-- 发送图片 -->
    <div
      class="room__message msg__to"
      v-if="item.msgType === MsgType.MsgImage && item.from === store.user?.id"
    >
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <van-image @load="load" fit="contain" :src="item.msg.picture?.url" />
      </div>
      <van-image :src="item.fromAvatar" />
    </div>

    <!-- 接收文字 -->
    <div
      class="room__message msg__from"
      v-if="item.msgType === MsgType.MsgText && item.from !== store.user?.id"
    >
      <van-image :src="item.fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <div class="pao">{{ item.msg.content }}</div>
      </div>
    </div>

    <!-- 接收图片 -->
    <div
      class="room__message msg__from"
      v-if="item.msgType === MsgType.MsgImage && item.from !== store.user?.id"
    >
      <van-image :src="item.fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <van-image @load="load" fit="contain" :src="item.msg.picture?.url" />
      </div>
    </div>

    <!-- 处方卡片 -->
    <div class="room__message msg__recipe" v-if="item.msgType === MsgType.CardPre">
      <div class="content" v-if="item.msg.prescription">
        <div class="header van-hairline--bottom">
          <div class="header__hit">
            <h3>电子处方</h3>
            <p @click="showPrescription(item.msg.prescription.id)">
              原始处方 <van-icon name="arrow"></van-icon>
            </p>
          </div>
          <p>
            {{ item.msg.prescription.name }} {{ item.msg.prescription.genderValue }}
            {{ item.msg.prescription.age }}岁 {{ item.msg.prescription.diagnosis }}
          </p>
          <p>开方时间：{{ item.msg.prescription.createTime }}</p>
        </div>
        <div class="body">
          <div class="body__item" v-for="med in item.msg.prescription.medicines" :key="med.id">
            <div class="durg">
              <p>{{ med.name }} {{ med.specs }}</p>
              <p>{{ med.usageDosag }}</p>
            </div>
            <div class="num">x{{ med.quantity }}</div>
          </div>
        </div>
        <div class="foot"><span @click="buy(item.msg.prescription.id)">购买药品</span></div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { MsgType } from '@/enum'
import type { Image } from '@/types/consult'
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
import { showImagePreview } from 'vant'
import type { Message } from '@/types/room'
import dayjs from 'dayjs'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useUserStore } from '@/stores'
const store = useUserStore()
defineProps<{
  list: Message[]
}>()
// 查看图片
const previewImg = (pictures: Image[]) => {
  if (pictures && pictures.length > 0) {
    showImagePreview(pictures.map((item) => item.url))
  }
}
// 格式化时间
const formatTime = (time: number | string) => {
  return dayjs(time).format('HH:mm')
}
const buy = (id: string) => {
  router.push(`/order/pay?id=${id}`)
}

const load = async () => {
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}

import useShowPrescription from '@/composable/index'
// 查看处方
const { showPrescription } = useShowPrescription()
</script>

<style lang="scss" scoped>
.room__message {
  display: flex;
  padding: 15px;
}
.msg {
  &__illness {
    display: block;
    background-color: #fff;
    margin: 15px;
    border-radius: 8px;
    .patient {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f1f1f1;
      > p {
        &:first-child {
          font-size: 16px;
        }
        &:last-child {
          margin-top: 5px;
          font-size: 12px;
          color: var(--cp-tip);
        }
      }
    }
    .van-col {
      &:nth-child(-n + 2) {
        margin-bottom: 5px;
      }
      &:nth-child(2n) {
        color: var(--cp-tip);
      }
    }
  }
  &__tip {
    justify-content: center;
    font-size: 12px;
    .content {
      background-color: #fff;
      border-radius: 17px;
      height: 34px;
      line-height: 34px;
      color: var(--cp-tip);
      padding: 0 16px;
      max-width: 100%;
      .green {
        color: var(--cp-primary);
      }
    }
    &__cancel {
      .content {
        background-color: #ededed;
      }
    }
  }
  &__from {
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--cp-tip);
        margin-bottom: 5px;
      }
      .pao {
        padding: 15px;
        background-color: #fff;
        color: var(--cp-text3);
        font-size: 15px;
        border-radius: 8px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background: #fff;
          border-top-left-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          left: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--cp-bg);
          border-top-right-radius: 13px 3px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--cp-line);
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 13px;
    }
  }
  &__to {
    justify-content: flex-end;
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--cp-tip);
        margin-bottom: 5px;
        text-align: right;
      }
      .pao {
        padding: 15px;
        background-color: var(--cp-primary);
        color: #fff;
        font-size: 15px;
        border-radius: 8px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          right: -12.7px;
          top: 9.5px;
          width: 13px;
          height: 16px;
          background: var(--cp-primary);
          border-top-right-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          right: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background: var(--cp-bg);
          border-top-left-radius: 13px 13px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--cp-line);
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 13px;
    }
  }
  &__recipe {
    padding: 15px;
    .content {
      background-color: #fff;
      border-radius: 8px;
      color: var(--cp-tip);
      font-size: 12px;
      flex: 1;
      .header {
        padding: 15px;
        &__hit {
          display: flex;
          justify-content: space-between;
          > h3 {
            font-weight: normal;
            font-size: 16px;
            color: var(--cp-text1);
          }
        }
        p {
          margin-top: 5px;
        }
      }
      .body {
        padding: 15px 15px 0 15px;
        &__item {
          display: flex;
          margin-bottom: 15px;
          .durg {
            flex: 1;
            > p {
              &:first-child {
                font-size: 14px;
                color: var(--cp-text1);
                margin-bottom: 5px;
              }
            }
          }
          .num {
            color: var(--cp-text1);
          }
        }
      }
      .foot {
        background-color: var(--cp-plain);
        color: var(--cp-primary);
        font-size: 16px;
        text-align: center;
        height: 42px;
        line-height: 42px;
      }
    }
  }
}
</style>
