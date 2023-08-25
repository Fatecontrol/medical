import { fileURLToPath, URL } from 'node:url'
// import postcssPxToViewport from 'postcss-px-to-viewport'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // 关闭自动添加组件类型
      dts: false,
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/dev-api': {
        target: 'https://consult-api.itheima.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, '')
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        // postcssPxToViewport({
        //   unitToConvert: 'px', // 需要转换的单位 [常用]
        //   viewportWidth: 375, // UI设计稿的宽度(还是需要根据实际情况进行调整，如果设置设计稿的宽度，会在移动端显示较小) [常用]
        //   unitPrecision: 6, // 转换后的精度，即小数点位数
        //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        //   fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        //   selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
        //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        //   replace: true, // 是否转换后直接更换属性值
        //   landscape: false // 是否处理横屏情况
        //   // landscapeUnit: 'px', // 横屏时使用的单位
        //   // landscapeWidth: 750 // 横屏时使用的视口宽度
        // })
      ]
    }
  }
})
