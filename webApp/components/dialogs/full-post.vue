<template>
  <v-dialog v-model="showDialog">
    <v-card v-if="post" height="90vh">
      <v-layout column fill-height>
        <v-flex>
      <v-card-media
        class="white--text"
        height="250px"
        :src="post.imgUrl"
      >
        <v-container fill-height fluid>
          <v-layout>
            <v-flex xs12 align-end d-flex>
              <span :class="`display-1 ${post.imgUrl === undefined ? ' black--text' : ''}`">{{ post.title }}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
        </v-flex>

        <v-divider></v-divider>
        <v-flex xs12>

        <v-card-text>
          {{post.content}}
      </v-card-text>
        </v-flex>
      <v-flex>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" flat @click.stop="close">Close</v-btn>
      </v-card-actions>
      </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'full-post',
    props: ['value', 'post'],
    computed: {
      showDialog: {
        get () {
          return this.value
        },
        set (value) {
          if (!value) {
            this.$emit('input')
          }
          return value
        }
      }
    },
    methods: {
      close: function () {
        this.showDialog = false
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>