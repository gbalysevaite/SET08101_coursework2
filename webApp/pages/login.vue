<template>
  <v-content>
    <v-container class="login-container">
      <v-card>
        <v-card-title class="primary--text my-3 display-1 text-xs-center">Log in</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="Username" v-model="username" :counter="25" :rules="[rules.required]" required></v-text-field>
            <v-text-field label="Password" v-model="password" type="password" :rules="[rules.required]" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <span v-if="error !== undefined" class="ml-3 red--text lighten-3">{{error}}</span>
          <v-spacer></v-spacer>
          <v-btn outline large color="primary" @click="login">log in</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script ref="text/babel">
  export default {
    middleware: 'authenticated',
    data () {
      return {
        username: '',
        password: '',
        error: undefined,
        rules: {
          required: (value) => !!value || 'Required.'
        }
      }
    },
    methods: {
      login () {
        if (this.$refs.form.validate()) {
          this.$axios.$post('/login', {
            username: this.username,
            password: this.password
          }).then(
            (response) => {
              const profile = response
              this.$store.commit('setProfile', profile)
              this.$router.push({ path: `/r/${profile.username}` })
            },
            ({response}) => {
              this.setError(response.data.message)
            }
          )
        }
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

<style lang="stylus" scoped>
  .login-container
    max-width 90%
</style>
