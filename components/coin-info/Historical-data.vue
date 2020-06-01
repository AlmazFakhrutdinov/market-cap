<template>
  <div class="updates">
    <div class="updates-status-title">
      Status Updates
    </div>
    <div class="updates-status-list">
      <div
        v-for="item in statusUpdates"
        :key="item.id"
        class="updates-status-list__card"
      >
        <div class="updates-status-list__header">
          <img
            class="updates-status-list__img"
            :src="item.project.image.small"
            alt="coin-image"
          />
          <div class="updates-status-list__coin-name"></div>
        </div>
        <div class="updates-status-list__body">
          <div class="updates-status-list__user-title">
            {{ item.user_title }}
          </div>
          <div
            class="updates-status-list__description"
            v-html="searchAndPackagingOfLinks(item.description)"
          ></div>
          <div class="updates-status-list__created-at">
            {{ $moment(item.created_at).format('MMMM Do, h:mm:ss a, YYYY') }}
          </div>
        </div>
      </div>
    </div>
    <loading v-if="isLoading" :bottom="0" :top="0" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      siteNameRegExp: /(?<=\/|www.|[ ])[A-Za-z0-9-.]*(\.io|\.com|\.network|\.org|\.team|\.tv|\.ly)(?=\/)/g,
      // eslint-disable-next-line no-useless-escape
      siteUrlRegExp: /(?=https:|www])[https:\/\/A-Za-z0-9-.]*(\.io|\.com|\.network|\.org|\.team|\.tv|\.ly)[\w\.\/-@-&\.com]*/g,
      isLoading: false
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    ...mapState('coin_info', ['statusUpdates'])
  },
  methods: {
    ...mapActions('coin_info', ['fetchStatusUpdates']),
    async fetch() {
      this.isLoading = true
      await this.fetchStatusUpdates()
      this.isLoading = false
    },
    searchAndPackagingOfLinks(item) {
      const siteName = item.match(this.siteNameRegExp)
      const siteUrl = item.match(this.siteUrlRegExp)
      return item.replace(
        this.siteUrlRegExp,
        `<a style="color: #8dc647; text-decoration: none" href="${siteUrl}">${siteName}</a>`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.updates {
  position: relative;
  min-height: vh;
}

.updates-status-title {
  margin: 20px 0px 20px 20px;
}

.updates-status-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  &__card {
    border: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 3px;
    height: 220px;
    width: 45%;
    font-size: 14px;
  }
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__coin-name {
    margin-top: 10px;
  }
  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &__description {
    margin-left: 20px;
  }
  &__user-title {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  &__created-at {
    margin-top: auto;
    margin-left: auto;
  }
}
</style>
