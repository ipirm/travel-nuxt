<template>
    <div class="harmonic-container">
        <div class="select">
            <div class="select-header" v-on:click="openMyFilter">
                <div class="select-header-text">
                    YOUR FILTERS
                </div>
                <lx-svg-icon v-if="!myFilterOpen"  class="icon-select" icon="plus-secondary" h="16px" w="16px"/>
                <lx-svg-icon v-if="myFilterOpen"  class="icon-select" icon="minus" h="16px" w="16px"/>
            </div>
            <div class="select-list select-list-selected">
                <div v-if="myFilterOpen" v-for="(item, key) in chosenFilters" :key="key" class="option">
                    {{item}}
                </div>
            </div>
        </div>
        <div class="select" v-for="(item, key) in filters" :key="key" :class="{'is-open' : item.active}">
            <div class="select-header" @click="setActiveFirst(key)">
                <div class="select-header-text">
                    {{ item.name }}
                </div>
                <lx-svg-icon class="icon-select" v-show="!item.active" icon="plus-secondary" h="16px" w="16px"/>
                <lx-svg-icon class="icon-select" v-show="item.active" icon="minus" h="16px" w="16px"/>
            </div>
            <div class="select-list" v-if="item.active">
                <div v-for="(item2, key2) in item.items" :key="key2" class="option" :class="{'is-open-child' : item2.active}">
                    <div class="square-wrap">
                        <span class="square" @click="setChosenSecond([key,key2])" v-bind:class="{ active: item2.chosen }"></span>
                        <span class="square-text" @click="setActiveSecond([key,key2])">
                        {{item2.name}}
                        <lx-svg-icon v-if="item2.childs && !item2.active" class="icon-select" icon="plus-secondary" h="16px" w="16px"/>
                        <lx-svg-icon v-if="item2.childs && item2.active" class="icon-select" icon="minus" h="16px" w="16px"/>
                    </span>
                    </div>
                    <div class="select-list" v-if="item2.childs && item2.active">
                        <div v-for="(item3, key3) in item2.childs" :key="key3" class="option">
                            <div class="square-wrap">
                                 <span class="square" @click="setChosenSecond([key,key2,key3])" v-bind:class="{ active: item3.chosen }"></span>
                                <span @click="setActiveSecond([key,key2,key3])">
                                    {{item3.name}}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>



<script>
  import LxSvgIcon from '@/components/LxSvgIcon'
  import {mapState} from 'vuex';

  export default {
    components: { LxSvgIcon },
    data: () => ({
      myFilterOpen: false
    }),
    computed: {
      ...mapState('products', ['filters']),
      chosenFilters() {
        let result = [];
        let filters = this.$store.state.products.filters;
        filters.forEach((item1) => {
          if (item1.items) {
            item1.items.forEach((item2) => {
              if (item2.chosen) {
                result.push(item2.name)
              }
              if (item2.childs) {
                item2.childs.forEach((item3) => {
                  if (item3.chosen) {
                    result.push(item3.name)
                  }
                })
              }
            })
          }
        })
        return result
      }
    },
    methods: {
      openMyFilter(){
        this.myFilterOpen = !this.myFilterOpen;
      },
      setActiveFirst(index) {
        this.$store.dispatch('products/setActiveFilterOption', index);
      },
      setActiveSecond(indexArray) {
        this.$store.dispatch('products/setActiveFilter', indexArray);
      },
      setChosenSecond(indexArray) {
        this.$store.dispatch('products/setChosenFilter', indexArray);
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .harmonic-container {
        width: 235px;
        margin-bottom: 30px;
        .option {
            margin-bottom: 15px;

        }
        .square{
            margin-right: 10px;
        }
    }



    .select-list-selected{
        .option{
            margin-bottom: 5px;
        }
    }

    .square-wrap{
        display: flex;
        align-items: center;
        font-weight: 500;
    }

    .square-text{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 28px);
    }

    .is-open-child{
        .select-list{
            border-top: solid 1px #e6edf1;
            padding-top: 15px;
        }
    }

    .select {
        display: flex;
        cursor: pointer;
        flex-direction: column;
        &.is-open{
             border-bottom: solid 1px #e6edf1;
         }
    }

.icon-select {
  color: #6b94ac;
}

    .select-list{
        .select-list{
            margin-top: 15px;
            padding-left: 20px;
            .square-wrap{
                font-weight: 400;
            }
        }
    }

    .square{
        display: inline-block;
        width: 18px;
        height: 18px;
        border: 1px solid #b5c9d5;
        border-radius: 2px;
        background-color: #fafafa;

        &.active{
            background: url('~assets/icons/tick.svg') no-repeat center;
            background-size: 10px;
            + span{
                font-weight: 500;
            }
        }

        + span{
            color: #094c74;
            font-size: 14px;
        }
    }

    .select-header {
        display: flex;
        font-size: 13px;
        font-weight: 500;
        color: $dark-secondary;
        height: 40px;
        align-items: center;
        justify-content: space-between;
        transition: color ease 0.3s;
        border-bottom: solid 1px #e6edf1;

        &:hover {
            color: #6b94ac;
        }

         + .select-list:not(:empty){
               padding-top: 12px;
           }
    }
</style>
