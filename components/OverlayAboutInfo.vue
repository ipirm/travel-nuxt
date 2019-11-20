<template>
  <div class="container">
    <div class="header">
      {{ head }}
    </div>
    <div class="about-description">
      <div class="description-cont">
        <div class="description">
          {{ description }}
        </div>

        <div class="description desct-two">
          {{ descriptionTwo }}
        </div>
      </div>

      <div class="map">
        <no-ssr>
          <l-map :zoom="13" :center="[47.413220, -1.219482]">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker :lat-lng="[47.413220, -1.219482]"></l-marker>
          </l-map>
        </no-ssr>
      </div>
    </div>

    <hr class="hr">

    <div class="local-weather">
      <div class="local-weather-head-cont">
        <div class="header-text">
          Local Weather
        </div>

        <div class="choice-of-measurement">
          <div class="choice-msnt-sign" :class="{'choice-msnt-sign-active': activeSign === 1}" @click="setActiveSign(1)">
            °C
          </div>
          <div class="choice-of-measurement-line"></div>
          <div class="choice-msnt-sign" :class="{'choice-msnt-sign-active': activeSign === 2}" @click="setActiveSign(2)">
            °F
          </div>
        </div>
      </div>

      <div class="measurement-value-container">
        <div class="measurement-date">
          {{ localWeather.monthOne }} - {{ localWeather.monthTwo }}
        </div>
        <div class="measurement-values">
          <div class="measurement-value">
            {{ localWeather.valueOne }}°C
          </div>
          <div class="measurement-value">
            {{ localWeather.valueTwo }}°C
          </div>
        </div>
      </div>
    </div>

    <hr class="hr">

    <div class="general-info">
      <div class="header-text">
        General Information
      </div>
      <div class="ginfo-container">
        <div class="ginfo-item">
          <div class="ginfo-support-head">
            Time Zone:
          </div>
          <div>GMT +8:00</div>
          <div class="gray-light-text">
            4 hours ahead
          </div>
        </div>

        <div class="ginfo-item">
          <div class="ginfo-support-head">
            Currency:
          </div>
          <div class="ginfo-currency-valute">
            Singapore Dollar
          </div>
          <div class="gray-light-text">
            1 RUB=85GD
          </div>
        </div>

        <div class="ginfo-item ginfo-item-best">
          <div class="ginfo-support-head">
            Best time to visit:
          </div>
          <div>JUL - AUG</div>
          <div class="ginfo-best-sale">
            Best sale
          </div>
          <div>JUL</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    head: { type: String, required: true },
    description: { type: String, required: true },
    descriptionTwo: { type: String, required: true },
    mapData: { type: Object, required: true },
    localWeather: {
      type: Object,
      required: true
    },
    timeZone: {
      type: String,
      required: true
    }
  },
  data: () => ({
    activeSign: 1
  }),
  methods: {
    setActiveSign(key) {
      this.activeSign = key
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/module-variables';

.header {
  font-size: 24px;
  color: $blue-dark;
  font-weight: 700;
}

.description {
  color: $blue-dark;
  font-size: 14px;
}

.description-cont {
  width: 55%;
}

.map {
  width: 35%;
}

.about-description {
  margin-top: 1.4rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

.desct-two {
  margin-top: 1rem;
}

.choice-of-measurement, .measurement-values {
  display: flex;
}

.choice-of-measurement {
  margin-left: 2rem;
  margin-top: -0.2rem;
}

.choice-of-measurement-line {
  height: 22px;
  width: 1px;
  background-color: #84a6ba;
  margin: 5px 10px 0 10px;
}

.choice-msnt-sign {
  color: $blue-light;
  font-size: 20px;
  cursor: pointer;
}

.choice-msnt-sign-active {
  color: $blue-dark;
}

.measurement-values {
  color: #01080c;
  font-weight: 400;
  font-size: 36px;
  width: 10rem;
  display: flex;
  justify-content: space-between;
}

.measurement-value:nth-child(2) {
  color: #84a6ba;
}

.measurement-date {
  font-size: 14px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.local-weather, .general-info {
  font-weight: 500;
  color: $blue-dark;
  font-size: 14px;
}

.local-weather-head-cont {
  display: flex;
}

.hr {
  height: 1px;
  width: 100%;
  background-color: hsl(207, 31%, 94%);
  margin-top: 1.4rem;
  margin-bottom: 1.4rem;
}

.header-text {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.ginfo-support-head {
  font-size: 13px;
  margin-top: 0.7rem;
}

.ginfo-container {
  display: flex;
  width: 70%;
  justify-content: space-between;
}

.local-weather-header-text {
  font-weight: 700;
  font-size: 16px;
}

.gray-light-text {
  color: #84a6ba;
  font-size: 13px;
}

.ginfo-item {
  display: flex;
  flex-direction: column;
  height: 5rem;
  justify-content: space-between;
}

.ginfo-currency-valute {
  color: #01080c;
}

.ginfo-best-sale {
  font-size: 13px;
}

.ginfo-item-best {
  height: 7rem;
}

@media (max-width: 924px) {
  .map {
    width: 40%;
  }
}

@media (max-width: 845px) {
  .container {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .about-description {
    flex-direction: column;
  }

  .map {
    width: 100%;
    height: 15rem;
    margin-top: 1.5rem;
  }

  .description-cont {
    width: 90%;
  }

  .ginfo-container {
    width: 100%;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .ginfo-container {
    justify-content: space-between;
    flex-direction: column;
  }
}

@media (max-width: 400px) {
  .general-info {
    display: flex;
    justify-content: center;
  }

  .ginfo-container {
    margin-top: -0.5rem;
    width: 200px;
  }
}
</style>
