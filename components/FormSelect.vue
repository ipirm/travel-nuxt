<template>
  <div class="form-select dropdown form-control" @click="showDropdown=!showDropdown">
    <span>
      {{ displayProperty ? selectedItem[displayProperty] : selectedItem }}
      <span class="caret" :class="{'show': showDropdown}"></span>
    </span>
    <div class="dropdown-menu" :class="{'show': showDropdown}">
      <div
        v-for="item in filteredItems"
        :key="displayProperty ? item[displayProperty] : item"
        class="dropdown-item"
        @click="onClick(item)"
      >
        {{ displayProperty ? item[displayProperty] : item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: [String, Number],
      required: true
    },
    displayProperty: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      showDropdown: false,
      selectedItem: this.items[this.activeIndex]
    }
  },

  computed: {
    filteredItems() {
      return this.items.filter(item => this.selectedItem !== item)
    }
  },

  methods: {
    onClick(item) {
      this.selectedItem = item
      this.$emit('select', item)
    }
  }
}
</script>
