<template>
  <div class="container-fluid mt-5">
    <div class="search--card">
      <div class="row align-items-center">
        <div class="col-12 col-md-6 col-lg-8 my-2">
          <input
            type="search"
            class="search--bar"
            v-model="searchKey"
             @blur="searchForSeller(searchKey)"
            placeholder="Search Product"
          />
        </div>
        <div class="col-6 col-md-3 col-lg-2 my-2">
          <ButtonComponent
            label="Search"
            buttonStyle="btn--primary"
            @onClick="searchForSeller(searchKey)"
            type="button"
          />
        </div>
        <div class="col-6 col-md-3 col-lg-2 my-2">
          <ButtonComponent
            label="Add Seller"
            buttonStyle="btn--primary--outline"
            @onClick="addSeller()"
            type="button"
          />
        </div>
      </div>
    </div>
    <CreateSellerModal v-if="showModal" @closeModal="modalClose" />
    <EditSellerModal
      v-if="showEditModal"
      @closeEditModal="modalClose"
      :sellerdata="sproduct"
    />
    <DeleteModal
      v-if="showDeleteModal"
      :sellerid="selleridofdelete"
      @closeModal="modalClose"
    />
    <!-- <button @click="getData(sellerList[0].userId)">get seller details</button> -->
    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->
    <!-- <div>
      <b-table :items="sellerList" :fields="fields" striped responsive="sm">
        <template #cell(show_details)="row">
          <b-button
            size="sm"
            variant="outline-success"
            @click="row.toggleDetails"
            class="mr-2"
          >
            {{ row.detailsShowing ? "Hide" : "Show" }} Details
          </b-button>
        </template>
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
              <b-col>{{ showModal }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Phone No:</b></b-col>
              <b-col>{{ row.item.userPhoneNo }}</b-col>
            </b-row>
            <b-button
              variant="outline-success"
              size="sm"
              @click="row.toggleDetails"
              >Hide Details</b-button
            >
          </b-card>
        </template>
      </b-table>
    </div> -->
    <div class="inventory--table my-4">
      <div class="table-responsive">
        <table class="table table-sm">
          <!-- <thead>
            <tr>
              <th scope="col">
                <p class="inventory--table--th">Product Id</p>
              </th>
              <th scope="col">
                <p class="inventory--table--th">Seller Name</p>
              </th>
              <th scope="col">
                <p class="inventory--table--th">Description</p>
              </th>
              <th scope="col">
                <p class="inventory--table--th">Price</p>
              </th>
              <th scope="col">
                <p class="inventory--table--th">Quantity</p>
              </th>
              <th scope="col">
                <p class="inventory--table--th">Edit</p>
              </th>
              <th scope="col">
                <p class="inventory--table--th">Delete</p>
              </th>
            </tr>
          </thead> -->
          <tbody class="">
            <!-- <div v-if="searchList.length > 0"> -->
               <TableList
              v-for="(data, index) in sellerList"
              :key="index"
              :product="data"
              :id="index"
              @openmodal="openModal"
              @deleteSellerevent="deleteModal"
            />
            <!-- </div>
            <div v-else>
              ghj -->
               <!-- <TableList
              v-for="(data, index) in sellerList"
              :key="index"
              :product="data"
              :id="index"
              @openmodal="openModal"
              @deleteSellerevent="deleteModal"
            /> -->
            <!-- </div> -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import CreateSellerModal from "../components/CreateSellerModal.vue";
import EditSellerModal from "../components/EditSellerModal.vue";
import TableList from "../components/TableListComponent.vue";
import DeleteModal from "../components/DeleteModal.vue";
import { mapGetters } from "vuex";
// import {getSellerOrder} from "../service/seller.service"
export default {
  name: "ManageSellerPage",
  data() {
    return {
      fields: ["userName", "userPhoneNo", "show_details"],
      // items: [
      //   { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      //   { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      //   {
      //     isActive: false,
      //     age: 89,
      //     first_name: 'Geneva',
      //     last_name: 'Wilson',
      //   },
      //   { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      // ],
      selleridofdelete: "",
      showModal: false,
      showEditModal: false,
      showDeleteModal: false,
      sproduct: {},

     
    };
  },
  methods: {
    addSeller() {
      this.showModal = true;
    },
    openModal(product) {
      console.log(product);
      this.sproduct = product;
      this.showEditModal = true;
    },
    deleteModal({ sellerId }) {
      console.log("inside parent", sellerId);
      this.showDeleteModal = true;
      this.selleridofdelete = sellerId;
    },
    modalClose() {
      this.showModal = false;
      this.showEditModal = false;
      this.showDeleteModal = false;
    },
    searchForSeller(key){
        this.$store.dispatch('GET_SEARCH_LIST',key)
    },
    // getData(id){
    //   getSellerOrder({
    //     success:(res)=>{
    //       console.log(res)
    //     },
    //     error:(err)=>{
    //       console.log(err)
    //     },
    //     id
    //   })
    // },
    // deleteSuccess(){
    //   console.log("event emitted")
    //   this.$store.dispatch("GET_SELLER_LIST");
    // }
  },
  components: {
    ButtonComponent,
    CreateSellerModal,
    TableList,
    EditSellerModal,
    DeleteModal,
  },
  computed: {
    ...mapGetters({
      sellerList: "getSellerList",
      sellersearchList: "getSellerSearchList"
    }),
  },
  mounted() {
    this.$store.dispatch("GET_SELLER_LIST");
    this.$store.dispatch("GET_SEARCH_LIST");
  },
};
</script>

<style scoped>
.search--card {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
}
.search--bar {
  background-color: #f1f1f1;
  border: 0.7px solid #e2e2e2;
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
  width: 100%;
}
.search--bar:focus {
  border: 1.5px solid #ff6665;
  outline: none;
}
.btn-primary,
.btn-primary:hover,
.btn-primary:active,
.btn-primary:visited {
  background-color: #8064a2 !important;
}
.inventory--table {
  background-color: #ffffff;
  /* padding: 10px; */
  border-radius: 10px;
}
.inventory--single--list {
  border: 0.5px solid #1b1b1b;
  margin: 0;
}
</style>
