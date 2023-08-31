<template>
  <div class="consult__fast__page">
    <cp-nav-bar
      title="极速问诊"
      right-text="问诊记录"
      @click-right="$router.push('/user/consult')"
    ></cp-nav-bar>
    <div class="fast__logo">
      <img class="img" src="../../assets/consult-fast.png" alt="" />
      <p class="text"><span>20s</span> 快速匹配专业医生</p>
    </div>
    <div class="fast__type">
      <router-link
        to="/consult/dep"
        class="item"
        @click="store.setIllnessType(IllnessType.Trimethylate)"
      >
        <cp-icons class="pic" name="consult-doctor"></cp-icons>
        <div class="info">
          <p>三甲图文问诊</p>
          <p>三甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
      <router-link to="/consult/dep" class="item" @click="store.setIllnessType(IllnessType.Normal)">
        <cp-icons class="pic" name="consult-message"></cp-icons>
        <div class="info">
          <p>普通图文问诊</p>
          <p>二甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConsultStore } from '@/stores'
const store = useConsultStore()
import { IllnessType } from '@/types/enums'
</script>

<style lang="scss" scoped>
.consult__fast__page {
  padding-top: 46px;
  .fast__logo {
    padding: 30px 0;
    text-align: center;
    .img {
      width: 240px;
    }
    .text {
      font-size: 16px;
      margin-top: 10px;
      > span {
        color: var(--cp-primary);
      }
    }
  }
  .fast__type {
    padding: 15px;
    .item {
      display: flex;
      padding: 16px;
      border-radius: 4px;
      align-items: center;
      margin-bottom: 16px;
      border: 0.5px solid var(--cp-line);
      .pic {
        width: 40px;
        height: 40px;
      }
      .info {
        margin-left: 12px;
        flex: 1;
        > p:first-child {
          font-size: 16px;
          color: var(--cp-text1);
          margin-bottom: 4px;
        }
        > p:last-child {
          font-size: 13px;
          color: var(--cp-tag);
        }
      }
      .van-icon {
        color: var(--cp-tip);
      }
    }
  }
}
</style>
