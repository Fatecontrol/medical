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
  </div>
</template>

<script setup lang="ts">
import type { UserInfo } from '@/types/user'
import { getUserInfo } from '@/services/user'
import { ref } from 'vue'
const userInfo = ref<UserInfo>()
// 获取用户信息
const initUserInfo = async () => {
  const infoRes = await getUserInfo()
  console.log(infoRes)
  userInfo.value = infoRes.data
}

initUserInfo()
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
}
</style>
