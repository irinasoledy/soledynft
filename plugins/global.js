export default ({ store, app }, inject) => {
    inject('banner', (key) => {
        const banners = store.state.banners

        const banner = banners.find(banner => banner.key === key)

        if (!banner) {
            return '/logo-docrom4.png'
        }

        return `${process.env.API}/images/banners/${banner.desktop_src}`
    })
}
