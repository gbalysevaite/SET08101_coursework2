<template>
  <component :posts="posts"
             :profile="profile"
             :is="$store.state.profile.designType"
             @on-save-post="savePost"
             @on-edit-post="editPost"
             @on-delete-post="deletePost"
             @on-edit-profile="editProfile"
             @on-logout="logout"></component>
</template>

<script>
  import Blog1 from '~/components/blog-1'
  import Blog2 from '~/components/blog-2'
  import Blog3 from '~/components/blog-3'

  export default {
    layout: 'plain',
    middleware: 'non-authenticated',
    components: {
      Blog1,
      Blog2,
      Blog3
    },
    asyncData ({ app, params, store, error }) {
      return app.$axios.$get(`/posts/${params.username}`).then((response) => {
        return {
          posts: response.posts,
          profile: {...store.state.profile}
        }
      })
    },
    mounted () {
    },
    methods: {
      updatePosts: function () {
        this.$axios.$get(`/posts/${this.profile.username}`).then((response) => {
          this.posts = response.posts
        })
      },
      updateProfile: function () {
        this.$axios.$get(`/profiles/${this.profile.username}`).then(
          (response) => {
            this.$store.commit('setProfile', response)
            this.profile = {...this.$store.state.profile}
          },
          () => {})
      },
      savePost: function (post) {
        this.$axios.$post(`/posts/${this.profile.username}`, post).then((response) => {
          this.updatePosts()
        })
      },
      logout: function () {
        this.$axios.$post('/logout').then((response) => {
          this.$store.commit('clearProfile')
          this.$router.push({path: '/'})
        })
      },
      editPost (post) {
        this.$axios.$put(`/posts/${this.profile.username}`, post).then((response) => {
          this.updatePosts()
        })
      },
      deletePost (post) {
        this.$axios.$delete(`/posts/${this.profile.username}`, {params: {post: post}}).then((response) => {
          this.updatePosts()
        })
      },
      editProfile (profile) {
        this.$axios.$put(`/profiles/${this.profile.username}`, profile).then((response) => {
          this.updateProfile()
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>