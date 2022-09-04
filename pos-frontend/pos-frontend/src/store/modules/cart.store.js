import Vue from "vue";
import {getTax,updateTax} from "../../service/cart.service"
export default {
    state : {
        cartProductList : [],
        tax : {},
    },
    getters : {
        getCartProduct(state){
            return state.cartProductList;
        },
        getTotalPrice(state){
            return Math.floor(state.cartProductList.reduce((accum,item) => accum + (item.price * item.quantity), 0))
        },
        getTax(state){
          return state.tax;
        }
    },
    mutations : {
        addProductToCart(state, { product }) {
          console.log(product)
            const constructedProduct = {
              quantity: 1,
              inventoryQuantity : product.quantity,
              id: product.id,
              imageUrl: product.imageUrl,
              description : product.description,
              name: product.name,
              price : product.price
            };
            let item = state.cartProductList.find((item) => item.id == product.id);
            if (item){
              if(item.quantity < item.inventoryQuantity){
                item.quantity++;
              }else{
                Vue.$toast.error("Out of Stock, Please go for other!");
              }
              
            }
            else{
              state.cartProductList.push({ ...constructedProduct });
            }
          },
      
          decreaseProductQuantity(state, { productId }) {
            let item = state.cartProductList.find((item) => item.id == productId);
            if (item.quantity > 1) item.quantity--;
          },
      
          removeProductFromCart(state, { productIndex }) {
            state.cartProductList.splice(productIndex, 1);
          },

          clearCart(state){
            state.cartProductList = [];
          },
          setTax(state,value)
          {
            state.tax=value;
          }
    },
    actions :{
        ADD_PRODUCT_TO_CART({ commit },product){
            commit('addProductToCart', product)
        },
        REMOVE_PRODUCT_FROM_CART({ commit },{productIndex}){
          console.log(productIndex)
            commit('removeProductFromCart', {productIndex})
        },
        DECREASE_PRODUCT_QUANTITY({ commit },productId){
            commit('decreaseProductQuantity', productId)
        },
        GET_TAX()
        {
            getTax({
              success:(response)=>{
                this.commit('setTax',response.data)
              },
              error:(err)=>{
                Vue.$toast.error(err)
              }
            })
        },
        UPDATE_TAX(state,tax){
          console.log(state,"update tax store")
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
            tax
          })
        }
    }
}