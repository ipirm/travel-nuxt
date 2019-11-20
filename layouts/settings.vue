<template>
  <div>
    <header-bar />
    <div class="bread-crumbs-container">
      <bread-crumbs class="bread-crumbs" />
    </div>
    <div class="account-settings">
      <div class="container-fluid mx-auto">
        <h2>Account Settings</h2>
        <div class="settings-content">
          <div class="nav-bar">
            <div v-for="(item, key) in navItems" :key="key" class="nav-item">
              <i18n-link class="nav-link" :class="{'nav-link-active': $route.path === item.link}" :to="item.link">
                <div class="label-link">
                  {{ item.label }}
                </div>
                <lx-svg-icon class="icon-cont" :icon="item.icon" w="20" h="20" />
              </i18n-link>
            </div>
          </div>
          <nuxt />
        </div>
      </div>
    </div>

    <footer-bar />
    <no-ssr>
      <notifications group="settings" position="top right" />
    </no-ssr>
  </div>
</template>

<script>
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import BreadCrumbs from '@/components/BreadCrumbs'
import LxSvgIcon from '@/components/LxSvgIcon'

export default {
  components: { HeaderBar, FooterBar, BreadCrumbs, LxSvgIcon },
  data: () => ({
    navItems: [
      { label: 'Profile Info', link: '/settings', icon: 'profile' },
      { label: 'Payment Methods', link: '/settings/payment_methods', icon: 'creditcard' },
      { label: 'Email Preferences', link: '/settings/email_preferences', icon: 'email-preferences' },
      { label: 'Change Password', link: '/settings/change_password', icon: 'lock' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.bread-crumbs-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding-left: 10px;
}

.bread-crumbs {
  max-width: 1410px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.nav-bar {
  margin-right: 7rem;
  min-width: 200px;
}

.nav-link {
  font-weight: 500 !important;
  transition: all 0.4s ease;
  &:hover {
    color: #faab1a;
  }
}

.nav-link-active {
  font-weight: 700 !important;
}

.settings-content {
  display: flex;
}

.icon-cont {
  display: none;
}

@media (max-width: 768px) {
  .nav-bar {
    margin-right: 1.5rem;
  }

  .icon-cont {
    display: block;
  }

  .label-link {
    display: none;
  }

  .nav-bar {
    min-width: 40px;
  }

  .settings-content {
    display: flex;
  }

  .nav-link {
    color: #5b778c;
  }

  .nav-link-active {
    color: #094c74;
  }
}

@media (max-width: 480px) {
  .icon-cont {
    display: block;
  }

  .label-link {
    display: none;
  }

  .settings-content {
    flex-direction: column;
  }

  .nav-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
}
</style>
