<template>
    <div class="reviews-cont">
        <h2>Reviews</h2>
        <div class="review-header">
            <div class="review-header-left">
                <img class="star-image" src="~assets/icons/star.svg" alt="star"/>
                <span class="stars">{{ currentProduct.rating }}</span>
                <div class="review-header-left-text">
                    {{ currentProduct.reviewsCount }} review(s)
                </div>
            </div>
            <div class="blue-button review-header-button" @click="toggleModal()"
                 v-if="isUserCanAddReview && user.id || user.role === 'admin' ">
                Write a Review
            </div>
        </div>
        <div class="review-header-left-text you-should"   v-if="!user.id">
            You should sign in for drop your review
        </div>
        <div class="review-list">
            <div v-for="(item, key) in filteredReviewList()" v-if="filteredReviewList().length" :key="'reviewList'+key"
                 class="review-list-item">
                <div class="review-list-name" :class="{ 'gray-text' : item.percent == '0%' }">
                    {{ item.name }}
                </div>
                <div class="review-assessment-cont">
                    <div :style="{'width': item.percent}" class="review-assessment-percent"></div>
                </div>
                <div class="review-percent" :class="{ 'gray-text' : item.percent == '0%' }">
                    {{ item.percent }}
                </div>
            </div>
        </div>
        <div class="review-comments-list">
            <div v-for="(item, key) in filteredReviewComments" :key="'reviews'+key"
                 class="review-comments-item"
                 v-if="filteredReviewComments.length"
            >
                <div class="rw-comment-head">
                    <img class="star-image" src="~assets/icons/star.svg" alt="star"/>
                    <div class="stars">
                        {{ item.rating }}
                    </div>
                    <div class="rw-comment-name">
                        {{ item.creator.full_name }} &sbquo; &nbsp;
                    </div>
                    <div class="rw-comment-date">
                        {{ filteredDate(item, false)}}
                    </div>
                </div>
                <div class="rw-comment-desc">
                    {{ item.text }}
                </div>
                <div class="rw-comment-subresponse-wrapper" v-if="item.responseToReview">
                    <button class="rw-comment-message" v-if="item.responseToReview">
                        <img class="rw-comment-message-icon" src="~/assets/icons/alarm.svg">
                        <span class="rw-comment-message-text">Message</span>
                    </button>
                </div>
                <div class="rw-comment-response-wrapper" v-if="item.responseToReview !== null">
                    <div class="rw-comment-line"></div>
                    <span class="rw-comment-response">Response</span>
                    <div class="rw-comment-response-content">
                        <div class="rw-comment-response-text-wrapper">
                            <div class="rw-comment-response-author-date">
                                <span class="rw-comment-response-author">{{ item.responseToReview.creator.full_name }},</span>
                                <span class="rw-comment-response-date"> {{ filteredDate(item, true)}}</span>
                            </div>
                            <p class="rw-comment-response-text">
                                {{ item.responseToReview.text }}
                            </p>
                        </div>
                        <button class="rw-comment-response-edit">
                            <img class="rw-comment-response-edit-icon" src="~/assets/icons/pen.svg">
                        </button>
                    </div>
                </div>
                <div class="rw-comments-list-line"></div>
            </div>
        </div>
        <div class="review-wrapper-button" v-if="reviews.length > 3">
            <div class="blue-button review-bottom-button" @click="showAll = !showAll">
                <span v-if="!showAll">Show More</span><span v-if="showAll">No More</span>
            </div>
        </div>
        <transition name="fade">
            <div class="review-modal" v-if="showModal" @click="toggleModal()">
                <div class="review-modal-wrapper" @click.stop>
                    <div class="review-modal-title-area">
                        <h2 class="review-modal-title">Leave review</h2>
                        <span class="review-modal-subtitle">{{ currentProduct.name }}</span>
                        <span class="review-modal-location">{{ currentProduct.city.i18n.name }}</span>
                    </div>
                    <div class="review-modal-rate-area">
                        <h3 class="review-modal-rate-title">Rate your trip</h3>
                        <div class="review-modal-star-area" @mouseleave="modalHoveredRating = -1">
                            <div class="review-modal-star"
                                 v-for="i in 5"
                                 :class="{ active : (i <= modalHoveredRating || i <= modalSelectedRating) }"
                                 @click="modalSelectedRating = i"
                                 @mouseenter="modalHoveredRating = i">
                            </div>
                        </div>
                    </div>
                    <div class="review-modal-text-area">
                        <h3 class="review-modal-text-title">Write your review here</h3>
                        <textarea
                                class="review-modal-textarea"
                                placeholder="Right here"
                                v-model="reviewText"
                        >
                    </textarea>
                        <span class="review-modal-subtextarea">Write 2-3 sentences</span>
                    </div>
                    <div class="review-modal-buttons">
                        <button class="review-modal-button review-modal-cancel" @click="toggleModal()">Cancel</button>
                        <button class="review-modal-button review-modal-send" @click="addReview">Send</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        props: {
            currentProduct: {
                type: Object,
                default: {}
            },
            isUserCanAddReview:{
                type:Boolean,
                default: false
            }
        },
        created() {
            this.$store.dispatch('reviews/getReviews', this.$route.params.id)
        },
        data() {
            return {
                showAll: false,
                showModal: false,
                reviewText: '',
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun ', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                modalHoveredRating: -1,
                modalSelectedRating: -1
            };
        },
        watch: {
            user(newValue, oldValue) {
            },
        },
        computed: {
            ...mapState('reviews', ['reviews']),
            ...mapState('auth', ['user']),
            filteredReviewComments() {
                return this.showAll ? this.reviews : this.reviews.slice(0, 3);
            },
        },
        methods: {
            filteredReviewList() {
                let types = ['Excellent', 'Good', 'Average', 'Rather Poor', 'Bad']
                return this.currentProduct.ratingStats.map((item, index) => {
                    return ({
                        name: types[index],
                        percent: parseInt(item.reviewsCount / this.currentProduct.reviewsCount * 100) + '%'
                    });
                });
            },
            toggleModal() {
                this.showModal = !this.showModal;
                if (this.showModal)
                    document.documentElement.style.overflow = 'hidden';
                else document.documentElement.style.overflow = '';
            },
            addReview() {
                let body = {
                    product_id: parseInt(this.$route.params.id),
                    rating: this.modalSelectedRating,
                    text: this.reviewText
                }
                this.showMore = !this.showMore
                this.$store.dispatch('reviews/addReview', body);
                this.$store.dispatch('reviews/getReviews', this.$route.params.id);
                this.$store.dispatch('products/updateReviewsCount',this.currentProduct.reviewsCount);
                this.toggleModal();
                this.modalSelectedRating = -1;
                this.reviewText = ''
            },
            filteredDate(item, response) {
                let month, year;
                let getDate = (v) => {
                    month = v.created_at.split(' ')[0].split('-')[1]
                    year = v.created_at.split(' ')[0].split('-')[0]
                };
                response ? getDate(item.responseToReview): getDate(item)
                this.months.forEach((item, index) => {
                    if (index === parseInt(month) - 1) month = item
                });
                return `${month} ${year}`
            }
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/module-variables";

    .you-should {
        display: block;
        color: #007bff;
        margin-top: 10px;
    }

    .review {
        &-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, .7);
            z-index: 100;

            &-title {
                font-size: 22px;
                margin-bottom: 10px;

                &-area {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 35px;
                }
            }

            &-subtitle, &-location {
                display: block;
            }

            &-title-area, &-rate-area {
                color: #052e46;
            }

            &-subtitle {
                font-size: 16px;
                margin-bottom: 5px;
            }

            &-location {
                font-size: 13px;
            }

            &-rate {
                &-area {
                    margin-bottom: 30px;
                    width: 100%;
                }

                &-title {
                    font-size: 14px;
                    margin-bottom: 40px;
                }
            }

            &-star {
                width: 45px;
                height: 45px;
                background: url('~assets/icons/star-gray.svg');
                background-size: 45px 45px;
                background-repeat: no-repeat;
                margin-right: 20px;

                &-area {
                    display: flex;
                    cursor: pointer;
                }

                &.active {
                    background-image: url('~assets/icons/star.svg');
                }

                &-last-of-type {
                    margin-right: 0;
                }
            }

            &-text {
                &-area {
                    width: 100%;
                    margin-bottom: 40px;
                }

                &-title {
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                &area {
                    width: 100%;
                    margin-bottom: 10px;
                    border: 1px solid rgb(181, 201, 213);
                    border-radius: 2px;
                    font-size: 14px;
                    padding: 5px;
                    margin-bottom: 0;
                    outline: none;
                }
            }

            &-subtextarea {
                font-size: 13px;
            }

            &-button {
                width: 100px;
                height: 40px;
                border: none;

                &:focus {
                    outline: none;
                }

                &s {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
            }

            &-cancel {
                color: rgb(41, 128, 185);
                background-color: rbg(230, 237, 241);
                margin-right: 10px;
            }

            &-send {
                color: white;
                background-color: rgb(41, 128, 185);
            }

            &-wrapper {
                background-color: white;
                padding: 40px 50px;
                min-width: 300px;
                min-height: 300px;
                width: 600px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            &-textarea {
                resize: none;
            }
        }
    }

    .rw {
        &-comment {
            &-line {
                width: 100%;
                height: 2px;
                background-color: #e6edf1;
                border-radius: 1px;
                margin: 20px 0;
            }

            &-response {
                font-weight: 500;
                font-size: 13px;
                margin-bottom: 10px;

                &-content {
                    display: flex;
                }

                &-edit {
                    border: none;
                    background: none;
                    width: 18px;
                    height: 18px;

                    &:focus {
                        outline: none;
                    }
                }

                &-text {
                    margin-bottom: 20px;

                    &-wrapper {
                        flex-grow: 1;
                    }
                }

                &-author-date, &-text {
                    margin-top: 10px;
                    font-size: 13px;
                }

                &-author {
                    font-weight: 500;
                }
            }

            &s-list-line {
                background: #b5c9d5;
                width: 100%;
                height: 2px;
                border-radius: 1px;
                margin-top: 20px;
            }

            &-message {
                border: none;
                background: none;

                &:focus {
                    outline: none;
                }

                &:nth-child(1) {
                    display: block;
                    margin-left: auto;
                }

                &-text {
                    font-size: 13px;
                    font-weight: 500;
                    color: #094c74;
                    border-bottom: 1px dotted #999;
                }
            }
        }
    }

    .reviews-cont {
        h2 {
            font-weight: 400;
        }
    }

    .review {
        font-size: 14px;
        color: $blue-dark;
    }

    .review-list {
        width: 100%;
    }

    .review-wrapper-button {
        margin-top: 10px;
    }

    .star-image {
        width: 20px;
        height: 20px;
        margin-top: 3px;
    }

    .stars {
        font-weight: 600;
        color: $yellow;
        font-size: 14px;
        line-height: 28px;
        margin-left: 4px;
        margin-right: 8px;
    }

    .blue-button {
        border: 1px solid $blue-light;
        font-weight: 500;
        font-size: 14px;
        color: $blue-light;
        transition: all ease 0.3s;

        &:hover {
            background-color: $blue-light;
            color: white;
        }
    }

    .review-bottom-button,
    .review-header-button {
        width: 100%;
        border-radius: 3px;
        margin-top: 12px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .reviews {
        color: #6b94ac;
        display: flex;
        align-items: center;
        margin-top: 2px;
        font-size: 14px;
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .review-header-left {
        display: flex;
    }

    .review-header-left-text,
    .rw-comment-name {
        font-size: 14px;
        font-weight: 500;
        margin-top: 4px;
    }

    .review-header-button {
        margin-top: -10px;
        width: 201px;
    }

    .review-bottom-button {
        width: 201px;
    }

    .review-list {
        width: 500px;
        margin-top: 19px;

    }

    .review-list-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .review-assessment-cont {
        border-radius: 2px;
        height: 10px;
        max-width: 302px;
        width: 100%;
        background-color: #e6edf1;
    }

    .review-assessment-percent {
        background-color: $orange;
        height: 10px;
        border-radius: 2px;
    }

    .review-list-name {
        width: 89px;
        font-size: 14px;
        color: $dark-secondary;
    }

    .gray-text {
        color: #6b94ac !important;
    }

    .review-comments-list {
        padding-top: 10px;
        margin-top: 30px;
        border-top: 1px solid #e6edf1;
    }

    .review-comments-item {
        margin-top: 20px;
    }

    .review-percent {
        color: $dark-secondary;
        font-size: 14px;
        margin-left: 16px;
    }

    .rw-comment-head {
        display: flex;
    }

    .rw-comment-desc {
        font-size: 14px;
    }

    .rw-comment-date {
        font-size: 14px;
        margin-top: 5px;
    }

    .review-wrapper-button {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
</style>
