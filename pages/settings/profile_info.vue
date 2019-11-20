<template>
  <div>
    <h4>Profile Info</h4>
    <div class="avatar-block mb-4">
      <img  class="avatar" />
      <div class="avatar-overlay" @click="showModal=true">
        <lx-svg-icon  icon="photo" w="37" h="37" />
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <div class="p-3">
        <div class="d-flex align-items-center">
          <cropper
            ref="cropper"
            classname="cropper"
            :src="image"
            :stencil-component="$options.components.CircleStencil"
            @change="onChangeViewBox"
          />
          <canvas ref="rsz" class="preview"></canvas>
        </div>

        <div class="d-flex justify-content-center">
          <div class="btn btn-save" @click="$refs.file.click()">
            <input
              ref="file"
              type="file"
              accept="image/*"
              :style="{display:'none', cursor:'pointer'}"
              @change="uploadImage($event)"
            >
            Upload Image
          </div>
          <button class="btn btn-save ml-3" @click="saveAvatar">
            Save
          </button>
        </div>
      </div>
    </modal>

    <profile-form />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import ProfileForm from '~/components/settings/ProfileForm'
import LxSvgIcon from '~/components/LxSvgIcon'
import Modal from '~/components/Modal'

export default {
  layout: 'settings',

  components: {
    ProfileForm,
    Cropper,
    CircleStencil,
    LxSvgIcon,
    Modal
  },

  data: () => ({
    image: null,
    showModal: false
  }),

  methods: {
    ...mapActions('auth', ['setAvatar']),

    uploadImage(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.image = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },

    onChangeViewBox() {
      const resizedCanvas = this.$refs.rsz
      resizedCanvas.width = 100
      resizedCanvas.height = 100
      const resizedContext = resizedCanvas.getContext('2d')
      const canvas = this.$refs.cropper.getResult().canvas
      resizedContext.drawImage(canvas, 0, 0, 100, 100)
    },

    saveAvatar() {
      const avatarImage = this.$refs.rsz.toDataURL('image/jpeg', 0.7)
      this.setAvatar({ avatarImage })
        .then(() => {
          this.$notify({
            type: 'success',
            group: 'settings',
            title: 'Success',
            text: 'Image uploaded successfully!',
            duration: 3500,
            speed: 1000
          })
          this.showModal = false
        })
        .catch(() => {
          this.$notify({
            type: 'error',
            group: 'settings',
            title: 'Error',
            text: 'An error occurred while uploading to the image server',
            duration: 5000,
            speed: 1000
          })
        })
    }
  }
}
</script>
