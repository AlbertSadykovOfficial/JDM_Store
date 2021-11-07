<template>
	<div class="inline-block">
    	<button class="btn btn-primary" @click="modal = true">Buy</button>

      <div v-if="modal"
          class="modal" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false" style="display: flow-root !important;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Do you want to buy it</h5>
            </div>
            <div class="modal-body">
    			<div class="form-group">
					<label for="name">Your Name</label>
					<input type="text" id="name" class="form-control" v-model.lazy="name">
				</div>

				<div class="form-group">
					<label for="phone">Phone</label>
					<input type="text" id="phone" class="form-control" v-model.lazy="phone">
				</div>

            </div>
            <div class="modal-footer">
              <button
                type="button" 
                class="btn btn-light"
                :disabled="localLoading"
                @click="onCancel()"
                >Close</button>
              <button
                type="button" 
                class="btn btn-success"
                :disabled="localLoading"
                @click="onSave()"
                >
              	<div v-if="!localLoading">Buy It</div>
              	<div v-else>Proccess...</div>
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
	props: ['ad'],
	data () {
		return {
			modal: false,
			name: '',
			phone: '',
			localLoading: false // for local update needs to not refresh page
		}
	},
	methods: {
		onCancel () {
			this.name = ''
			this.phone = ''
			this.modal = false
		},
		onSave () {
			if (this.editedTitle != '' && this.editedDescription != '') {
				this.localLoading = true
				this.$store.dispatch('createOrder', {
					adId: this.ad.id,
					ownerId: this.ad.ownerId,
					name: this.name,
					phone: this.phone
				})
				.finally(() => {
					this.name = ''
					this.phone = ''
					this.localLoading = false
					this.modal = false

				})
			}
		}
	}
}
</script>

<style scoped>
	.inline-block{
		display: inline-block
	}
</style>