<template>
  <v-dialog v-model="showDialog" max-width="700px">
    <v-card>
      <v-card-title>
        <span class="headline">Delete a Post</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        Are you sure?
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" flat @click.stop="close">Close</v-btn>
        <v-btn color="accent" flat @click.stop="save">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'delete-post',
    props: ['value'],
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
      },
      save: function () {
        this.$emit('on-delete')
        this.close()
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>