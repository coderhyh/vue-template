import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { PiniaAutoRefs } from 'hyh-toolkit/vite'
import Unocss from 'unocss/vite'
import AutoExport from 'unplugin-auto-export/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import VitePluginVueDevtools from 'vite-plugin-vue-devtools'

export default defineConfig({
  build: {
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    outDir: 'dist', // 指定输出路径
    rollupOptions: {
      output: {
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        manualChunks(id) {
          if (id.includes('element-plus'))
            return 'element-plus'

          if (id.includes('node_modules'))
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
        },
      },
    },
    sourcemap: false, // 构建后是否生成 source map 文件
    target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "~/assets/style/global.less";',
        charset: false,
      },
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    PiniaAutoRefs(),
    AutoExport({
      path: ['~/views/**/{cpns,hooks,config}/*'],
    }),
    AutoImport({
      dirs: ['src/hooks', 'src/utils'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: ['src/components', 'src/shared-cpn'],
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Unocss(),
    viteCompression({
      algorithm: 'gzip', // 压缩算法
      deleteOriginFile: false, // 删除源文件
      disable: false, // 开启压缩(不禁用)，默认即可
      ext: '.gz', // 文件类型
      threshold: 10240, // 压缩前最小文件大小
      verbose: true, // 默认即可
    }),
    VitePluginVueDevtools(),
  ],
  resolve: {
    alias: { '~': resolve(__dirname, 'src') },
  },
  server: {
    hmr: true,
    host: '0.0.0.0',
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        target: 'https://echarts.apache.org/examples',
      },
    },
  },
})
