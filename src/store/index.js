import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios'

Vue.use(Vuex)

const url = process.env.VUE_APP_BASE_URL

export default new Vuex.Store({
  state: {
    date: "",
    orders: [],
    statuses: [],
    news: [],
    history: [],
    couriers: [
      {id:0, name: 'Нет' },
      {id:1, name: 'Курьер 1' },
      {id:2, name: 'Курьер 2' }, 
      {id:3, name: 'Курьер 3' }
    ]
  },
  mutations: {
    setDate(state, date) { state.date = date },
    setOrders(state, orders) { state.orders = orders; },
    setOrdersStatuses(state, statuses) { state.statuses = statuses; },    
    setNews(state, news) { state.news = news; },
    setHistory(state, history) { state.history = history }
  },
  actions: {
    getDateNow({ commit }) {
      commit('setDate', moment().format("DD.MM.YYYY"))
    },
    setFilterDate({ commit }, { date }) {
      commit('setDate', moment(date, "YYYY-MM-DD").format("DD.MM.YYYY"))
    },
    async getAllOrders({ commit }) {
      try {
        const response = await axios.post(url + 'api/private/delivery')
        if (response.status == 200) {
          const news = response.data.filter(i => ['1', '2'].includes(i.status))
          const history = response.data.filter(i => ['4', '8'].includes(i.status))
          commit('setOrders', response.data)
          commit('setNews', news)
          commit('setHistory', history)
        }
      } catch (error) { console.log(error) }
    },
    async getOrderStatuses({ commit }) {
      //console.log({ payload });
      try {
        const response = await axios.post(url + 'api/private/getstatus')
        if (response.status == 200) {
          //console.log(response.data) 
          commit('setOrdersStatuses', response.data)
        }
      } catch (error) { console.log(error) }
    },  
    async setStatus(_, { payload }) { 
      try {
        const response = await axios.post(url + 'api/private/status', JSON.stringify({ ...payload }))
        if (response.status == 200) {
          console.log(response.data) 
        }
      } catch (error) { console.log(error) }
    },
    async getCouriers() {
      try {
        const response = await axios.post(url + 'api/private/couriers')
        if (response.status == 200) {
          this.couriers = response.data
        }
      } catch (error) { console.log(error) }
    },
    async addCourier(_, { payload }) {
      try {
        const response = await axios.post(url + 'api/private/add-couriers', JSON.stringify({ ...payload }))
        if (response.status == 200) {
          await this.getCouriers()
        }
      } catch (error) { console.log(error) }
    },
    async removeCourier(_, { id }) {
      try {
        const response = await axios.post(url + 'api/private/remove-couriers', JSON.stringify({ id }))
        if (response.status == 200) {
          await this.getCouriers()
        }
      } catch (error) { console.log(error) }
    }
  }
})
