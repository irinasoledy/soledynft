export default function({ store, redirect }) {
  if (!Object.keys(store.state.chat.user).length) {
    redirect('/?message=noUser')
  }
}
