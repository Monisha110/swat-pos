import Vue from "vue";
import Vuex from "vuex";

import inventory from "@/store/modules/inventory.store"
import cart from "@/store/modules/cart.store"
import user from "@/store/modules/user.store"
import order from "@/store/modules/order.store"
import seller from "@/store/modules/seller.store"

Vue.use(Vuex);


export default new Vuex.Store({
    modules : {
      cart,
      inventory,
      user,
      order,
      seller
    }
  });
  