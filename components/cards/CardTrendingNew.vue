<template>
    <div
            class="trending-card"
            @mouseover="overHoverTrends"
            @mouseleave="leaveHoverTrends"
    >
        <div v-if="!data.frontPageContent" class="trending-card-bg">
            <transition name="fade" appear>
                <div v-if="hoverTrends" class="trending-hover-bg"></div>
            </transition>
        </div>
        <div v-if="data.frontPageContent" class="trending-card-bg-pic">
            <img :src="data.frontPageContent.thumbnails['210']">
        </div>

        <div class="trending-card-text">
            {{ data.name }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data: () => ({
            hoverTrends: false
        }),
        methods: {
            overHoverTrends() {
                this.hoverTrends = true
            },
            leaveHoverTrends() {
                this.hoverTrends = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .trending-card {
        display: flex;
        width: 415px;
        height: 109px;
        box-shadow: 0px 1px 6px 2px rgba(0,0,0,0.1);
        margin-bottom: 22px;
        cursor: pointer;
    }

    .trending-card-bg {
        background: url('~static/images/home/bg-two.jpg') no-repeat;
        background-size: cover;
        width: 209px;
        height: 109px;
        position: relative;
    }

    .trending-card-bg-pic {
        background-size: cover;
        width: 209px;
        height: 109px;
        position: relative;
    }
    .trending-card-bg-pic img{
        width: 209px;
        height: 109px;
    }

    .trending-hover-bg {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba(4, 30, 46, 0.15);
    }

    .trending-card-text {
        width: 206px;
        font-size: 18px;
        color: $blue;
        font-weight: 500;
        display: flex;
        align-items: center;
        padding: 17px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .35s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    @media (max-width: 768px) {
        .trending-card {
            width: 320px;
        }

        .trending-card-bg {
            width: 150px;
        }

        .trending-card-text {
            font-size: 16px;
        }
    }

    @media (max-width: 436px) {
        .trending-card {
            width: 280px;
            height: 88px;
        }

        .trending-card-bg {
            width: 120px;
            height: 88px;
        }
    }
</style>
