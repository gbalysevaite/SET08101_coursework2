<template>
  <v-app dark>
    <v-toolbar app>
      <v-spacer></v-spacer>
      <v-btn large outline nuxt to="/register" class="primary primary--text">Register</v-btn>
      <v-btn large outline nuxt to="/login" class="primary primary--text">Log in</v-btn>
    </v-toolbar>
    <nuxt/>
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
</script>
