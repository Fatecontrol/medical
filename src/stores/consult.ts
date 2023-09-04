import { defineStore } from 'pinia'
import { ref } from 'vue'
// import persist from 'pinia-plugin-persistedstate'
import type { PartialConsult, ConsultIllness } from '@/types/consult'
import type { ConsultType, IllnessType } from '@/types/enums'
export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    // 初始化一个状态，保存问诊记录
    const consult = ref<PartialConsult>({})
    // 设置问诊类型
    const setType = (type: ConsultType) => {
      consult.value.type = type
    }
    // 设置极速问诊类型
    const setIllnessType = (type: IllnessType) => {
      consult.value.illnessType = type
    }
    // 设置科室
    const setDepId = (depId: string) => {
      consult.value.depId = depId
    }
    /* // 设置病情描述
    const setIllnessDesc = (illnessDesc: string) => {
      consult.value.illnessDesc = illnessDesc
    }
    // 设置病情持续时间
    const setIllnessTime = (illnessTime: IllnessTime) => {
      consult.value.illnessTime = illnessTime
    }
    // 设置是否就诊过
    const setConsultFlag = (consultFlag: 0 | 1) => {
      consult.value.consultFlag = consultFlag
    } */
    // 设置问诊信息（病情描述 病情持续时间 是否就诊过 患者图片数组）
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }

    // 设置患者Id
    const setPatientId = (patientId: string) => {
      consult.value.patientId = patientId
    }
    // 设置优惠券Id
    const setCouponId = (couponId: string) => {
      consult.value.couponId = couponId
    }
    // 清空订单信息
    const clear = () => {
      consult.value = {}
    }
    return {
      consult,
      setType,
      setIllnessType,
      setDepId,
      setPatientId,
      setCouponId,
      setIllness,
      clear
    }
  },
  {
    persist: true
  }
)
