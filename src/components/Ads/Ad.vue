<template>
	<div class="container mt-2">
		<div v-if="!loading" class="mb-3 m-auto">
		  <img :src="ad.imageSrc" class="m-auto w-75">
		  <div class="card-body">
			<h4><b>{{ ad.title }}</b></h4>
		    <p class="card-text">{{ ad.description }}</p>
		    <addEditAdModal 
		    	v-if="isOwner"
		    	:ad="ad"
		    	></addEditAdModal>
		  </div>
		</div>
		<div v-else>Loading</div>
	</div>
</template>

<script>
import EditAdModal from './EditAdModal'
export default {
	props: ['id'],
	computed: {
		ad() {
			const id = this.id
			console.log(id, this.$store.getters.adById(id), this.$store.state.ads)
			return this.$store.getters.adById(id)
		},
		loading () {
			return this.$store.getters.loading
		},
		isOwner () {
			return this.ad.ownerId === this.$store.getters.user.id
		}
	},
	components: {
		addEditAdModal: EditAdModal
	}
}
</script>