<template>
    <div class="overlay-card">
        <div class="overlay-card-desktop">
            <div class="overlay-card-left">
                <div class="card-left">
                    <div class="card-img"></div>
                </div>
                <div class="card-right">
                    <div class="card-right-header">
                        <div class="card-right-header-left">
                            <span class="card-right-date">{{ data.date }}</span>
                            <lx-svg-icon icon="clock" w="14" h="14"></lx-svg-icon>
                            <span class="card-right-time">{{ data.product_state.days_count}} day</span>
                        </div>
                        <div class="card-right-header-right">
                            <span class="card-right-prod-code">Product code: {{ data.code}}</span>
                        </div>
                    </div>
                    <div class="card-right-content">
                        <span class="card-right-title">{{ data.product_state.name}}</span>
                        <span class="card-right-place">{{  data.product_state.city.i18n.name }}</span>
                        <span class="card-right-traveler" v-for="(item,index) in data.bookingTravelers" :key="index" v-if="item.is_lead_traveler === 1">Lead Traveler: {{ item.first_name}}</span>
                        <span class="card-right-traveler-count">{{ data.travelers_count}} travelers</span>
                    </div>
                    <div class="card-right-footer">
                        <div class="card-right-footer-left">
                            <button class="card-right-footer-toggler" @click="toggle()">
                                <span><span v-if="toggled">Show</span><span
                                        v-if="!toggled">Hide</span> detailed info</span>
                                <lx-svg-icon icon="dropdown" w="16" h="16" :class="{ active : toggled }"></lx-svg-icon>
                            </button>
                        </div>
                        <div class="card-right-footer-right">
                            <button class="card-right-footer-print">
                                <lx-svg-icon icon="ticket" w="26" h="26"></lx-svg-icon>
                                <span>Print Tickets</span>
                            </button>
                            <button class="card-right-footer-message">
                                <lx-svg-icon icon="chat" w="22" h="22"></lx-svg-icon>
                                <span>Message Operator</span>
                            </button>
                        </div>
                    </div>
                    <div class="card-right-info" ref="info">
                        <span class="card-right-info-phone-number">Contact phone number: <a
                                :href="`tel:${data.product_state.fullPhone}`">{{ data.product_state.fullPhone }}</a></span>
                        <div class="card-right-info-row">
                            <div class="card-right-info-col">
                                <span class="card-right-info-title">Traveler names:</span>
                                <ul class="card-right-info-list">
                                    <li v-for="(item,index) in data.bookingTravelers" :key="index">
                                        <span class="card-right-info-text">
                                     {{ item.first_name }}
                                    </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-right-info-col">
                                <span class="card-right-info-title">Hotel Pickup:</span>
                                <ul class="card-right-info-list"
                                    v-for="(item, index) in data.product_state.productPickUpDropOff.pickUpPoints"
                                    :key="index">
                                    <li>
                                        <span class="card-right-info-text">
                                          {{ item.place_name}}
                                        </span>
                                    </li>
                                    <li><span class="card-right-info-text">{{ item.place_address }}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-right-info-row">
                            <div class="card-right-info-col">
                                <span class="card-right-info-title">Inclusions:</span>
                                <ul class="card-right-info-bullet-list">
                                    <li><span class="card-right-info-text"
                                              v-for="(item, index) in data.product_state.whatsIncludedCategoriesList"
                                              :key="index">{{ item.name }} </span></li>
                                </ul>
                            </div>
                            <div class="card-right-info-col">
                                <span class="card-right-info-title">Starting location:</span>
                                <span class="card-right-info-place">Israel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overlay-card-right">
                <div class="overlay-card-right-pending" v-if="this.data.confirmationStatusName ==='pending'">Pending
                </div>
                <div class="overlay-card-right-confirmed" v-else>Confirmed</div>
                <span class="overlay-card-right-price"><span class="dollar" v-if="data.payment.currency === 'USD'">$</span>{{ data.payment.amount }}</span>
                <span class="overlay-card-right-tip">You can cancel this booking, but you'll be charged a fee.</span>
                <button class="overlay-card-right-cancel">Cancel</button>
            </div>
        </div>
        <div class="overlay-card-mobile">
            <div class="overlay-card-top">
                <div class="overlay-card-top-left">
                    <div class="card-img"></div>
                </div>
                <div class="overlay-card-top-right">
                    <div class="overlay-card-top-right-header">
                        <div class="overlay-card-right-pending" v-if="this.data.confirmationStatusName ==='pending'">
                            Pending
                        </div>
                        <button class="overlay-card-right-cancel" v-else>Cancel</button>
                    </div>
                    <span class="overlay-card-right-price"><span class="dollar" v-if="data.payment.currency === 'USD'">$</span> {{ data.payment.amount }}</span>
                    <span class="overlay-card-right-tip">You can cancel this booking, but you'll be charged a fee.</span>
                </div>
            </div>
            <div class="overlay-card-middle">
                <div class="card-header">
                    <span class="card-right-date">{{ data.date }}</span>
                    <lx-svg-icon icon="clock" w="14" h="14"></lx-svg-icon>
                    <span class="card-right-time">{{ data.product_state.days_count}} day</span>
                </div>
                <span class="card-right-title">{{ data.product_state.name}}</span>
                <span class="card-right-place">{{  data.product_state.city.i18n.name }}</span>
                <span class="card-right-traveler">Lead Traveler: Carol Marcus</span>
                <span class="card-right-traveler-count">{{ data.travelers_count}} travelers</span>
                <span class="card-right-prod-code">Product code: {{ data.code}}</span>
                <button class="card-right-footer-toggler" @click="toggle()">
                    <span><span v-if="toggled">Show</span><span v-if="!toggled">Hide</span> detailed info</span>
                    <lx-svg-icon icon="dropdown" w="16" h="16" :class="{ active : toggled }"></lx-svg-icon>
                </button>
                <div class="card-right-info" ref="infoMobile">
                    <span class="card-right-info-phone-number">Contact phone number: <a
                            :href="`tel:${data.product_state.fullPhone}`">+{{data.product_state.fullPhone}}</a></span>
                    <span class="card-right-info-title">Traveler names:</span>
                    <ul class="card-right-info-list">
                        <li v-for="(item,index) in data.bookingTravelers" :key="index"><span
                                class="card-right-info-text">  {{ item.first_name }}</span></li>
                    </ul>
                    <span class="card-right-info-title">Inclusions:</span>
                    <ul class="card-right-info-bullet-list">
                        <li><span class="card-right-info-text"
                                  v-for="(item, index) in data.product_state.whatsIncludedCategoriesList" :key="index">{{ item.name }} </span>
                        </li>
                    </ul>
                    <span class="card-right-info-title">Hotel Pickup:</span>
                    <ul class="card-right-info-list"
                        v-for="(item, index) in data.product_state.productPickUpDropOff.pickUpPoints" :key="index">
                        <li<span class="card-right-info-text">{{ item.place_name}}</span></li>
                        <li><span class="card-right-info-text">{{ item.place_address }}</span></li>
                    </ul>
                    <span class="card-right-info-title">Starting location:</span>
                    <span class="card-right-info-place">Israel</span>
                </div>
            </div>
            <div class="overlay-card-bottom">
                <button class="card-right-footer-print">
                    <lx-svg-icon icon="ticket" w="26" h="26"></lx-svg-icon>
                    <span>Print Tickets</span>
                </button>
                <button class="card-right-footer-message">
                    <lx-svg-icon icon="chat" w="22" h="22"></lx-svg-icon>
                    <span>Message Operator</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import LxSvgIcon from '@/components/LxSvgIcon';

    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        components: {
            LxSvgIcon
        },

        data() {
            return {
                toggled: true,
                confirmed: false,

            };
        },
        mounted() {
            console.log(this.data);
        },
        methods: {
            toggle() {
                this.toggled = !this.toggled;
                if (this.toggled) {
                    this.$refs.info.style.height = null;
                    this.$refs.infoMobile.style.height = null;
                } else {
                    this.$refs.info.style.height = this.$refs.info.scrollHeight + 'px';
                    this.$refs.infoMobile.style.height = this.$refs.infoMobile.scrollHeight + 'px';
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .overlay-card {
        .dollar {
            font-size: 16px;
            margin-right: 8px;
        }

        &-desktop {
            width: 100%;
            display: flex;
            border: 1px solid #e6edf1;
            background-color: #ffffff;
            margin-top: 20px;
        }

        &-mobile {
            display: none;
        }

        &-left {
            border-right: 1px solid #e6edf1;
            width: 775px;
            height: 100%;
            display: flex;
            padding: 23px 22px;
        }

        &-right {
            padding: 24px;
            width: 362px;

            &-price {
                display: flex;
                align-items: flex-start;
                font-size: 26px;
                color: #052e46;
                text-decoration: none solid rgb(5, 46, 70);
                margin-bottom: 10px;
                font-weight: bold;
            }

            &-tip {
                display: block;
                font-size: 13px;
                color: #052e46;
                text-decoration: none solid rgb(5, 46, 70);
                margin-bottom: 20px;
            }

            &-cancel {
                font-size: 13px;
                color: #094c74;
                text-decoration: underline dotted rgb(9, 76, 116);
                border: none;
                background: none;
                padding: 0;

                &:focus {
                    outline: none;
                }
            }

            &-pending, &-confirmed {
                font-size: 14px;
                text-align: center;
                border-radius: 15px;
                padding: 0px 10px;
                width: fit-content;
                margin-bottom: 20px;
            }

            &-pending {
                border: 1px solid #2980b9;
                background-color: #e3f2ff;
                color: #2980b9;
                text-decoration: none solid rgb(41, 128, 185);
            }

            &-confirmed {
                border: 1px solid #78cc54;
                background-color: #d8facd;
                color: #29820c;
                text-decoration: none solid rgb(41, 130, 12);
            }
        }
    }

    .card {
        &-left {
            margin-right: 23px;
        }

        &-img {
            width: 130px;
            height: 130px;
            background-color: #dadada;
            background-image: url("../../assets/icons/box-28.jpg");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        &-right {
            width: 100%;

            &-header {
                margin-bottom: 14px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            &-left, &-right {
                display: flex;
                align-items: center;
            }

            &-prod-code {
                font-size: 13px;
                color: #6b94ac;
                text-decoration: none solid rgb(107, 148, 172);
                text-transform: capitalize;
                text-align: right;
            }

            &-date {
                font-size: 14px;
                color: #052e46;
                text-decoration: none solid rgb(5, 46, 70);
                text-transform: capitalize;
                margin-right: 10px;
            }

            &-time {
                font-size: 14px;
                color: #052e46;
                text-decoration: none solid rgb(5, 46, 70);
            }

            &-title {
                margin-bottom: 3px;
                font-size: 20px;
                color: #052e46;
                text-decoration: none solid rgb(5, 46, 70);
                font-weight: bold;
            }

            &-place {
                margin-bottom: 13px;
                font-family: Quicksand;
                font-size: 13px;
                color: #052e46;
                text-decoration: none solid rgb(5, 46, 70);
            }

            &-traveler, &-traveler-count {
                font-size: 13px;
                color: #052e46;
                text-decoration: none solid rgb(5, 46, 70);
                line-height: 20px;
            }

            &-traveler-count {
                margin-bottom: 12px;
            }

            &-title, &-place, &-traveler, &-traveler-count {
                display: block;
            }

            &-footer {
                display: flex;
                justify-content: space-between;

                &-toggler {
                    .active {
                        transition: transform .5s ease;
                        transform: rotate(180deg);
                    }
                }

                button {
                    border: none;
                    background: none;
                    font-size: 13px;
                    color: #094c74;
                    text-decoration: underline dotted rgb(9, 76, 116);
                    font-weight: bold;
                    padding: 0;

                    &:focus {
                        outline: none;
                    }
                }
            }

            &-info {
                margin-top: 5px;
                overflow: hidden;
                height: 0;
                transition: height 1s ease;

                &-phone-number {
                    display: block;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                    line-height: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;

                    a {
                        text-decoration: none;
                        font-weight: normal;
                    }
                }

                &-row {
                    margin-bottom: 12px;
                    display: flex;
                    width: 100%;
                }

                &-col {
                    width: 50%;

                    &:first-of-type {
                        margin-right: 50px;
                    }
                }

                &-title {
                    display: block;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                    line-height: 20px;
                    font-weight: bold;
                }

                &-list {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                    line-height: 20px;
                }

                &-place {
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                }

                &-bullet-list {
                    padding-left: 16px;
                    margin: 0;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                    line-height: 20px;
                }
            }
        }
    }

    @media (max-width: 990px) {
        .overlay-card {
            &-desktop {
                display: none;
            }

            &-mobile {
                display: flex;
                flex-direction: column;
                border: 1px solid #e6edf1;
                background-color: #ffffff;
                margin-top: 20px;
            }

            &-right {
                &-pending, &-confirmed {
                    margin-bottom: 0;
                }

                &-tip {
                    margin-bottom: 0;
                }
            }

            &-top {
                display: flex;
                min-height: 160px;

                &-left, &-right {
                    width: 50%;
                }

                &-right {
                    padding: 16px 13px;
                    border-bottom: 1px solid #e6edf1;

                    &-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;
                    }
                }
            }

            &-middle {
                padding: 18px;
            }

            &-bottom {
                display: flex;
                margin-bottom: 18px;
                margin-left: 18px;
                margin-right: 18px;
                padding-top: 15px;
                border-top: 1px solid #e6edf1;
            }
        }

        .card {
            &-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            &-header {
                background: none;
                border: none;
                padding: 0;
                margin-bottom: 8px;
            }

            &-right {
                &-title {
                    font-size: 18px;
                    margin-bottom: 4px;
                }

                &-place {
                    margin-bottom: 7px;
                }

                &-traveler, &-traveler-count, &-prod-code {
                    font-size: 12px;
                }

                &-prod-code {
                    display: block;
                    text-align: left;
                    margin-bottom: 6px;
                }

                &-info {
                    &-list {
                        margin-bottom: 6px;
                        line-height: 20px;
                    }

                    &-bullet-list {
                        margin-bottom: 6px;
                        line-height: 20px;
                    }
                }

                &-footer {
                    &-toggler, &-print, &-message {
                        border: none;
                        background: none;
                        padding: 0;
                        font-size: 12px;
                        color: #094c74;
                        text-decoration: underline dotted rgb(9, 76, 116);
                        font-weight: bold;

                        &:focus {
                            outline: none;
                        }
                    }

                    &-print, &-message {
                        display: flex;
                        align-items: center;
                        width: 50%;
                    }

                    &-print {
                        justify-content: flex-start;
                    }

                    &-message {
                        justify-content: flex-end;
                    }
                }
            }
        }
    }
</style>
