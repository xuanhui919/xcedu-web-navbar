<template>
  <div id="app-navbar" class="app-navbar">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from '@/components/page-header.vue'

export default {
  name: 'App',

  components: { PageHeader }

}
</script>
