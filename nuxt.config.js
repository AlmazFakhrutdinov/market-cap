export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Rubik:300,400,500,500i,700&display=swap'
      }
    ],
    script: [{ src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ['assets/main.css', '@/assets/reset.css'],
  /*
   ** Customize the generated output folder
   */
  // generate: {
  //   dir: 'public'
  // },

  // /*
  //  ** Customize the base url
  //  */
  // router: {
  //   base: '/coin-market-cap/' // this is whatever the project is named
  // },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/api.js'
    },
    {
      src: '@/plugins/virtual-scroller.js'
    },
    {
      src: '@/plugins/directives.js'
    },
    {
      src: '@/plugins/vue-chart.js',
      ssr: false
    },
    {
      src: '@plugins/global-components'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    'vue-scrollto/nuxt',

    // Or if you have custom options...
    ['vue-scrollto/nuxt', { duration: 300 }],
    // Simple usage
    '@nuxtjs/moment',

    // With options
    [
      '@nuxtjs/moment',
      {
        /* module options */
      }
    ],

    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          },
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            // set: '@fortawesome/free-solid-svg-icons',
            set: '@fortawesome/free-regular-svg-icons',
            // icons: ['faDollarSign']
            icons: ['far']
          }
        ]
      }
    ],
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-lazy-load',
    'nuxt-fontawesome',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vue-echarts', 'resize-detector'],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
