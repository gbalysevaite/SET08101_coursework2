<template>
  <v-content>
    <v-container class="registration-container">
    <v-card>
      <v-card-title class="primary--text my-3 display-1 text-xs-center">Registration</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field label="Username" v-model="profile.username" :counter="25" :rules="[rules.required]" required></v-text-field>
          <v-text-field type="password" label="Password" v-model="profile.password" :rules="[rules.required]" required></v-text-field>
          <v-text-field label="Blog title" v-model="profile.title" :rules="[rules.required]" required></v-text-field>
          <v-text-field textarea label="About" :counter="200" v-model="profile.about"></v-text-field>
          <div class="mt-1 mb-3 headline">Select Design:</div>
          <design-switch v-model="profileEdit.designType"></design-switch>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <span v-if="error !== undefined" class="ml-3 red--text lighten-3">{{error}}</span>
        <v-spacer></v-spacer>
        <v-btn outline large color="primary" @click="reg">Register</v-btn>
      </v-card-actions>
    </v-card>
    </v-container>
  </v-content>
</template>

<script ref="text/babel">
  import DesignSwitch from '~/components/design-switch'

  export default {
    middleware: 'authenticated',
    components: {DesignSwitch},
    data () {
      return {
        profile: {
          username: '',
          password: '',
          about: '',
          title: ''
        },
        error: undefined,
        rules: {
          required: (value) => !!value || 'Required.'
        }
      }
    },
    methods: {
      reg: function () {
        // if (this.$refs.form.validate()) {
        if (this.profile.designType !== undefined) {
          this.$axios.$post('/register', this.profile).then(
            (profile) => {
              this.$store.commit('setProfile', profile)
              this.$router.push({ path: `/r/${profile.username}` })
            }
          ).catch(({response}) => {
            console.log(response)
            this.setError(response.data.message)
          })
        } else {
          this.error = 'Design must be selected!'
        }
        // }
      },
      selectDesign: function (item) {
        this.profile.designType = item
        this.clearError()
      },
      clearError: function () {
        this.setError(undefined)
      },
      setError: function (error) {
        this.error = error
      }
    }
  }
</script>

<style lang="stylus">
  .registration-container
    max-width 90%
</style>
