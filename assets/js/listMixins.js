export default {
  data() {
    return {
      toastLoading: '',
      currentPage: 1
    }
  },
  async asyncData({
    app,
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    let getParams = {
      limit: 10,
      page: 1,
      justOriginal: false,
      order: 0,
      columnId: '',
      dateTime: '',
      author: ''
    }
    getParams = {
      ...getParams,
      ...query
    }
    const result = await app.$axios.$get('/api/vue-blog/articleList', {
      params: {
        ...getParams
      }
    })
    return {
      queryData: getParams,
      ...result.data
    }
  },
  created() {
    this.currentPage = this.$route.query.page
  },
  methods: {
    async getListResult(query) {
      this.toastLoading = this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const result = await this.$axios.$get('/api/vue-blog/articleList', {
          params: {
            ...query
          }
        })
        if (result.isok) {
          this.list = result.data.list
          this.total = result.data.total
        }
      } catch (error) {
        this.$toast.fail('获取信息失败')
      }
      this.toastLoading.clear()
    }
  },
  watch: {
    '$route.query': {
      handler(val, oldVal) {
        this.queryData = {
          ...this.queryData,
          ...val
        }
        this.$nextTick(() => {
          this.getListResult(this.queryData)
        })
      },
      deep: true
    }
  }
}
