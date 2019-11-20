<template>
    <div class="page-header">
        <div class="container-fluid">
            <nav class="navbar navbar-expand-md navbar-light">
                <div class="navbar-toggler order-1" @click="collapseShow=true">
                    <div class="navbar-toggler-icon">
                        <span class="toggler-line"></span>
                        <span class="toggler-line"></span>
                        <span class="toggler-line"></span>
                    </div>
                </div>

                <div class="order-2 flex-center ">
                    <i18n-link to="/" class="navbar-brand logo "/>
                    <autocomplete v-if="showHeaderSearch" :searchLiveList="searchHeaderItems"
                                  :selectedItem="chosenHeaderItem" @typed="search"
                                  @blur="blur" @selected="selectItem" @delete="deleteChosenItem"></autocomplete>
                </div>
                <div class="order-3 ml-md-auto">
                    <div class="collapse navbar-collapse" :class="{show: collapseShow}">
                        <ul class=" navbar-nav" @click="collapseShow=false">
                            <li class="nav-item d-md-none mb-2">
                                <div class="nav-link d-flex justify-content-between align-items-center">
                                    <img v-if="avatarUrl" :src="avatarUrl" class="avatar"/>
                                    <lx-svg-icon v-else icon="account" w="26" h="26"></lx-svg-icon>

                                    <div class="navbar-close" @click="collapseShow=false">
                                        <lx-svg-icon icon="cross" w="16" h="16"></lx-svg-icon>
                                    </div>
                                </div>
                            </li>

                            <template v-if="user.id">
                                <li class="nav-item d-md-none">
                                    <i18n-link class="nav-link font-weight-normal" to="/settings">
                                        Settings
                                    </i18n-link>
                                </li>
                                <li class="nav-item d-md-none">
                                    <i18n-link class="nav-link font-weight-normal" to="/my-bookings">
                                        My Bookings
                                    </i18n-link>
                                </li>
                                <li class="nav-item d-md-none">
                                    <i18n-link class="nav-link font-weight-normal" to="/wishlist">
                                        Wishlist
                                    </i18n-link>
                                </li>
                            </template>

                            <template v-else>
                                <li class="nav-item d-md-none">
                                    <i18n-link class="nav-link font-weight-normal" to="/auth/login">
                                        Sign In
                                    </i18n-link>
                                </li>
                                <li class="nav-item d-md-none">
                                    <i18n-link class="nav-link font-weight-normal" to="/auth/signup">
                                        Registration
                                    </i18n-link>
                                </li>
                            </template>

                            <div class="dropdown-divider d-md-none"></div>

                            <li class="nav-item d-md-none">
                                <i18n-link class="nav-link font-weight-normal" to="/t">
                                    Get Support
                                </i18n-link>
                            </li>
                            <li class="nav-item d-md-none">
                                <i18n-link class="nav-link font-weight-normal" to="#">
                                    Contact Us
                                </i18n-link>
                            </li>
                            <li class="nav-item d-md-none">
                                <i18n-link class="nav-link font-weight-normal" to="#">
                                    Help
                                </i18n-link>
                            </li>

                            <div class="dropdown-divider d-md-none"></div>
                            <li class="nav-item">
                                <a href="javascript:void(0);" class="nav-link" @click.stop="showPopUp()">
                                    Destinations
                                </a>
                            </li>
                            <li class="nav-item">
                                <i18n-link class="nav-link" to="#">
                                    Activities
                                </i18n-link>
                            </li>
                            <li class="nav-item">
                                <i18n-link class="nav-link" to="#">
                                    Transfers
                                </i18n-link>
                            </li>
                            <li class="nav-item">
                                <i18n-link class="nav-link" to="#">
                                    Deals
                                </i18n-link>
                            </li>

                            <div class="dropdown-divider d-md-none"></div>

                            <li class="nav-item d-md-none">
                                <div class="nav-link font-weight-normal" @click="logout">
                                    <lx-svg-icon icon="exit" w="26" h="26"></lx-svg-icon>
                                    <span class="ml-1">Log Out</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="nav navbar-nav navbar-icons order-4 ml-auto ml-md-0">
                    <div class="nav-item dropdown d-none d-md-block">
                        <a class="nav-link nav-link-icon" href="#">
                            <img v-if="avatarUrl" :src="avatarUrl" class="avatar"/>
                            <lx-svg-icon v-else icon="account" w="26" h="26"></lx-svg-icon>
                        </a>
                        <div class="dropdown_menu">
                            <template v-if="user.id">
                                <i18n-link to="/settings" class="dropdown-item">
                                    Settings
                                </i18n-link>
                                <i18n-link class="dropdown-item" to="/my-bookings">
                                    My Bookings
                                </i18n-link>
                                <i18n-link class="dropdown-item" to="/wishlist">
                                    Wishlist
                                </i18n-link>
                                <div class="dropdown-divider"></div>
                                <button class="dropdown-item" @click="logout">
                                    <lx-svg-icon icon="exit" w="26" h="26"></lx-svg-icon>
                                    <span class="ml-1">Log Out</span>
                                </button>
                            </template>
                            <template v-else>
                                <i18n-link to="/auth/login" class="dropdown-item">
                                    Sign In
                                </i18n-link>
                                <i18n-link to="/auth/signup" class="dropdown-item">
                                    Registration
                                </i18n-link>
                            </template>
                        </div>
                    </div>

                    <div class="nav-item dropdown d-none d-md-block">
                        <a class="nav-link nav-link-icon" href="#">
                            <lx-svg-icon icon="support" w="26" h="26"></lx-svg-icon>
                        </a>
                        <div class="dropdown_menu">
                            <i18n-link to="#" class="dropdown-item">
                                Get Support
                            </i18n-link>
                            <i18n-link to="#" class="dropdown-item">
                                Contact Us
                            </i18n-link>
                            <i18n-link to="#" class="dropdown-item">
                                Help
                            </i18n-link>
                        </div>
                    </div>

                    <!--<template v-if="user">-->
                    <!--<div class="nav-item">-->
                    <!--<i18n-link class="nav-link nav-link-icon" to="#">-->
                    <!--<lx-svg-icon icon="bell" w="26" h="26"></lx-svg-icon>-->
                    <!--<span class="badge navbar-badge badge-pill badge-info">2</span>-->
                    <!--</i18n-link>-->
                    <!--</div>-->
                    <!--<div class="nav-item">-->
                    <!--<i18n-link class="nav-link nav-link-icon" to="#">-->
                    <!--<lx-svg-icon icon="favorites" w="26" h="26"></lx-svg-icon>-->
                    <!--<span class="badge navbar-badge badge-pill badge-info">13</span>-->
                    <!--</i18n-link>-->
                    <!--</div>-->
                    <!--<div class="nav-item">-->
                    <!--<i18n-link class="nav-link nav-link-icon" to="#">-->
                    <!--<lx-svg-icon icon="cart" w="26" h="26"></lx-svg-icon>-->
                    <!--<span class="badge navbar-badge badge-pill badge-info">4</span>-->
                    <!--</i18n-link>-->
                    <!--</div>-->
                    <!--</template>-->
                </div>
            </nav>
        </div>
        <transition name="fade">
            <div class="overlay-destinations-popup" v-if="activePopUp" @click.stop>
                <div class="overlay-destinations-container">
                    <div :class="[ !activeNegative ? 'activeSlideTop' : 'activeSlideBottom' ,'overlay-slide-up']">
                        <div class="overlay-destinations-col" v-for="(item,index) in filtredCountries" :key="index">
                            <span>{{ item.i18n.name }}</span>
                            <ul>
                                <li v-for="(item_country, i) in item.countries.slice(0,6)" :key="i">
                                    <nuxt-link :to="goToCountry(item_country)">{{ item_country.i18n.name }}</nuxt-link>
                                </li>
                                <li class="overlay-destinations-toggle-all">
                                    <span @click.stop="showAllCounties(index)">See all</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div :class="[ activeNegative ? 'activeSlideTopNegative' : 'activeSlideBottomNegative' ,'overlay-destinations-col', 'active-countries']">
                        <span @click.stop="hideAllCounties"
                              class="active-countries__title">
                        <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve">
	<path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
		c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>
