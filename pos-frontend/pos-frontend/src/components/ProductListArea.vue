<template>
  <div>
    <div class="search--card">
      <div class="row align-items-center">
        <div class="col-12 col-md-8 my-2">
          <input type="search" class="search--bar" v-model="searchKey" @blur="searchForProduct(searchKey)" placeholder="Search Product">
        </div>
        <div class="col-12 col-md-4 my-2">
          <ButtonComponent
                label="Search"
                buttonStyle="btn--primary"
                @onClick="searchForProduct(searchKey)"
                type="button"
            />
        </div>
    </div>
    </div>
<!-- recently ordered products -->
  <h5>Recently Ordered</h5>
  <div class="scrolling-wrapper row flex-row flex-nowrap">
   <div class="scroll-card">
      <ProductCard
        class="carditems col-12 col-md-6 col-lg-4 col-xl-3"
        v-for="(data, index) in recentOrder"
        :key="index"
        :product="data"
        @addToCart="addToCart(data)"
      />
    </div>
    </div>

    <!-- <div class="mt-3"> -->
      <div>
      <div class="row">
      <ProductCard
        class="col-12 col-md-6 col-lg-4 col-xl-3"
        v-for="(data, index) in products"
        :key="index"
        :product="data"
        @addToCart="addToCart(data)"
      />
    </div>
    </div>

  </div>
</template>
<script>
// import { demoProducts } from "@/utils/demoProducts.js";

import ProductCard from "@/components/ProductCard.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import {getRecentOrders} from "@/service/product.service"
import { mapGetters } from "vuex"

export default {
  name: "ProductListArea",
  data() {
    return {
      // products: demoProducts,
      recentOrder:[],
      searchKey : ""
    };
  },
  components: {
    ProductCard,
    ButtonComponent,
  },
  computed : {
    ...mapGetters({
      products : "getSearchList"
    })
  },
  methods: {
    addToCart(data) {
      this.$store.dispatch("ADD_PRODUCT_TO_CART", { product: data });
    },
    searchForProduct(searchKey){
      this.$store.dispatch("SEARCH_THE_PRODUCT", searchKey)
    }
  },
  created() {
    this.$store.dispatch("SEARCH_THE_PRODUCT")
  },
  mounted(){
    getRecentOrders({
      success: (response)=> {
          this.recentOrder = response.data;
      },
      error:(e) => {
          console.log(e)
      }
    })
  },
};
</script>
<style scoped>



::-webkit-scrollbar {

    width: 0.2em;

    height: 0.2em

}

/* Track */

::-webkit-scrollbar-track {

  background: #f1f1f1;

}

/* Handle */

::-webkit-scrollbar-thumb {

  background: #888;

}



/* Handle on hover */

::-webkit-scrollbar-thumb:hover {

  background: #555;

}



  .scrolling-wrapper {
  overflow-x: scroll;
}
.scroll-card{
    margin-left: 10px;
    display: flex;
    flex-direction: row;
}
.card-block {
  height: 300px;
  background-color: #fff;
  border: none;
  background-position: center;
  background-size: cover;
  transition: all 0.2s ease-in-out !important;
  border-radius: 24px;
  /* &:hover {
    transform: translateY(-5px);
    box-shadow: none;
    opacity: 0.9;
  } */
}
.carditems
{
  margin-left: 30px;
}
.carditems:nth-child(1)
{
  margin-left: 0px;
}
h5{
    padding-top : 15px;
    padding-left: 15px;
    color: #FF6665;
}
.search--card{
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 10px;
}

.search--bar{
  background-color: #F1F1F1;
  border: 0.7px solid #e2e2e2;
  height: 40px;
  border-radius : 10px;
  padding-left : 10px;
  width: 100%;
}

.search--bar:focus{
  border: 1.5px solid #FF6665;
  outline: none;
}

</style>
