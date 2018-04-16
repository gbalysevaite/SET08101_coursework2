import Vue from 'vue'
import colors from 'vuetify/es5/util/colors'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  theme: {
    primary: colors.amber.base,
    secondary: colors.shades.white,
    accent: colors.indigo.base,
    error: colors.red.base
  }
})
