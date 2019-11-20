<template>
    <div class="search-container">
        <input type="text" class="search-mini-input"
               placeholder="Search by destination, activity or attraction" v-model="text" v-on:keyup="search($event)" @focus="search($event)" v-on:keyup.enter="selectOnEnter($event)"
               @blur="blur">
        <div class="search-button" v-on:click="searchButton(text)">
            Search
        </div>
        <ul class="search-live"
            v-if="searchLive&&searchLiveList&&(searchLiveList.cities||searchLiveList.countries||searchLiveList.products)&&(!selectedItem||!selectedItem.name)">
            <li class="search-live-item" v-on:click="select(item)" v-for="(item, key) in searchLiveList.cities">
                <div class="search-live-name">{{item.name}}</div>
                <div class="search-live-type">City</div>
            </li>
            <li class="search-live-item" v-on:click="select(item)" v-for="(item, key) in searchLiveList.countries">
                <div class="search-live-name">{{item.name}}</div>
                <div class="search-live-type">Country</div>
            </li>
            <li class="search-live-item" v-on:click="select(item)" v-for="(item, key) in searchLiveList.products">
                <div class="search-live-name">{{item.name}}</div>
                <div class="search-live-type">Tour</div>
            </li>


        </ul>
    </div>
</template>

<script>
  import {debounce} from 'debounce'
  import LxSvgIcon from '@/components/LxSvgIcon'

  export default {
    components: { LxSvgIcon },
    props: {
      searchLive: {
        type: Boolean,
        default: true
      },
      searchLiveList: {
        type: Object,
        required: true,
        default: {}
      },
      selectedItem: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        text: ''
      }
    },
    methods: {
      blur() {
        let _ = this;
        setTimeout(function () {
          _.$emit('blur', event)
        }, 100)
      },
      search: debounce(function (event) {

        if (event.target.value.length > 2) {
          this.$emit('typed', event)
        }
      }, 500),
      select(item) {
        this.$emit('selected', item)
      },
      searchButton(item) {
        this.$emit('selected', {name:item,query:true})
      },
      deleteSelect() {
        this.$emit('delete')
      },
      selectOnEnter(event){
        if(event.target.value){
          this.$emit('selected', {name:event.target.value,query:true})
        }
      }
    },
  }
</script>

<style scoped lang="scss">
    @import '~assets/scss/module-variables';
    .search-container {
        position: absolute;
        display: flex;
        bottom: 0;
        margin-bottom: 5rem;
        height: 77px;
        border-radius: 10px;
        background-color: rgba(5, 38, 58, 0.7);
        width: 55%;
        min-width: 200px;
        max-width: 880px;
        padding: 14px 13px 14px 13px;
        z-index: 2;
    }

    @media (max-width: 1000px) {
        .search-container {
            width: 70%;
        }
    }

    @media (max-width: 700px) {
        .search-container {
            width: 80%;
        }
    }

    @media (max-width: 532px) {
        .search-container {
            width: 90%;
        }
    }


    input[type="text"] {
        width: 100%;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid #ffffff;
        height: 49px;
        font-weight: 500;
        font-size: 16px;
        color: $blue;
        padding-left: 20px;
    }

    .search-icon {
        margin-right: 4px;
        margin-top: -2px;
    }

    .search-button {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        background-color: $yellow;
        font-weight: 500;
        font-size: 16px;
        width: 156px;
        height: 49px;
        color: #041e2e;
        cursor: pointer;
    }

    .search-live{
        list-style: none;
        position: absolute;
        left: 13px;
        top: calc(100% - 5px);
        background-color: #fff;
        width: 460px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 1px 5px 2px rgba(0,0,0,0.2);
        padding: 0;
        margin: 0;
    }

    .search-live-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all .2s;
        padding: 0 15px;
        cursor: pointer;
        height: 40px;
        &:hover{
            background-color: #e6edf1;
        }
        &:active{
            background-color: #094c74;
            .search-live-name{
                color: #fff;
            }
        }
    }

    .search-live-name{
        color: #17191e;
        font-size: 16px;
    }

    .search-live-type{
        color: #53829e;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 500;
    }

</style>
