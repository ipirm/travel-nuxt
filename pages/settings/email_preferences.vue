<template>
  <div class="email-preferences">
    <h4>Email Preferences</h4>
    <alert class="alert" type="info" :text="alertText" />
    <div v-for="(item, key) in 3" :key="key" class="setting-checkbox-container">
      <div class="checkbox-header">
        Lorem ipsum dolor sit amet
      </div>
      <div class="checkbox-desc">
        Сonsectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpa tDone placerat nis magna, et faucibus arcu condimentum sed.
      </div>
      <checkbox />
    </div>
    <button type="submit" class="btn btn-primary">
      Save
    </button>
  </div>
</template>

<script>
import Alert from '~/components/Alert'
import Checkbox from '~/components/checkbox/vanillaCheckbox'

export default {
  layout: 'settings',
  components: { Alert, Checkbox },
  data: () => ({
    alertText: 'Please note: you will always receive all essential communication regarding your bookings, and enquiries regardless of your set preferences.'
  })
}
</script>

<style lang="scss" scoped>
.email-preferences {
  min-height: 630px;
}

.setting-checkbox-container {
  margin-top: 1rem;
  max-width: 488px;
  color: #052e46;
}

.checkbox-header {
  font-weight: 500;
  font-size: 16px;
}

.checkbox-desc {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 1rem;
}

.alert {
  max-width: 724px;
}
</style>
