import { resolve } from 'node:path'
// @ts-ignore
import { defineApplicationConfig } from '@liuchengjin/vite-config/react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import cdn from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
const root = process.cwd()
const pathResolve = (pathname: string) => resolve(root, '.', pathname)
export default defineApplicationConfig({
  overrides: {
    server: {
      host: true,
      port: 9528,
    },

    optimizeDeps: {
      // include: ['mobx', ',mobx-state-tree', 'mobx-react-lite'],
    },

    build: {
      commonjsOptions: {
        include: [/node_modules/, /clib/, /mobx-state-tree/, /mobx-react-lite/, /mobx/],
      },
    },

    plugins: [
      vanillaExtractPlugin(),
      cdn({
        prodUrl: 'https://static-dev.zgg.com/s/npm/{path}',
        enableInDevMode: true,
        modules: [
          // {
          //   name: 'mobx',
          //   var: 'mobx',
          //   path: 'mobx@6.6.1/dist/mobx.umd.production.min.js',
          // },
          // {
          //   name: 'mobx-state-tree',
          //   var: 'mobxStateTree',
          //   path: 'mobx-state-tree@5.1.5/dist/mobx-state-tree.umd.min.js',
          // },
          // {
          //   name: 'mobx-react-lite',
          //   alias: ['mobx-react-lite'],
          //   var: 'mobxReactLite',
          //   path: 'mobx-react-lite@3.4.0/dist/mobxreactlite.umd.production.min.js',
          //   prodUrl: 'https://unpkg.com/mobx-state-tree/dist/mobx-state-tree.umd.js',
          // },
        ],
      }),

      // VitePWA({
      //   // PWA 插件的配置选项
      //   registerType: 'autoUpdate',
      //   includeAssets: ['favicon.svg', 'robots.txt'], // 静态资源
      //   manifest: {
      //     name: '追觅测试app',
      //     short_name: '追觅',
      //     theme_color: '#ffffff',
      //     description: '为追觅测试app开发的一个简单的pwa测试功能',
      //     // 为了方便，使用svg图标
      //     icons: [
      //       {
      //         src: '/vite.svg',
      //         sizes: '192x192',
      //         type: 'image/svg+xml',
      //       },
      //       {
      //         src: '/vite.svg',
      //         sizes: '512x512',
      //         type: 'image/svg+xml',
      //       },
      //     ],
      //     // 其他清单配置...
      //   },
      //   // 其他 PWA 插件配置...
      //   devOptions: {
      //     // 如果想在`vite dev`命令下调试PWA, 必须启用它
      //     enabled: true,
      //     // Vite在dev模式下会使用浏览器原生的ESModule，将type设置为`"module"`与原先的保持一致
      //     type: 'module',
      //   },
      // }),
    ],
    resolve: {
      alias: [
        {
          find: 'src',
          replacement: pathResolve('src'),
        },
        {
          find: /\/@\//,
          replacement: `${pathResolve('src')}/`,
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: `${pathResolve('types')}/`,
        },
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: `${pathResolve('src')}/`,
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: `${pathResolve('types')}/`,
        },

        {
          find: /demo\//,
          replacement: `${pathResolve('../react-demo')}/`,
        },
      ],
    },
  },
})
