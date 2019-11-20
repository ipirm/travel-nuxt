<template>
  <div class="container-select">
    <div class="wrapper-input">
      <input
        v-model="value"
        type="text"
        class="input"
        @focus="onFocus"
        @blur="onBlur"
        @change="$emit('selected-option', value)"
      >
<!--      <div v-if="selectedOption" class="right-text">-->
<!--        {{ selectedOption }}-->
<!--      </div>-->
<!--      <div v-else class="right-text">-->
<!--        {{ defaultOption }}-->
<!--      </div>-->
    </div>
    <div v-if="activeOptions" class="options">
      <vue-scroll :ops="ops">
      <div v-if="!options.length || !autocompleteOptions.length && value === '+'" class="no-options" >
        {{ emptyLabel }}
      </div>
      <div v-for="(option, key) in autocompleteOptions" :key="key" class="option" @click="setOption(option)">
        {{ option }}
      </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
  import vuescroll from '~/plugins/vue-scroll'
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
    }
  },
  components: {vuescroll},
  data: () => ({
    selectedOption: null,
    activeOptions: false,
    value: '+',
    focusInput: false,
    ops: {
      bar: {
        size: '8px',
        background: '#094c74'
      }
    }
  }),
  computed: {
    autocompleteOptions() {
      return this.options.filter(item => item.toLowerCase().includes(this.value.toLowerCase()))
    }
  },
  mounted() {
    document.addEventListener('click', () =>{
      this.focusInput ? this.openOptionModal() : this.closeOptionModal()
    })
  },
  methods: {
    setOption(option) {
      this.selectedOption = option
      this.$emit('selected-option', option)
      if(this.value === '+') {
        this.value = this.selectedOption
      }
    },
    onFocus() {
      this.focusInput = true;
      if(this.value !== '+')
      this.value = '+';
    },
    onBlur() {
      this.focusInput = false;
      // if(this.selectedOption !== null)
      // this.value = this.selectedOption;
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
  border: none;
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
  height: 150px;
  overflow: hidden;
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
