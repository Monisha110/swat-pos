<template>
  <div>
    <div class="cont">
      <div class="left"><img src="../assets/hello.gif"/></div>
      <div class="right">
        <span style="font-weight: bold">Welcome Back, Dhivya</span>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
      </div>
    </div>
    <div class="cont2">
      <div class="cards">
        <span style="font-weight: bold">Total Sellers</span>
        <h3>{{ sellercount }}</h3>
      </div>
      <div class="cards">
        <span style="font-weight: bold">Inventory Items</span>
        <h3>{{ inventorycount }}</h3>
      </div>
      <div class="cards">
        <span style="font-weight: bold">Out Of Stock</span>
        <h3>{{ outofstockcount }}</h3>
      </div>
      <div class="cards">
        <span style="font-weight: bold">Low in Stock</span>
        <h3>{{ lowinstockcount }}</h3>
      </div>
      <div class="cards">
        <span style="font-weight: bold">Tax</span>

        <p>Current Tax value: {{ tax.cgst }} {{ tax.sgst }}</p>

        <input
          class="gst"
          v-model="ttax.cgst"
          type="number"
          placeholder="CGST"
        />

        <input
          class="gst"
          v-model="ttax.sgst"
          type="number"
          placeholder="SGST"
        />

        <ButtonComponent
          class="btn-tax"
          label="Update"
          buttonStyle="btn--danger"
          @onClick="updatetax()"
          type="button"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue"
import {updateTax} from "../service/cart.service"
import ButtonComponent from "../components/ButtonComponent.vue"

export default {
  name: "AdminHomePage",
  data() {
    return {
      ttax: {
        cgst: 0,
        sgst: 0,
      },
    };
  },
  components:{
    ButtonComponent
  },
  methods: {
    updatetax() {
      // this.$store.dispatch("UPDATE_TAX", this.ttax);
      // this.$store.dispatch('GET_TAX')
    updateTax({
            success:(res)=>
            {
              console.log(res)
              this.$store.dispatch('GET_TAX')
              Vue.$toast.success("Tax updated successfully..")
            },
            error:(err)=>{
              console.log(err)
            },
            tax:this.ttax
          })
    },
  },
  mounted() {
    this.$store.dispatch("GET_SELLER_COUNT");
    this.$store.dispatch("GET_INVENTORY_COUNT");
    this.$store.dispatch("GET_OUT_OF_STOCK_COUNT");
    this.$store.dispatch("GET_LOW_IN_STOCK_COUNT");
    this.$store.dispatch("GET_TAX");
  },
  computed: {
    ...mapGetters({
      sellercount: "getSellerCount",
      inventorycount: "getInventoryCount",
      outofstockcount: "getOutOfStockCount",
      lowinstockcount: "getLowInStockCount",
      tax: "getTax",
    }),
  },
};
</script>

<style scoped>
.cont {
  width: 75%;
  height: max-content;
  border-radius: 17px;
  display: flex;
  margin: auto;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2%;
}
.left {
  flex: 25%;
  max-width: 25%;
  max-height: 100%;
  margin: 1vh 1vh 1vh 1vh;
  background-color: #fefeee;
  border-radius: 17px;
  box-shadow: 0px 0px 10px 2px rgb(227, 227, 227);
}
.left img {
  width: 100%;
  max-height: 100%;
  border-radius: 17px;
}
.cont .right {
  flex: 70%;
  max-width: 70%;
  max-height: 100%;
  margin: 1vh 1vh 1vh 1vh;
  background-color: rgb(255, 255, 255);
  border-radius: 17px;
  padding: 5% 5% 5% 5%;
  box-shadow: 0px 0px 10px 2px rgb(227, 227, 227);
}
.cont2 {
  max-width: 75%;
  display: flex;
  height: max-content;
  padding: 2%;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
}
.cards {
  flex: 25%;
  max-width: 25%;
  height: 200px;
  width: 250px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  margin: 1%;
  padding: 2% 2% 2% 3%;
  box-shadow: 0px 0px 10px 2px rgb(201, 201, 201);
  background-image: url('../assets/bg.gif');
  /* background-image: url('../assets/splash.gif'); */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.cards h3 {
  padding: 10% 5% 5% 5%;
}
.gst {
  width: 60px;

  margin-left: 20px;

  border-radius: 3px;

  border: 1px ridge #f1f1f1;

  /* outline: none; */
}
.btn-tax {
  width: 100px;
  margin: 10px 30px;
}

@media (max-width: 900px) {
  .cards {
    flex: 55%;
    max-width: 45%;
    height: 250px;
    margin: 6% 1% 1% 1%;
  }
}
@media (max-width: 650px) {
  .cards {
    flex: 70%;
    max-width: 70%;
    height: 175px;
    margin: 6% 1% 1% 1%;
  }
}
@media (max-width: 450px) {
  .cards {
    flex: 90%;
    max-width: 90%;
    height: 250px;
    margin: 6% 1% 1% 1%;
  }
}
</style>