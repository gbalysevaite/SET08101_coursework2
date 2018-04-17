<template>
  <v-app light>
    <v-content>
      <v-container row>
        <v-flex xs12>
          <v-layout class="profile" row align-center>
            <v-flex xs6 sm8 md9></v-flex>
            <v-flex xs5 sm3 md2>
              <div class="text-xs-center">
                <h1 class="black--text mb-3 display-3 text-xs-center">{{profile.title}}</h1>
                <v-avatar size="125px">
                  <img
                    class="img-circle elevation-7 mb-1"
                    src="~/assets/images/avatar.png"
                  >
                </v-avatar>
                <div class="headline">{{profile.username}}</div>
                <div class="subheading text-xs-center grey--text pt-1 pb-3">{{profile.about}}</div>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-layout row align-center class="content-base">
          <v-flex xs7 sm9 md10 column class="pl-3">
            <v-flex v-if="posts.length === 0" class="display-1 text-xs-center">
              There are no posts.
            </v-flex>
            <div v-if="posts.length > 0" v-for="post in posts" :key="post.title">
              <v-card class="my-3" ref="card" hover @click.native="$event => showPost($event, post)">
                <v-card-media
                  class="white--text"
                  height="170px"
                  :src="post.imgUrl"
                >
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex>
                        <span :class="`headline ${post.imgUrl === undefined ? ' black--text' : ''}`">{{ post.title }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-divider></v-divider>
                <v-card-text>
                  {{post.content ? post.content.substring(0, lengthOrLimit(post.content)) : ''}}{{(post.content && post.content.length && post.content.length > 200) ? '...' : ''}}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent" flat @click.stop="showEditPost = true">Edit</v-btn>
                  <v-btn color="accent" flat @click.stop="showDeletePost = true">Delete</v-btn>
                </v-card-actions>
                <edit-post v-model="showEditPost" :post="post" @on-edit="edited => $emit('on-edit-post', edited)"></edit-post>
                <delete-post v-model="showDeletePost" @on-delete="$emit('on-delete-post', post)"></delete-post>
                <full-post v-model="showFullPost" :post="post" @on-close="closePost"></full-post>
              </v-card>
            </div>
          </v-flex>
          <v-flex xs5 sm3 md2 offset-xs1></v-flex>
        </v-layout>
        <add-post v-model="showAddPost" @on-save="post => $emit('on-save-post', post)"></add-post>
        <edit-profile v-model="showEditProfile" :profile="profile" @on-edit="prof => $emit('on-edit-profile', prof)"></edit-profile>
        <v-speed-dial v-model="actionButton"
                      fixed bottom right direction="top"
                      open-on-hover
                      transition="slide-y-reverse-transition">
          <v-btn slot="activator" color="accent" dark fab hover v-model="actionButton">
            <v-icon>account_circle</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn class="accent" fab dark small @click="showAddPost = true">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn @click="showEditProfile = true" class="accent" fab dark small>
            <v-icon>account_circle</v-icon>
          </v-btn>
          <v-btn @click="$emit('on-logout')" class="accent" fab dark small>
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-container>
    </v-content>
    <v-footer>
      <v-layout row wrap align-center>
        <v-spacer></v-spacer>
        <span class="black--text">&copy; 2018</span>
        <v-spacer></v-spacer>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script ref="text/babel">
  import AddPost from '~/components/dialogs/add-post'
  import FullPost from '~/components/dialogs/full-post'
  import EditPost from '~/components/dialogs/edit-post'
  import DeletePost from '~/components/dialogs/delete-post'
  import EditProfile from './dialogs/edit-profile'
  export default {
    name: 'blog-1',
    components: {EditProfile, EditPost, FullPost, AddPost, DeletePost},
    props: ['posts', 'profile'],
    data () {
      return {
        showAddPost: false,
        showFullPost: false,
        showEditPost: false,
        showDeletePost: false,
        showEditProfile: false,
        selected: undefined,
        actionButton: false
      }
    },
    methods: {
      lengthOrLimit (str) {
        if (!str) return 600
        return str.length > 600 ? 600 : str.length
      },
      showPost (event, post) {
        this.selected = post
        this.showFullPost = true
      },
      closePost () {
        this.showFullPost = false
        this.selected = undefined
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .content-base
    width: 100%
    min-height: calc(100vh - 72px)

  .profile
    position: fixed
    @extends .content-base
</style>
