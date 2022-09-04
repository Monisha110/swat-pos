<template>
  <div class="modal--bg">
    <div class="modal--content">
      <div
        class="modal--header d-flex justify-content-between align-items-center"
      >
        <div>
          <p class="modal--header--text">Add Seller details</p>
        </div>
        <div>
          <span class="close" @click="closeModal">&times;</span>
        </div>
      </div>
      <div class="modal--body">
        <div class="action--form--controller">
          <label for="seller-name" class="action--input--label">Name</label>

          <input
            type="text"
            v-model="seller.userName"
            class="action--input"
            placeholder="Enter Seller Name"
          />

          <span v-if="checkName" style="color: red"
            >Name should contain only alphabets</span
          >
        </div>

        <div class="action--form--controller">
          <label for="seller-email" class="action--input--label"
            >Email id</label
          >

          <input
            type="email"
            v-model="seller.userEmail"
            class="action--input"
            placeholder="Enter Email id"
          />

          <span v-if="checkEmail" style="color: red"
            >Enter valid email address</span
          >
        </div>

        <div class="action--form--controller">
          <label for="seller-phone_no" class="action--input--label"
            >Phone no</label
          >

          <input
            type="number"
            v-model="seller.userPhoneNo"
            class="action--input"
            placeholder="Enter Phone no"
          />

          <span v-if="checkPhoneNum" style="color: red"
            >Enter valid phone number</span
          >
        </div>

        <div class="action--form--controller">
          <label for="seller-password" class="action--input--label"
            >Password</label
          >

          <input
            type="password"
            v-model="seller.userPassword"
            class="action--input"
            placeholder="Enter Password"
          />

          <span>
            <img v-if="checkPasswordupper" src="@/assets/accept.png" />
            <img
              v-if="!checkPasswordupper"
              src="@/assets/wrong.jpeg"
              height="23px"
              width="23px"
            />
            must contain atleast 1 uppercase</span
          ><br />

          <span
            ><img v-if="checkPasswordlength" src="@/assets/accept.png" />
            <img
              v-if="!checkPasswordlength"
              src="@/assets/wrong.jpeg"
              height="23px"
              width="23px"
            />
            must contain atleast 8 characters </span
          ><br />

          <span
            ><img v-if="checkPasswordlower" src="@/assets/accept.png" />
            <img
              v-if="!checkPasswordlower"
              src="@/assets/wrong.jpeg"
              height="23px"
              width="23px"
            />
            must contain 1 lowercase </span
          ><br />

          <span
            ><img v-if="checkPasswordspecial" src="@/assets/accept.png" />
            <img
              v-if="!checkPasswordspecial"
              src="@/assets/wrong.jpeg"
              height="23px"
              width="23px"
            />
            must contain 1 special character</span
          ><br />

          <span
            ><img v-if="checkPasswordnumber" src="@/assets/accept.png" />
            <img
              v-if="!checkPasswordnumber"
              src="@/assets/wrong.jpeg"
              height="23px"
              width="23px"
            />
            must contain 1 number</span
          >
        </div>

        <div class="action--form--controller">
          <label for="seller-confirm-password" class="action--input--label"
            >Confirm Password</label
          >

          <input
            type="password"
            v-model="seller.confirm_password"
            class="action--input"
            placeholder="Retype password"
          />

          <span v-if="checkConfirmPassword" style="color: red"
            >Password and confirm password should be same</span
          >
        </div>
      </div>

      <div class="modal--footer">
        <div class="d-flex justify-content-end gap-1">
          <div class="col-3">
            <ButtonComponent
              label="Close"
              buttonStyle="btn--primary--outline"
              @onClick="closeModal()"
              type="button"
            />
          </div>
          <div class="col-auto">
            <ButtonComponent
              label="Create"
              buttonStyle="btn--primary"
              @onClick="submitSeller(seller)"
              type="button"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue";