</svg>
                        </span>
                        <ul>
                            <li v-for="(item_country, i) in activeCountyName.countries" :key="i">
                                <nuxt-link :to="goToCountry(item_country)">{{ item_country.i18n.name }}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import LxSvgIcon from '@/components/LxSvgIcon'
    import Autocomplete from "./selects/Autocomplete";

    export default {
        components: {Autocomplete, LxSvgIcon},
        created() {
            this.getOnlyCountries()
        },
        data() {
            return {
                collapseShow: false,
                activePopUp: false,
                activeCounty: false,
                activeNegative: true,
                activeCountyName: {
                    i18n: {
                        name: ''
                    },
                    countries: [
                        {
                            i18n: {
                                name: ''
                            }
                        }
                    ]
                },
                allCountriesShown: []
            }
        },

        computed: {
            ...mapState('auth', ['user']),
            ...mapState('ui', ['searchHeaderItems', 'chosenHeaderItem', 'showHeaderSearch']),
            ...mapState('countries', ['onlyCountries']),
            filtredCountries() {
                return this.onlyCountries
            },
            avatarUrl() {
                return this.user && this.user.avatarUrl ? this.user.avatarUrl : null
            }
        },


        methods: {
            ...mapActions('countries', ['getOnlyCountries']),
            showAllCounties(index) {
                if (this.activeCountyName.countries.length > 2) {
                    this.activeCountyName = {
                        i18n: {
                            name: ''
                        },
                        countries: [
                            {
                                i18n: {
                                    name: ''
                                }
                            }
                        ]
                    }
                }
                this.activeCountyName = this.onlyCountries[index];
                this.activeNegative = !this.activeNegative
            },
            hideAllCounties() {
                this.activeNegative = !this.activeNegative
            },
            goToCountry(item) {
                return `/destinations/${item.slug}`
            },
            showPopUp() {
                this.activePopUp = !this.activePopUp;
                this.activeNegative = true
            },
            logout() {
                this.$store.dispatch('auth/logout')
            },
            search(event) {
                this.$store.dispatch('ui/getSearchItems', event.target.value)
            },
            selectItem(item) {
                let defaultFilters = {
                    cityId: null,
                    country_id: null,
                    query: null,
                    id: null
                }

                if (item['query']) {
                    defaultFilters.query = item.name;
                } else if (item['product_type_id']) {
                    defaultFilters.id = item.id;
                } else if (item['international_calling_code']) {
                    defaultFilters.country_id = item.id;
                } else {
                    defaultFilters.cityId = item.id;
                }

                this.$store.dispatch('products/setActiveFilterOptions', defaultFilters);
                this.$store.dispatch('ui/setSearchItem', item);
                this.$router.push('/tours')
            },
            blur() {
                this.$store.dispatch('ui/blurSearchItems');
            },
            deleteChosenItem() {
                const defaultFilters = {
                    cityId: null,
                    country_id: null,
                    query: null,
                    id: null
                }
                this.$store.dispatch('products/setActiveFilterOptions', defaultFilters);
                this.$store.dispatch('ui/setSearchItem', {});
                this.$store.dispatch('ui/setSearchItems', {});
            },
        },
        watch: {
            user(newValue, oldValue) {
            },
        },
        mounted() {
            document.addEventListener('click', () =>{
                this.activePopUp = false
            })
        }
    }
