<template>
  <div class="container-form">
    <div class="location">
      <input-select :options="arrayOptions" :default-option="arrayOptions[0]" placeholder="Location" />
      <no-ssr>
        <date-picker v-model="valueDataPicker" class="input-cla input-contaioner" :lang="lang"></date-picker>
      </no-ssr>
      <select-options :options="arrayDuration" placeholder="Duration" class="input-contaioner" />
      <select-options :options="arrayMoney" placeholder="Price" class="input-contaioner" />
    </div>
    <div class="categories">
      <select-options :options="arrayOptions" placeholder="Categories" right-text="Select one or more categories" multi-select />
      <select-options :options="arrayDuration" placeholder="Availability" class="input-contaioner" />
      <select-options :options="arrayDuration" placeholder="More" class="input-contaioner" />
      <select-options :options="arrayMoney" placeholder="Sort by" class="input-contaioner" />
    </div>
  </div>
</template>

<script>
import InputSelect from './selects/InputSelect'
import SelectOptions from './selects/SelectOptions'

export default {
  components: {
    InputSelect,
    SelectOptions
  },
  data: () => ({
    lang: {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
      placeholder: {
        date: 'Date',
        dateRange: 'Select Date Range'
      }
    },
    valueDataPicker: '',
    arrayOptions: [
      'Iceland',
      'USA',
      'Germany',
      'Russia',
      'Ukraine'
    ],
    arrayMoney: [
      '$0 - $500',
      '$500 - $1000',
      '$1000 - $5000',
      '$5000 - $10000'
    ],
    arrayDuration: [
      '1-4 days',
      '4-7 days',
      '7-14 days',
      '14-31 days'
    ]
  })
}
</script>

<style>
.mx-datepicker {
  width: 32%;
}

.mx-input {
  border: 1px solid #b5c9d5;
  padding: 0px 10px 0px 10px;
  border-radius: 2px;
  font-size: 13px;
  color: #01080c;
  height: 40px;
  width: 100%;
}

.mx-input-append {
  margin-right: 6px;
}

@media (max-width: 660px) {
  .mx-datepicker {
    width: 100%;
  }
}
</style>

<style lang="scss" scoped>
.container-form {
  display: flex;
  justify-content: space-between;
  min-width: 1300px;
  max-width: 1300px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.input-contaioner {
  width: 32%;
  margin-top: 0.65rem;
}

.input-location, .input-categories {
  width: 100%;
  margin-bottom: 9px;
}

.location, .categories {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 49.5%;
}

@media (max-width: 1330px) {
  .container-form {
    flex-direction: column;
    min-width: 972px;
  }

  .location, .categories {
    width: 100%;
  }

  .categories {
    margin-top: 9px;
  }
}

@media (max-width: 1024px) {
  .container-form {
    min-width: 640px;
  }
}

@media (max-width: 768px) {
  .container-form {
    margin-bottom: 0;
  }
}

@media (max-width: 660px) {
  .container-form {
    max-width: 320px;
    min-width: 320px;
  }

  .input-contaioner {
    width: 100%;
    margin-bottom: 9px;
  }
}
</style>
