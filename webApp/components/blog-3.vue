<template>
  <v-app>
    <v-navigation-drawer>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-flex xs12 md5 offset-md2>
      <div v-for="post in posts" :key="post.title">
        <v-card class="my-3" hover>
          <v-card-media
            class="white--text"
            height="170px"
            :src="post.imgUrl"
          >
            <v-container fill-height fluid>
              <v-layout>
                <v-flex xs12 align-end d-flex>
                  <span class="headline">{{ post.title }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-text>
            {{ post.content }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="blue--text">Read More</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-app>
</template>

<script ref="text/babel">
  export default {
    data () {
      return {
        posts: [
          {
            title: 'Fusce ullamcorper tellus',
            content: 'Fusce ullamcorper tellus sed maximus rutrum. Donec imperdiet ultrices maximus. Donec non tellus non neque pellentesque fermentum. Aenean in pellentesque urna.',
            imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/drop.jpg'
          },
          {
            title: 'Donec vitae suscipit lectus, a luctus diam.',
            content: 'Donec vitae suscipit lectus, a luctus diam. Proin vitae felis gravida, lobortis massa sit amet, efficitur erat. Morbi vel ultrices nisi.',
            imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg'
          },
          {
            title: 'Vestibulum condimentum quam',
            content: 'At sagittis sapien vulputate. Vivamus laoreet lacus id magna rutrum dapibus. Donec vel pellentesque arcu. Maecenas mollis odio tempus felis elementum commodo.',
            imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/plane.jpg'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus">

</style>
