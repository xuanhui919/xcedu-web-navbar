<template>
  <div :class="['page-navbar-header', {standalone: isStandaloneMenu}]">
    <div class="page-header">
      <div class="logo">
        <a href="/space"><img :src="site.logo" alt="Logo"></a>
      </div>
      <div class="page-header-action">
        <el-input class="page-header-action-search">
          <a slot="suffix" href="#" @click.prevent="onsearch"><i class="el-icon-search" /></a>
        </el-input>
        <el-dropdown class="page-header-dropdown">
          <el-avatar icon="el-icon-bell" size="small" />
          <el-dropdown-menu slot="dropdown" class="page-header-dropdown-menu">
            <el-dropdown-item>
              <div><i class="el-icon-tickets" /><span>待办</span><span class="fr count">(0)</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <div><i class="el-icon-tickets" /><span>待阅</span><span class="fr count">(0)</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <div><i class="el-icon-tickets" /><span>新消息</span><span class="fr count">(0)</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <div><i class="el-icon-tickets" /><span>新邮件</span><span class="fr count">(0)</span></div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <el-avatar icon="el-icon-circle-plus-outline" size="small" />
          <el-dropdown-menu slot="dropdown" class="page-header-dropdown-menu">
            <el-dropdown-item icon="el-icon-document">新建信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit-outline" divided>写信</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand">
          <a href="#" @click.prevent>
            <el-avatar size="small" :src="user.avatar" />
            <i class="el-icon-arrow-down" />
          </a>
          <el-dropdown-menu slot="dropdown" class="page-header-dropdown-menu">
            <el-dropdown-item disabled>
              <div>
                <label>在线人数:</label>
                <span class="fr">
                  <span class="current">1</span>
                  <span>/</span>
                  <span>526（人）</span>
                </span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided command="changeSkin" class="tx-c">皮肤设置</el-dropdown-item>
            <el-dropdown-item divided command="changePwd" class="tx-c">密码修改</el-dropdown-item>
            <el-dropdown-item divided class="tx-c">进入后台</el-dropdown-item>
            <el-dropdown-item divided command="logout" class="tx-c">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-if="!isStandaloneMenu" class="page-header-menu">
        <nav-menu :stanalone="false" :theme="profile.theme" />
      </div>
    </div>
    <div v-if="isStandaloneMenu" :class="['page-header-menu', profile.theme]">
      <nav-menu v-if="isStandaloneMenu" stanalone :theme="profile.theme" />
    </div>
  </div>
</template>

<script>
import NavMenu from './nav-menu.vue'

const { mapState, mapActions } = Vuex

export default {
  name: 'PageHeader',

  components: { NavMenu },

  asyncData ({ store }) {
    return Promise.all([
      store.dispatch('site/loadConfig'),
      store.dispatch('user/loadProfile')
    ])
    return store.dispatch('site/loadConfig')
  },

  computed: {
    ...mapState('user', {
      profile: 'profile',
      user: 'currentUser'
    }),

    ...mapState('site', {
      site: 'config'
    }),

    isStandaloneMenu () {
      return this.profile.layout === 'standalone'
      // return false
    }
  },

  methods: {
    ...mapActions('user', {
      logoutAction: 'logout'
    }),
    handleCommand (command) {
      switch (command) {
      case 'changeSkin':
        this.navigateToUrl('/user/change/skin')
        break
      case 'changePwd':
        this.navigateToUrl('/user/change/pwd')
        break
      case 'logout':
        this.logoutAction().then(() => {
          this.navigateToUrl('/user/login', {}, 'location')
        })
        break
      default:
        this.$message.info({ title: 'Devops', message: 'Engineer is working on it!' })
        break
      }
    }
  }
}
</script>
