<template>
  <div class="room__page">
    <cp-nav-bar title="问诊室"></cp-nav-bar>
    <RoomStatus :status="consult?.status" :countdown="consult?.countdown"> </RoomStatus>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <RoomMessage :list="list"></RoomMessage>
    </van-pull-refresh>

    <RoomAction
      :disabled="consult?.status === OrderType.ConsultChat ? false : true"
      @send-text="sendText"
      @sendImage="sendImage"
    ></RoomAction>
  </div>
</template>

<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { getOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { OrderType } from '@/enum'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { ref, onMounted, nextTick } from 'vue'
import { showLoadingToast, closeToast, showToast } from 'vant'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores'
const store = useUserStore()
import { useRoute } from 'vue-router'
const route = useRoute()
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enum'
const list = ref<Message[]>([])
const loading = ref(false)
const initialMsg = ref(true)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

const onRefresh = () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  })
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
}

let socket: Socket
onMounted(async () => {
  // 连接websocket
  socket = io('https://consult-api.itheima.net', {
    auth: {
      token: 'Bearer ' + store.user?.token
    },
    query: {
      orderId: route.query.orderId
    }
  })

  // 监听是否连接成功
  socket.on('connect', () => {
    console.log('连接成功')
  })

  // 监听是否断开连接
  socket.on('disconnect', () => {
    console.log('断开连接')
  })

  // 监听是否连接失败
  socket.on('error', (event) => {
    console.log('连接失败', event)
  })

  // 监听默认的聊天信息
  socket.on('chatMsgList', async ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = []
    // console.log('e', data)
    data.forEach((item, index) => {
      if (index === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        createTime: item.createTime,
        id: '1',
        msg: { content: item.createTime }
      })

      arr.push(...item.items)
    })
    // console.log('arr', arr)
    list.value?.unshift(...arr)
    loading.value = false
    closeToast()
    if (!data.length) {
      closeToast()
      return showToast('没有聊天记录了')
    }
    if (initialMsg.value) {
      socket.emit('updateMsgStatus', arr[arr.length - 1].id)
      await nextTick()
      window.scrollTo(0, document.body.scrollHeight)
      initialMsg.value = false
    }
    // list.value = arr
    // console.log(arr)
  })

  // 监听订单状态是否改变
  socket.on('statusChange', () => {
    // console.log(12)
    initOrderDetail()
  })

  // 接收消息
  socket.on('receiveChatMsg', async (e) => {
    // console.log(e)
    list.value?.push(e)
    // console.log('list', list.value)

    // 滚动到最底部
    await nextTick()
    socket.emit('updateMsgStatus', e.id)
    window.scrollTo(0, document.body.scrollHeight)
  })

  // 建立连接成功
  socket.on('connect', () => {
    list.value = []
  })
})
const consult = ref<ConsultOrderItem>()
const initOrderDetail = async () => {
  const orderRes = await getOrderDetail(route.query.orderId as string)
  // console.log('orderRes', orderRes)
  consult.value = orderRes.data
}
initOrderDetail()

// 发送消息
const sendText = async (text: string) => {
  // console.log('消息',text)
  socket.emit('sendChatMsg', {
    // 发送人
    from: store.user?.id,
    // 接收人
    to: consult.value?.docInfo?.id,
    // 发送消息的类型
    msgType: MsgType.MsgText,
    // 消息内容
    msg: {
      content: text
    }
  })
}

// 发送图片
const sendImage = (data: { id: string; url: string }) => {
  console.log('data', data)

  socket.emit('sendChatMsg', {
    // 发送人
    from: store.user?.id,
    // 接收人
    to: consult.value?.docInfo?.id,
    // 发送消息的类型
    msgType: MsgType.MsgImage,
    // 消息内容
    msg: {
      picture: data
    }
  })
}
</script>

<style lang="scss" scoped>
.room__page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
}
</style>
