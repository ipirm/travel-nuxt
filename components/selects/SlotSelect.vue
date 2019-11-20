<template>
    <div class="container-select">
        <div class="wrapper-select" @click="openOptionModal()" :class="{'wrapper-select-open':activeOptions}">
            <div class="placeholder">
                {{ placeholder }}
            </div>

            <div class="right-cont">
                <div class="select-value">
                    {{ value }}
                </div>

            </div>

            <div @click="deleteSelect()">
                <lx-svg-icon :icon="getIcon" w="20" h="20"/>
            </div>
        </div>

        <div v-if="activeOptions" class="slot-container" @click="clickSlot">
            <div class="container-select-slot">
                <div class="wrapper-select-slot">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import LxSvgIcon from '@/components/LxSvgIcon'

  export default {
    components: { LxSvgIcon },
    props: {
      placeholder: {
        type: String,
        default: 'Select...'
      },
      value: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        activeOptions: false,
        stopEventClick: false,
        selectOption: ''
      }
    },
    computed: {
      getIcon() {
        return this.value ? 'close-two' : 'arrow-bottom'
      }
    },
    mounted() {
      document.addEventListener('click', () => this.closeOptionModal())
    },
    methods: {
      closeOptionModal() {
        if (!this.stopEventClick) {
          this.activeOptions = false
        } else {
          this.stopEventClick = false
        }
      },
      deleteSelect() {
        this.$emit('delete');
      },
      openOptionModal() {
        this.stopEventClick = true
        this.activeOptions = !this.activeOptions
      },
      clickSlot() {
        this.stopEventClick = true
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/module-variables";

    .container-select {
        width: 208px;
        position: relative;
    }
    .right-cont {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 1px;
    }
    svg{
        margin-bottom: 10px;
        transition: all .1s;
        .wrapper-select-open & {
            transform: translateY(-50%) rotate(180deg);
            margin-bottom: 0px;
            margin-top: 10px;
        }
    }


    .wrapper-select {
        height: 40px;
        width: 100%;
        font-size: 13px;
        padding: 10px;
        color: $dark-secondary;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        border: 1px solid #b5c9d5;

        &-open{
            border-color: $orange;
        }
    }

    .wrapper-select-slot {
        background-color: white;

        > label {
            padding: 10px;
            font-weight: 600;
        }

        .option:hover {
            background-color: transparent;
        }

        .label-checkbox + .hint {
            padding-left: 27px;
            background-color: transparent !important;
            font-size: 12px;
            color: #999;
        }

    }


    .select-value {
        font-weight: 700;
    }

    .slot-container {
        position: absolute;
        min-width: 205px;
        margin-top: 4px;
        border-radius: 4px;
        box-shadow: 0 1px 7px rgba(0, 0, 0, 0.4);
        z-index: 10;
    }
</style>
