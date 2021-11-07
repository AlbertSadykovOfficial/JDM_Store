<template>
	<div class="container pt-2">
		<h2>Registration</h2>
		<div class="form-group">
			<label for="email">Login</label>
			<input type="email" id="email" class="form-control" v-model.lazy="email">
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" id="password" class="form-control" v-model.lazy="password">
		</div>

		<div class="form-group">
			<label for="confirmPassword">Retry Password</label>
			<input type="password" id="confirmPassword" class="form-control" v-model.lazy="confirmPassword">
		</div>

		<button 
			class="btn btn-success"
			:loading="loading"
			:disabled="!valid() || loading" 
			@click="onSubmit">Create Account</button>
	</div>
</template>

<script>
export default {
	data () {
		return {
			email: '',
			password: '',
			confirmPassword: ''
		}
	},
	computed: {
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		onSubmit () {
			const user = {
				email : this.email,
				password : this.password
			}
			// to store/user -> adding in firebase
			this.$store.dispatch('registerUser', user)
				.then(() => this.$router.push('/')) // redirect to main page after success registration
				.catch(err => console.log(err))

			console.log(user);
		},
		valid () {
			if (this.email != '' && this.password != '')
			{
				return this.passwordIsCorrect()
			}
		},
		passwordIsCorrect () {
			if (this.password == this.confirmPassword) return true
			else false
		}
	}
}
</script>