
export default async function({ store, redirect, app }) {
    if(!app.$auth.loggedIn) {
        console.log(app.$auth.loggedIn)
        return redirect('/')
    }
}
