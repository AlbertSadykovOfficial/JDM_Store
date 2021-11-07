import { getDatabase, push, update, onValue, ref as refDatabase} from "firebase/database";

class Order {
	constructor (name, phone, adId, done = false, id = null) {
		this.name = name
		this.phone = phone
		this.adId = adId
		this.done = done
		this.id = id
	}
}

export default {
	state: {
		orders: []
	},
	mutations: {
		loadOrders (state, payload) {
			state.orders = payload
		}
	},
	actions: {
		async createOrder ({commit}, {name, phone, adId, ownerId}) {
			const order = new Order(name, phone, adId)
			commit('clearError')
			
			try {
				const db = await getDatabase()
				const ad = await push(refDatabase(db, `/users/${ownerId}/orders`), order)

				console.log(ad)
				console.log(ad.id)
				console.log(ad.uid)

			} catch (error) {
				commit('setError', error.message)
				throw error
			}
		},

		async fetchOrders ({commit, getters}) {
			commit('clearError')
			commit('setLoading', true)

			const resultOrders = []
			try {
				const db = await getDatabase()
				const data = await refDatabase(db, `/users/${getters.user.id}/orders/`)

				onValue(data, async function(snapshot) {
					const orders = snapshot.val()

					await Object.keys(orders).forEach(key => {
						const o = orders[key]
						resultOrders.push(
							new Order(o.name, o.phone, o.adId, o.done, key)
						)
					})

					commit('loadOrders', resultOrders)
					commit('setLoading', false)
				})
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}		
		},

		async markOrderDone ({commit, getters}, payload) {
			commit('clearError')
			try {
				const db = await getDatabase()
				await update(refDatabase(db, `/users/${getters.user.id}/orders/${payload}`), { 
					done: true
				})
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		}
	},
	getters: {
		doneOrders (state) {
			return state.orders.filter(o => o.done)
		},
		unDoneOrders (state) {
			return state.orders.filter(o => !o.done)
		},
		orders (state, getters) {
			// sorting
			return getters.unDoneOrders.concat(getters.doneOrders)

		}
	}
}