import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  profile: {
    username: undefined,
    designType: undefined,
    about: undefined,
    title: undefined
  }
})

export const mutations = {
  setProfile: function (state, profile) {
    state.profile = profile
  },
  clearProfile: function (state) {
    state.profile = {
      username: undefined,
      designType: undefined,
      about: undefined,
      title: undefined
    }
  }
}

export const actions = {
  nuxtServerInit ({ commit, app, store }, { req }) {
    if (req.session && req.session.profile) {
      app.$axios.$get('/profiles', { params: { username: req.session.profile.username } }).then((response) => {
        commit('setProfile', response)
      }).catch(() => {
        commit('setProfile', req.session.profile)
      })
    }
  }
}

export const plugins = [
  createPersistedState()
]
