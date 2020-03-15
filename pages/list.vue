<template>
  <div class="content">
    <van-cell
      title="文章排列顺序"
      class="spacing-margin"
      @click="actionShow = true"
    >
      <van-icon slot="right-icon" name="arrow" class="right-icon" />
    </van-cell>
    <van-action-sheet
      v-model="actionShow"
      :actions="actions"
      :close-on-click-action="true"
      cancel-text="取消"
      description="请选择文章排列顺序"
      @select="onSelect"
    />
    <listItem
      v-for="(item, index) in list"
      :key="item.articleId"
      :info="item"
      :class="{ 'van-hairline--top': index }"
    ></listItem>
    <van-pagination
      v-model="currentPage"
      :total-items="total"
      :items-per-page="queryData.limit"
      :show-page-size="3"
      force-ellipses
      style="margin: 15px 0;"
      @change="changePage"
    />
  </div>
</template>

<script>
import listMixins from '@/assets/js/listMixins'
import ListItem from '@/components/ListItem'

export default {
  name: 'List',
  components: {
    ListItem
  },
  mixins: [listMixins],
  data() {
    return {
      actionShow: false,
      actions: [{ name: '默认' }, { name: '按访问量' }, { name: '按点赞数' }]
    }
  },
  methods: {
    onSelect(item, index) {
      this.currentPage = 1
      this.$router.push({
        path: '/list',
        query: { ...this.$route.query, order: index, page: 1 }
      })
    },
    changePage() {
      this.$router.push({
        path: '/list',
        query: { ...this.$route.query, page: this.currentPage }
      })
    }
  },
  head() {
    return {
      title: `列表 | ${process.env.VUE_APP_title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: `列表 | ${process.env.VUE_APP_keywords}`
        },
        {
          hid: 'description',
          name: 'description',
          content: `列表 | ${process.env.VUE_APP_description}`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
