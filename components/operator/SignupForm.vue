<template>
  <div>
    <h4 v-if="step1" class="card-title">
      Create a company account
    </h4>
    <h4 v-if="step2" class="card-title">
      Fill contact detailes
    </h4>

    <form v-if="step1">
      <div class="loading-spinner">
        <loading-spinner :loading="loading" />
      </div>

      <div class="form-group">
        <label for="name">Company Name</label>
        <input
          id="name"
          v-model.trim="name"
          type="text"
          class="form-control"
          :class="{'is-invalid': errors.name}"
          @input="errorReset('name')"
          @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.name" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="legal_name">Compane Legal name</label>
        <input
                id="legal_name"
                v-model.trim="legal_name"
                type="text"
                class="form-control"
                :class="{'is-invalid': errors.legal_name}"
                @input="errorReset('legal_name')"
                @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.company_legal_name" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="contact_name">Contact name</label>
        <input
                id="contact_name"
                v-model.trim="contact_name"
                type="text"
                class="form-control"
                :class="{'is-invalid': errors.contact_name}"
                @input="errorReset('contact_name')"
                @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.contact_name" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="contact_email">Contact Email</label>
        <input
                id="contact_email"
                v-model.trim="contact_email"
                type="email"
                class="form-control"
                :class="{'is-invalid': errors.contact_email}"
                @input="errorReset('contact_email')"
                @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.contact_email" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Admin Password</label>
        <div class="input-group input-group-password">
          <input
            id="password"
            v-model.trim="adminPassword"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            :class="{'is-invalid': itemErrors.adminPassword}"
            @input="errorReset('password')"
            @focus="resetError()"
          />
          <div class="input-group-append">
            <div
              class="btn"
              :class="{ active: showPassword }"
              @click="showPassword = !showPassword"
            >
              <lx-svg-icon icon="eye" w="20" h="20"></lx-svg-icon>
            </div>
          </div>
          <div class="invalid-feedback">
            <div v-for="error in itemErrors.password" :key="error">
              {{ error }}
            </div>
          </div>
        </div>
      </div>

      <button @click.prevent="goToSecondStep" type="submit" class="btn btn-signup form-control">
        Continue
      </button>
    </form>

    <form v-if="step2">
      <div class="loading-spinner">
        <loading-spinner :loading="loading" />
      </div>

      <div class="form-group">
        <label class="phone-number-label" for="name">Phone Number</label>
        <basic-select @selected-option="setPhoneIndex" class="traveler-select" :options="phoneIndexes" :default-option="phoneIndexes[0]" placeholder="International Calling Code" />
        <input
                id="phone_number"
                v-model.trim="phone_number"
                type="text"
                class="form-control"
                :class="{'is-invalid': errors.phone_number}"
                @input="errorReset('phone_number')"
                @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.phone_number" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="legal_name">Country</label>

        <basic-select @selected-option="setCountryId" :options="operatorCountries" :default-option="operatorCountries[0]" placeholder="Country" />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.company_legal_name" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="city">City</label>
        <input
                id="city"
                v-model.trim="city"
                type="text"
                class="form-control"
                :class="{'is-invalid': errors.city}"
                @input="errorReset('city')"
                @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.city" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="postal_code">Postal code</label>
        <input
                id="postal_code"
                v-model.trim="postal_code"
                type="text"
                class="form-control"
                :class="{'is-invalid': errors.postal_code}"
                @input="errorReset('postal_code')"
                @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.postal_code" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="street">Address</label>
        <input
                id="street"
                v-model.trim="street"
                type="text"
                class="form-control"
                :class="{'is-invalid': errors.street}"
                @input="errorReset('postal_code')"
                @focus="resetError()"
        />
        <div class="invalid-feedback">
          <div v-for="error in itemErrors.street" :key="error">
            {{ error }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="back-label" @click="goToFirstStep">Back</label>
      </div>

      <button v-if="step1" @click.prevent="goToSecondStep" type="submit" class="btn btn-signup form-control">
        Continue
      </button>
      <button v-if="step2" @click.prevent="createOperator" type="submit" class="btn btn-signup form-control">
        Complete
      </button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import LxSvgIcon from '@/components/LxSvgIcon'
import BasicSelect from '@/components/selects/BasicSelect'
import apiRequest from '@/utils/apiRequest'

export default {
  components: { LxSvgIcon, BasicSelect },

  data() {
    return {
      step1: true,
      step2: false,
      showPassword: false,
      errors: {
        name: null,
        legal_name: null,
        contact_name: null,
        contact_email: null,
        adminPassword: null,
        phone_number: null,
        city: null,
        postal_code: null,
      },

      name: null,
      legal_name: null,
      contact_name: null,
      contact_email: null,
      adminPassword: null,
      phone_country_id: 2,
      phone_number: null,
      head_office_country_id: 2,
      city: null,
      postal_code: null,
      street: null,
    }
  },

  computed: {
    ...mapState('ui', ['phoneIndexesCore','itemErrors','loading']),
    ...mapState('ui', ['phoneIndexes']),
    ...mapState('countries', ['operatorCountries', 'operatorCountriesCore']),
  },

  methods: {
    ...mapMutations('ui', ['SET_LOADING']),
    ...mapMutations('ui', ['RESET_ITEM_ERRORS']),
    ...mapActions('ui', ['getPhoneIndexes']),
    ...mapActions('countries', ['getCountriesOperator']),


    errorReset(field) {
      Vue.set(this.errors, field, null)
    },

    resetError(property) {
        this.RESET_ITEM_ERRORS()
    },

    goToSecondStep(){
        this.step1 = false;
        this.step2 = true;
    },
    goToFirstStep(){
        this.step2 = false;
        this.step1 = true;
    },

    setPhoneIndex(val){
        this.phone_country_id = val;
    },

    setCountryId(val){
        this.head_office_country_id = val;
    },
    async createOperator(){
        let compContext = this;
        this.phoneIndexesCore.forEach(element => {
            if (element.international_calling_code === compContext.phone_country_id) {
                compContext.phone_country_id = element.id
            }
        })
        this.operatorCountriesCore.forEach(element => {
            if (element.name === compContext.head_office_country_id) {
                compContext.head_office_country_id = element.id
            }
        })

        const body = {
            name: this.name,
            companyProfile:{
                legal_name: this.legal_name,
            },
            contactData:{
                contact_name: this.contact_name,
                contact_email: this.contact_email,
                phone_country_id: this.phone_country_id,
                phone_number: this.phone_number,
                head_office_country_id: this.head_office_country_id,
                city: this.city,
                postal_code: this.postal_code,
                street: this.street,
            },
            adminPassword: this.adminPassword
        }

        try {
            await apiRequest.post('operators?expand=companyProfile,contactData', body)
            this.$notify({
                type: 'success',
                group: 'settings',
                title: 'Success',
                text: 'Thank you. We will review your request and will activate your account',
                duration: 3500,
                speed: 1000
            })
        } catch (e) {
            if(e.email){
                this.errors.contact_email = e.email
                this.$notify({
                    type: 'error',
                    group: 'settings',
                    title: 'Error',
                    text: e.email[0],
                    duration: 3500,
                    speed: 1000
                })
            }
            if(e.adminPassword){
                this.errors.adminPassword = e.adminPassword
                this.$notify({
                    type: 'error',
                    group: 'settings',
                    title: 'Error',
                    text: e.adminPassword[0],
                    duration: 3500,
                    speed: 1000
                })
            }
            if(e.name){
                this.errors.name = e.name
                this.$notify({
                    type: 'error',
                    group: 'settings',
                    title: 'Error',
                    text: e.name[0],
                    duration: 3500,
                    speed: 1000
                })
            }
            if(e.contactData){
                const compContext = this;
                Object.keys(e.contactData[0]).forEach(function(key) {
                    compContext.$notify({
                        type: 'error',
                        group: 'settings',
                        title: 'Error',
                        text: e.contactData[0][key][0],
                        duration: 3500,
                        speed: 1000
                    })
                });
            }
            this.errors = e;
            console.log(this.errors, "After");

//            if (e.response && e.response.data) this.errors = e.response.data
//            else console.log(e, e.response)
        }
    }

  },
  created(){
      this.getCountriesOperator();
      this.getPhoneIndexes();
  }
}
</script>
