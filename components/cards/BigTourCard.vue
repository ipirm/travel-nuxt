<template>
    <div class="tour-card">
        <div class="background-image"
             :style="{'background-image': `url(${ tour.productPhotos&&tour.productPhotos[0] ? url + tour.productPhotos[0].thumbnails['307'] : '' })` }">
            <price-tag :currency="tour.minPrice"/>
            <div class="header-text">
                {{ tour.name }}
            </div>
            <div class="more-details">
                <div class="more-details-buttons">
                    <div class="book-now button-styles">
                        Book now
                    </div>
                    <a v-bind:href="'/tours/'+ tour.id" class="details button-styles">
                        Details
                    </a>
                </div>
                <div class="like-button">
                    <heart-icon/>
                </div>
            </div>
        </div>

        <div class="content-cont">
            <div class="header">
                <div class="header-text">
                    {{ tour.name }}
                </div>
                <img v-if="tour.hotTour" class="hot-tour" src="~assets/icons/hot_tour.svg" alt="hot tour">
            </div>

            <div class="place for-tile">{{ tour.address }}</div>

            <div class="assessment">
                <img src="~assets/icons/star.svg" alt="star">
                <span class="stars">
          5<!--{{ tour.stars }}-->
        </span>
                <span class="reviews">
          24k reviews | 64,5k booked<!--{{ tour.reviews }} | {{ tour.booked }}-->
        </span>
            </div>

            <div class="time-place">
                <div class="time-place-left">
          <span class="place">
            {{ tour.firstPointOfPickUp.fullAddress.formatted_address }}
          </span>

                    <div class="time">
                        <lx-svg-icon class="clock" h="17px" w="17px" icon="clock"/>
                        <span class="time-text">{{ tour.days_count }}</span>
                    </div>
                </div>
                <div v-if="tour.isAvailableToday" class="available">
                    Available today
                </div>
            </div>

            <p class="desc">
                {{ tour.description_why_unique }}
            </p>

            <div class="buttons">
                <a v-bind:href="'/tours/'+ tour.id" class="details">
                    Details
                </a>
                <div class="add-to-wishlist">
                    <lx-svg-icon h="24px" w="24px" icon="heart"/>
                    <span>Add To Wishlist</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import PriceTag from '@/components/PriceTag'
  import LxSvgIcon from '@/components/LxSvgIcon'
  import serverConfig from '@/config/server'
  import HeartIcon from '@/components/cards/icons/Heart'


  export default {
    components: { PriceTag, LxSvgIcon, HeartIcon },
    props: {
      tour: {
        type: Object,
        required: true
      }
    },
    computed: {
      url() {
        return serverConfig.defaultUploadURL;
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .tour-card, .header, .buttons {
        display: flex;
    }

    .tour-card {
        transition: all .3s;

        .is-tiled-view & {
            width: calc(33.3333% - 46px);
            margin: 0 23px 45px 23px;
            flex-direction: column;

            &:hover {
                .more-details {
                    opacity: 1;
                    pointer-events: all;
                    z-index: 3;
                }
            }
        }
    }

    .header {
        justify-content: space-between;

    }

    .content-cont {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .is-tiled-view & {
            box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.1);
            padding: 18px;
            position: relative;
        }
    }

    .header-text {
        font-size: 24px;
        font-weight: 700;
        color: $dark-secondary;
        /*width: 620px;*/
        line-height: 30px;

        .is-tiled-view & {
            display: none;
        }
    }

    .time-place {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .is-tiled-view & {
            margin-bottom: 0;
        }
    }

    .background-image {
        background-size: cover;
        padding: 1.1rem;
        position: relative;
        width: 306px;
        min-width: 306px;
        margin-right: 27px;
        height: 247px;

        .header-text {
            display: none;
            color: #fff;
            width: auto;
        }

        .is-tiled-view & {
            margin-right: 0;
            width: 100%;
            min-width: auto;
            height: 310px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .header-text {
                display: block;
            }
        }
    }

    .hot-tour {
        width: 28px;
        height: 28px;
        margin-top: 10px;

        .is-tiled-view & {
            position: absolute;
            right: 18px;
            bottom: 18px;
        }
    }

    .stars {
        font-weight: 600;
        color: $yellow;
        font-size: 14px;
        line-height: 28px;
        margin-left: 7px;
        margin-right: 8px;
    }

    .assessment {
        display: flex;
        align-items: center;

        .is-tiled-view & {
            margin-bottom: 10px;
        }
    }

    .clock {
        color: #6b94ac;
        margin-left: 14px;
    }

    .time-text {
        font-size: 14px;
        font-weight: 500;
    }

    .time-place-left {
        display: flex;
        align-items: center;

        .is-tiled-view & {
            display: none;
        }
    }

    .details {
        border-radius: 3px;
        font-weight: 500;
        background-color: $blue-light;
        width: 159px;
        height: 40px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        cursor: pointer;
        border: none;
        transition: all 0.3s ease;

        &:hover {
            background-color: $blue;
        }
    }

    .review {
        font-size: 14px;
    }

    .available {
        background-color: $green;
        height: 26px;
        width: 110px;
        font-size: 12px;
        border-radius: 2px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .desc {
        font-size: 13px;
        color: $dark-secondary;

        .is-tiled-view & {
            display: none;
        }
    }

    .buttons {
        align-items: center;

        .is-tiled-view & {
            display: none;
        }
    }

    .place {
        font-weight: 500;
        font-size: 14px;
        color: $blue-dark;

        &.for-tile {
            font-size: 16px;
            color: #052e46;
            font-weight: 700;
            display: none;

            .is-tiled-view & {
                display: block;
            }
        }
    }

    .add-to-wishlist {
        font-size: 13px;
        color: $blue;
        cursor: pointer;
        margin-left: 20px;
        transition: color 0.3s ease;

        &:hover {
            color: $blue-light;
        }
    }

    .time-place-left {
        display: flex;
    }

    /*more-details*/

    .more-details-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 2.5rem;
    }

    .book-now {
        background-color: $orange;
        margin-bottom: 15px;

        &:hover {
            background-color: darken($orange, 10%);
        }
    }

    .more-details {
        background-image: linear-gradient(180deg, rgba(12, 22, 31, 0.24) 2%, rgba(4, 30, 46, 0.74) 100%);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: all .3s;
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
        min-height: 166px;
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

        &.details {
            background-color: #fff;
            color: $blue;

            &:hover {
                background-color: darken(#fff, 10%);
            }
        }
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


</style>
