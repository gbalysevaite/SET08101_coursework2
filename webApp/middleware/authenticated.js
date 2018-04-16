export default function ({ store, redirect }) {
  if (store.state.profile.username) {
    return redirect(`/r/${store.state.profile.username}`)
  }
}
