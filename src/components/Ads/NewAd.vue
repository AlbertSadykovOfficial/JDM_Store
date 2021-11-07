<template>
	<div class="container pt-2">
		<h2>Create new Add</h2>
		<div class="form-group">
			<label for="title">Title</label>
			<input type="text" id="title" class="form-control" v-model.trim="title">
		</div>

		<div class="form-group">
			<label for="description">Description</label>
			<textarea id="description" class="form-control" v-model.trim="description"></textarea>
		</div>

		<div class="form-group">
			<button id="upload" class="btn btn-warning" @click="triggerUpload">Upload Image</button>
			<input 
				ref="fileInput" 
				type="file" 
				style="display: none" 
				accept="image/*"
				@change="onFileChange">
			<img 
				v-if="imageSrc"
				:src="imageSrc"
				height="150">
		</div>

		<div class="form-group">
			<label for="checkbox">Add to promo</label>
			<input type="checkbox" id="promo" v-model.boolean="promo">
		</div>

		<button 
			class="btn btn-success"
			:disabled="!valid || !image || loading"
			@click="createdAd">Create Ad</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			title: '',
			description: '',
			promo: false,
			valid: true,
			image: null,
			imageSrc: ''
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		createdAd () {
			if (this.image) {
				const ad = {
					title: this.title,
					description: this.description,
					promo: this.promo,
					image: this.image,
					imageSrc: this.imageSrc
				}
				console.log(ad)
				this.$store.dispatch('createAd', ad)
					.then(() => {
						this.$router.push('/list')
					})
					.catch(() => {})
			}
		},
		triggerUpload () {
			// this.$refs.fileInput - get DOM Object
			this.$refs.fileInput.click()
		},
		onFileChange () {
			const file = event.target.files[0]
			
			// Standart JS lib
			const reader = new FileReader()
			reader.onload = e => {
				this.imageSrc = reader.result
			}
			reader.readAsDataURL(file)
			this.image = file

		}
	}
}
</script>