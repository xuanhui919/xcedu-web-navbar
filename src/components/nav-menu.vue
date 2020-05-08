<template>
  <el-menu
    mode="horizontal"
    :class="{'el-menu__stanalone': stanalone}"
    default-active="space"
    @select="handleActive"
  >
    <el-menu-item index="space">
      <span slot="title" class="content"><i class="el-icon-s-home" /><span>空间</span></span>
    </el-menu-item>
    <el-menu-item index="email">
      <span slot="title" class="content">邮件</span>
    </el-menu-item>
    <el-menu-item index="education">
      <span slot="title" class="content">德育</span>
    </el-menu-item>
    <el-menu-item index="ecard">
      <span slot="title" class="content">班牌</span>
    </el-menu-item>
    <el-menu-item index="tech">
      <span slot="title" class="content">教学档案</span>
    </el-menu-item>
    <el-menu-item index="menus">
      <span slot="title" class="content">更多</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'NavMenu',

  props: {
    stanalone: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'blue'
    }
  },

  methods: {

    handleActive (name) {
      this.navigateToUrl(`/${name}`)
    }

  }
}
</script>
