export default async function({ store, redirect, app }) {
    const user = store.getters["near/getCurrentUser"]
    if(!user) {
        // console.log(store.getters["near/getCurrentUser"])
        return redirect('/')
    }
}
