import { getPrescriptionPic, deleteOrder } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { onMounted, ref } from 'vue'
// 图片预览
import { showImagePreview, showToast } from 'vant'
export default function useShowPrescription() {
  const showPrescription = async (id: string | number) => {
    const res = await getPrescriptionPic(id)
    if (res.data.id) {
      showImagePreview([res.data.url])
    }
  }
  return {
    showPrescription
  }
}

// 删除订单
export function useDeleteOrder(cb?: (id: string | number) => void) {
  const deleteLoading = ref(false)
  const handleDeleteOrder = async (item: ConsultOrderItem) => {
    deleteLoading.value = true
    try {
      await deleteOrder(item.id)
      cb && cb(item.id)
      showToast('删除成功')
    } catch (error) {
      showToast('删除失败')
    } finally {
      deleteLoading.value = false
    }
  }
  return {
    deleteLoading,
    handleDeleteOrder
  }
}

// 取消订单
export function useCancelOrder() {
  return {}
}

// 获取订单详情数据
import { getMedicalOrderDetail } from '@/services/order'
import type { OrderDetail } from '@/types/order'
export const useOrderDetail = (id: string) => {
  const loading = ref(false)
  const order = ref<OrderDetail>()
  onMounted(async () => {
    loading.value = true
    try {
      const res = await getMedicalOrderDetail(id)
      order.value = res.data
    } finally {
      loading.value = false
    }
  })
  return { order, loading }
}
