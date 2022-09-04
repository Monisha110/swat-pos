import { getOrderHistory,getRecentOrders  } from "@/service/order.service"

export default {
    state : {
        orderHistory : []
    },
    getters : {
        getOrderHistory(state){
            return state.orderHistory;
        }
    },
    mutations : {
        updateOrderHistory(state,value){
            state.orderHistory = value;
        }
    },
    actions :{
        GET_ORDER_HISTORY({commit}){
            getOrderHistory({
                successCallback : ({data}) => {
                    console.log(data)
                    commit("updateOrderHistory",data.content)
                },
                errrorCallback : (errorResponse) => {
                    console.log(errorResponse)
                }
            })
        },
        GET_RECENT_ORDERS(){
            getRecentOrders({
                success: (response)=> {
                    this.recentOrder = response.data;
                },
                error:(e) => {
                    console.log(e)
                }
              })
        }
    }
}