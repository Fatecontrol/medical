<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { loginByPassword, sendMobileCode, loginByCode } from '@/services/user'
import { useUserStore } from '@/stores'
const store = useUserStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { ref } from 'vue'
import { showToast } from 'vant'
import { onUnmounted } from 'vue'
import type { loginparamsRules } from '@/services/types/user'
const loginFrom = ref<loginparamsRules>({
  mobile: '13230000001',
  password: 'abc12345',
  code: ''
})
// 密码svg图标切换
const show = ref<boolean>(false)
// 初始化密码短信验证码切换状态
const isPass = ref<boolean>(false)
/* // 手机号
const mobile = ref<string>('13230000001')
// 密码
const password = ref<string>('abc12345') */
// 协议状态
const agree = ref<boolean>(false)
// 登录方法
const handlelogin = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
  // 第一种 不是因为token过期进入到登录页，而是我们打开项目自己进入登录页，没有携带当前页面的地址
  // 第二种 token过期，自动跳转到登录页，，如果是第二种情况，会携带当前的页面地址
  try {
    // 根据isPass值 为fasle 密码登录  为true 短信验证码登录
    const loginRes = isPass.value
      ? await loginByCode(loginFrom.value.mobile, loginFrom.value.code)
      : await loginByPassword(loginFrom.value.mobile, loginFrom.value.password)
    store.setUser(loginRes.data)

    // console.log(loginRes)
    // 跳转到主页
    router.replace((route.query.returnUrl as string) || '/user')
    // 提示登录成功
    showToast('登录成功')
  } catch (error) {
    console.log(error)
  }
}
const time = ref<number>(0)
let timerId: number = 0
// 发送验证码
const sendCode = async () => {
  if (time.value > 0) return
  // 调用接口
  const codeRes = await sendMobileCode(loginFrom.value.mobile, 'login')
  // console.log('codeRes', codeRes)
  // loginFrom.value.code = codeRes.data.code
  showConfirmDialog({
    message: `系统检测到验证码${codeRes.data.code}，是否允许粘贴？`
  })
    .then(() => {
      // on confirm
      loginFrom.value.code = codeRes.data.code
    })
    .catch(() => {
      // on cancel
    })

  // 倒计时
  showToast('发送成功')
  time.value = 60
  clearInterval(timerId)
  timerId = setInterval(() => {
    time.value--
    if (time.value <= 0) clearInterval(timerId)
  }, 1000)
}
// 当页面卸载的时候 清除定时器
onUnmounted(() => {
  window.clearInterval(timerId)
})
</script>
<template>
  <div class="login__page">
    <!-- navBar -->
    <cp-nav-bar @click-right="router.push('/register')" right-text="注册"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login__header">
      <h3>{{ isPass ? '短信验证码登录' : '密码登录' }}</h3>
      <a href.prevent="#">
        <span @click="isPass = !isPass">{{ isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"
      /></a>
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
        v-if="!isPass"
      >
        <template #button>
          <cp-icons :name="`login-eye-${show ? 'on' : 'off'}`" @click="show = !show"></cp-icons>
        </template>
      </van-field>
      <van-field v-model="loginFrom.code" :rules="codeRules" placeholder="请输入验证码" v-else>
        <template #button>
          <span :class="time > 0 ? ' active' : 'btn-send'" @click="sendCode">{{
            time > 0 ? `${time} s后再次发送` : '发送验证码'
          }}</span>
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

      .btn-send {
        color: var(--cp-primary);
      }

      .active {
        color: #666;
      }

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
