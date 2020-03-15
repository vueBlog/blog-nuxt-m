<template>
  <div class="content">
    <aside-block
      v-for="item in asideList"
      :key="item.type"
      :info="item"
    ></aside-block>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import AsideBlock from '@/components/AsideBlock'

export default {
  name: 'Home',
  components: {
    AsideBlock
  },
  async asyncData({ store, query, req, res }) {
    let asideList
    if (!store.state.asideList.length) {
      asideList = await store.dispatch('getAsideList')
    } else {
      asideList = store.state.asideList
    }
    return {
      asideList
    }
  },
  data() {
    return {}
  },
  head() {
    return {
      title: `首页 | ${process.env.VUE_APP_title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: `首页 | ${process.env.VUE_APP_keywords}`
        },
        {
          hid: 'description',
          name: 'description',
          content: `首页 | ${process.env.VUE_APP_description}`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
