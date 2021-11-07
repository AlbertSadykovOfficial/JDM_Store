import { getDatabase, push, update, onValue, key, ref as refDatabase} from "firebase/database";
import { getStorage, uploadBytes, getDownloadURL, ref as refStore} from "firebase/storage";


class Ad {
	constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
		this.title = title
		this.description = description
		this.imageSrc = imageSrc
		this.ownerId = ownerId
		this.promo = promo
		this.id = id
	}
}


export default {
	state: {
		ads: []
	},
	mutations: {
		createAd (state, payload) {
			state.ads.push(payload)
		},
		loadAds (state, payload) {
			state.ads = payload
		},
		updateAd (state, { title, description, id }) {
			// This construction will return the first object in ads with this id
			const ad = state.ads.find(a => {
				return a.id === id
			})

			ad.title = title
			ad.description = description
		}
	},
	actions: {
		async createAd ({commit, getters}, payload) {
			commit('clearError')
			commit('setLoading', true)

			const image = payload.image

			try {
				// Id will be grabbed from firebase
				const newAd = new Ad(
					payload.title, 
					payload.description, 
					getters.user.id, 
					'',
					payload.promo
				)

				// 1 - Adding data into Database
				const db = await getDatabase()
				const ad = await push(refDatabase(db, '/ads/'), newAd)


				// 2 - Saving Image
				const storage = getStorage();

				let imageSrc =  ""
				const imageExt = image.name.slice(image.name.lastIndexOf('.'))

				const storageRef = refStore(storage, `/ads/${ad.key}${imageExt}`)
				await uploadBytes(storageRef, image).then(async function (snapshot) {
					await getDownloadURL(snapshot.ref).then((downloadURL) => {
				    	imageSrc = downloadURL
				    });
				});


				// 3 - Updating an imageSrc in Database
				await update(refDatabase(db, `/ads/${ad.key}`), { imageSrc })

				console.log('Completed')
				
				commit('setLoading', false)
				// Replace id and src in object to the new id and src
				commit('createAd', {
					...newAd,
					id: ad.key,
					imageSrc: imageSrc
				})
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},

		async fetchAds ({commit}) {
			commit('clearError')
			commit('setLoading', true)

			const resultAds = []

			try {
				const db = getDatabase()
				const starCountRef = await refDatabase(db, 'ads/');
				onValue(starCountRef, (snapshot) => {
					const ads = snapshot.val();
					console.log(ads)

					Object.keys(ads).forEach(key => {
						const ad = ads[key]
						resultAds.push(
							new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key)
						)
					})
					commit('setLoading', false)
					commit('loadAds', resultAds)
				});
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},

		async updateAd ({commit}, { title, description, id }) {
			commit('clearError')
			commit('setLoading', true)

			try {
				const db = getDatabase()
				await update(refDatabase(db, `/ads/${id}`), { 
					title, 
					description
				})
				commit('updateAd', { title, description, id }) // this file mutation
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		}
	},
	getters: {
		// getter for each of ad
		ads(state){
			return state.ads
		},
		// select all ads where promo = true
		promoAds(state) {
			return state.ads.filter(ad => { 
				return ad.promo 
			})
		},
		myAds(state, getters) {
			return state.ads.filter(ad => {
				return ad.ownerId === getters.user.id
			})
		},
		// Closure function (this function return another function)
		adById(state) {
			return adId => {
				// selectin an object with id = adId
				return state.ads.find(ad => ad.id === adId)
			}
		}
	}
}