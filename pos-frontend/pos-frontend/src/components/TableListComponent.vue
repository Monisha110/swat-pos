<template>
  <!-- <div class="inventory--list my-1"> -->
    
      <!-- <div class="inventory--table-my-4">
        <div class="table-responsive">
    <table class="table table-sm">
     
  <tr>
    <th scope="row">
      <p class="inventory--table--tr">{{ id+1}}</p>
    </th>
    <td>
      <p class="inventory--table--tr">{{ product.userName }}</p>
    </td>
    <td>
      <BadgeComponent :label="stockAnalysis ? 'Out of Stock' : 'Available'" />
    </td>
    <td>
      <p class="inventory--table--tr">{{ product.userPhoneNo }}</p>
    </td>
    <td>
      <p class="inventory--table--tr">{{ product.userEmail }}</p>
    </td>
    <td>
      <ButtonComponent
        label="Edit"
        buttonStyle="btn--secondary"
        @onClick="editSeller(product)"
        type="button"
      />
    </td>
    <td>
      <ButtonComponent
        label="Delete"
        buttonStyle="btn--danger"
        @onClick="deleteseller({ sellerId: product.userId })"
        type="button"
      />
    </td>
    <td>
      <ButtonComponent
        label="view details"
        buttonStyle="btn--secondary"
        @onClick="toggle({ product, id })"
        type="button"
      />
    </td>
  </tr>
      <tr v-if="opened.includes(id)">
        <div v-for="(order, index) in product.orderhistory" :key="index">
          <div v-for="(items, index) in order.orderItems" :key="index">
            {{ items.name }}
            {{ items.price }}
            {{ items.quantity }}
          </div>
          <td>
            Tax : {{ order.tax }}
            <br />
            SubTotal : {{ order.subTotal }}
            <hr />
          </td>
        </div>
      </tr>
  
    </table> 
        </div>
      </div> -->

<div class="maincont">
<div >
  <div style="float: left; width: 50px; ">
  <p >{{ id+1}}</p>
</div>
<div style="float: left; width: 250px; ">
   <p >{{ product.userName }}</p>
</div>
<div style="float: left; width: 250px; ">
   <p >{{ product.userName }}</p>
</div>
<div style="float: left; width: 250px; ">
   <p >{{ product.userName }}</p>
</div>
<div style="float: left; width: 250px; ">
<p >{{ product.userPhoneNo }}</p>
</div>
<div style="float: left; width: 120px; ">
<p><ButtonComponent
        label="Edit"
        buttonStyle="btn--secondary"
        @onClick="editSeller(product)"
        type="button"
      /></p>
</div>


<div style="float: left; width: 120px;">
 <p><ButtonComponent
        label="Delete"
        buttonStyle="btn--danger"
        @onClick="deleteseller({ sellerId: product.userId })"
        type="button"
      /></p>
</div>

<div style="float: left; width: 120px;">
 <p><ButtonComponent
        label="view details"
        buttonStyle="btn--secondary1"
        @onClick="toggle({ product, id })"
        type="button"
      /></p>
</div>
</div>

<div style="float: left; margin:10px 50px;background-color:#f5f7f6;width:90%" v-if="opened.includes(id) && product.orderhistory.length > 0">
        <b-card v-for="(order, index) in product.orderhistory" :key="index">
          <div v-for="(items, index) in order.orderItems" :key="index">
          <div style="float: left; width: 250px;" >{{ items.name }}</div>
           <div style="float: left; width: 250px;"> Price : {{ items.price }}</div>
           <div style="float: left; width: 250px;">Quantity : {{ items.quantity }}</div>
           <!-- <div style="float: left; width: 250px;"> <p></p> </div>
           <div style="float: left; width: 250px;"> </div> -->
           
           <div style="float: left; width: 150px;">Tax : {{ order.tax }}</div>
           <div style="float: left; width: 150px;"> SubTotal : {{ order.subTotal }}</div></div>
          </b-card>
</div>


</div>
    


<!-- </div> -->

  <!-- <tr v-if="opened.includes(id)">
      <div v-for="(order,index) in product.orderhistory" :key="index">
      <div v-for="(items,index) in order.orderItems" :key="index">
        <p>{{items.name}}</p>
        <p>{{items.price}}</p>
         <p>{{items.quantity}}</p>
      </div>
      <td>Tax : {{ order.tax }}
        <br>
        SubTotal : {{order.subTotal}}
        <hr>
      </td>
      </div>
    </tr> -->
</template>
<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
// import BadgeComponent from "@/components/BadgeComponent.vue";
import Vue from "vue";
// import { deleteProductData } from "@/service/product.service.js";
import { getSellerOrder } from "../service/seller.service";


export default {
  name: "TableList",
  data() {
    return {
      editModalToggle: false,
      showActionModal: false,
      modalData: {},
      opened: [],
      data: "hello",
    };
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    id: {
      type: Number,
    },
  },
  components: {
    ButtonComponent,
    // BadgeComponent,
  },
  methods: {
    editSeller(product) {
      console.log(product)
      // this.showActionModal = true;
      // const constructedModalData = {
      //   modalHeader: "Edit Product Info",
      //   productData: data,
      //   modalButtonName: "Save Product",
      // };
      this.$emit("openmodal",product);

    },
    deleteseller({ sellerId }) {
      console.log(sellerId);
      this.$emit("deleteSellerevent",{sellerId});
      // deleteSeller({
      //   success: (response) => {
      //     console.log(response);
      //     Vue.$toast.success("Seller Deleted!");
      //     this.$store.dispatch("GET_SELLER_LIST");
      //     // this.$emit("deleted");
      //   },
      //   error: (err) => {
      //     console.log(err);
      //     Vue.$toast.error("delete unsuccessful");
      //   },
      //   sellerId: sellerId,
      // });
    },
    // deleteProduct({ productId }) {
    //   deleteProductData({
    //     productId,
    //     successCallback: (res) => {
    //       console.log(res);
    //       if (res.status === 200) {
    //         Vue.$toast.success("Product Deleted!");
    //         this.$store.dispatch("SEARCH_THE_PRODUCT");
    //       } else {
    //         Vue.$toast.error();
    //         ("Deletion Process declined!");
    //       }
    //     },
    //     errrorCallback: (err) => {
    //       Vue.$toast.error(err);
    //     },
    //   });
    // },
    viewOrderHistory(product) {
      this.$emit("vieworderhistory", product);
    },

    toggle({ product, id }) {
      //get call
      getSellerOrder({
        success: (res) => {
          console.log(res.data);
          //store
          let response = res.data;
          this.$store.dispatch("SET_ORDER_LIST", {
            response,
            uid: product.userId,
          });
          if (res.data.length == 0) {
            Vue.$toast.error("No Orders yet....");
          }
        },
        error: (err) => {
          console.log(err);
        },
        uid: product.userId,
      });

      let id1 = id;
      console.log(id1);
      const index = this.opened.indexOf(id1);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id1);
      }
    },
  },
  computed: {
    stockAnalysis() {
      return this.product.quantity === 0;
    },
  },
};
</script>
<style scoped>
.carde{
  
}
.maincont{
  width:max-content;
  height:max-content;
  overflow-x: auto;
}
.inventory--table-my-4{
  width:150%;
}
.table--responsive{
  width:100%;
}
.inventory--single--list {
  margin: 0;
  border: 0.5px solid #999999;
}

.inventory--table--tr {
  margin: 5px;
  font-size: 15px;
}
.inventory--table {
  background-color: #ffffff;
  /* padding: 10px; */
  border-radius: 10px;
}
</style>

