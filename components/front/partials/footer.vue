<template>
    <footer class="footer pt-15">
        <v-container>
            <v-row>
                <v-col class="col-12">
                    <nuxt-link to="/" class="footer__logo">
                        <v-img src="/images/logo.png" alt="logo" width="150" />
                    </nuxt-link>
                </v-col>
                <v-col class="col-12 footer__mobile">
                    <v-expansion-panels>
                        <v-row>
                            <v-col class="col-lg-4 col-12">
                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        {{ $trans('PagesNames', 'pageAboutAnne') }}
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <nuxt-link :to="`/${language.lang}/about`">
                                            {{ $trans('PagesNames', 'pageAbout') }}
                                        </nuxt-link>
                                        <nuxt-link :to="`/${language.lang}/contacts`">
                                            {{ $trans('PagesNames', 'pageNameContacts') }}
                                        </nuxt-link>
                                        <nuxt-link :to="`/${language.lang}/livrare-achitare-retur`">
                                            {{ $trans('PagesNames', 'pageAboutAnne') }}
                                        </nuxt-link>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-col>
                            <v-col class="col-lg-4 col-12">
                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        {{ $trans('PagesNames', 'ourProducts') }}:
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <nuxt-link to="#">
                                            Homewear Store
                                        </nuxt-link>
                                        <nuxt-link to="#">
                                            Bijoux Boutique
                                        </nuxt-link>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-col>
                            <v-col class="col-lg-4 col-12">
                                <v-expansion-panel elevation="0">
                                    <v-expansion-panel-header>
                                        {{ $trans('HeaderFooter', 'usefulInfo') }}:
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <nuxt-link :to="`/${language.lang}/${page.alias}`" v-for="(page, index) in pages" :key="index">
                                            {{ page.translation.name }}
                                        </nuxt-link>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-col>
                        </v-row>
                    </v-expansion-panels>
                </v-col>
                <v-col class="col-12 footer__desktop">
                    <v-row>
                        <v-col class="col-lg-4 col-12">
                            <div class="footer__subtitle">
                                {{ $trans('PagesNames', 'pageAboutAnne') }}
                            </div>
                            <div class="footer__list">
                                <nuxt-link :to="`/${language.lang}/about`">
                                    {{ $trans('PagesNames', 'pageAbout') }}
                                </nuxt-link>
                                <nuxt-link :to="`/${language.lang}/contacts`">
                                    {{ $trans('PagesNames', 'pageNameContacts') }}
                                </nuxt-link>
                                <nuxt-link :to="`/${language.lang}/livrare-achitare-retur`">
                                    {{ $trans('PagesNames', 'pageAboutAnne') }}
                                </nuxt-link>
                            </div>
                        </v-col>
                        <v-col class="col-lg-4 col-12">
                            <div class="footer__subtitle">
                                {{ $trans('PagesNames', 'ourProducts') }}:
                            </div>
                            <div class="footer__list">
                                <nuxt-link to="#">
                                    Homewear Store
                                </nuxt-link>
                                <nuxt-link to="#">
                                    Bijoux Boutique
                                </nuxt-link>
                            </div>
                        </v-col>
                        <v-col class="col-lg-4 col-12">
                            <div class="footer__subtitle">
                                {{ $trans('HeaderFooter', 'usefulInfo') }}:
                            </div>
                            <div class="footer__list">
                                <nuxt-link :to="`/${language.lang}/${page.alias}`" v-for="(page, index) in pages" :key="index">
                                    {{ page.translation.name }}
                                </nuxt-link>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="col-12">
                    <div class="footer__payments d-flex align-center justify-space-between">
                        <div class="footer__payments-img">
                            <v-img width="60" src="https://back.soledy.com/images/mc_symbol.svg" />
                        </div>
                        <div class="footer___payments-img">
                            <svg width="60" height="83px" viewBox="0 0 256 83" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                                <defs>
                                    <linearGradient x1="45.9741966%" y1="-2.00617467%" x2="54.8768726%" y2="100%" id="linearGradient-1">
                                        <stop stop-color="#222357" offset="0%"></stop>
                                        <stop stop-color="#254AA5" offset="100%"></stop>
                                    </linearGradient>
                                </defs>
                                <g>
                                    <path d="M132.397094,56.2397455 C132.251036,44.7242808 142.65954,38.2977599 150.500511,34.4772086 C158.556724,30.5567233 161.262627,28.0430004 161.231878,24.5376253 C161.17038,19.1719416 154.805357,16.804276 148.847757,16.7120293 C138.454628,16.5505975 132.412467,19.5178668 127.607952,21.7625368 L123.864273,4.24334875 C128.684163,2.02174043 137.609033,0.084559486 146.864453,-7.10542736e-15 C168.588553,-7.10542736e-15 182.802234,10.7236802 182.879107,27.3511501 C182.963666,48.4525854 153.69071,49.6210438 153.890577,59.05327 C153.959762,61.912918 156.688728,64.964747 162.669389,65.7411565 C165.628971,66.133205 173.800493,66.433007 183.0636,62.1665965 L186.699658,79.11693 C181.718335,80.931115 175.314876,82.6684285 167.343223,82.6684285 C146.895202,82.6684285 132.512402,71.798691 132.397094,56.2397455 M221.6381,81.2078555 C217.671491,81.2078555 214.327548,78.8940005 212.836226,75.342502 L181.802894,1.24533061 L203.511621,1.24533061 L207.831842,13.1835926 L234.360459,13.1835926 L236.866494,1.24533061 L256,1.24533061 L239.303345,81.2078555 L221.6381,81.2078555 M224.674554,59.6067505 L230.939643,29.5804456 L213.781755,29.5804456 L224.674554,59.6067505 M106.076031,81.2078555 L88.9642665,1.24533061 L109.650591,1.24533061 L126.754669,81.2078555 L106.076031,81.2078555 M75.473185,81.2078555 L53.941265,26.7822953 L45.2316377,73.059396 C44.2092367,78.2252115 40.1734431,81.2078555 35.6917903,81.2078555 L0.491982464,81.2078555 L0,78.886313 C7.22599245,77.318119 15.4359498,74.7890215 20.409585,72.083118 C23.4537265,70.4303645 24.322383,68.985166 25.3217224,65.0569935 L41.8185094,1.24533061 L63.68098,1.24533061 L97.1972855,81.2078555 L75.473185,81.2078555" fill="url(#linearGradient-1)" transform="translate(128.000000, 41.334214) scale(1, -1) translate(-128.000000, -41.334214) "></path>
                                </g>
                            </svg>
                        </div>
                        <div class="footer__payments-img">
                            <svg width="60" height="40" viewBox="0 0 355 293" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <title>Paypal</title>
                                <desc>Created with Sketch.</desc>
                                <g id="Paypal" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="paypal-(1)" fill-rule="nonzero">
                                        <path d="M238.6,197.2 L211.4,197.2 C209.8,197.2 208.2,198.8 207.4,200.4 L196.2,270.8 C196.2,272.4 197,273.2 198.6,273.2 L213,273.2 C214.6,273.2 215.4,272.4 215.4,270.8 L218.6,250.8 C218.6,249.2 220.2,247.6 222.6,247.6 L231.4,247.6 C249.8,247.6 260.2,238.8 262.6,221.2 C264.2,214 262.6,207.6 259.4,203.6 C254.6,199.6 247.4,197.2 238.6,197.2 M241.8,223.6 C240.2,233.2 233,233.2 225.8,233.2 L221,233.2 L224.2,214.8 C224.2,214 225,213.2 226.6,213.2 L228.2,213.2 C233,213.2 237.8,213.2 240.2,216.4 C241.8,217.2 241.8,219.6 241.8,223.6" id="Shape" fill="#139AD6"></path>
                                        <g id="Group" transform="translate(0.000000, 197.000000)" fill="#263B80">
                                            <path d="M42.6,0.2 L15.4,0.2 C13.8,0.2 12.2,1.8 11.4,3.4 L0.2,73.8 C0.2,75.4 1,76.2 2.6,76.2 L15.4,76.2 C17,76.2 18.6,74.6 19.4,73 L22.6,53.8 C22.6,52.2 24.2,50.6 26.6,50.6 L35.4,50.6 C53.8,50.6 64.2,41.8 66.6,24.2 C68.2,17 66.6,10.6 63.4,6.6 C58.6,2.6 52.2,0.2 42.6,0.2 M45.8,26.6 C44.2,36.2 37,36.2 29.8,36.2 L25.8,36.2 L29,17.8 C29,17 29.8,16.2 31.4,16.2 L33,16.2 C37.8,16.2 42.6,16.2 45,19.4 C45.8,20.2 46.6,22.6 45.8,26.6" id="Shape"></path>
                                            <path d="M125,25.8 L112.2,25.8 C111.4,25.8 109.8,26.6 109.8,27.4 L109,31.4 L108.2,29.8 C105,25.8 99.4,24.2 93,24.2 C78.6,24.2 65.8,35.4 63.4,50.6 C61.8,58.6 64.2,65.8 68.2,70.6 C72.2,75.4 77.8,77 85,77 C97,77 103.4,69.8 103.4,69.8 L102.6,73.8 C102.6,75.4 103.4,76.2 105,76.2 L117,76.2 C118.6,76.2 120.2,74.6 121,73 L128.2,28.2 C127.4,27.4 125.8,25.8 125,25.8 M106.6,51.4 C105,58.6 99.4,64.2 91.4,64.2 C87.4,64.2 84.2,62.6 82.6,61 C81,58.6 80.2,55.4 80.2,51.4 C81,44.2 87.4,38.6 94.6,38.6 C98.6,38.6 101,40.2 103.4,41.8 C105.8,44.2 106.6,48.2 106.6,51.4" id="Shape"></path>
                                        </g>
                                        <path d="M320.2,222.8 L307.4,222.8 C306.6,222.8 305,223.6 305,224.4 L304.2,228.4 L303.4,226.8 C300.2,222.8 294.6,221.2 288.2,221.2 C273.8,221.2 261,232.4 258.6,247.6 C257,255.6 259.4,262.8 263.4,267.6 C267.4,272.4 273,274 280.2,274 C292.2,274 298.6,266.8 298.6,266.8 L297.8,270.8 C297.8,272.4 298.6,273.2 300.2,273.2 L312.2,273.2 C313.8,273.2 315.4,271.6 316.2,270 L323.4,225.2 C322.6,224.4 321.8,222.8 320.2,222.8 M301.8,248.4 C300.2,255.6 294.6,261.2 286.6,261.2 C282.6,261.2 279.4,259.6 277.8,258 C276.2,255.6 275.4,252.4 275.4,248.4 C276.2,241.2 282.6,235.6 289.8,235.6 C293.8,235.6 296.2,237.2 298.6,238.8 C301.8,241.2 302.6,245.2 301.8,248.4" id="Shape" fill="#139AD6"></path>
                                        <path d="M194.6,222.8 L181,222.8 C179.4,222.8 178.6,223.6 177.8,224.4 L160.2,251.6 L152.2,226 C151.4,224.4 150.6,223.6 148.2,223.6 L135.4,223.6 C133.8,223.6 133,225.2 133,226.8 L147.4,269.2 L133.8,288.4 C133,290 133.8,292.4 135.4,292.4 L148.2,292.4 C149.8,292.4 150.6,291.6 151.4,290.8 L195.4,227.6 C197.8,225.2 196.2,222.8 194.6,222.8" id="Path" fill="#263B80"></path>
                                        <path d="M335.4,199.6 L324.2,271.6 C324.2,273.2 325,274 326.6,274 L337.8,274 C339.4,274 341,272.4 341.8,270.8 L353,200.4 C353,198.8 352.2,198 350.6,198 L337.8,198 C337,197.2 336.2,198 335.4,199.6" id="Path" fill="#139AD6"></path>
                                        <path d="M245.409846,14.8732394 C236.776386,4.95774648 220.742818,0 198.542492,0 L136.874922,0 C133.174867,0 129.474813,3.71830986 128.241462,7.43661972 L103.574433,169.802817 C103.574433,173.521127 106.041136,176 108.507839,176 L146.741733,176 L156.608544,115.267606 L156.608544,117.746479 C157.841896,114.028169 161.54195,110.309859 165.242004,110.309859 L183.742275,110.309859 C219.509466,110.309859 246.643198,95.4366197 255.276657,54.5352113 C255.276657,53.2957746 255.276657,52.056338 255.276657,50.8169014 C254.043306,50.8169014 254.043306,50.8169014 255.276657,50.8169014 C256.510009,34.7042254 254.043306,24.7887324 245.409846,14.8732394" id="Path" fill="#263B80"></path>
                                        <path d="M254.820615,50 L254.820615,50 C254.820615,51.2436975 254.820615,52.487395 254.820615,53.7310924 C246.168134,96.0168067 218.974623,109.697479 183.128631,109.697479 L164.587601,109.697479 C160.879395,109.697479 157.171189,113.428571 155.93512,117.159664 L143.574433,193.02521 C143.574433,195.512605 144.810502,198 148.518708,198 L180.656494,198 C184.3647,198 188.072906,195.512605 188.072906,191.781513 L188.072906,190.537815 L194.253249,151.983193 L194.253249,149.495798 C194.253249,145.764706 197.961455,143.277311 201.669661,143.277311 L206.613936,143.277311 C237.515653,143.277311 262.237027,130.840336 268.41737,93.5294118 C270.889507,78.605042 269.653439,64.9243697 262.237027,56.2184874 C261.000958,53.7310924 258.528821,51.2436975 254.820615,50" id="Path" fill="#139AD6"></path>
                                        <path d="M245.463322,46.7 C244.228754,46.7 242.994186,45.4666667 241.759619,45.4666667 C240.525051,45.4666667 239.290483,45.4666667 238.055915,44.2333333 C233.117643,43 228.179372,43 222.006532,43 L173.858384,43 C172.623816,43 171.389248,43 170.15468,44.2333333 C167.685544,45.4666667 166.450977,47.9333333 166.450977,50.4 L156.574433,114.533333 L156.574433,117 C157.809001,113.3 161.512705,109.6 165.216409,109.6 L183.734927,109.6 C219.537396,109.6 246.69789,94.8 255.339865,54.1 C255.339865,52.8666667 255.339865,51.6333333 256.574433,50.4 C254.105298,49.1666667 252.87073,47.9333333 250.401594,47.9333333 C246.69789,46.7 246.69789,46.7 245.463322,46.7" id="Path" fill="#232C65"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="footer__payments-img">
                            <v-img width="60" src="https://back.soledy.com/images/g2apay_acceptance_mark_trans_for_light_L.png" />
                        </div>
                        <div class="footer__payments-img">
                            <v-img src="https://back.soledy.com/images/pp.jpeg" />
                        </div>
                    </div>
                </v-col>
                <v-col class="col-12">
                    <p class="my-3">
                        {{ $trans('HeaderFooter', 'followUs') }}:
                        <v-icon color="title">mdi-instagram</v-icon>
                        <v-icon color="title">mdi-facebook</v-icon>
                    </p>
                </v-col>
                <v-col class="col-12">
                    <p class="my-3">
                        {{ $trans('HeaderFooter', 'concept') }}
                    </p>
                    <p class="ma-0 py-3">
                        {{ $trans('HeaderFooter', 'copyright') }}
                        <!-- ©2021 Copyright: Toate drepturile rezervate, Website by Like-Media -->
                    </p>
                </v-col>
            </v-row>
        </v-container>
    </footer>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-instagram',
        ],
        serviceArray: [],
    }),
    watch: {
        services() {
            this.serviceArray = []
            this.splitToChunks(this.services, 2)
        }
    },
    computed: mapGetters({
        pages : 'getPages',
        language: 'getLanguage',
        trans: 'getTranslations',
        services: 'getServices',
    }),
    mounted() {
        this.splitToChunks(this.services, 2)
    },
    methods: {
        splitToChunks(array, parts) {
            const services = []
            array.forEach(service => services.push(service))
            for (let i = parts; i > 0; i--) {
                this.serviceArray.push(services.splice(0, Math.ceil(services.length / i)))
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.footer {
	background: $bcg-header;
	.v-expansion-panel {
		box-shadow: none !important;
		background: $bcg-header !important;
		font-family: $font-roboto;
		&:before {
			box-shadow: none;
		}
	}
	.v-expansion-panel-header {
		font-size: 20px !important;
		color: $main-color;
		padding-left: 0;
		padding-right: 0;
	}
	.v-expansion-panel-content__wrap {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
	a {
		font-size: 18px;
		color: $main-color;
		display: block;
		line-height: 1.8;
		font-weight: 300;
		font-family: $font-roboto, sans-serif;
	}
	p {
		font-family: $font-roboto, sans-serif;
		font-size: 20px;
		color: $main-color;
		letter-spacing: 0;
		line-height: 1.5;
		margin-bottom: 10px;
		font-weight: 300;
	}
	&__desktop {
		display: none;
	}
}

@media (min-width: 1200px) {
	.footer {
		&__payments {
			max-width: 600px;
		}
		&__mobile {
			display: none;
		}
		&__desktop {
			display: block;
			margin-top: 30px;
		}
		&__subtitle {
			font-family: $font-roboto, sans-serif;
			font-size: 20px;
			color: $main-color;
			letter-spacing: 0;
			line-height: 20px;
			font-weight: 400;
			margin-bottom: 20px;
		}
		a {
			font-family: $font-roboto;
            text-transform: capitalize;
		}
	}
}
</style>
