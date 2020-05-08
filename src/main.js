import './set-public-path'
import router from './router'
import store from './stores'

import App from './App.vue'

Vue.use(ELEMENT)

Vue.config.productionTip = false

VuexRouterSync.sync(store, router)

Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({ store: this.$store, route: this.$route })
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({ store: this.$store, route: to })
    }
    next()
  },
  methods: {
    navigateToUrl (url, query = {}, switcher = 'singleSpa') {
      const querystr = Object.keys(query).reduce((target, key) => {
        target.push(`${key}=${query[key]}`)
        return target
      }, []).join('&')

      const newUrl = querystr ? `${url}?${querystr}` : url

      if (switcher === 'singleSpa' && window.singleSpaNavigate) {
        window.singleSpa.navigateToUrl(`${url}?${querystr}`)
      } else if (switcher === 'VueRouter') {
        router.push(newUrl)
      } else {
        const protocol = location.protocol
        const host = location.host
        location.href = `${protocol}//${host}${newUrl}`
      }
    }
  }
})

let vueLifecyBootstrap
let vueLifecyMount
let vueLifecyUnmount

const options = {
  router,
  store,
  render (h) {
    return h(App)
  }
}

if (window.singleSpaNavigate && window.singleSpaVue) {
  const vueLifecycles = window.singleSpaVue({
    Vue,
    appOptions: options
  })
  vueLifecyBootstrap = vueLifecycles.bootstrap
  vueLifecyMount = vueLifecycles.mount
  vueLifecyUnmount = vueLifecycles.unmount
} else {
  new Vue(options).$mount('#app')
}

export const bootstrap = vueLifecyBootstrap
export const mount = vueLifecyMount
export const unmount = vueLifecyUnmount
