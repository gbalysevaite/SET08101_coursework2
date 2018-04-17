<template>
  <v-dialog v-model="showDialog" max-width="700px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit profile</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-text-field label="Title" class="accent--text" :counter="25" v-model="profileEdit.title" :rules="[rules.required]" required></v-text-field>
          <v-text-field label="About" class="accent--text" :counter="200" textarea v-model="profileEdit.about"></v-text-field>
          <design-switch v-model="profileEdit.designType"></design-switch>
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
  import DesignSwitch from '../design-switch'
  export default {
    name: 'edit-profile',
    components: {DesignSwitch},
    props: ['value', 'profile'],
    watch: {
      logo: function (val) {
        console.log(val)
      }
    },
    computed: {
      showDialog: {
        get () {
          return this.value
        },
        set (value) {
          if (!value) {
            this.$emit('input', value)
          }
          return value
        }
      },
      profileEdit: {
        get () {
          return this.profile
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
        },
        password: ''
      }
    },
    methods: {
      close: function () {
        this.showDialog = false
      },
      save: function () {
        if (this.$refs.form.validate()) {
          const data = {...this.profileEdit, password: this.password}
          this.$emit('on-edit', data)
          this.$refs.form.reset()
          this.close()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>