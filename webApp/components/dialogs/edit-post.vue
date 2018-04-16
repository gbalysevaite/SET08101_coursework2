<template>
  <v-dialog v-model="showDialog" max-width="700px">
    <v-card>
      <v-card-title>
        <span class="headline">Create a new Post</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-text-field label="Title" class="accent--text" v-model="postEdit.title" :rules="[rules.required]" required></v-text-field>
          <v-text-field label="Post" class="accent--text" v-model="postEdit.content" :rules="[rules.required]" textarea required></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" flat @click.stop="close">Close</v-btn>
        <v-btn color="accent" flat @click.stop="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'edit-post',
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
      },
      postEdit: {
        get () {
          return this.post
        },
        set (value) {
          return value
        }
      }
    },
    data () {
      return {
        rules: {
          required: (value) => !!value || 'Required.'
        }
      }
    },
    methods: {
      close: function () {
        this.showDialog = false
      },
      save: function () {
        if (this.$refs.form.validate()) {
          this.$emit('on-edit', {...this.postEdit})
          this.$refs.form.reset()
          this.close()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>