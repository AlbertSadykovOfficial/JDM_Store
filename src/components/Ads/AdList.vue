<template>
	
	<div 
		v-if="!loading && myAds.length != 0"
		class="container">
		<div class="row">
			<h2 class="text-center">My ads</h2>
		</div>
		<div class="row">
			<div 
				v-for="ad in myAds"
				class="card mb-3 mx-auto" 
				style="max-width: 840px;">
		  		<div class="row g-0">
					<div class="col-md-9">
						<img :src="ad.imageSrc" style="width: 600px;">
					</div>
					<div class="col-md-3">
						<div class="card-body">
							<h5 class="card-title">{{ ad.title }}</h5>
							<p class="card-text">{{ ad.description }}</p>
							<p class="card-text"><small class="text-muted">{{ ad.id }}</small></p>
							<router-link tag="button" class="btn btn-warning" :to="'/ad/' + ad.id">GO</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else-if="!loading && myAds.length === 0">
		<h1 class="text-primary text-center">You have no ads</h1>
	</div>
	<div v-else>
		<h1 class="text-primary">Loading</h1>
	</div>

</template>

<script>
export default {
	computed: {
		myAds () {
			return this.$store.getters.myAds
		},
		loading () {
			return this.$store.getters.loading	
		}
	}
}
</script>