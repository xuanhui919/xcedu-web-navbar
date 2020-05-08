import routes from './routes'

// 由于Vue Vue-router 是 global import， vue-roter 会自动调用  vue-router的install方法， 所以不再需要手动use
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes
})
