<template>
  <div class="order__logistics__page">
    <div id="map">
      <div class="title">
        <van-icon name="arrow-left" @click="$router.back()" />
        <span>{{ logistics?.statusValue }}</span>
        <van-icon name="service" />
      </div>
      <div class="current">
        <p class="status">{{ logistics?.statusValue }} 预计{{ logistics?.estimatedTime }}送达</p>
        <p class="predict">
          <span>{{ logistics?.name }}</span>
          <span>{{ logistics?.awbNo }}</span>
        </p>
      </div>
    </div>
    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="logistics?.status" active-color="var(--cp-primary)">
        <van-step v-for="item in logistics?.list" :key="item.id">
          <p class="status">{{ item.statusValue }}</p>
          <p class="content">{{ item.content }}</p>
          <p class="time">{{ item.createTime }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMedicalOrderLogistics } from '@/services/order'
import type { Logistics, Location } from '@/types/order'
import { ref, onMounted } from 'vue'
import startImg from '@/assets/start.png'
import endImg from '@/assets/end.png'
import carImg from '@/assets/car.png'
import { useRoute } from 'vue-router'
const route = useRoute()
const logistics = ref<Logistics>()
const handleGetMedicalOrderLogistics = async () => {
  const res = await getMedicalOrderLogistics(route.params.id as string)
  console.log(res)
  logistics.value = res.data
}
handleGetMedicalOrderLogistics()
// 引入
import AMapLoader from '@amap/amap-jsapi-loader'
// 地图配置
window._AMapSecurityConfig = {
  securityJsCode: 'd30ce9fed4281acd9e14657c0552ed7d'
}

onMounted(async () => {
  AMapLoader.load({
    key: '4ca8b3b485e99733ce53de1296607079',
    version: '2.0'
  }).then((AMap) => {
    // 使用Amap初始化地图
    const map = new AMap.Map('map', {
      // 地图主题
      mapStyle: 'amap://styles/whitesmoke',
      // 设置缩放比例
      zoom: 12
    })
    // 绘制路径 map 绘制到哪个地图上， showTraffic 是否观察道路情况
    AMap.plugin('AMap.Driving', function () {
      const driving = new AMap.Driving({
        map: map,
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        policy: AMap.DrivingPolicy.LEAST_TIME,
        showTraffic: false,
        hideMarkers: true
      })

      /*  if (logistics.value?.logisticsInfo && logistics.value?.logisticsInfo.length >= 2) {
        const list = [...logistics.value.logisticsInfo]
        // 起点
        let startLngLat = list.shift()
        // 终点
        let endLngLat = list.pop()
        const getMarker = (point: Location, image: string, width = 25, height = 30) => {
          const icon = new AMap.Icon({
            size: new AMap.Size(width, width), // 图标尺寸
            image: image, //icon图标
            imageSize: new AMap.Size(width, height)
          })
          //  // 将 Icon 实例添加到 marker 上:
          const marker = new AMap.Marker({
            position: [point.longitude, point.latitude],
            icon: icon,
            zoom: 13
          })
          return marker
        }
        const startMarker = getMarker(endLngLat!, startImg)
        map.add(startMarker)
        const endMarker = getMarker(startLngLat!, endImg)
        map.add(endMarker)

        driving.search(
          [endLngLat?.longitude, endLngLat?.latitude],
          [startLngLat?.longitude, startLngLat?.latitude],
          // 途径地点
          {
            waypoints: logistics.value?.logisticsInfo.map((item) => [item.longitude, item.latitude])
          },
          // 路线规划完成之后出发的路线
          function () {
            // 当前车辆位置
            const curr = logistics.value?.currentLocationInfo

            // 添加车辆标注点
            const currMarker = getMarker(curr!, carImg, 33, 20)

            map.add(currMarker)
            setTimeout(() => {
              map.setFitView({ currMarker })
              map.setZoom(10)
            }, 3000)
          }
        )
      } */

      if (logistics.value?.logisticsInfo && logistics.value?.logisticsInfo.length >= 2) {
        // 设置终点
        const end = logistics.value?.logisticsInfo.shift()
        const endMarker = new AMap.Marker({
          position: [end?.longitude, end?.latitude],
          icon: endImg,
          // size: new AMap.Size(25, 25),
          imageSize: new AMap.Size(25, 25),
          anchor: 'center'
        })
        map.add(endMarker)
        // 设置起点
        const start = logistics.value?.logisticsInfo.pop()
        const startMarker = new AMap.Marker({
          position: [start?.longitude, start?.latitude],
          icon: startImg,
          // size: new AMap.Size(25, 25),
          imageSize: new AMap.Size(25, 25),
          anchor: 'center'
        })
        map.add(startMarker)

        driving.search(
          [start?.longitude, start?.latitude],
          [end?.longitude, end?.latitude],
          {
            waypoints: logistics.value?.logisticsInfo.map((item) => [item.longitude, item.latitude])
          },
          (status: string, result: object) => {
            // 未出错时，result即是对应的路线规划方案
            console.log(status, result)
            const marker = new AMap.Marker({
              icon: carImg,
              position: [
                logistics.value?.currentLocationInfo.longitude,
                logistics.value?.currentLocationInfo.latitude
              ],
              anchor: 'center'
            })
            map.add(marker)
            setTimeout(() => {
              map.setFitView({ marker })
              map.setZoom(10)
            }, 3000)
          }
        )
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.order__logistics__page {
  --van-step-icon-size: 18px;
  --van-step-circle-size: 10px;
}

#map {
  height: 450px;
  overflow: hidden;
  position: relative;

  .title {
    background-color: #fff;
    height: 46px;
    width: 355px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 16px;
    position: absolute;
    left: 10px;
    top: 10px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 9999;

    > span {
      flex: 1;
      text-align: center;
    }

    .van-icon {
      font-size: 18px;
      color: #666;

      &:last-child {
        color: var(--cp-primary);
      }
    }
  }

  .current {
    height: 80px;
    border-radius: 4px;
    background-color: #fff;
    width: 355px;
    box-sizing: border-box;
    padding: 15px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 9999;

    .status {
      font-size: 15px;
      line-height: 26px;
    }

    .predict {
      color: var(--cp-tip);
      font-size: 13px;
      margin-top: 5px;

      > span {
        padding-right: 10px;
      }
    }
  }
}

.logistics {
  padding: 0 10px 20px;

  .title {
    font-size: 16px;
    padding: 15px 5px 5px;
  }

  .van-steps {
    :deep(.van-step) {
      &::after {
        display: none;
      }
    }

    .status {
      font-size: 15px;
      color: var(--cp-text3);
      margin-bottom: 4px;
    }

    .content {
      font-size: 13px;
      color: var(--cp-tip);
      margin-bottom: 4px;
    }

    .time {
      font-size: 13px;
      color: var(--cp-tag);
    }
  }
}
</style>
