<template>
    <div class="search-mini ml-55">
        <div class="search-mini-input" v-model="text" v-if="selectedItem&&selectedItem.name"><span class="search-mini-input-text">{{selectedItem.name}}</span>
            <div class="search-live-icon" @click="deleteSelect()">
                <lx-svg-icon :icon="'close-two'" w="20" h="20"/>
            </div>
        </div>
        <input v-if="!selectedItem||!selectedItem.name" type="text" class="search-mini-input"
               placeholder="Destination, Activity" v-on:keyup="search($event)" @focus="search($event)" v-on:keyup.enter="selectOnEnter($event)"
               @blur="blur">
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
    .search-live {
        list-style: none;
        position: absolute;
        left: 13px;
        top: calc(100% - 5px);
        background-color: #fff;
        width: 460px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.2);
        padding: 0;
        margin: 0;
        z-index: 5;

        .search-mini & {
            width: 300px;
            left: 3px;
            top: 100%;
        }
    }

    .search-live-icon {
        position: absolute;
        right: 7px;
        top: 7px;
    }

    .search-live-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all .2s;
        padding: 0 15px;
        cursor: pointer;
        height: 40px;

        .search-mini & {
            height: 36px;
        }

        &:hover {
            background-color: #e6edf1;
        }

        &:active {
            background-color: #094c74;

            .search-live-name {
                color: #fff;
            }
        }
    }

    .search-live-name {
        color: #17191e;
        font-size: 16px;

        .search-mini & {
            font-size: 14px;
        }
    }

    .search-live-type {
        color: #53829e;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 500;

        .search-mini & {
            font-size: 11px;
        }
    }

    .search-mini-input{
        width: 260px;
        height: 36px;
        padding: 7px 0 0 35px;
        border: 1px solid #b5c9d5;
        border-radius: 2px;
        background-color: #ffffff;
        font-size: 13px;
        color: #6b94ac;
        font-weight: 500;

        &-text{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px;
            display: block;
        }
    }

    input[type='text'].search-mini-input {
        width: 260px;
        height: 36px;
        padding: 0 0 0 35px;
        border: 1px solid #b5c9d5;
        border-radius: 2px;
        background-color: #ffffff;
        font-size: 13px;
        color: #6b94ac;
        font-weight: 500;

        &::placeholder {
            color: #6b94ac;
            font-size: 13px;
        }

        &:-ms-input-placeholder {
            color: #6b94ac;
            font-size: 13px;
        }

        &::-ms-input-placeholder {
            color: #6b94ac;
            font-size: 13px;
        }
    }

</style>
