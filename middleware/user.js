
export default async function({ store, redirect, app }) {
    if(!app.$auth.loggedIn) {
    // if(10 !== 1) {
        return redirect('/')
    }
    // return redirect('/')

}
