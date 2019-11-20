<template>
    <div class="page-booking">
        <div class="breadcrumb-container">
            <transition name="fade" appear>
                <div v-if="loading" class="loading-spinner-bg">
                    <loading-spinner :loading="true"/>
                </div>
            </transition>
            <div class="bread-crumbs">
                <bread-crumbs/>
            </div>
        </div>
        <div class="container">
            <h2 class="text-center">My Bookings</h2>
            <span class="page-booking-subtitle">Upcoming</span>
            <card v-for="(item,index) in myBookings" :key="index" :data="item" />
            <span class="page-booking-subtitle page-booking-mt">Past and canceled</span>
            <PastCard v-for="(item,index) in myCanceledBookings" :key="index" :data="item" />
        </div>
    </div>
</template>

<script>
    import BreadCrumbs from '@/components/BreadCrumbs'
    import Card from '@/components/mybookings/Card'
    import PastCard from '@/components/mybookings/PastCard'
    import {mapState} from 'vuex'

    export default {
        auth: false,
        components: {
            BreadCrumbs,
            Card,
            PastCard
        },
        computed: {
            ...mapState('auth', ['user']),
            ...mapState('booking', ['myBookings']),
            ...mapState('booking', ['myCanceledBookings'])
        },
     async mounted() {
          await  this.$store.dispatch('booking/getMyBookings', this.user.id)
          await  this.$store.dispatch('booking/getMyCanceledBookings', this.user.id)
        }

    }
</script>

<style scoped lang="scss">
    @import '~assets/scss/module-variables';

    .breadcrumb-container {
        max-width: 1410px;
        margin: 15px auto 0 auto;
    }

    .page-booking {
        margin-bottom: 67px;

        h2 {
            margin-bottom: 30px;
        }

        &-subtitle {
            font-size: 22px;
            color: #052e46;
            font-weight: 500;
            margin-top: 22px;
            text-decoration: none solid rgb(5, 46, 70);
        }

        &-mt {
            margin-top: 33px;
            display: inline-block;
        }
    }
</style>
