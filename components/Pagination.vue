<template>
    <div class="container-pagination">
        <div class="item icon-rotate-left" :style="{color: localPstNumber === 1 ? '#b5c9d5' : ''}" @click="prev()">
            <lx-svg-icon icon="arrow-bottom" w="20" h="20"/>
        </div>

        <div class="container-items">
            <div
                    v-for="(item, key) in pageArray"
                    :key="key"
                    :class="{'item-present': pageArray[key] === localPstNumber, 'item-no-state': key === 2 && itemNoState && quantity>4}"
                    class="item"
                    @click="clickItem(key)"
            >
                {{ item }}
            </div>
        </div>
        <div class="item icon-rotate-right" :style="{color: localPstNumber === quantity ? '#b5c9d5' : ''}"
             @click="next()">
            <lx-svg-icon icon="arrow-bottom" w="20" h="20"/>
        </div>
    </div>
</template>

<script>
  import LxSvgIcon from '@/components/LxSvgIcon'

  export default {
    components: { LxSvgIcon },
    props: {
      quantity: {
        type: Number,
        required: true
      },
      presentNumber: {
        type: Number,
        default: 1
      }
    },
    data: () => ({
      localPstNumber: 1,
      pageArray: [],
      itemNoState: true
    }),
    computed: {
      getPagArray: {
        get() {
          return this.pageArray
        },
        set(value) {
          this.pageArray = value
        }
      }
    },
    watch: {
      presentNumber() {
        if (this.localPstNumber != this.presentNumber) {
          this.localPstNumber = this.presentNumber
        }
      },
      quantity() {
        if (this.quantity < 5) {
          let result = [];
          for (let i = 1; i <= this.quantity; i++) {
            result.push(i)
          }
          this.pageArray = result;
        } else {
          this.pageArray = [this.localPstNumber, this.localPstNumber + 1, '...', this.quantity]
        }
      }
    },
    created() {
      this.localPstNumber = this.presentNumber
      if (this.quantity < 5) {
        let result = [];
        for (let i = 1; i <= this.quantity; i++) {
          result.push(i)
        }
        this.pageArray = result;
      } else {
        this.pageArray = [this.localPstNumber, this.localPstNumber + 1, '...', this.quantity]
      }

    },
    methods: {
      clickItem(key) {
        if (key === 2 && this.itemNoState && this.quantity > 4) return

        if (key < 2 && this.getPagArray[key] < this.quantity - 2) {
          this.getPagArray.splice(0, 2, this.getPagArray[key], this.getPagArray[key] + 1)
        }

        // if we reach the end of the array, we change the "..." to the number
        if (this.getPagArray[1] === this.quantity - 2) {
          this.getPagArray.splice(2, 1, this.quantity - 1)
        } else {
          if (this.quantity >= 5) {
            this.getPagArray.splice(2, 1, '...')
          }
          this.itemNoState = false

        }

        // When clicking on the last number
        if (key === 3) {
          this.getPagArray.splice(0, 3, this.quantity - 3, this.quantity - 2, this.quantity - 1)
          this.itemNoState = false
          this.localPstNumber = this.getPagArray[key]
        }

        if (this.localPstNumber < this.quantity - 3) {
          this.localPstNumber = this.getPagArray[key] - 1
        } else {
          this.localPstNumber = this.getPagArray[key]
        }

        this.$emit('click-item', this.localPstNumber)
      },
      prev() {
        if (this.localPstNumber > 1) {
          if (this.localPstNumber === this.quantity - 3) {
            this.getPagArray.splice(0, 3, this.localPstNumber - 1, this.localPstNumber, '...')
            this.itemNoState = true
          } else if (this.localPstNumber < this.quantity - 2) {
            this.getPagArray.splice(0, 2, this.localPstNumber - 1, this.localPstNumber)
          }

          this.localPstNumber -= 1
          this.$emit('click-item', this.localPstNumber)
        }
      },
      next() {
        if (this.localPstNumber < this.quantity) {
          if (this.localPstNumber < this.quantity - 4) {
            this.getPagArray.splice(0, 3, this.localPstNumber + 1, this.localPstNumber + 2, '...')
          } else if (this.localPstNumber === this.quantity - 4) {
            this.getPagArray.splice(0, 3, this.localPstNumber + 1, this.localPstNumber + 2, this.localPstNumber + 3)
          }

          this.localPstNumber++
          this.$emit('click-item', this.localPstNumber)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .pagination {
        margin-bottom: 40px;
    }

    .container-items, .container-pagination {
        display: flex;
    }

    .container-items {
        margin-left: 14px;
        margin-right: 14px;
        justify-content: space-between;
    }

    .item {
        cursor: pointer;
        border: 1px solid #b5c9d5;
        height: 36px;
        width: 36px;
        margin-right: 5px;
        border-radius: 2px;
        font-size: 13px;
        color: #01080c;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: $blue-light;
            color: white;
        }

        &:last-child {
            margin-right: 0px;
        }
    }

    .item-present {
        background-color: $blue-light;
        color: white;
    }

    .item-no-state {
        cursor: auto;

        &:hover {
            background-color: white;
            color: #01080c;
        }
    }

    .icon-rotate-left {
        transform: rotate(90deg)
    }

    .icon-rotate-right {
        transform: rotate(-90deg)
    }
</style>
