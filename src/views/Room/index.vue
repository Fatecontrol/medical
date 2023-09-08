<template>
  <div class="room__page">
    <cp-nav-bar title="问诊室"></cp-nav-bar>
    <RoomStatus> </RoomStatus>
    <RoomMessage :list="list!"></RoomMessage>
    <RoomAction></RoomAction>
  </div>
</template>

<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io } from 'socket.io-client'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores'
const store = useUserStore()
import { useRoute } from 'vue-router'
const route = useRoute()
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enum'
const list = ref<Message[]>()
onMounted(async () => {
  // 连接websocket
  const socket = io('https://consult-api.itheima.net', {
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
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = []
    console.log('e', data)
    data.forEach((item) => {
      arr.push({
        msgType: MsgType.Notify,
        createTime: item.createTime,
        id: '1',
        msg: { content: item.createTime }
      })

      arr.push(...item.items)
    })
    list.value = arr
    console.log(arr)
  })
})
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
