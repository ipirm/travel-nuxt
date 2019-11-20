<template>
    <div class="main-container">
        <div class="bread-crumbs-cont">
            <bread-crumbs name='Booking Confirmed'/>
        </div>

        <div v-if="booking.product_state" class="booking-confirmation-content">
            <div class="title">Payment was successfully done</div>
            <div class="description">You can check the status of your booking in the <router-link to="/mybookings">My Bookings</router-link> section</div>
            <div class="main-block">
                <div class="left-block">
                    <div v-if="booking.product_state" class="image-block">
                        <div :style="'background: url('+ booking.product_state.productPhotos[0].thumbnails['307'] +')'" class="image-block-image"></div>
                    </div>
                    <div class="data-block">
                        <div class="confirmation-number-block">
                            Confirmation number: {{ booking.code }}
                        </div>
                        <div class="title-conf-block">
                            {{ booking.product_state.name }}
                        </div>
                        <div class="location-block">
                            {{ booking.product_state.city.i18n.name }}
                        </div>
                        <div class="times-block">
                            <div class="heading">Start Time</div>
                            <div class="content-date">{{ booking.tripDateTime }}</div>
                        </div>
                        <div class="times-block">
                            <div class="heading">End Time</div>
                            <div class="content-date">{{ booking.tripEndDateTime }}</div>
                        </div>
                        <div class="duration-block">
                            <div class="heading">Duration:</div>
                            <div class="content-data">
                                <lx-svg-icon h="16px" w="14px" icon="clock"></lx-svg-icon>
                                <div class="writing">{{ booking.product_state.productDays.days.length }} day</div>
                            </div>
                        </div>
                        <div class="lead-traveler-adult">
                            <div class="lead-traveller-block">Lead Traveler: {{ getLeadTraveler() }}</div>
                            <div class="adults">{{ getAgeGrData() }}</div>
                        </div>
                        <div class="contact-phone-number">
                            <div class="heading">Contact phone number:</div>
                            <div class="number">{{ getLeadTravellerPhone() }}</div>
                        </div>
                        <div class="divided-block">
                            <div class="divided-left">
                                <div class="traveler-names">
                                    <div class="heading">Traveler names:</div>
                                    <div v-for="tr in booking.bookingTravelers" class="traveler">{{ tr.first_name ? tr.first_name + ' ' + tr.last_name : '' }}</div>
                                </div>
                                <div class="inclusions">
                                    <div class="heading">Inclusions:</div>
                                    <div v-for="inc in booking.product_state.whatsIncludedCategoriesList" class="inclusion">
                                        <div class="inc-point">.</div>
                                        <div class="inc-content">{{ inc.name }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="divided-right">
                                <div v-if="booking.arrival_flight_details" class="hotel-pickup">
                                    <div class="heading">Arrival Flight Details:</div>
                                    <div class="content">{{ booking.arrival_flight_details }}</div>
                                </div>
                                <div v-if="booking.arrival_ship_details" class="hotel-pickup">
                                    <div class="heading">Arrival Ship Details:</div>
                                    <div class="content">{{ booking.arrival_ship_details }}</div>
                                </div>
                                <div v-if="booking.arrival_train_details" class="hotel-pickup">
                                    <div class="heading">Arrival Train Details:</div>
                                    <div class="content">{{ booking.arrival_train_details }}</div>
                                </div>
                                <div v-if="booking.departure_flight_details" class="hotel-pickup">
                                    <div class="heading">Departure Flight Details:</div>
                                    <div class="content">{{ booking.departure_flight_details }}</div>
                                </div>
                                <div v-if="booking.departure_ship_details" class="hotel-pickup">
                                    <div class="heading">Departure Ship Details:</div>
                                    <div class="content">{{ booking.departure_ship_details }}</div>
                                </div>
                                <div v-if="booking.departure_train_details" class="hotel-pickup">
                                    <div class="heading">Departure Train Details:</div>
                                    <div class="content">{{ booking.departure_train_details }}</div>
                                </div>
                                <div class="starting-location">
                                    <div class="heading">
                                        Starting location:
                                    </div>
                                    <div class="content">
                                        {{ booking.product_state.productPickUpDropOff.pickUpPoints[0].place_name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-block">
                    <div class="price-block">
                        <div class="dollar-sign">{{ booking.payment.currency == 'USD' ? '$' : booking.payment.currency }}</div>
                        <div class="price">{{ parseFloat(booking.payment.amount).toFixed(0,2) }}</div>
                    </div>
                    <div @click="openPdfBlank" v-if="booking.product_state.ticket.vaucher_filename" class="print-tickets">
                        <svg class="ticket-svg" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" preserveAspectRatio="none" viewBox="0 0 102 102" xml:space="preserve" height="26" width="26" y="0px" x="0px" id="Layer_1_1569241191242"><g transform="translate(1, 1)"><path d="M3.8,62.2l1.4,1.4l7.8,7.8l1.4,1.4l1.4-1.4c3.5-3.5,9.2-3.5,12.7,0c3.5,3.5,3.5,9.2,0,12.7l-1.4,1.4l1.4,1.4l7.8,7.8  l1.4,1.4l1.4-1.4l56.6-56.6l1.4-1.4l-1.4-1.4L88,27.6l-1.4-1.4l-1.4,1.4c-3.5,3.5-9.2,3.5-12.7,0c-3.5-3.5-3.5-9.2,0-12.7l1.4-1.4  L72.4,12l-7.8-7.8l-1.4-1.4l-1.4,1.4L5.2,60.8C5.2,60.8,3.8,62.2,3.8,62.2z M9.5,62.2l36.1-36.1l4.2,4.2l2.8-2.8l-4.2-4.2L63.2,8.5  l5.1,5.1c-3.7,5.1-3.3,12.3,1.3,16.8c4.6,4.6,11.7,5,16.8,1.3l5.1,5.1L76.7,51.6l-4.2-4.2l-2.8,2.8l4.2,4.2L37.8,90.5l-5.1-5.1  c3.7-5.1,3.3-12.2-1.3-16.8c-4.6-4.6-11.8-5-16.8-1.3C14.6,67.3,9.5,62.2,9.5,62.2z M52.6,33.2l5.7,5.7l2.8-2.8l-5.7-5.7L52.6,33.2z   M34.8,59.5l13.6-13.6L45.6,43L32,56.6L34.8,59.5z M42.2,67l13.6-13.6L53,50.5L39.4,64.1L42.2,67z M61.1,41.7l5.7,5.7l2.8-2.8  l-5.7-5.7L61.1,41.7z" vector-effect="non-scaling-stroke" style="fill: rgb(9, 76, 116);"/></g></svg>
                        <div class="writing">
                            <div class="writing-content">Print Tickets</div>
                            <svg class="line-svg" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" preserveAspectRatio="none" viewBox="0 0 118 3" width="118" height="3">
                                <g transform="translate(1, 1)"><defs><path id="path-157311764246840" d="M22 920 C22 920 138 920 138 920" vector-effect="non-scaling-stroke"/></defs><g transform="translate(-22, -920)"><path d="M22 920 C22 920 138 920 138 920" style="stroke-width: 1; stroke: rgb(9, 76, 116); stroke-linecap: butt; stroke-linejoin: miter; fill: none; stroke-dasharray: 1;" vector-effect="non-scaling-stroke"/></g></g>
                            </svg>
                        </div>
                    </div>
                    <div class="message-operator">
                        <svg class="chat-svg" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" preserveAspectRatio="none" viewBox="0 0 24.799999237060547 24.799999237060547" xml:space="preserve" height="22" width="22" y="0px" x="0px" id="Layer_1_1569241239250"><g transform="translate(1, 1)"><path d="M6.7,1.8c-1.2,0-2.1,0.9-2.1,2.1V5h-1C2.4,5,1.5,5.9,1.5,7.1v3.2v6.2c0,1.2,0.9,2.1,2.1,2.1h1.9l2,2c0.2,0.2,0.5,0.2,0.7,0  c0,0,0,0,0,0l2-2h6.1c1.2,0,2.1-0.9,2.1-2.1v-1h1c1.2,0,2.1-0.9,2.1-2.1V3.9c0-1.2-0.9-2.1-2.1-2.1L6.7,1.8z M6.7,2.9h12.6  c0.6,0,1,0.5,1,1.1v9.5c0,0.6-0.5,1-1,1h-1V7.1c0-1.2-0.9-2.1-2.1-2.1H5.7V3.9C5.7,3.3,6.1,2.9,6.7,2.9z M3.6,6h12.6  c0.6,0,1,0.5,1,1v7.9c0,0,0,0,0,0.1v1.6c0,0.6-0.5,1.1-1,1.1H9.9c-0.1,0-0.3,0.1-0.4,0.2l-1.7,1.7L6,17.8c-0.1-0.1-0.2-0.2-0.4-0.2  H3.6c-0.6,0-1-0.5-1-1.1v-6.2V7.1C2.5,6.5,3,6,3.6,6L3.6,6z M7.7,12c0,0.5-0.4,0.9-0.9,0.9S6,12.5,6,12c0-0.5,0.4-0.9,0.9-0.9  S7.7,11.5,7.7,12z M10.7,12c0,0.5-0.4,0.9-0.9,0.9S9,12.5,9,12c0-0.5,0.4-0.9,0.9-0.9S10.7,11.5,10.7,12z M13.7,12  c0,0.5-0.4,0.9-0.9,0.9c-0.5,0-0.9-0.4-0.9-0.9c0-0.5,0.4-0.9,0.9-0.9C13.3,11.1,13.7,11.5,13.7,12z" vector-effect="non-scaling-stroke" style="fill: rgb(9, 76, 116);"/></g></svg>
                        <div class="writing">
                            <div class="writing-content">Message Operator</div>
                            <svg class="line-operator-svg" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" preserveAspectRatio="none" viewBox="0 0 118 3" width="118" height="3">
                                <g transform="translate(1, 1)"><defs><path id="path-157311764246840" d="M22 920 C22 920 138 920 138 920" vector-effect="non-scaling-stroke"/></defs><g transform="translate(-22, -920)"><path d="M22 920 C22 920 138 920 138 920" style="stroke-width: 1; stroke: rgb(9, 76, 116); stroke-linecap: butt; stroke-linejoin: miter; fill: none; stroke-dasharray: 1;" vector-effect="non-scaling-stroke"/></g></g>
                            </svg>
                        </div>
                    </div>
                    <div class="description-block">
                        You can cancel this booking, but you'll be charged a fee.
                    </div>
                    <div class="cancel-writing">
                        <div class="writing">
                            Cancel
                        </div>
                        <svg class="line-cancel-svg" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" preserveAspectRatio="none" viewBox="0 0 118 3" width="118" height="3">
                            <g transform="translate(1, 1)"><defs><path id="path-157311764246840" d="M22 920 C22 920 138 920 138 920" vector-effect="non-scaling-stroke"/></defs><g transform="translate(-22, -920)"><path d="M22 920 C22 920 138 920 138 920" style="stroke-width: 1; stroke: rgb(9, 76, 116); stroke-linecap: butt; stroke-linejoin: miter; fill: none; stroke-dasharray: 1;" vector-effect="non-scaling-stroke"/></g></g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex';
    import BreadCrumbs from '@/components/BreadCrumbs'
    import windowWidth from '@/mixins/windowWidth'
    import LxSvgIcon from '@/components/LxSvgIcon'
    import moment from 'moment'

    export default {
        head () {
            return {
                titleTemplate: `Booking-tours.com | Booking Succuess`
            }
        },
        auth: false,
        components: {
            BreadCrumbs,
            LxSvgIcon
        },
        mixins: [windowWidth],
        data: () => ({
        }),
        watch: {
        },
        computed: {
            ...mapState('booking', ['booking']),
        },
        methods: {
            ...mapActions('booking', ['getBooking']),
            getStartDate(string){
                return  moment.unix(string).format('YYYY-MM-DD HH:mm')
            },
            getEndDate(string, mins){
                return  moment.unix(string + 60 * mins).format('YYYY-MM-DD HH:mm')
            },
            getLeadTraveler(){
                let compContext = this;
                let name = '';
                this.booking.bookingTravelers.forEach((item,key) => {
                    if(compContext.booking.bookingTravelers[key].is_lead_traveler){
                        name = compContext.booking.bookingTravelers[key].first_name + ' ' + compContext.booking.bookingTravelers[key].last_name;
                    }
                });

                return name;
            },
            getLeadTravellerPhone(){
                let compContext = this;
                let phone = '';
                this.booking.bookingTravelers.forEach((item,key) => {
                    if(compContext.booking.bookingTravelers[key].is_lead_traveler){
                        phone = compContext.booking.bookingTravelers[key].fullPhone;
                    }
                });

                return phone;
            },
            getAgeGrData(){
                let str = '';
                let compContext = this;
                this.booking.bookingPriceItems.forEach((item,key) => {
                    if(item.quantity > 0){
                        str = str + item.age_group_name + ' ' + item.quantity + ', '
                    }
                });
                let res = str.slice(0, str.length - 2);
                return res;
            },
            openPdfBlank(){
                window.open('https://' + window.location.hostname + this.booking.product_state.ticket.vaucher_filename, '_blank');
            }
        },
        created(){
            this.getBooking(this.$route.params.id);
        }
    }

</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bread-crumbs-cont {
        display: flex;
        justify-content: space-between;
        max-width: 1141px;
        width: 100%;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    .booking-confirmation-content{
        width: 100%;
        max-width: 1141px;
        .title{
            font-size: 36px;
            color: #052e46;
            text-decoration: none solid rgb(5, 46, 70);
            text-align: center;
            font-weight: 500;
            margin-bottom: 24px;
        }
        .description{
            font-size: 16px;
            text-align: center;
            max-width: 897px;
            margin: 0 auto;
            margin-bottom: 62px;
        }
        .main-block{
            .left-block{
                float: left;
                overflow: auto;
                margin-bottom: 88px;
                .image-block{
                    float: left;
                    .image-block-image{
                        width: 130px;
                        height: 130px;
                        background-position: center center !important;
                        background-repeat: no-repeat !important;
                        background-size: cover !important;
                    }
                }
                .data-block{
                    float: left;
                    margin-left: 22px;
                    min-width: 600px;
                    .confirmation-number-block{
                        font-size: 16px;
                        color: #2980b9;
                        text-transform: capitalize;
                        margin-bottom: 12px;
                    }
                    .title-conf-block{
                        font-size: 24px;
                        color: #052e46;
                        margin-bottom: 6px;
                        font-weight: 500;
                    }
                    .location-block{
                        font-size: 14px;
                        color: #052e46;
                        text-decoration: none solid rgb(5, 46, 70);
                        margin-bottom: 16px;
                    }
                    .times-block{
                        margin-bottom: 14px;
                        .heading{
                            font-size: 14px;
                            color: #052e46;
                            text-decoration: none solid rgb(5, 46, 70);
                            line-height: 20px;
                            font-weight: 500;
                        }
                        .content-date{
                            font-size: 14px;
                            color: #052e46;
                            text-transform: capitalize;
                        }
                    }
                    .duration-block{
                        margin-bottom: 20px;
                        overflow: auto;
                        .heading{
                            font-size: 14px;
                            color: #052e46;
                            text-decoration: none solid rgb(5, 46, 70);
                            line-height: 20px;
                            font-weight: 500;
                            margin-bottom: 6px;
                        }
                        .content-data{
                            overflow: auto;
                            svg{
                                float: left;
                            }
                            .writing{
                                float: left;
                                margin-left: 10px;
                                line-height: 14px;
                                font-size: 14px;
                                color: #052e46;
                                text-decoration: none solid rgb(5, 46, 70);
                            }
                        }
                    }
                    .lead-traveler-adult{
                        margin-bottom: 14px;
                        .lead-traveller-block{
                            font-size: 14px;
                            color: #052e46;
                            line-height: 20px;
                        }
                        .adults{
                            font-weight: 500;
                            font-size: 14px;
                            color: #052e46;
                            text-decoration: none solid rgb(5, 46, 70);
                            line-height: 20px;
                        }
                    }
                    .contact-phone-number{
                        margin-bottom: 10px;
                        overflow: auto;
                        .heading{
                            float: left;
                            font-size: 14px;
                            color: #052e46;
                            text-decoration: none solid rgb(5, 46, 70);
                            line-height: 20px;
                            font-weight: 500;
                        }
                        .number{
                            font-size: 14px;
                            color: #052e46;
                            text-decoration: none solid rgb(5, 46, 70);
                            line-height: 20px;
                            float: left;
                            margin-left: 14px;
                        }
                    }
                    .divided-block{
                        .divided-left{
                            float: left;
                            min-width: 320px;
                            .traveler-names{
                                overflow: auto;
                                margin-bottom: 12px;
                                .heading{
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    line-height: 20px;
                                    font-weight: 500;
                                }
                                .traveler{
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    line-height: 20px;
                                }
                            }
                            .inclusions{
                                overflow: auto;
                                .heading{
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    line-height: 20px;
                                    font-weight: 500;
                                }
                                .inclusion{
                                    overflow: auto;
                                    .inc-point{
                                        float: left;
                                        font-size: 10px;
                                    }
                                    .inc-content{
                                        float: left;
                                        margin-left: 14px;
                                        font-size: 14px;
                                        color: #052e46;
                                        line-height: 20px;
                                    }
                                }
                            }
                        }
                        .divided-right{
                            margin-left: 58px;
                            float: left;
                            .hotel-pickup{
                                margin-bottom: 10px;
                                overflow: auto;
                                .heading{
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    line-height: 20px;
                                    font-weight: 500;
                                }
                                .content{
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    line-height: 20px;
                                }
                            }
                            .starting-location{
                                .heading{
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    line-height: 20px;
                                    font-weight: 500;
                                }
                                .content{
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    line-height: 20px;
                                }
                            }
                        }
                    }
                }
            }
            .right-block{
                float: left;
                max-width: 362px;
                padding-top: 24px;
                padding-left: 24px;
                overflow: auto;
                min-height: 479px;
                border-left: 1px solid #e6edf1;
                background-size: cover;
                margin-bottom: 18px;
                .price-block{
                    overflow: auto;
                    overflow-x: hidden;
                    overflow-y: hidden;
                    margin-bottom: 22px;
                    .dollar-sign{
                        float: left;
                        font-size: 16px;
                        color: #052e46;
                        font-weight: 500;
                    }
                    .price{
                        float: left;
                        font-size: 26px;
                        color: #052e46;
                        font-weight: 600;
                        line-height: 25px;
                        margin-left: 5px;
                    }
                }
                .print-tickets{
                    cursor: pointer;
                    overflow: auto;
                    overflow-y: hidden;
                    margin-bottom: 16px;
                    .ticket-svg{
                        float: left;
                    }
                    .writing{
                        height: 29px;
                        float: left;
                        margin-left: 6px;
                        .writing-content{
                            font-size: 13px;
                            color: #094c74;
                            text-decoration: none solid rgb(9, 76, 116);
                            font-weight: 500;
                        }
                        .line-svg{
                            width: 79px;
                            vertical-align: top;
                        }
                    }
                }
                .message-operator{
                    cursor: pointer;
                    overflow: auto;
                    overflow-y: hidden;
                    margin-bottom: 32px;
                    .chat-svg{
                        float: left;
                    }
                    .writing{
                        height: 29px;
                        float: left;
                        margin-left: 6px;
                        .writing-content{
                            font-size: 13px;
                            color: #094c74;
                            text-decoration: none solid rgb(9, 76, 116);
                            font-weight: 500;
                        }
                        .line-operator-svg{
                            width: 116px;
                            vertical-align: top;
                        }
                    }
                }
                .description-block{
                    max-width: 316px;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                    margin-bottom: 14px;
                }
                .cancel-writing{
                    cursor: pointer;
                    .writing{
                        font-size: 13px;
                        color: #094c74;
                        text-decoration: none solid rgb(9, 76, 116);
                    }
                    .line-cancel-svg{
                        width: 41px;
                        vertical-align: top;
                    }
                }
            }
        }
    }
</style>
