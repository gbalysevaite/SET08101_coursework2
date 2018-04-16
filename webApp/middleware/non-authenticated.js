export default function ({ store, redirect }) {
  if (store.state.profile.username === undefined) {
    return redirect('/login')
  }
}
