<template>
	<div>
    	<button class="btn btn-warning" @click="modal = true">Edit</button>
    	<app-buy-modal :ad="ad"></app-buy-modal>

      <div v-if="modal"
          class="modal" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false" style="display: flow-root !important;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Edit</h5>
            </div>
            <div class="modal-body">
    			<div class="form-group">
					<label for="title">Title</label>
					<input type="text" id="title" class="form-control" v-model.lazy="editedTitle">
				</div>

				<div class="form-group">
					<label for="description">Description</label>
					<textarea type="description" id="description" class="form-control" v-model.lazy="editedDescription">
					</textarea>
				</div>

            </div>
            <div class="modal-footer">
              <button
                type="button" 
                class="btn btn-light"
                @click="onCancel()"
                >Cancel</button>
              <button
                type="button" 
                class="btn btn-success"
                @click="onSave()"
                >Save</button>
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
			editedTitle: this.ad.title,
			editedDescription: this.ad.description
		}
	},
	methods: {
		onCancel () {
			this.editedTitle = this.ad.title,
			this.editedDescription = this.ad.description
			this.modal = false
		},
		onSave () {
			if (this.editedTitle != '' && this.editedDescription != '') {
				this.$store.dispatch('updateAd', {
					id: this.ad.id,
					title: this.editedTitle,
					description: this.editedDescription
				})
				this.modal = false
			}
		}
	}
}
</script>