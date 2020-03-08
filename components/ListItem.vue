<template>
  <router-link :to="`/detail/${info.articleId}`" class="list-item">
    <h2 class="item-title theme-color van-ellipsis">{{ info.articleTitle }}</h2>
    <div class="item-desc van-multi-ellipsis--l3">
      {{ info.articleSubTitle }}
    </div>
    <div class="item-foot flex">
      <div>{{ time }}</div>
      <div class="left-line van-hairline--left">
        views: <span class="theme-color">{{ info.articleView }}</span>
      </div>
      <div class="left-line van-hairline--left">
        stars: <span class="theme-color">{{ info.articleStart }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'ListItem',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    time() {
      return dayjs(this.info.articleCreateTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  display: block;
  padding: 15px;
  color: #333;
  background-color: #fff;
  .item-title {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
  .item-desc {
    margin: 5px 0;
    font-size: 14px;
    line-height: 20px;
  }
  .item-foot {
    font-size: 14px;
    .left-line {
      margin-left: 14px;
      padding-left: 14px;
    }
  }
}
</style>
