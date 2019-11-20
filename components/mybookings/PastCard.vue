<template>
    <div class="overlay-past-card">
        <div class="overlay-past-card-desktop">
            <div class="overlay-past-card-left">
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
                </div>
            </div>
            <div class="overlay-past-card-right">
                <div class="overlay-past-card-right-cancelled" v-if="cancelled">Cancelled</div>
                <span class="overlay-past-card-right-price"><span class="dollar" v-if="data.payment.currency === 'USD'">$</span>{{ data.payment.amount }}</span>
                <button class="overlay-past-card-right-book-again">Book again</button>
            </div>
        </div>
        <div class="overlay-past-card-mobile">
            <div class="overlay-past-card-top">
                <div class="card-header">
                    <span class="card-right-date">{{ data.date }}</span>
                    <lx-svg-icon icon="clock" w="14" h="14"></lx-svg-icon>
                    <span class="card-right-time">{{  data.product_state.city.i18n.name }} day</span>
                </div>
                <div class="card-right-content">
                    <span class="card-right-title">{{ data.product_state.name}}</span>
                    <span class="card-right-place">{{  data.product_state.city.i18n.name }}</span>
                    <span class="card-right-prod-code">Product code: {{ data.code}}</span>
                </div>
            </div>
            <div class="overlay-past-card-bottom">
                <div class="overlay-past-card-bottom-header">
                    <div class="overlay-past-card-right-cancelled" v-if="cancelled">Cancelled</div>
                    <button class="overlay-past-card-right-book-again">Book again</button>
                </div>
                <span class="overlay-past-card-right-price"><span class="dollar">$</span> {{ parseInt(data.amount_to_pay)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import LxSvgIcon from '@/components/LxSvgIcon';

    export default {
        components: {
            LxSvgIcon
        },
     props: {
         data: {
             type: Object,
             required: true
         }
     },
        data() {
            return {
                cancelled: true
            };
        }
    }
</script>

<style scoped lang="scss">
.overlay-past-card {
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
        flex-direction: column;
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

        &-book-again {
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

        &-cancelled {
            font-size: 13px;
            color: #094c74;
            margin-bottom: 20px;
            text-decoration: none solid rgb(9, 76, 116);
            text-transform: capitalize;
        }
    }
}

.card {
    &-left {
        margin-right: 23px;
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

        &-title, &-place {
            display: block;
        }
    }
}

@media (max-width: 990px) {
    .overlay-past-card {
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

        &-top, &-bottom {
            margin: 18px;
        }

        &-top {
            border-bottom: 1px solid #e6edf1;
        }

        &-bottom {
            margin-top: 0;

            &-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
        }

        &-right {
            &-cancelled {
                margin-bottom: 0;
            }
        }
    }

    .card {
        &-header {
            background: none;
            padding: 0;
            border: 0;
            margin-bottom: 8px;
        }

        &-right {
            &-prod-code {
                display: block;
                text-align: left;
                margin-bottom: 17px;
            }
        }
    }
}
</style>
