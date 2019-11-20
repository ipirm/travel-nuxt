<template>
    <div
            :class="{
      'vertical-container': type === 'vertical',
      'horizontal-container': type === 'horizontal',
      'mini-container': type === 'mini'
    }"
            class="base-container"
            @mouseover="mouseoverHover"
            @mouseleave="mouseleaveHover"
    >
        <div
                :class="{
        'vertical-bg-cont': type === 'vertical' || type === 'mini',
        'horizontal-bg-cont': type === 'horizontal'
      }"
                :style="{'background-image': `url(${ productPhotos[0] ? productPhotos[0].thumbnails['307'] : '' })` }"
                class="background-content"
        >
            <price-tag :bg-color="bgColor || ''" :discount="discount || ''" :currency="minPrice || ''"/>

            <div class="bg-content-text">
                <div v-if="type !== 'horizontal'" class="header-text">
                    {{ name }}
                </div>
                <div v-if="type !== 'horizontal'" class="date-text">
                    <div class="icon">
                        <img src="~assets/icons/points.svg" alt="points">
                    </div>
                    <div class="date">
                        {{ productDays.days.length }} day{{ productDays.days.length == 1 ? '' : 's' }}
                    </div>
                </div>
            </div>

            <div class="bg-opacity" :class="{'horizontal-bg-opacity': type === 'horizontal'}"></div>

            <div v-if="basket" class="basket">
                <img src="~assets/icons/bucket.svg" class="bucket-icon" alt="bucket">
            </div>

            <transition name="fade" appear>
                <div v-if="hoverView" class="more-details" :class="{'horizontal-more-details': type === 'horizontal'}">
                    <div v-if="moreDetails" class="more-details-buttons">
                        <router-link :to="'/tours/' + id" class="book-now button-styles">
                            Book now
                        </router-link>
                        <router-link :to="'/tours/' + id" class="details button-styles">
                            Details
                        </router-link>
                    </div>
                    <div v-if="like && activeIcon" class="like-button" @click.stop="addWishList(id)">
                        <lx-svg-icon icon="heart" w="23" h="23"/>
                    </div>
                    <div v-if="like && !activeIcon" class="like-button" @click.stop="removeWishList(id)">
                        <lx-svg-icon icon="heart" class="like-icon" w="23" h="23"/>
                    </div>
                </div>
            </transition>
        </div>

        <div v-if="type !== 'mini'" class="base-content" :class="{'base-content-horizontal': type === 'horizontal'}">
            <div v-if="type === 'horizontal'" class="header-text  horizontal-header-text">
                {{ name }}
            </div>
            <div class="address-date-cont">
                <div class="address">
                    {{ city.name }}
                </div>
                <div class="date-horizontal">

                </div>
            </div>
            <!--<div class="rating-and-reviews">-->
            <!--<div><img src="~assets/icons/star.svg" alt="star"></div>-->
            <!--<div class="rating">-->
            <!--{{ starEvaluation }}-->
            <!--</div>-->
            <!--<div class="reviews">-->
            <!--{{ reviews }}-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="availability-cont">-->
            <!--<div v-if="availability === 'none'" class="availability">-->
            <!--Available today-->
            <!--</div>-->
            <!--<div v-if="availability !== 'none'" class="availability-time">-->
            <!--{{ availability }}-->
            <!--</div>-->
            <!--<img v-if="hotTour" src="~assets/icons/hot_tour.svg" alt="hot tour">-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import PriceTag from '@/components/PriceTag'
    import HeartIcon from '@/components/cards/icons/Heart'
    import {mapState, mapActions} from 'vuex'
    import LxSvgIcon from '@/components/LxSvgIcon'

    export default {
        components: {PriceTag, LxSvgIcon},
        props: {
            type: {
                type: String,
                default: 'vertical',
                validator: (value) => {
                    return ['vertical', 'horizontal', 'mini'].indexOf(value) !== -1
                }
            },
            created_at: {type: String, required: true},
            name: {type: String, required: true},
            id: {type: Number, required: true},
            bgColor: {type: String, default: 'red'},
            discount: {type: Number, default: 0},
            minPrice: {type: Number, required: true},
            basket: {type: Boolean, default: false},
            address: {type: String, default: ''},
            starEvaluation: {type: String, default: ''},
            reviews: {type: String, default: ''},
            availability: {type: String, default: 'none'},
            moreDetails: {type: Boolean, default: false},
            hotTour: {type: Boolean, default: false},
            like: {type: Boolean, default: false},
            productPhotos: {type: [Array, Boolean], default: false},
            productDays: {type: [Object, Boolean], default: false},
            city: {type: [Object, Boolean], default: false}
        },
        async created() {
            if (this.user.id) {
                await this.getUserWishList();
                const wishlists = this.userWishlist.filter(item => item.id === this.id)
                if (wishlists.length === 1) this.activeIcon = false
            }
        },
        data: () => ({
            hoverView: false,
            activeIcon: true
        }),
        methods: {
            ...mapActions('wishlist', ['getUserWishList']),
            mouseoverHover() {
                this.hoverView = true
            },
            mouseleaveHover() {
                this.hoverView = false
            },
            addWishList(id) {
                if(this.user.id !== undefined) {
                    this.$store.dispatch('wishlist/addWishList', id);
                    this.activeIcon = !this.activeIcon
                }
            },
            removeWishList(id) {
                this.$store.dispatch('wishlist/removeWishList', id);
                this.activeIcon = !this.activeIcon
            }
        },
        watch: {
            user(newValue, oldValue) {
            },
        },
        computed: {
            ...mapState('auth', ['user']),
            ...mapState('wishlist', ['userWishlist']),
        },
    }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .like-icon {
        fill: red !important;
    }

    .base-container {
        box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.1);
        font-family: $font-family-sans-serif;
        cursor: pointer;
    }

    .vertical-container {
        display: flex;
        flex-direction: column;
        height: 365px;
        width: 307px;
    }

    .horizontal-container {
        display: flex;
        width: 635px;
        height: 166px;
    }

    .mini-container {
        height: 307px;
        width: 307px;
    }

    .background-content {
        background: url('~static/images/home/bg-one.png') no-repeat;
        background-size: cover;
        padding: 1.1rem;
        position: relative;
    }

    .vertical-bg-cont {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 307px;
        width: 307px;
    }

    .horizontal-bg-cont {
        width: 265px;
        height: 167px;
    }

    .header-text {
        color: #ffffff;
        font-size: 24px;
        font-weight: 700;
    }

    .bg-content-text {
        z-index: 3;
    }

    .date-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .date {
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
    }

    .bg-opacity {
        background-image: linear-gradient(0deg, rgba(12, 22, 31, 0) 1%, rgba(4, 30, 46, 0.55) 100%);
        height: 161px;
        width: 307px;
        position: absolute;
        bottom: 0;
        transform: rotate(180deg);
        margin-left: -1.1rem;
        z-index: 2;
    }

    .horizontal-bg-opacity {
        width: 265px;
        height: 167px;
        background-image: linear-gradient(0deg, rgba(12, 22, 31, 0.1) 2%, rgba(4, 30, 46, 0.55) 100%);
    }

    .basket {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        height: 50px;
        width: 50px;
        background-color: #094c74;
        border-radius: 100%;
        color: white;
        z-index: 7;
        margin-top: -0.7rem;
        margin-right: -0.8rem;
        cursor: pointer;

        &:hover .bucket-icon {
            transform: translateY(-3px);
            transform: rotate(20deg);
        }
    }

    .bucket-icon {
        transition: all 0.2s ease-out;
    }

    .more-details {
        background-image: linear-gradient(180deg, rgba(12, 22, 31, 0.24) 2%, rgba(4, 30, 46, 0.74) 100%);
        position: absolute;
        height: 307px;
        width: 307px;
        display: flex;
        flex-direction: column;
        z-index: 3;
        justify-content: center;
        margin-left: -1.1rem;
        margin-top: -1.1rem;
        align-items: center;
    }

    .horizontal-more-details {
        width: 100%;
        height: 100%;
        margin-top: -112px;
    }

    .base-content-horizontal {
        display: flex;
        justify-content: space-between;
        width: 370px;
        min-height: 58px;
    }

    .button-styles {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        height: 44px;
        width: 156px;
        font-weight: 500;
        font-size: 13px;
        cursor: pointer;
    }

    .rating {
        font-weight: 600;
        color: $yellow;
        font-size: 14px;
        line-height: 28px;
        margin-left: 6px;
        margin-right: 7px;
    }

    .reviews {
        font-size: 14px;
        color: $blue-dark;
        line-height: 28px;
    }

    .availability-cont {
        display: flex;
        justify-content: space-between;
    }

    .availability {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: 500;
        border-radius: 2px;
        background-color: $green;
        font-size: 12px;
        width: 110px;
        height: 26px;
    }

    .availability-time {
        font-size: 12px;
        color: $blue;
        font-weight: 500;
        display: flex;
        align-items: center;
    }

    .more-details-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 2.5rem;
    }

    .book-now {
        background-color: $orange;
    }

    .details {
        background-color: #fff;
        color: $blue;
        margin-top: 16px;
        margin-bottom: 44px;
    }

    .like-button {
        height: 43px;
        width: 43px;
        background-color: #ffffff;
        border-radius: 100%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        right: 0;
        margin-right: 15px;
        margin-bottom: 15px;
    }

    .base-content {
        padding: 12px 18px 21px 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 58px;
    }

    .rating-and-reviews {
        display: flex;
        margin-bottom: 5px;
    }

    .address {
        font-weight: 700;
        line-height: 28px;
        font-size: 16px;
        color: $blue-dark;
    }

    .horizontal-header-text {
        font-size: 20px;
        color: $blue;
        line-height: 1.6rem;
    }

    .address-date-cont {
        display: flex;
        align-items: center;
        margin-top: 4px;
        margin-bottom: -5px;
    }

    .date-horizontal {
        font-size: 14px;
        color: $blue-dark;
        margin-left: 12px;
        padding-top: 2px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .35s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    @media (max-width: 436px) {
        .vertical-container, .mini-container, .bg-opacity, .vertical-bg-cont, .more-details {
            width: 280px;
        }

        .header-text {
            font-size: 18px;
        }
    }
</style>
