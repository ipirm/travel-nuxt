<template>
  <div class="page-footer">
    <div class="container-fluid">
      <section class="row no-gutters flex-column flex-lg-row align-items-center">
        <ul class="nav social-links justify-content-between">
          <li class="nav-item align-self-center align-self-xl-start">
            <a href="#" class="nav-link">
              <lx-svg-icon icon="inst" w="43" h="43"></lx-svg-icon>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <lx-svg-icon icon="facebook" w="43" h="43"></lx-svg-icon>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <lx-svg-icon icon="linkedin" w="43" h="43"></lx-svg-icon>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <lx-svg-icon icon="twitter" w="43" h="43"></lx-svg-icon>
            </a>
          </li>
        </ul>

        <div class="w-100 d-xl-none"></div>

        <div class="discount my-4 ml-xl-auto mr-lg-3">
          <div>Travel discounts up to 60% off sent straigt to your inbox</div>
          <div class="mt-3 mt-md-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>

        <div class="input-group input-group-subscribe ml-lg-auto">
          <input type="text" class="form-control" placeholder="Enter your email">
          <div class="input-group-append">
            <button class="btn btn-secondary">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <section class="row no-gutters page-footer-content">
        <div class="content-item align-self-center align-self-md-start">
          <div class="logo logo-w"></div>
        </div>

        <div class="w-100 d-xl-none"></div>

        <div class="content-item col-auto term-of-use">
          <h6 class="title">
            Terms of use
          </h6>
          <ul class="nav d-flex flex-column">
            <li class="nav-item">
              <nuxt-link to="/info/terms-and-conditions" class="nav-link">
                Terms And Conditions
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/privacy-policy" class="nav-link">
                Privacy Policy
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/cookie-policy" class="nav-link cookie-policy">
                Cookie Policy
              </nuxt-link>
            </li>
          </ul>
          <p>{{ $t("hello") }}</p>
          <!--<lang-switcher class="mb-3"></lang-switcher>-->
          <!--<currency-switcher class="mb-3"></currency-switcher>-->
        </div>

        <div class="content-item col-auto">
          <h6 class="title">
            About Booking-tours
          </h6>
          <ul class="nav d-flex flex-column">
            <li class="nav-item">
              <nuxt-link to="/info/about" class="nav-link">
                About
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/careers" class="nav-link nav-link">
                Careers
              </nuxt-link>
              <div class="under-link">
                We're always hiring
              </div>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/press-releases" class="nav-link">
                Press Releases
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/customer-reviews" class="nav-link">
                Customer Reviews
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/terms-and-conditions" class="nav-link">
                Terms & Conditions
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/contact" class="nav-link">
                Contact
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/help" class="nav-link">
                Help
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="content-item col-auto">
          <h6 class="title">
            For Operators
          </h6>
          <ul class="nav d-flex flex-column">
            <li class="nav-item">
              <nuxt-link to="/operator/signup" class="nav-link">
                Register
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/list-your-tours" class="nav-link">
                List your tours
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/extranet-login" class="nav-link">
                Extranet Login
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/widgets" class="nav-link">
                Widgets
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/booking-tour-awards" class="nav-link">
                Booking-tours Awards
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/info/help" class="nav-link">
                Help
              </nuxt-link>
            </li>
          </ul>
          <h6 class="title">
            For Partners
          </h6>
          <ul class="nav d-flex flex-column">
            <li class="nav-item">
              <nuxt-link to="/info/affiliate-program" class="nav-link">
                Affiliate program
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://forms.gle/AYhH7d38jYHSyv2v6" target="_blank">
                Partnerships
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section class="row no-gutters">
        <div class="col text-center">
          <div class="copyright">
            © 1998-2019, Booking-tours, Inc.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import LxSvgIcon from '@/components/LxSvgIcon'
import LangSwitcher from '@/components/LangSwitcher'
import CurrencySwitcher from '@/components/CurrencySwitcher'

export default {
  components: {
    LxSvgIcon,
    LangSwitcher,
    CurrencySwitcher
  }
}
</script>
