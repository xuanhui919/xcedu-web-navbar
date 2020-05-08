import SiteStore from './modules/site'
import UserStore from './modules/user'

// 由于Vue Vuex是 global import， vuex 会自动调用 vuex的 install 方法，所以：不再需要手动use

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    site: SiteStore,
    user: UserStore
  }
})
