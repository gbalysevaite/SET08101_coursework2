<template>
    <v-carousel hide-delimiters :cycle="!selected">
        <v-carousel-item v-for="(image, i) in images"
                         :class="selected === image ? 'design-selected' : ''"
                         :interval="100"
                         :src="image.src"
                         :key="image.id"
                         @click.native="select(image)">
            <v-layout row fill-height>
                <div class="pa-3 subheading black--text">
                    {{i+1}}/2
                </div>
                <v-spacer></v-spacer>
                <div v-if="selected === image" class="pa-3">
                    <v-icon class="green--text">check_circle</v-icon>
                </div>
            </v-layout>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  import design1 from '~/assets/images/designs/1.jpg'
  import design2 from '~/assets/images/designs/2.jpg'
  export default {
    name: 'design-switch',
    props: ['value'],
    computed: {
      selected: {
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
    data () {
      return {
        images: [
          {src: design1, id: 'blog-1'},
          {src: design2, id: 'blog-2'}
        ]
      }
    },
    methods: {
      select: function (item) {
        this.selected = item
        this.$emit('input', this.selected)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .design-selected
    border: solid 3px #4caf50
</style>