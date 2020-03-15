<template>
  <div class="page">
    <van-nav-bar
      :title="title"
      fixed
      :z-index="1000"
      @click-left="clickNavLeft"
      @click-right="clickNavRight"
    >
      <div slot="left" class="flex head-line-height">
        <template v-if="isHome">
          <img class="logo" src="~assets/images/logo.jpg" alt="logo" />
        </template>
        <template v-else>
          <van-icon name="arrow-left" style="font-size: 16px;" />
          <span>返回</span>
        </template>
      </div>
      <div slot="right" class="head-search">
        <van-icon name="search" />
      </div>
    </van-nav-bar>
    <nuxt />
    <van-tabbar route :safe-area-inset-bottom="true">
      <van-tabbar-item
        v-for="item in tabbar"
        :key="item.name"
        :to="item.to"
        :icon="$route.path === item.to ? item.selectedIcon : item.icon"
        :z-index="1000"
        >{{ item.label }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      tabbar: [
        {
          name: 'index',
          icon: 'wap-home-o',
          selectedIcon: 'wap-home',
          to: '/',
          label: '首页'
        },
        {
          name: 'list',
          icon: 'todo-list-o',
          selectedIcon: 'todo-list',
          to: '/list',
          label: '列表'
        },
        {
          name: 'search',
          icon: 'question-o',
          selectedIcon: 'question',
          to: '/search',
          label: '搜索'
        },
        {
          name: 'about',
          icon: 'friends-o',
          selectedIcon: 'friends',
          to: '/about',
          label: '关于'
        }
      ]
    }
  },
  computed: {
    active() {
      let active = 0
      for (let index = 0, len = this.tabbar.length; index < len; index++) {
        const element = this.tabbar[index]
        if (element.name === this.$route.name) {
          active = index
          break
        }
      }
      return active
    },
    isHome() {
      return !this.active
    },
    title() {
      return `${this.tabbar[this.active].label}--${process.env.VUE_APP_title}`
    }
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        let flag = false
        for (
          let index = 0, length = this.tabbar.length;
          index < length;
          index++
        ) {
          const element = this.tabbar[index]
          if (element.name === 'detail-id') {
            flag = true
            break
          }
        }
        if (!flag && val.name === 'detail-id') {
          this.tabbar.push({
            name: 'detail-id',
            icon: 'label-o',
            selectedIcon: 'label',
            to: val.path,
            label: '详情'
          })
        } else if (flag && val.name !== 'detail-id') {
          this.tabbar.splice(4, 1)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    clickNavLeft() {
      if (!this.isHome) {
        this.$router.go(-1)
      }
    },
    clickNavRight() {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
.head-line-height {
  height: 46px;
  line-height: 46px;
}
.logo {
  width: 26px;
  height: 26px;
}
.head-search {
  padding: 0 10px;
  font-size: 18px;
}
</style>
