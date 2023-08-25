<script setup lang="ts">
import { mobileRules, passwordRules } from '@/utils/rules'
import { useRouter } from 'vue-router'
const router = useRouter()
import type { loginparamsRules } from '@/services/types/user'

import { ref } from 'vue'
import { showToast } from 'vant'
const loginFrom = ref<loginparamsRules>({
  mobile: '13230000001',
  password: 'abc12345'
})
// 密码svg图标切换
const show = ref<boolean>(false)
/* // 手机号
const mobile = ref<string>('13230000001')
// 密码
const password = ref<string>('abc12345') */
// 协议状态
const agree = ref<boolean>(false)
// 登录方法
const handlelogin = () => {
  if (!agree.value) return showToast('请勾选我已同意')
}
</script>
<template>
  <div class="login__page">
    <!-- navBar -->
    <cp-nav-bar @click-right="router.push('/register')" right-text="注册"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login__header">
      <h3>密码登录</h3>
      <a href="">短信验证码登录<van-icon name="arrow" /></a>
    </div>
    <!-- form表单 -->
    <van-form :autocomplete="false" @submit="handlelogin">
      <van-field
        v-model="loginFrom.mobile"
        :rules="mobileRules"
        type="tel"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="loginFrom.password"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        placeholder="请输入密码"
      >
        <template #button>
          <cp-icons :name="`login-eye-${show ? 'on' : 'off'}`" @click="show = !show"></cp-icons>
        </template>
      </van-field>
      <div class="cp__cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="">用户协议</a>
          <span>及</span>
          <a href="">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp__cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp__cell">
        <a href="">忘记密码</a>
      </div>
    </van-form>
    <!-- 第三方登录 -->
    <div class="login__other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="../../assets/qq.svg" alt="qq" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login {
  &__page {
    padding-top: 46px;

    .van-form {
      padding: 0 14px;

      .cp__cell {
        height: 52px;
        line-height: 24px;
        padding: 14px 15px;
        display: flex;
        align-items: center;

        a {
          color: var(--cp-text2);
        }

        .van-button {
          --van-button-primary-background: var(--cp-primary);
          --van-button-primary-border-color: var(--cp-primary);
        }

        .van-checkbox {
          a {
            color: var(--cp-primary);
            padding: 0 5px;
          }
        }
      }
    }
  }

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 30px 30px 50px;

    h3 {
      font-size: 24px;
      font-weight: normal;
    }

    a {
      color: var(--cp-text2);
      font-size: 15px;
    }
  }

  &__other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
</style>
