export default {
	state: {
		circles: [],
	},

	getters: {
		availableCircles(state, _getters, rootState) {
			return state.circles.filter(circle => {
				const matchUniqueId = c => {
					return (c.circleUniqueId === circle.unique_id)
				}
				const alive = rootState.collectives.find(matchUniqueId)
				const trashed = rootState.trashCollectives.find(matchUniqueId)
				return !alive && !trashed
			})
		},
	},

	mutations: {
		circles(state, circles) {
			state.circles = circles
		},
		deleteCircleFor(state, collective) {
			state.circles.splice(state.circles.findIndex(c => c.unique_id === collective.circleUniqueId), 1)
		},
	},

	actions: {
		/**
		 * Get list of all circles
		 */
		async getCircles({ commit }) {
			const api = OCA.Circles.api
			api.listCircles('all', '', 9, response => {
				commit('circles', response.data)
			})
		},
	},
}
