<template>
    <div class="name-card">
        <v-card :color="color" ref="card" :dark="dark" :img="cardBgImage">
            <v-card-media v-if="showTopNav">
                <v-layout row justify-space-between class="ma-0">
                    <v-flex xs2>
                        <v-icon color="pink">mdi-heart</v-icon>
                    </v-flex>
                    <v-flex xs2 class="text-sm-right">
                        <v-icon>mdi-more-vert</v-icon>
                    </v-flex>
                </v-layout>
            </v-card-media>
            <v-card-text>
                <div class="layout ma-0 align-center" :class="computeCardLayout">
                    <v-avatar :size="computeAvatarSize" color="primary">
                        <img v-bind:src="`/avatars/${avatar}`" v-bind:alt="name" v-if="showAvatar">
                        <span v-else class="white--text headline">{{ name.charAt(0) }}</span>
                    </v-avatar>
                    <div class="flex" :class="computeTextAlgin">
                        <div class="subheading">{{name}}</div>
                        <span class="caption">{{jobTitle}}</span>
                    </div>
                </div>
            </v-card-text>
        </v-card>
        <v-bottom-nav :value="true" color="transparent" :height="64" v-if="showBottomNav">
            <v-btn flat color="teal" value="recent">
                <span>Recent</span>
                <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn flat color="teal" value="favorites">
                <span>Favorites</span>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn flat color="teal" value="nearby">
                <span>Nearby</span>
                <v-icon>mdi-place</v-icon>
            </v-btn>
        </v-bottom-nav>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: null
        },
        jobTitle: {
            type: String,
            default: 'employee'
        },
        cardBgImage: {
            type: String,
        },
        color: {
            type: String,
            default: ''
        },
        dark: {
            type: Boolean,
            default: false
        },
        bottomNav: {
            type: Boolean,
            default: false
        },
        topNav: {
            type: Boolean,
            default: false
        },
        mini: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computeCardLayout () {
            return (this.mini) ? 'row' : 'column';
        },
        computeTextAlgin () {
            return (this.mini) ? 'text-sm-right' : 'text-sm-center';
        },
        computeAvatarSize () {
            return (this.mini) ? '48' : '96';
        },
        showAvatar () {
            return this.avatar !== null && this.avatar;
        },
        showBottomNav () {
            return (this.mini === false && this.bottomNav);
        },
        showTopNav () {
            return (this.mini === false && this.topNav);
        }
    }
}
</script>

<style lang="scss" scoped>
    .caption, .subheading {
        font-weight:200;
    }
</style>

: {
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
.footer-social-link {
    display: inline-block !important;

}
</style>
