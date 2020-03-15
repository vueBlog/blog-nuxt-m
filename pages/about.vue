<template>
  <div class="content">
    <div
      v-for="(item, index) in authorList"
      :key="item.authorId"
      :class="{ 'van-hairline--top': index > 0 }"
      class="item"
    >
      <van-cell
        :title="item.authorName"
        value="作者详情"
        :is-link="true"
        @click="activeAuthor = item.authorId"
      />
      <div v-if="activeAuthor === item.authorId" class="item-body">
        <div class="header-img">
          <img
            class="img"
            :src="
              item.authorHeadimg
                ? item.authorHeadimg
                : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
            :alt="item.authorName"
          />
        </div>
        <van-cell-group>
          <van-cell title="作者简介" :label="item.authorIntroduce" />
          <van-cell
            title="作者原创"
            :value="`${item.natureZero}篇`"
            :is-link="true"
            :to="`/list?author=${item.authorId}&justOriginal=true`"
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  async asyncData({ store }) {
    let authorList
    if (!store.state.authorList.length) {
      authorList = await store.dispatch('getAuthorList')
    } else {
      authorList = store.state.authorList
    }
    return {
      authorList
    }
  },
  data() {
    return {
      activeAuthor: 0
    }
  },
  created() {
    this.activeAuthor = this.$route.query.id
      ? this.$route.query.id * 1
      : this.authorList[0].authorId
  }
}
</script>

<style lang="scss" scoped>
.item-body {
  padding: 15px;
  background-color: #fff;
  .header-img {
    text-align: center;
    .img {
      width: 68px;
      height: 68px;
      border-radius: 34px;
      overflow: hidden;
    }
  }
}
</style>
