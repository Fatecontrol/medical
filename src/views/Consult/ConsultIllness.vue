<template>
  <div class="consult__illness__page">
    <cp-nav-bar title="图文问诊"></cp-nav-bar>
    <div class="illness__tip van-hairline--bottom">
      <img class="img" src="../../assets/avatar-doctor.svg" alt="" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe"><cp-icons name="consult-safe"></cp-icons>内容仅医生可见</p>
      </div>
    </div>
    <div class="illness__form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn :options="timeOptions" v-model="form.illnessTime"></cp-radio-btn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn :options="flagOptions" v-model="form.consultFlag"></cp-radio-btn>
      </div>
    </div>
    <div class="illness__img">
      <van-uploader
        upload-icon="photo-o"
        upload-text="上传图片"
        max-count="9"
        :max-size="5 * 1024 * 1024"
        :after-read="onAfterRead"
        @delete="onDeleteImg"
        v-model="fileList"
      ></van-uploader>
      <p class="tip" v-if="!fileList.length">上传内容仅医生可⻅,最多9张图,最大5MB</p>
    </div>
    <van-button :class="{ disabled }" type="primary" block round @click="handleNext"
      >下一步</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { showToast, showConfirmDialog } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useConsultStore } from '@/stores'
const store = useConsultStore()
import type { ConsultIllness, Image } from '@/types/consult'
import { IllnessTime, ConsultFlag } from '@/types/enums'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { uploadImage } from '@/services/knowledge'
const timeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '大于半年', value: IllnessTime.More }
]
const flagOptions = [
  { label: '就诊过', value: ConsultFlag.isFlag },
  { label: '没就诊过', value: ConsultFlag.noFlag }
]
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
const fileList = ref<Image[]>([])
const onAfterRead: UploaderAfterRead = async (file: any) => {
  // console.log(file.file)

  if (Array.isArray(file)) return
  // 开始上传
  file.status = 'uploading'
  file.message = '上传中...'
  try {
    const imgRes = await uploadImage(file.file)
    file.status = 'done'
    file.message = undefined
    file.url = imgRes.data.url
    // console.log('imgRes', imgRes)
    form.value.pictures?.push(imgRes.data)
  } catch (error) {
    file.status = 'failed'
    file.message = '上传失败'
  }
}
const onDeleteImg = (file: UploaderFileListItem) => {
  // console.log(file.url)
  // 删除
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== file.url)
}

// 按钮
const disabled = computed(() => {
  return (
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
  )
})

const handleNext = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined) return showToast('请选择症状持续时间')
  if (form.value.consultFlag === undefined) return showToast('请选择是否已经就诊')
  store.setIllness(form.value)
  // 跳转到档案管理 根据isChange实现选择功能
  router.push('/user/patient?isChange=1')
}

// 进入页面数据回显
onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢？',
      confirmButtonColor: 'var(--cp-primary)',
      closeOnPopstate: false
    })
      .then(() => {
        // on confirm
        const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
        form.value = { illnessDesc, illnessTime, consultFlag, pictures }
        // 图片回显
        fileList.value = pictures || []
      })
      .catch(() => {
        // on cancel
      })
  }
})
</script>

<style lang="scss" scoped>
.consult__illness__page {
  padding-top: 46px;

  .illness__tip {
    display: flex;
    padding: 15px;

    img {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 10px;
    }

    .info {
      flex: 1;
      padding-left: 12px;

      .tit {
        font-size: 16px;
        margin-bottom: 5px;
      }

      .tip {
        padding: 12px;
        background: var(--cp-bg);
        color: var(--cp-text3);
        font-size: 13px;
        margin-bottom: 10px;
      }

      .safe {
        font-size: 10px;
        color: var(--cp-text3);
        display: flex;
        align-items: center;

        .cp-icon {
          font-size: 12px;
          margin-right: 2px;
        }
      }
    }
  }

  .illness__form {
    padding: 15px;

    .van-field {
      padding: 0;

      &::after {
        border-bottom: none;
      }
    }

    .item {
      > p {
        color: var(--cp-text3);
        padding: 15px 0;
      }
    }
  }

  .illness__img {
    padding: 0 10px;
    padding-top: 16px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;

    .tip {
      font-size: 12px;
      color: var(--cp-tip);
    }

    ::v-deep() {
      .van-uploader {
        &__preview {
          &-delete {
            left: -6px;
            top: -6px;
            border-radius: 50%;
            background: var(--cp-primary);
            width: 20px;
            height: 20px;

            &-icon {
              transform: scale(0.9) translate(-22%, 22%);
            }
          }

          &-image {
            border-radius: 8px;
            overflow: hidden;
          }
        }

        &__upload {
          border-radius: 8px;
        }

        &__upload-icon {
          color: var(--cp-text3);
        }
      }
    }
  }

  .van-button {
    font-size: 16px;
    margin-bottom: 30px;
    // 覆盖vant的主题色
    --van-button-primary-background: var(--cp-primary);
    --van-button-primary-border-color: var(--cp-primary);
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
}
</style>
