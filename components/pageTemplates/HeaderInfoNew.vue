<template>
    <header class="header">
        <div v-if="head" class="header-text-top">
            {{ head }}
        </div>
        <div v-if="description" class="header-description">
            {{ description }}
        </div>
        <div @click.stop="selectItem({ name: head })" v-if="buttonText" class="header-button">
            {{ buttonText }}
        </div>
        <div :style="'background: url(' + backgroundImage + ');'" class="header-bg">

        </div>
    </header>
</template>

<script>
    export default {
        props: {
            head: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            buttonText: {
                type: String,
                default: ''
            },
            backgroundImage: {
                type: String,
                default: ''
            },
        },
        methods:{
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
        }
    }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .header {
        background-position: center center;
        background-size: cover;
        width: 100%;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 25rem;
        position: relative;
    }

    .header-bg {
        background-image: linear-gradient(180deg, rgba(12, 22, 31, 0.30) 1%, rgba(4, 30, 46, 0.65) 100% );
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .header-bg img{
        width: 100%;
        height: 25rem;
    }

    .header-text-top {
        font-size: 44px;
        font-weight: 700;
        z-index: 2;
    }

    .header-description {
        font-weight: 500;
        font-size: 16px;
        z-index: 2;
        max-width: 748px;
        text-align: center;
        margin-bottom: 1.7rem;
        margin-top: 1rem;
    }

    .header-button {
        background-color: #ffffff;
        height: 50px;
        width: 211px;
        border-radius: 5px;
        font-size: 16px;
        color: $blue;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        cursor: pointer;
    }
</style>
