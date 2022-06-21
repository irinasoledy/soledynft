export default ({store, app}, inject) => {

    inject('banner', (key, isMobile = false) => {
        const banners = store.state.banners

        if (banners) {
            const banner = banners.find(banner => banner.key === key)

            if (!banner) {
                return '/logo-docrom4.png'
            }

            if (!isMobile) {
                return `${process.env.API}/images/banners/${banner.desktop_src}`
            } else {
                return `${process.env.API}/images/banners/${banner.mobile_src}`
            }
        }
    })

    inject('trans', (keyGroup, transKey) => {
        const translations = store.state.translations

        if (translations) {
            if (translations.hasOwnProperty(keyGroup)) {
                const group = translations[keyGroup]

                if (group.hasOwnProperty(transKey)) {
                    return group[transKey]
                }
            }
        }

        return keyGroup + '.' + transKey
    })

    inject('parseDate', date => {
        date = new Date(date)
        let strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let mins = date.getMinutes();
        let h = date.getHours();
        let d = date.getDate();
        let m = strArray[date.getMonth()];
        let y = date.getFullYear();

        return h + ':' + mins + ' ' + (d <= 9 ? '0' + d : d) + '/' + m + '/' + y;
    })
}
