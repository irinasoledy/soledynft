export default function({ store, redirect }) {
    if (!Object.keys(store.state.admin.authUser).length) {
        redirect('/crm/?message=noUser')
    }
}
