import crmApi from '@/api/crmApi'
import axios from 'axios'

export default async function({ store, redirect, app }) {
    const cookieRes = app.$cookies.get('crm-token')
    if (cookieRes) {
        try {
            const response = await axios.get(`${process.env.DOMAIN}/auth/crm/get`, {
                headers: {
                    Authorization: 'Bearer ' + cookieRes
                }
            }).then(response => {
                store.dispatch('authCRM/setUser', response.data.user)
            })

            if (Object.keys(store.state.authCRM.user).length) {
                return redirect('/crm/dashboard')
            }
        } catch (e) {
            app.$cookies.remove('crm-token')
            store.dispatch('authCRM/reset')
            console.log(e);
        }
    }
}
