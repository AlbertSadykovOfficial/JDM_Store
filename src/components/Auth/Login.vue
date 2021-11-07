<template>
	<div class="container pt-2">
		<h2>Login</h2>
		<div class="form-group">
			<label for="email">Login</label>
			<input type="email" id="email" class="form-control" v-model.trim="email">
		</div>

		<div class="form-group">
			<label for="year">Password</label>
			<input type="password" id="password" class="form-control" v-model.number="password">
		</div>

		<button 
			class="btn btn-success"
			:loading="loading"
			:disabled="!valid() || loading"
			@click="onSubmit">Login</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: ''
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		onSubmit() {
			const user = {
				email : this.email,
				password : this.password
			}
			console.log(user);

			this.$store.dispatch('loginUser', user)
				.then(() => this.$router.push('/')) // redirect to main page after success registration
				.catch(err => console.log(this.$store.getters.error))
		},
		valid () {
			if (this.email != '' && this.password != '') return true
		}
	},
	created () {
		if (this.$route.query['LoginError']) {
			this.$store.dispatch('setError', 'Please log in to Access This Page')
		}
	}
}
</script>