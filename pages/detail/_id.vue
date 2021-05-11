<template>
  <div class="content">
    <div id="top"></div>
    <van-cell
      title="上篇"
      :value="prevInfo.articleTitle"
      :is-link="true"
      :to="`/detail/${prevInfo.articleId}`"
      class="custome-cell"
    />
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
        <client-only>
          <van-button plain type="info" size="small" @click="addStar"
            >star: {{ info.articleStart }}</van-button
          >
        </client-only>
      </div>
      <div class="toc-btn flex" @click="tocShow = !tocShow">
        <van-icon :name="`${tocShow ? 'arrow' : 'arrow-left'}`" />
        <span>目录</span>
      </div>
      <div
        :class="{ 'no-toc': !tocShow }"
        class="detail-article markdown-body"
        v-html="handleDetail"
      ></div>
    </div>
    <van-cell
      title="下篇"
      :value="nextInfo.articleTitle"
      :is-link="true"
      :to="`/detail/${nextInfo.articleId}`"
      class="custome-cell"
    />
    <a :href="toTopUrl" class="to-top">
      <van-icon name="upgrade" />
    </a>
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
      tocShow: false,
      clipboard: ''
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
    },
    handleDetail() {
      let res = this.info.articleContentHtml
      const aReg = /<a.*?href="(.*?)">(.*?)<\/a>/gi
      let regArray
      const aArray = []
      while ((regArray = aReg.exec(res)) !== null) {
        aArray.push(regArray)
      }
      for (let index = 0, length = aArray.length; index < length; index++) {
        const element = aArray[index]
        if (element && element.length === 3) {
          if (element[1].indexOf('http') === 0) {
            const svg =
              '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>'
            const html = `<a href="${element[1]}" target="_blank">${element[2]}${svg}</a>`
            res = res.replace(element[0], html)
          } else {
            const html = `<a href="${process.env.VUE_APP_router_base}${
              this.$route.path
            }#${decodeURI(element[1].slice(1))}">${element[2]}</a>`
            res = res.replace(element[0], html)
          }
        }
      }
      return res
    },
    toTopUrl() {
      return `${process.env.VUE_APP_router_base}${this.$route.path}#top`
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.clipboard = new this.Clipboard('.copy-btn')
      this.clipboard.on('success', (e) => {
        this.$toast.success('复制成功')
      })
      this.clipboard.on('error', (e) => {
        this.$toast.fail('复制成功失败')
      })
    })
  },
  destroyed() {
    this.clipboard.destroy()
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
  },
  head() {
    return {
      title: `${this.info.articleTitle} | ${process.env.VUE_APP_title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: `${this.info.articleTitle} | ${process.env.VUE_APP_keywords}`
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.info.articleTitle} | ${process.env.VUE_APP_description}`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.custome-cell {
  /deep/ {
    .van-cell__title {
      flex: 0 0 40px;
      span {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .van-cell__value {
      flex: auto;
      span {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
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
    background-color: rgba(255, 255, 255, 0.8);
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
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: -40px 0 8px;
          padding: 45px 0 8px;
        }
        ol {
          list-style: decimal;
        }
        ul {
          list-style: disc;
        }
        .markdownIt-TOC {
          position: fixed;
          right: 15px;
          z-index: 20;
          padding-bottom: 10px;
          max-height: 50vh;
          overflow: auto;
          background-color: #fff;
          box-shadow: -2px 2px 4px #ccc;
          border-radius: 4px 0 0 4px;
          &.markdownIt-TOC::before {
            position: sticky;
            top: 0;
            display: block;
            padding-top: 10px;
            content: '文章目录：';
            font-weight: 700;
            color: currentColor;
            margin-left: -1.5em;
            line-height: 26px;
            background-color: #fff;
          }
        }
        pre {
          background: #1e1e1e !important;
        }
        pre.hljs {
          padding: 18px 2px 18px 40px !important;
          border-radius: 5px !important;
          position: relative;
          font-size: 14px !important;
          line-height: 22px !important;
          overflow: hidden !important;
          code {
            display: block !important;
            margin: 0 10px !important;
            overflow-x: auto !important;
          }
          .line-numbers-rows {
            position: absolute;
            pointer-events: none;
            top: 18px;
            bottom: 18px;
            left: 0;
            font-size: 100%;
            width: 40px;
            text-align: center;
            letter-spacing: -1px;
            border-right: 1px solid rgba(0, 0, 0, 0.66);
            user-select: none;
            counter-reset: linenumber;
            span {
              pointer-events: none;
              display: block;
              counter-increment: linenumber;
              &:before {
                content: counter(linenumber);
                color: #999;
                display: block;
                text-align: center;
              }
            }
          }
          b.name {
            position: absolute;
            top: 2px;
            right: 50px;
            z-index: 10;
            color: #999;
            pointer-events: none;
          }
          .copy-btn {
            position: absolute;
            padding: 0 4px;
            top: 2px;
            right: 4px;
            z-index: 10;
            color: #333;
            cursor: pointer;
            background-color: #fff;
            border: 0;
            border-radius: 2px;
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
.to-top {
  position: fixed;
  right: 15px;
  bottom: 65px;
  z-index: 1100;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #dedede;
  border-radius: 20px;
}
</style>
