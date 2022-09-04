
import { getSeller } from "../../service/seller.service"
import { getSellerCount, getSearchedSeller } from "../../service/seller.service"
import { getInventoryCount, getLowInStockCount, getOutOfStockCount } from "../../service/seller.service"
import Vue from 'vue'

export default {
  state: {
    sellerList: [],
    sellerCount: 0,
    inventoryCount: 0,
    outofstockcount: 0,
    lowinstockcount: 0,
    sellersearchList: []
  },
  getters: {
    getSellerList(state) {
      return state.sellerList
    },
    getSellerSearchList(state) {
      return state.sellersearchList
    },
    getSellerCount(state) {
      return state.sellerCount
    },
    getInventoryCount(state) {

      return state.inventoryCount

    },

    getOutOfStockCount(state) {

      return state.outofstockcount

    },

    getLowInStockCount(state) {

      return state.lowinstockcount

    }

  },
  mutations: {
    setSellerList(state, value) {
      state.sellerList = []
      value.map((list) => {
        let temp = { ...list, orderhistory: [] }
        state.sellerList.push(temp)
      })
    },
    setSellerSearchList(state, value) {
      state.sellersearchList = value;
    },
    setOrder(state, { response, uid }) {
      state.sellerList.map((seller) => {
        if (uid == seller.userId) {
          seller.orderhistory = response
        }
      })
    },
    setSellerCount(state, value) {
      state.sellerCount = value
    },
    setInventoryCount(state, value) {
      state.inventoryCount = value
    },
    setOutOfStockCount(state, value) {
      state.outofstockcount = value
    },
    setLowInStockCount(state, value) {
      state.lowinstockcount = value
    }
  },
  actions: {
    GET_SELLER_LIST() {
      getSeller({
        success: (response) => {
          console.log("seller list", response.data)
          this.commit('setSellerList', response.data)
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    SET_ORDER_LIST(state, { response, uid }) {
      console.log(response, uid)
      this.commit('setOrder', { response, uid })
    },
    GET_SELLER_COUNT() {
      getSellerCount({
        success: (res) => {
          this.commit('setSellerCount', res.data)
        },
        error: (err) => {
          console.log(err)
        }
      })
    },


    GET_INVENTORY_COUNT() {
      getInventoryCount({
        success: (res) => {
          this.commit('setInventoryCount', res.data)
        },
        error: (e) => {
          console.log(e)
        }
      })
    },
    GET_OUT_OF_STOCK_COUNT() {
      getOutOfStockCount({
        success: (res) => {
          this.commit('setOutOfStockCount', res.data)
        },
        error: (e) => {
          console.log(e)
        }
      })
    },
    GET_LOW_IN_STOCK_COUNT() {
      getLowInStockCount({
        success: (res) => {
          this.commit('setLowInStockCount', res.data)
        },
        error: (e) => {
          console.log(e)
        }
      })
    },



    GET_SEARCH_LIST(state, key = "") {
      getSearchedSeller({
        success: (res) => {
          console.log(res.data)
          this.commit('setSellerList', res.data)
        },
        error: (err) => {
          console.log(err)
          if(err.message=="Request failed with status code 502")
          Vue.$toast.error("you are not Authorized")

        },
        key
      })
    }
  }

}