import { addNewSeller } from "../service/seller.service";
import Vue from "vue";
export default {
  name: "CreateSellerModal",
  data() {
    return {
      seller: {
        userName: "",
        userEmail: "",
        userPassword: "",
        confirm_password: "",
        userPhoneNo: "",
      },

      checkPasswordlower: false,
      checkPasswordupper: false,
      checkPasswordspecial: false,
      checkPasswordlength: false,
      checkPasswordnumber: false,
      checkConfirmPassword: false,
      checkEmail: false,
      checkPhoneNum: false,
      checkName: false,
    };
  },

  components: {
    ButtonComponent,
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    submitSeller(seller) {
      if (
        this.seller.userName != "" &&
        this.checkName == false &&
        this.seller.userEmail != "" &&
        this.checkEmail == false &&
        this.seller.userPassword != "" &&
        this.seller.confirm_password != "" &&
        this.seller.userPassword == this.seller.confirm_password &&
        this.seller.userPhoneNo != "" &&
        this.checkPhoneNum == false
      ) {
        addNewSeller({
          success: (response) => {
            console.log(response);
            this.$emit("closeModal");
            this.$store.dispatch("GET_SELLER_LIST");
            this.$store.dispatch("GET_SELLER_COUNT");
          },
          error: (err) => {
            console.log(err);
            if(err.message=="Request failed with status code 502")
            Vue.$toast.error("you are not Authorized")
            this.$emit("closeModal");
          },
          data: seller,
        });
      } else Vue.$toast.error("Enter all the fields");
    },
  },
  watch: {
    "seller.userPassword"() {
      var lowercasepattern = new RegExp("(?=.*[a-z])");

      lowercasepattern.test(this.seller.userPassword)
        ? (this.checkPasswordlower = true)
        : (this.checkPasswordlower = false);

      var uppercasepattern = new RegExp("(?=.*[A-Z])");

      uppercasepattern.test(this.seller.userPassword)
        ? (this.checkPasswordupper = true)
        : (this.checkPasswordupper = false);

      var specialcasepattern = new RegExp("(?=.*[-+_!@#$%^&*., ?])");

      specialcasepattern.test(this.seller.userPassword)
        ? (this.checkPasswordspecial = true)
        : (this.checkPasswordspecial = false);

      var numbercasepattern = new RegExp("(?=.*\\d)");

      numbercasepattern.test(this.seller.userPassword)
        ? (this.checkPasswordnumber = true)
        : (this.checkPasswordnumber = false);

      this.seller.userPassword.length >= 8
        ? (this.checkPasswordlength = true)
        : (this.checkPasswordlength = false);
    },

    "seller.confirm_password"() {
      this.seller.confirm_password != this.seller.userPassword
        ? (this.checkConfirmPassword = true)
        : (this.checkConfirmPassword = false);
    },
    "seller.userEmail"() {
      var emailValidate = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
      emailValidate.test(this.seller.userEmail)
        ? (this.checkEmail = false)
        : (this.checkEmail = true);
    },
    "seller.userPhoneNo"() {
      this.seller.userPhoneNo.length == 10
        ? (this.checkPhoneNum = false)
        : (this.checkPhoneNum = true);
    },
    "seller.userName"() {
      var nameValidate = new RegExp("^[a-zA-Z]*$");
      nameValidate.test(this.seller.userName)
        ? (this.checkName = false)
        : (this.checkName = true);
    },
  },
};
</script>
    
    <style scoped>
.action--form--controller img {
  height: 12px;
  width: 12px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.action--input--label {
  font-size: 14px;
  font-weight: 700;
}

.action--input {
  width: 100%;
  height: 40px;
  background-color: #f1f1f1;
  border-radius: 10px;
  border: 1px solid #f1f1f1;
  margin-top: 5px;
  padding-left: 10px;
  outline: none;
}

.action--input:focus {
  border: 1px solid #ff6665;
}

.action--form--controller {
  margin-bottom: 20px;
}

.modal--bg {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.481);
}

.modal--content {
  background-color: #fefefe;
  margin: 5% auto;
  /* padding: 20px; */
  border: 1px solid #888;
  width: 40%;
  border-radius: 10px;
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal--header--text {
  margin: 0;
}

.modal--header {
  border-bottom: 1px solid rgb(202, 202, 202);
  padding: 5px 20px;
}

.modal--footer {
  border-top: 1px solid rgb(202, 202, 202);
  padding: 10px 20px;
}

.modal--body {
  padding: 10px 20px;
}
</style>
    