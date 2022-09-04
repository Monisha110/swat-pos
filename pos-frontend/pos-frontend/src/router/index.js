import Vue from "vue";
import Router from "vue-router";

// import store from  "@/store/index";

import HomePage from "@/views/HomePage.vue";
import OrderHistory from "@/views/OrderHistory.vue";
import InventoryPage from "@/views/InventoryPage.vue";
import LoginComponent from "@/views/LoginComponent.vue";
// import RegisterComponent from "@/views/RegisterComponent.vue";
import AdminPage from "@/views/AdminPage.vue"
import SellerPage from "@/views/SellerPage.vue"
import ManageSellerPage from "@/views/ManageSellerPage"
import AdminHomePage from "@/views/AdminHomePage"
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/seller",
      name: "SellerPage",
      component: SellerPage,
      beforeEnter: (to, from, next) => {

        console.log(to, from)

        const auth = JSON.parse(localStorage.user);

        if (auth.userRole == 'Seller') {
          next()
        }
        else {
          next({ path: '/admin' })
        }
      },
      children :[
        {path:"/",name:"HomePage",component:HomePage},
        {path:"orderhistory",name:"OrderHistory",component : OrderHistory},
      ]
    },
    {
      path: "/",
      name: "LoginPage",
      component: LoginComponent,
    },
    {
      path: "/admin",
      name: "AdminPage",
      component: AdminPage,
      beforeEnter:(to,from,next)=>
      {
        console.log(to,from)
        const auth = JSON.parse(localStorage.user);

          if(auth.userRole=="Admin")
          {
            next();
          }
          else{
            next({path:'/seller'})
          }
      },
      children:[
        {path:"/",name:"AdminHomePage",component:AdminHomePage},
        {path:"inventory",name:"InventoryPage",component : InventoryPage},
        {path:"managesellers",name:"ManageSellerPage",component : ManageSellerPage}],
    },
   
    // {
    //   path: "/orderhistory",
    //   name: "OrderHistory",
    //   component: OrderHistory,
    // },
    // {
    //   path: "/inventory",
    //   name: "InventoryPage",
    //   component: InventoryPage,
    // },
    // {
    //   path: "/register",
    //   name: "RegisterComponent",
    //   component: RegisterComponent,
    // },
  ],
});

router.beforeEach((to, from, next) => {
  
  const auth = localStorage.user;
  if(to.name=="LoginPage" && auth){
    alert("Already logged in")
    next({name: from.name})
  }
  if (to.name !== "LoginPage" && auth == undefined)
    next({ name: "LoginPage" });
  else next();

});

export default router;
