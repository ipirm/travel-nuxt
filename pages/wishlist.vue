<template>
    <div class="main-container">
        <div class="bread-crumbs">
            <bread-crumbs/>
        </div>

        <section class="wishlist">
            <div class="header-text">
                My Wishlist
            </div>
<!--            <div class="tabs">-->
<!--                <div-->
<!--                        v-for="(item, key) in tabsNames"-->
<!--                        :key="key"-->
<!--                        :class="{'active-tab': item.active}"-->
<!--                        class="tab"-->
<!--                        @click="activeTab(key)"-->
<!--                >-->
<!--                    {{ item.name }}-->
<!--                </div>-->
<!--            </div>-->
            <!--            {{ this.wishlist }}-->
            <!--      <div class="sort-select-wrapper">-->
            <!--        <select-options class="select-sort-by" :options="optionsExample" placeholder="Sort by" />-->
            <!--      </div>-->
            <div class="overlay-tab">
                <div class="container-cards">
                    <card-offer
                            v-for="(item, key) in wishlist"
                            :key="key"
                            @remove-item="removeFromWishList"
                            :idProduct="item.id"
                            :currency="item.minPrice"
                            :date="`${item.days_count} day`"
                            :availability="item.isAvailableToday"
                            :header-text="item.name"
                            :address="item.city.name"
                            star-evaluation="4.7"
                            :reviews="`${item.reviewsCount} reviews | ${item.totalBookedCount} booked`"
                            bg-image="/images/home/bg-two.jpg"
                            class="card"
                            basket
                            more-details
                            hot-tour
                    />
                </div>
                <div class="overlay-paginnation" v-if="false">
                    <pagination :quantity="22" :present-number="5" @click-item="clickPaginationItem"/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import CardOffer from '@/components/cards/CardOffer'
    import InputSelect from '@/components/selects/InputSelect'
    import SelectOptions from '@/components/selects/SelectOptions'
    import BreadCrumbs from '@/components/BreadCrumbs'
    import windowWidth from '@/mixins/windowWidth'
    import {mapState, mapActions} from 'vuex'

    export default {
        auth: false,
        components: {
            Pagination,
            CardOffer,
            InputSelect,
            SelectOptions,
            BreadCrumbs
        },
        created() {
            this.getWishList();
        },
        mixins: [windowWidth],
        data: () => ({
            tabsNames: [
                {
                    name: 'Popular',
                    id: 1,
                    active: false
                },
                {
                    name: 'Top Picks',
                    id: 2,
                    active: false
                },
                {
                    name: 'My Wish List',
                    id: 3,
                    active: true
                }
            ],
            selected: null,
            countries: [
                'dsadasdas',
                'asdsadsadasfas,',
                'GasFasd'
            ],
            optionsExample: [
                'price',
                'star',
                'reviews',
                'booked'
            ],
            selectOption: null
        }),
        computed: {
            ...mapState('wishlist', ['wishlist']),
            getNumberCards() {
                if (process.client) {
                    if (this.windowWidth <= 700) {
                        return 3
                    }

                    if (this.windowWidth <= 1010) {
                        return 6
                    }

                    if (this.windowWidth <= 1340) {
                        return 9
                    }
                }

                return 12
            }
        },
        methods: {
            ...mapActions('wishlist', ['getWishList']),
            clickPaginationItem(key) {
                this.wishlist = this.$store.dispatch('wishlist/getWishList', key)
            },
            // activeTab(key) {
            //     this.tabsNames.map((item) => {
            //         item.active = false
            //         return item
            //     })

                // this.tabsNames[key].active = true
            // },
            selectedOption(option) {
                this.selectOption = option
            },
             removeFromWishList(id) {
                this.$store.dispatch('wishlist/removeWishList', id);
                 this.getWishList();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .overlay-paginnation {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .main-container, .wishlist {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .container-cards {
        width: 1300px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 3rem;
    }

    .bread-crumbs {
        width: 100%;
        max-width: 1290px;
        margin-top: 2rem;
    }

    .card {
        margin-top: 1.5rem;
    }

    .wishlist {
        margin-bottom: 5rem;
        margin-top: 3rem;
    }

    .header-text {
        font-size: 36px;
        color: $blue-dark;
        text-align: center;
        font-weight: 500;
        margin-bottom: 36px;
    }

    .tabs {
        display: flex;
        width: 447px;
    }

    .tab {
        width: 149px;
        border-bottom: 3px solid #e6edf1;
        font-weight: 500;
        font-size: 16px;
        color: $blue;
        text-align: center;
        padding-bottom: 5px;
        transition: all 0.2s ease-out;
        cursor: pointer;

        &:hover {
            border-color: $blue-light;
            color: $blue-light;
        }
    }

    .active-tab {
        border-color: $blue-light;
        color: $blue-light;
    }

    .sort-select-wrapper {
        position: relative;
        margin-top: 2rem;
        margin-bottom: 0.7rem;
        width: 100%;
    }

    .select-sort-by {
        width: 207px;
    }

    @media (max-width: 1340px) {
        .container-cards {
            width: 970px;
        }

        .bread-crumbs {
            padding-left: 20px;
        }
    }

    @media (max-width: 1010px) {
        .container-cards {
            width: 640px;
        }
    }

    @media (max-width: 700px) {
        .container-cards {
            width: 307px;
        }

        .sort-select-wrapper {
            display: flex;
            justify-content: center;
        }

        .tabs {
            width: 320px;
        }
    }

    @media (max-width: 436px) {
        .container-cards {
            width: 280px;
        }
    }
</style>
