<template>
  <div class="user__page">
    <div class="user__page__header">
      <div class="top">
        <van-image round width="70px" height="70px" :src="userInfo?.avatar" />
        <div class="name">
          <p>{{ userInfo?.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ userInfo?.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo?.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo?.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ userInfo?.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user__page__order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order">全部订单 <van-icon name="arrow" /></router-link>
      </div>
      <van-row>
        <van-col span="6">
          <van-badge :content="userInfo?.orderInfo.paidNumber || ''">
            <cp-icons name="user-paid"></cp-icons>
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo?.orderInfo.shippedNumber || ''">
            <cp-icons name="user-shipped"></cp-icons>
          </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo?.orderInfo.receivedNumber || ''">
            <cp-icons name="user-received"></cp-icons>
          </van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userInfo?.orderInfo.finishedNumber || ''">
            <cp-icons name="user-finished"></cp-icons>
          </van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
    <div class="user__page__group">
      <h3>快捷工具</h3>
      <van-cell
        v-for="(item, index) in tools"
        :key="index"
        :title="item.label"
        is-link
        :to="item.path"
        :border="false"
      >
        <template #icon>
          <cp-icons :name="item.icon"></cp-icons>
        </template>
      </van-cell>
    </div>
    <div class="user__page__footer" @click="loginOut">
      <a class="logout" href="javascript:;">退出登录</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserInfo } from '@/types/user'
import { getUserInfo } from '@/services/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'
const router = useRouter()
import { useUserStore } from '@/stores'
const store = useUserStore()
const userInfo = ref<UserInfo>()
// 获取用户信息
const initUserInfo = async () => {
  const infoRes = await getUserInfo()
  console.log(infoRes)
  userInfo.value = infoRes.data
}

// 退出登录
const loginOut = () => {
  showConfirmDialog({
    title: '温馨提示',
    message: '您确认要退出优医问诊吗？',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then(() => {
      store.delUser()
      router.push('/login')
      // on confirm
    })
    .catch(() => {
      // on cancel
    })
}

initUserInfo()

const tools = [
  { label: '我的问诊', path: '/user/consult', icon: 'user-tool-01' },
  { label: '我的处方', path: '/', icon: 'user-tool-02' },
  { label: '家庭档案', path: '/user/patient', icon: 'user-tool-03' },
  { label: '地址管理', path: '/user/address', icon: 'user-tool-04' },
  { label: '我的评价', path: '/', icon: 'user-tool-05' },
  { label: '官方客服', path: '/', icon: 'user-tool-06' },
  { label: '设置', path: '/', icon: 'user-tool-07' }
]
</script>

<style lang="scss" scoped>
.user__page {
  min-height: calc(100vh - 50px);
  background-color: var(--cp-bg);
  padding: 0 15px 65px;

  &__header {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;

    .top {
      display: flex;
      align-items: center;
      padding-top: 50px;

      .name {
        margin-left: 15px;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 700;
          }

          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }

    .van-row {
      padding-top: 15px;
      margin: 0 -15px;

      p {
        text-align: center;

        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }

        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }

  &__order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;

    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;

      a {
        color: var(--cp-tip);
      }
    }

    .van-col {
      text-align: center;

      .cp-icon {
        font-size: 28px;
      }

      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }
  &__group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
  &__footer {
    width: 300px;
    margin: 0 auto;
    background: #fff;
    line-height: 40px;
    border-radius: 15px;
    .logout {
      display: block;
      margin: 20px auto;
      width: 100px;
      text-align: center;
      color: var(--cp-price);
    }
  }
}
</style>
