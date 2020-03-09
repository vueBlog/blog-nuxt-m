<template>
  <div class="content">
    <div class="detail-box">
      <h2 class="detail-title van-ellipsis">
        <van-tag type="primary" class="tag">{{ articleType }}</van-tag
        >{{ info.articleTitle }}
      </h2>
      <div class="flex row">
        <span>{{ time }}</span>
        <nuxt-link class="theme-color" :to="`/about/${authorInfo.authorId}`">
          {{ authorInfo.authorName }}
        </nuxt-link>
      </div>
      <div class="flex row">
        <span>views: {{ info.articleView }}</span>
        <van-button plain type="info" size="small" @click="addStar"
          >star: {{ info.articleStart }}</van-button
        >
      </div>
      <div class="toc-btn flex" @click="tocShow = !tocShow">
        <van-icon v-if="!tocShow" name="arrow-left" />
        <van-icon v-else name="arrow" />
        <span>目录</span>
      </div>
      <div
        :class="{ 'no-toc': !tocShow }"
        class="detail-article markdown-body"
        v-html="info.articleContentHtml"
      ></div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'highlight.js/scss/default.scss'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs2015.css'

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
      ...detailInfo
    }
  },
  data() {
    return {
      tocShow: false
    }
  },
  computed: {
    articleType() {
      let result
      switch (this.info.articleNature) {
        case 0:
          result = '原创'
          break
        case 1:
          result = '转载'
          break
        case 2:
          result = '翻译'
          break
        default:
          result = '原创'
          break
      }
      return result
    },
    time() {
      return dayjs(this.info.articleUpdateTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    async addStar() {
      const result = await this.$axios.$post('/api/vue-blog/addStar', {
        articleId: this.$route.params.id * 1
      })
      if (result.isok) {
        this.$toast.success('Add star success')
        this.info.articleStart = result.data.articleStart
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-box {
  margin: 15px 0;
  padding: 0 15px;
  background-color: #fff;
  .detail-title {
    padding: 15px 0 10px;
    font-size: 18px;
    .tag {
      margin-right: 3px;
      vertical-align: top;
      margin-top: 5px;
    }
  }
  .row {
    justify-content: space-between;
    font-size: 16px;
    line-height: 30px;
  }
  .toc-btn {
    position: fixed;
    top: 68%;
    right: 0;
    z-index: 1000;
    height: 30px;
    font-size: 14px;
    padding: 0 8px;
    background-color: #fff;
    border: 1px solid #dedede;
    border-right: 0;
    border-radius: 15px 0 0 15px;
  }
  .detail-article {
    position: relative;
    padding: 0 0 15px;
    font-size: 16px;
    &.markdown-body {
      /deep/ {
        ol {
          list-style: decimal;
        }
        ul {
          list-style: disc;
        }
        .markdownIt-TOC {
          position: fixed;
          right: 15px;
          z-index: 10;
          background-color: #fff;
          box-shadow: -2px 2px 4px #ccc;
          &.markdownIt-TOC::before {
            content: '文章目录：';
            font-weight: 700;
            color: currentColor;
            margin-left: -1.5em;
            line-height: 26px;
          }
        }
        pre {
          background: #1e1e1e !important;
        }
        pre.hljs {
          padding: 14px 2px;
          border-radius: 5px;
          position: relative;
          ol {
            list-style: decimal;
            margin: 0;
            margin-left: 40px;
            padding: 0;
            li {
              list-style: decimal-leading-zero;
              position: relative;
              padding-left: 10px;
              .line-num {
                position: absolute;
                left: -40px;
                top: 0;
                width: 40px;
                height: 100%;
                border-right: 1px solid rgba(0, 0, 0, 0.66);
              }
            }
          }
          b.name {
            position: absolute;
            top: 2px;
            right: 12px;
            z-index: 10;
            color: #999;
            pointer-events: none;
          }
        }
      }
      &.no-toc {
        /deep/ {
          .markdownIt-TOC {
            display: none;
          }
        }
      }
    }
  }
}
</style>
