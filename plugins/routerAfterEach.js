export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    app.$axios.$post('/api/vue-blog/views/add', {
      from: from.fullPath,
      to: to.fullPath,
      client: 2
    })
    console.log(process.env.VUE_APP_router_base)
  })
}
