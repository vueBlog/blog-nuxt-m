require('dotenv').config()
module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.VUE_APP_title || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: process.env.VUE_APP_keywords || ''
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.VUE_APP_description || ''
      },
      {
        hid: 'author',
        name: 'author',
        content: process.env.VUE_APP_author || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${process.env.VUE_APP_router_base}/favicon.ico`
      }
    ],
    script: [
      {
        src: 'https://zz.bdstatic.com/linksubmit/push.js',
        async: true,
        defer: true
      }
    ]
  },
  server: {
    port: 8088 // default: 3000
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#1989fa' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/common.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/axios.js'
    },
    {
      src: '~/plugins/vant.js'
    },
    {
      src: '~/plugins/toPC.js',
      mode: 'client'
    },
    {
      src: '~/plugins/lib-flexible.js',
      mode: 'client'
    },
    {
      src: '~/plugins/clipboard.js',
      mode: 'client'
    },
    {
      src: '~/plugins/routerAfterEach.js',
      mode: 'client'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.VUE_APP_host,
    proxy: true
  },
  proxy: {
    '/api': {
      target: process.env.VUE_APP_host,
      ws: true,
      changeOrigin: true
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 37.5,
          propList: ['*']
        }
      },
      preset: {
        autoprefixer: true
      }
    }
  },
  router: {
    base: process.env.VUE_APP_router_base,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
  },
  generate: {
    minify: {
      collapseWhitespace: false
    }
  }
}
