<template>
	<div v-if="loading">
		Loading...
	</div>
	<div v-else-if="!loading && orders.length !== 0">
	
		<h2 class="text-center">Orders</h2>	
		<div class="container">
			<ul class="list-group m-auto">
				<li
					v-for="order in orders"
					class="list-group-item m-auto">
					<input 
					type="checkbox" 
					:value="order.done"
					@change="markDone(order)"
					class="form-check-input me-1"
					style="vertical-align: sub;">
					{{ order.adId }}

					<router-link
						tag="button"
						class="btn btn-primary"
						:to="'/ad/'+order.adId">Show</router-link>		
				</li>
			</ul>
		</div>
	</div>
	<div v-else>
		<h1 class="text-secondary text-center">You have no orders</h1>
	</div>
</template>

<script>
export default {
	/*
	data() {
		return {
			orders: [
				{
					id: 'asda',
					name: 'Ivan',
					phone: '+7 922 344 51 34',
					adId: '123',
					done: false
				}
			]
		}
	}, */
	computed: {
		loading () {
			return this.$store.getters.loading
		},
		orders () {
			return this.$store.getters.orders
		}
	},
	methods: {
		markDone(order) {
			// after saving on the server switching to true
			this.$store.dispatch('markOrderDone', order.id)
				.then(() => {
					order.done = true
				})
				.catch(() => { console.log('SOmething wrong with ordering')})
		}
	},
	created () {
		this.$store.dispatch('fetchOrders')
	}
}
</script>