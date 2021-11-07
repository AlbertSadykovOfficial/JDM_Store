import { 
	getAuth, 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	signOut 
} from "firebase/auth";


class User {
	constructor (id) {
		this.id = id
	}
}


export default {
	state: {
		user: null
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		}
	},
	// Adding a new user
	actions: {
		registerUser ({commit}, {email, password}) {
			const auth = getAuth();
			// Clean all errors and show loading
			commit('clearError')
			commit('setLoading', true)
			
			createUserWithEmailAndPassword(auth ,email, password)
			.then(user => {
				// uid - firebase user id (user.uid)
				commit('setUser', new User(user._tokenResponse.localId))
				commit('setLoading', false) // end loading
			}).catch((error) => {
		    	const errorCode = error.code;
		    	const errorMessage = error.message;

		    	commit('setLoading', false) // end loading
		    	commit('setError', error.message) // show error message
		    	
		    	alert(errorMessage)
		    	throw new Error
		  	});
		},
		// The same as registerUser function, but writed by using async/await
		async loginUser ({commit}, {email, password}) {
			const auth = getAuth();
			// Clean all errors and show loading
			commit('clearError')
			commit('setLoading', true)

			try {
				const user = await signInWithEmailAndPassword(auth ,email, password);
				// I think this is not better solution to grab user ID
				commit('setUser', new User(user._tokenResponse.localId))
				commit('setLoading', false) // end loading
			} catch (error) {
				const errorCode = error.code;
				const errorMessage = error.message;

				commit('setLoading', false) // end loading
				commit('setError', error.message) // show error message
		    	
				alert(errorMessage)
				throw new Error
			}
		},
		
		autoLoginUser ({commit}, payload) {
			commit('setUser', new User(payload.uid))
		},
		
		logoutUser ({commit}) {
			const auth = getAuth() 
			auth.signOut()
			commit('setUser', null)
		}
	},
	getters: {
		user (state) {
			return state.user
		},
		isUserLoggedIn(state) {
			return state.user !== null
		}
	}
}