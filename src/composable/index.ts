import { getPrescriptionPic } from '@/services/consult'
// 图片预览
import { showImagePreview } from 'vant'
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
