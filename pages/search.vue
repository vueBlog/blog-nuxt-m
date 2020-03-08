<template>
  <div class="content">
    <form action="/">
      <van-search
        v-model="search"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </form>
    <div class="list-box">
      <div v-for="(value, name) in searchObj" :key="name" class="item">
        <h2 class="item-title">{{ getTitle(name) }}</h2>
        <van-cell-group>
          <van-cell
            v-for="item in value"
            :key="item.articleId"
            :title="item.articleTitle"
            is-link
            :to="getTo(item)"
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: '',
      toastLoading: '',
      searchList: []
    }
  },
  computed: {
    searchObj() {
      const res = {}
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
      this.searchList.map((item) => {
        if (res[arr[item.type]] && res[arr[item.type]].length) {
          res[arr[item.type]].push(item)
        } else {
          res[arr[item.type]] = [item]
        }
      })
      return res
    }
  },
  methods: {
    getTitle(name) {
      const list = [
        '文章标题',
        '一级标题',
        '二级标题',
        '三级标题',
        '四级标题',
        '五级标题',
        '六级标题',
        '关键词'
      ]
      const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
      return list[arr.indexOf(name)]
    },
    async onSearch(val) {
      this.toastLoading = this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const result = await this.$axios.$post('/api/vue-blog/search', {
          queryString: val
        })
        if (result.isok) {
          this.searchList = result.data.searchList
        }
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
      this.toastLoading.clear()
    },
    getTo(obj) {
      let res
      if ([0, 7].includes(obj.type)) {
        res = `/detail/${obj.articleId}`
      } else {
        res = `/detail/${obj.articleId}#${obj['h' + obj.type]}`
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.list-box {
  margin: 0 0 15px 0;
  .item {
    .item-title {
      margin: 0;
      padding: 32px 16px 16px;
      color: rgba(69, 90, 100, 0.6);
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
    }
    &:nth-child(1) {
      .item-title {
        padding-top: 16px;
      }
    }
  }
}
</style>
