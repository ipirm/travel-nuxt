<template>
    <div class="container-select">
        <div  @click.stop="openOptionModal" class="wrapper-input">
            <input
            v-model="value"
            type="text"
            class="input"
            @focus="onFocus"
            @blur="onBlur"
            v-if="isPhone"
            autocomplete="false"
            >
            <div v-if="selectedOption && !isPhone">
                {{ selectedOption }}
            </div>
            <div v-if="!selectedOption && !isPhone">
                {{ defaultOption }}
            </div>

            <!--<div v-if="selectedOption && isPhone">-->
                <!--<span v-if="isPhone">+ </span>{{ selectedOption }}-->
            <!--</div>-->
            <!--<div v-if="!selectedOption && isPhone">-->
                <!--<span v-if="isPhone">+ </span>{{ defaultOption }}-->
            <!--</div>-->
        </div>
        <div v-if="activeOptions" class="options">
            <div v-if="!options.length || !autocompleteOptions.length" class="no-options">
                {{ emptyLabel }}
            </div>
            <div v-for="(option, key) in autocompleteOptions" :key="key" class="option" @click="setOption(option)">
                <span v-if="isPhone">+</span>{{ option }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: 'Enter'
            },
            options: {
                type: Array,
                default: () => []
            },
            emptyLabel: {
                type: String,
                default: 'Is empty...'
            },
            defaultOption: {
                type: [String, Number],
                default: ''
            },
            index: {
                type: [String, Number],
                default: null
            },
            isPhone: {
                type: Boolean,
                default: false
            },
        },
        data: () => ({
            selectedOption: null,
            activeOptions: false,
            value: '',
            focusInput: false
        }),
        computed: {
            autocompleteOptions() {
                let checking = this.value.toString().replace(/\D/g,'');
                return this.options.filter(item => item.toString().includes(checking))
            }
        },
        mounted() {
            document.addEventListener('click', () => this.focusInput ? this.openOptionModal() : this.closeOptionModal())
        },
        methods: {
            setOption(option) {
                this.value = '+' + option
                this.selectedOption = option

                const body = {
                    index: this.index,
                    value: option
                }
                this.$emit('selected-option', body)
            },
            onFocus() {
                this.focusInput = true
            },
            onBlur() {
                this.focusInput = false
            },
            closeOptionModal() {
                this.activeOptions = false
            },
            openOptionModal() {
                this.activeOptions = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-select {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        justify-content: space-between;
        position: relative;
    }

    .wrapper-input {
        display: flex;
        position: relative;
        align-items: center;
        height: 40px;
        border: solid 1px #b5c9d5;
        padding: 0px 10px 0px 10px;
        background-color: white;
        border-radius: 2px;
        justify-content: space-between;
    }

    input[type="text"] {
        color: #01080c;
        border-left: none;
        border-right: none;
        outline: none;
        font-size: 13px;
        width: 100%;
    }

    .right-text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        padding-left: 5px;
    }

    .no-options {
        padding: 10px;
    }

    .options {
        position: absolute;
        margin-top: 39px;
        background-color: white;
        border-left: solid 1px #b5c9d5;
        border-right: solid 1px #b5c9d5;
        border-bottom: solid 1px #b5c9d5;
        width: 100%;
        z-index: 8;
        max-height: 200px;
        overflow: auto;
    }

    .option {
        padding: 10px;
        cursor: pointer;
        &:hover {
            background-color: #9db7c7;
            color: white;
        }
    }
</style>
