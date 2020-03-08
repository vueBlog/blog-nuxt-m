<template>
  <div class="content">
    <div class="detail-box">
      <div
        class="detail-article markdown-body"
        v-html="detailInfo.info.articleContentHtml"
      ></div>
    </div>
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'

export default {
  name: 'Detail',
  async asyncData({ app, route, store, params, query }) {
    let detailInfo = {}
    const result = await app.$axios.$get('/api/vue-blog/article/detail', {
      params: {
        articleId: params.id,
        changeView: 1
      }
    })
    if (result.isok) {
      detailInfo = result.data
    }
    return {
      detailInfo
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.detail-box {
  margin: 15px 0;
  background-color: #fff;
  .detail-article {
    padding: 15px;
    &.markdown-body {
      /deep/ {
        ol {
          list-style: decimal;
        }
      }
    }
  }
}
</style>
