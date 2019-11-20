<template>
  <form class="form-account-settings" @submit.prevent>
    <transition name="fade" appear>
      <div v-if="loading" class="loading-spinner-bg">
        <loading-spinner :loading="true" />
      </div>
    </transition>

    <div class="form-row">
      <div class="form-group col">
        <label for="full_name">Full Name</label>

        <input
          id="full_name"
          v-model.trim="fullNameComputed"
          type="text"
          class="input-style"
          :class="{'is-invalid': errors.full_name}"
          @input="errorReset('full_name')"
        />

        <div class="invalid-feedback">
          <div v-for="error in errors.full_name" :key="error">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <label for="phone">Phone Number</label>
    <div class="form-row">
      <div class="form-group col-8">
        <input-select
          :options="getPhoneIndex"
          value-instead-placeholder
          :default-option="'+' + getPhoneDefaultIndex.toString()"
          @selected-option="setPhoneCountryId"
        />
      </div>

      <div class="form-group col phone-cont">
        <label for="phone">&nbsp;</label>
        <input
          id="phone"
          v-model.trim="phoneNumberComputed"
          type="number"
          class="input-style"
          :class="{'is-invalid': errors.phone}"
          @input="errorReset('phone')"
        />
        <div class="invalid-feedback">
          <div v-for="error in errors.phone" :key="error">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col">
        <label for="location">Location</label>
        <input
          id="location"
          v-model.trim="locationComputed"
          type="text"
          class="input-style"
          :class="{'is-invalid': errors.phone}"
          @input="errorReset('phone')"
        />
        <div class="invalid-feedback">
          <div v-for="error in errors.phone" :key="error">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col">
        <label>Date Of Birth</label>
        <div class="select-options">
          <select-options width="106px" :options="dd" placeholder="dd" value-instead-placeholder @selected-option="setDay" />
          <select-options width="106px" :options="mm" placeholder="mm" value-instead-placeholder @selected-option="setMonth" />
          <select-options width="106px" :options="getYears" placeholder="yyyy" value-instead-placeholder @selected-option="setYear" />
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col">
        <label>Gender</label>
        <select-options width="320px" :options="genders" :placeholder="genderComputed" value-instead-placeholder @selected-option="setGender" />
      </div>
    </div>

    <button type="submit" class="btn btn-primary" @click="saveProfile()">
      <div>Save</div>
    </button>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import SelectOptions from '@/components/selects/SelectOptions'
import InputSelect from '@/components/selects/InputSelect'

export default {
  components: { SelectOptions, InputSelect },
  data: () => ({
    date_of_birth: { dd: '', mm: '', yyyy: '' },
    errors: {
      full_name: null,
      phone: null,
      location: null
    },
    genders: ['male', 'female'],
    dd: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    mm: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    phoneIndex: [],
    loading: false
  }),

  computed: {
    ...mapState({
      full_name: state => state.auth.user.full_name,
      location: state => state.auth.user.location,
      gender: state => state.auth.user.gender,
      phone_country_id: state => state.auth.user.phone_country_id,
      phone_number: state => state.auth.user.phone_number
    }),

    getYears() {
      const years = []
      const nowYear = new Date().getFullYear()

      for (let i = 0; i < 110; i++) {
        years[i] = nowYear - i
      }

      return years
    },

    getPhoneIndex() {
      const phoneIndex = this.phoneIndex.map(item => '+' + item.international_calling_code.toString())
      return phoneIndex.filter((elem, index, self) => index === self.indexOf(elem))
    },

    getPhoneDefaultIndex() {
      return this.phoneIndex.length && this.phone_country_id ? this.phoneIndex[this.phone_country_id].international_calling_code : ''
    },

    fullNameComputed: {
      get() {
        return this.full_name
      },
      set(value) {
        this.$store.commit('auth/SET_FULLNAME', value)
      }
    },

    phoneNumberComputed: {
      get() {
        return this.phone_number
      },
      set(value) {
        this.$store.commit('auth/SET_PHONE_NUMBER', value)
      }
    },

    locationComputed: {
      get() {
        return this.location
      },
      set(value) {
        this.$store.commit('auth/SET_LOCATION', value)
      }
    },

    genderComputed() {
      return this.gender
    },

    phoneCountryId() {
      return this.phone_country_id
    }
  },

  async mounted() {
    this.phoneIndex = await this.$axios.$get('/api/country/international-calling-codes')
  },

  methods: {
    errorReset() {},
    async saveProfile() {
      this.loading = true

      const user = {
        full_name: this.full_name,
        location: this.location,
        gender: this.gender,
        phone_country_id: parseInt(this.phone_country_id) - 1,
        phone_number: parseInt(this.phone_number)
      }

      try {
        await this.$axios.$post('/api/customer/profile', user)
        this.$notify({
          type: 'success',
          group: 'settings',
          title: 'Success',
          text: 'Profile successfully updated!',
          duration: 3500,
          speed: 1000
        })
      } catch (err) {
        this.$notify({
          type: 'error',
          group: 'settings',
          title: 'Error',
          text: 'Data is incorrect or server problems',
          duration: 5000,
          speed: 1000
        })
      }

      this.loading = false
    },
    setPhoneCountryId(value) {
      let idCountryPhone = null

      this.phoneIndex.forEach((item) => {
        if (typeof item.international_calling_code !== 'string') {
          item.international_calling_code = item.international_calling_code.toString()
        }
        if (item.international_calling_code === value.slice(1) && !idCountryPhone) {
          idCountryPhone = item.id
        }
      })

      this.$store.commit('auth/SET_PHONE_ID', idCountryPhone)
    },
    setGender(value) {
      this.$store.commit('auth/SET_GENDER', value)
    },
    setDay(value) {
      this.date_of_birth.dd = value
    },
    setMonth(value) {
      this.date_of_birth.mm = value
    },
    setYear(value) {
      this.date_of_birth.yyyy = value
    }
  }
}
</script>

<style>
  .wrapper-input input{
    background-color: transparent;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
</style>
<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.select-options {
  display: flex;
}


.input-style {
  border: 1px solid #b5c9d5;
  padding: 0px 10px 0px 10px;
  height: 40px;
  width: 100%;
  border-radius: 2px;
  font-size: 13px;
  color: #01080c;
  outline: none;
}

.input-style:focus {
  border-color: $orange;
}

label {
  font-weight: 500;
  font-size: 13px;
  margin-bottom: 7px;
}

.phone-cont {
  margin-top: -1.7rem;
}

.form-account-settings {
  min-width: 315px;
  position: relative;
}

.loading-spinner-bg {
  width: 100%;
  height: 100%;
  padding-top: 30%;
  background-color: #ffffff94;
  position: absolute;
  z-index: 200;
}

@media (max-width: 350px) {
  .form-account-settings {
    min-width: 295px;
  }
}
</style>
