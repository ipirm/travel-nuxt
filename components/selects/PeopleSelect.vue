<template>
    <div class="modal-content-spinner">
        <div class="modal-content-spinner-info">
            <div class="modal-content-spinner-title">{{name}}</div>
            <div class="modal-content-spinner-number">{{description}}</div>
        </div>
        <div class="modal-content-spinner-box">
            <div v-on:click="minus" class="modal-content-spinner-item" v-bind:class="{ disabled: !canMinus }">
                <lx-svg-icon h="18px" w="18px" icon="minus"/>
            </div>
            <div class="modal-content-spinner-sum">{{value}}</div>
            <div v-on:click="plus"  class="modal-content-spinner-item">
                <lx-svg-icon h="18px" w="18px" icon="plus-secondary"/>
            </div>
        </div>
    </div>
</template>

<script>
  import LxSvgIcon from '@/components/LxSvgIcon'
  export default {
    components: {
      LxSvgIcon,

    },
    data() {
      return {
        isProcessing: false
      }
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      value: {
        type: Number,
        default: 0
      }
    },
    computed: {
      canMinus() {
        return this.value > 0
      }
    },
    methods: {
      minus() {
        if (this.canMinus) {

            if (this.isProcessing === true) {
                return;
            }else{
                this.isProcessing = true;
            }
            setTimeout(() => {
                this.isProcessing = false;
            }, 500);

            this.$emit('change', this.value-1)
        }
      },
      plus() {
        if (this.isProcessing === true) {
          return;
        }else{
            this.isProcessing = true;
        }
        setTimeout(() => {
          this.isProcessing = false;
        }, 500);
        this.$emit('change', this.value+1)
      }
    }

  }
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';
.modal-content-spinner {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    &-info {
        margin-right: 20px;
    }

    &-title {
        color: #01080c;
        font-size: 13px;
        font-weight: 500;
    }

    &-number {
        color: #6b94ac;
        font-size: 13px;
        font-weight: 500;
    }

    &-box {
        display: flex;
        align-items: center;
    }

    &-sum {
        font-size: 16px;
        color: #01080c;
        font-weight: 500;
        text-align: center;
        margin: 0 10px;
    }

    &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 26px;
        height: 26px;
        border: 1px solid #b5c9d5;
        border-radius: 2px;
        &.disabled{
            background-color: #e6edf1;
        }

        svg {
            color: #6b94ac;
        }

        &:last-child {
            background-color: #fff;
        }
    }
}
</style>
