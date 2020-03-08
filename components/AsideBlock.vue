<template>
  <div class="aside-block">
    <h2 class="block-title van-hairline--bottom">{{ info.title }}</h2>
    <ol class="block-list">
      <li
        v-for="(item, index) in info.info"
        :key="item.id"
        :class="{ 'van-hairline--top': index }"
      >
        <nuxt-link :to="lintTo(item)" class="list-item clearfix">
          <span class="item-num fr">{{ item.num }} {{ unit }}</span>
          <span class="item-title van-ellipsis">{{ item.title }}</span>
        </nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'AsideBlock',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    unit() {
      let res
      if ([2, 4].includes(this.info.type)) {
        res = '篇'
      } else {
        res = 'views'
      }
      return res
    }
  },
  methods: {
    lintTo(item) {
      let res
      if (this.info.type === 2) {
        res = `/list?columnId=${item.id}`
      } else if (this.info.type === 4) {
        res = `/list?dateTime=${item.id}`
      } else {
        res = `/detail/${item.id}`
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-block {
  margin: 15px 0;
  padding: 0 15px;
  background-color: #fff;
  .block-title {
    font-size: 16px;
    line-height: 40px;
  }
  .block-list {
    list-style: decimal;
    padding: 0 0 0 18px;
    margin: 0;
    font-size: 16px;
    line-height: 38px;
    .list-item {
      color: #333;
      .item-title {
        display: block;
      }
      .item-num {
        margin-left: 5px;
      }
    }
  }
}
</style>