</script>

<style lang="scss">

    .overlay-slide-up {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: absolute;
        transition: 1s ease all;
    }

    .active-countries {
        position: absolute;
        transition: 1s ease all;

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                margin-right: 35px;
            }
        }
    }

    .activeSlideTop {
        top: -100%;
    }

    .activeSlideTopNegative {
        top: 100%;
    }

    .activeSlideBottom {
        top: 0;
    }

    .activeSlideBottomNegative {
        top: 0;
    }


    .overlay-destinations {
        &-popup {
            position: absolute;
            width: 100vw;
            min-height: 380px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            padding: 22px 0;
            display: flex;
            z-index: 99;
            left: 0;
            margin-left: auto;
            right: 0;
            transition: 0.5s ease-out all;
            background-color: #fff;
            top: 77px;
        }

        &-container {
            height: 380px;
            max-width: 1100px;
            margin: auto;
            width: 100%;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            flex-wrap: wrap;
        }


        &-col {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            flex-direction: column;
            width: fit-content;
            align-items: flex-start;

            span {
                font-size: 14px;
                color: #052e46;
                text-decoration: none solid rgb(5, 46, 70);
                line-height: 36px;
                font-weight: bold;
                display: inline-block;
                margin-left: 10px;
            }

            ul {
                padding: 0;
                margin: 0;
                list-style: none;

                li {
                    a {
                        font-size: 14px;
                        color: #094c74;
                        text-decoration: none solid rgb(9, 76, 116);
                        line-height: 16px;
                        font-weight: normal;
                        width: 145px;
                        display: inline-block;
                        padding: 10px;
                    }
                }
            }

            a:hover {
                background-color: #e6edf1;
            }
        }

        &-toggle-all span {
            font-size: 13px;
            color: #2980b9;
            text-decoration: none solid rgb(41, 128, 185);
            cursor: pointer;
            font-weight: 400;
        }
    }

    .active-countries__title {
        margin: 0 auto 15px auto !important;
        transition: 1s ease all;
        position: relative;
        top: 0;
        opacity: 1;
        height: 50px;
        svg{
            width: 50px;
            opacity: 0.5;
            transform: rotate(90deg);
            cursor: pointer;
            position: absolute;
            right: 0;
            left: -80px;
            margin: auto;
        }
    }
    .active-countries__title:hover{
        top: 5px;
    }

    @media only screen and (max-width: 1100px) {
        .overlay-destinations-container {
            width: 100%;
        }
        .overlay-destinations-col {
            width: 30%;
            max-height: auto;
            padding: 0 15px;
        }
    }

    @media only screen and (max-width: 770px) {
        .overlay-destinations-col {
            width: 100%;
            max-height: 362px;
            padding: 0 15px;
        }
        .overlay-destinations-popup {
            height: auto;
            display: none;
        }

    }


    .search-mini {
        position: relative;

        &::before {
            content: '';
            width: 18px;
            height: 18px;
            background: url("~assets/icons/search.svg") no-repeat;
            background-size: cover;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 8px;
        }
    }

</style>
