import Vue from 'vue'

import LoadingSpinner from '@/components/common/LoadingSpinner'
import moment from 'moment';

Vue.component('loading-spinner', LoadingSpinner)
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM DD, YYYY')
  }
});
