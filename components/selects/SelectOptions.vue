<template>
    <div>
        <div class="overlay-select" :style="{ width: this.width }">
            <div
                    :class="[{ active: activeElements }, 'overlay-select-active']"
                    @click.stop="openSelects()"
                    v-if="this.value !== ''">{{this.value }}
            </div>
            <div
                    :class="[{ active: activeElements }, 'overlay-select-active']"
                    @click.stop="openSelects()"
                    v-else>{{this.placeholder}}
            </div>
            <div class="options" v-if="activeElements">
                <vue-scroll :ops="ops">
                    <div
                            v-for="(item, key) in getOptions"
                            :key="key"
                            class="option"
                            :class="item.checkbox ? 'item-select-active' : ''"
                            @click="selectOption(item.data, key, item.checkbox)"
                    >
                        <input v-if="item.checkbox === true" v-model="item.data" type="checkbox" class="checkbox">
                        <label class="label-checkbox">{{ item.data }}</label>
                        <label v-if="item.data.hint" class="hint">{{item.data.hint}}</label>
                    </div>
                </vue-scroll>
            </div>
        </div>
    </div>
</template>

<script>
    import LxSvgIcon from '~/components/LxSvgIcon'
    import vuescroll from '~/plugins/vue-scroll'

    export default {
        components: {LxSvgIcon, vuescroll},
        props: {
            width: {
                type: String,
                default: '100px'
            },
            multiSelect: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: 'Select'
            },
            rightText: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                required: true
            },
            sort: {
                type: Boolean,
                default: false
            },
            valueInsteadPlaceholder: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            activeOptions: false,
            activeElements: false,
            value: '',
            stopEventClick: false,
            transformOptions: null,
            ops: {
                bar: {
                    size: '8px',
                    background: '#094c74'
                }
            }
        }),
        computed: {
            getOptions() {
                const a = this.transformOptions
                // sort checkbox true, true, true, false, false
                if (a && this.sort) {
                    a.sort((x, y) => (x.checkbox === y.checkbox) ? 0 : x.checkbox ? -1 : 1)
                    return a
                } else {
                    return a
                }
            },
            getIcon() {
                return Array.isArray(this.value) && !this.value.length ? 'arrow-bottom' : 'close-two'
            }
        },
        mounted() {
            document.addEventListener('click', () => this.activeElements = false)
            this.transformOptions = this.options.map((item) => {
                item = {data: item, checkbox: !!item.value}
                return item
            })
        },
        methods: {
            openSelects() {
                this.activeElements = true

            },
            closeOptionModal() {
                if (!this.stopEventClick) {
                    this.activeOptions = false
                } else {
                    this.stopEventClick = false
                }
            },
            openOptionModal() {
                this.stopEventClick = true
                this.activeOptions = !this.activeOptions
            },
            selectOption(option, key, checkbox) {
                this.activeElements = false
                if (this.multiSelect) {
                    this.stopEventClick = true
                    this.transformOptions.splice(key, 1, {data: option, checkbox: !checkbox})

                    // add || delete option in emit array
                    if (!this.value.some(item => item === option)) {
                        this.value.push(option)
                    } else {
                        this.value = this.value.filter(item => option !== item)
                    }
                    this.$emit('selected-option', this.value)
                } else {
                    const foundIndex = this.transformOptions.findIndex(item => item.checkbox);
                    if (foundIndex !== -1) {
                        this.transformOptions[foundIndex].checkbox = false;
                    }
                    if (key != foundIndex) {
                        this.transformOptions.splice(key, 1, {data: option, checkbox: !checkbox})
                        this.value = option
                        this.$emit('selected-option', this.value)
                    } else {
                        this.$emit('selected-option', null)
                    }

                }
            },
            deleteSelect() {
                this.value = []
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .overlay-select {
        position: relative;
        cursor: pointer;

        &-active {
            padding: 0px 0px 0px 10px;
            border: 1px solid #b5c9d5;
            background-color: #ffffff;
            font-family: 'Quicksand', sans-serif;
            background-image: url("../../assets/icons/select_icon.svg");
            background-size: 16px;
            font-size: 13px;
            color: #01080c;
            text-decoration: none solid rgb(1, 8, 12);
            height: 40px;
            align-items: center;
            display: flex;
            background-repeat: no-repeat;
            background-position: right 10px center;

        }

        &-active:focus {
            border-color: #faab1a;
            outline: none;
        }
    }

    .container-select {
        width: 100%;
        display: flex;
        flex-direction: column;

        justify-content: space-between;
        position: relative;
        color: $dark-secondary;

    }

    .right-container {
        display: flex;
    }

    .options {
        color: $dark-secondary;
        font-family: Quicksand;
        font-size: 13px;
        font-weight: 400;
        text-decoration: none solid rgb(1, 8, 12);
        position: absolute;
        /*margin-top: 45px;*/
        background-color: white;
        width: 100%;
        z-index: 20;
        height: 90px;
        border: 1px solid #b5c9d5;
        border-top: none;

        & .hint {
            display: block;
            padding: 0 0 0 35px;
            height: 16px;
            color: #6b94ac;
            text-decoration: none solid rgb(107, 148, 172);
        }

    }

    .option {
        padding: 10px;
        cursor: pointer;

        &:hover {
            background-color: #e6edf1;
        }
    }

    .right-text {
        font-weight: 700;
        color: #9db7c7;
        padding-right: 5px;
    }

    .checkbox {
        margin-right: 4px;
        background: white;
    }

    .right-select-value {
        color: $dark-secondary;
        font-weight: 700;
        margin-right: 6px;
    }

    input {
        display: none;
    }

    input[type=checkbox] + label:before {
        display: none;
    }

    input[type=checkbox] + label {
        padding: 0;
    }

    .item-select-active {
        background-color: #e6edf1;
    }

    .active {
        border-bottom: none;
    }
</style>
