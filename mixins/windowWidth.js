export default {
  data: () => ({
    windowWidth: process.client ? window.innerWidth : null
  }),
  mounted() {
    window.onresize = (event) => {
      this.windowWidth = window.innerWidth
    }
  }
}
