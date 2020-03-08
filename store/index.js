export const state = () => ({
  asideList: [] // 首页文章分类列表
})

export const mutations = {
  setAsideList(state, arr) {
    state.asideList = arr
  }
}

export const actions = {
  async getAsideList({ commit, state }) {
    const result = await this.$axios.$get('/api/vue-blog/aside')
    if (result.isok) {
      commit('setAsideList', result.data.list)
      return result.data.list
    }
  }
}
