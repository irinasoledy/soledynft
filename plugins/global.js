export default ({ store, app }, inject) => {
    inject('banner', (key, isMobile = false) => {
        const banners = store.state.banners

        const banner = banners.find(banner => banner.key === key)

        if (!banner) {
            return '/logo-docrom4.png'
        }

        if (!isMobile) {
            return `${process.env.API}/images/banners/${banner.desktop_src}`
        }else{
            return `${process.env.API}/images/banners/${banner.mobile_src}`
        }
    })
}
