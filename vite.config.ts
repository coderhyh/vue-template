/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import { AutoImportType, PiniaAutoRefs } from 'hyh-toolkit/lib/vite'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import AutoExport from 'unplugin-auto-export/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import VitePluginVueDevtools from 'vite-plugin-vue-devtools'

import Vitest from './vitest.config'

export default defineConfig({
  test: Vitest,
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    AutoImportType(),
    PiniaAutoRefs(),
    AutoExport({
      path: ['~/views/**/{cpns,hooks,config}/*'],
      componentDirs: ['cpns']
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/hooks', 'src/utils'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly' // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/components', 'src/shared-cpn'],
      resolvers: [ElementPlusResolver()]
    }),
    Unocss(),
    viteCompression({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: 'gzip', //压缩算法
      ext: '.gz' //文件类型
    }),
    VitePluginVueDevtools()
  ],
  resolve: {
    alias: { '~': resolve(__dirname, 'src') }
  },
  server: {
    port: 3000,
    open: true,
    hmr: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://echarts.apache.org/examples',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    outDir: 'dist', // 指定输出路径
    sourcemap: false, // 构建后是否生成 source map 文件
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('element-plus')) {
            return 'element-plus'
          }
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "~/assets/style/global.less";'
      }
    }
  }
})
