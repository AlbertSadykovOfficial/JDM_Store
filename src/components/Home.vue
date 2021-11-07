<template>
	<div 
		v-if="!loading"
		class="container">

		<div id="carouselExampleCaptions" class="carousel slide pt-2 vh-90" data-bs-ride="carousel">
		  <div class="carousel-indicators">

		    <button 
		    	v-for="item in ads.length"
		    	type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="item" class="active" aria-current="true" :aria-label="'Slide ' + item"></button>
		  </div>
		  <div class="carousel-inner">
		    <div 
		    	v-for="ad in promoAds"
		    	class="carousel-item"
		    	:class="{'active': function (){ if(ad==1) return 'active' }}">
		      <img :src="ad.imageSrc" class="d-block w-90 mx-auto">
		      <div class="carousel-caption d-none d-md-block">
		        <h5>{{ ad.title }}</h5>
		        <p>{{ ad.description }}</p>
		        <p><router-link tag="button" class="btn btn-warning" :to="'/ad/'+ad.id">Go to</router-link></p>
		      </div>
		    </div>
		  </div>
		  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
		    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		    <span class="visually-hidden">Предыдущий</span>
		  </button>
		  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
		    <span class="carousel-control-next-icon" aria-hidden="true"></span>
		    <span class="visually-hidden">Следующий</span>
		  </button>
		</div>

		<hr>
		<h3>All</h3>
		<div class="row row-cols-1 row-cols-md-3 g-4">
		    <div 
		    	v-for="ad in ads"
		    	class="col">
			    <div class="card h-100">
				  <img :src="ad.imageSrc" class="card-img-top">
				  <div class="card-body">
				    <h5 class="card-title">{{ ad.title }}</h5>
				    <p class="card-text">{{ ad.description }}</p>
			        	<router-link tag="button" class="btn btn-warning" :to="'/ad/'+ad.id">Go to</router-link>
			        	<app-buy-modal :ad="ad"></app-buy-modal>
				  </div>
				</div>
		    </div>
		</div>	

	</div>
	<div v-else>
		LOADING...
	</div>
</template>

<script>
export default {
	computed: {
		promoAds () {
			return this.$store.getters.promoAds
		},
		ads () {
			return this.$store.getters.ads
		},
		loading () {
			return this.$store.getters.loading
		}
	}
}
</script>