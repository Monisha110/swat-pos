<template>
<div class="container1">
  <div class="cookiesContent" id="cookiesPopup">
    <button class="close" @click="closemodal()">✖</button>
    <img src="@/assets/wrong.jpeg" alt="cookies-img" />
    <p>Are you sure?</p>
    <p>Do you really want to delete this item?</p>
    <button class="accept" @click="deleteAccept">That's fine!</button>
  </div>
</div>
</template>

<script>
import { deleteSeller } from "../service/seller.service";
import { deleteProductData } from "@/service/product.service.js";
import Vue from "vue";
export default{
name:"DeleteModal",
methods:{
  deleteAccept(){
    if(this.sellerid){
     deleteSeller({
        success: (response) => {
          console.log(response);
          Vue.$toast.success("Seller Deleted!");
          this.$store.dispatch("GET_SELLER_LIST");
          this.$emit("closeModal");

        },
        error: (err) => {
          console.log(err);
          Vue.$toast.error("delete unsuccessful");
        },
        sellerId:this.sellerid,
      });}
      else{
        deleteProductData({
        productId:this.deleteproductid,
        successCallback: (res) => {
          console.log(res);
          if (res.status === 200) {
            Vue.$toast.success("Product Deleted!");
            this.$store.dispatch("SEARCH_THE_PRODUCT")
            this.$emit("closeModal");
          } else {
            Vue.$toast.error();("Deletion Process declined!");
          }
        },
        errrorCallback: (err) => {
          Vue.$toast.error(err);
        },
      });
      }
  },

  closemodal(){
    this.$emit("closeModal");
  }
},
props:{
  sellerid:{
    type:String,
  },
   deleteproductid:{
    type:String,
  }
}
}
</script>

<style>
    /* body {
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
} */
.container1{
    z-index: 100;
    top:40%;
    left:50%;
    position: absolute;
    transform:translate(-50%,-50%);
    border-radius: 20px;
    /* box-shadow: #f5f5f5; */
   box-shadow: 0px 0px 20px 2px rgb(191, 191, 191);
}
.cookiesContent {
  width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 20px;
  padding: 0px 30px 20px;}
  button.close {
    width: 30px;
    font-size: 20px;
    color: #c0c5cb;
    align-self: flex-end;
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
  }
  img {
    width: 82px;
    margin-bottom: 15px;
  }
  p {
    /* margin-bottom: 40px; */
    font-size: 18px;
  }
  button.accept {
    background-color: #ed6755;
    border: none;
    border-radius: 5px;
    width: 200px;
    padding: 14px;
    font-size: 16px;
    color: white;
    box-shadow: 0px 6px 18px -5px rgba(237, 103, 85, 1);
  }

</style>