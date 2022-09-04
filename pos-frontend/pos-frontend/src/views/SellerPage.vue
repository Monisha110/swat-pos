<template>
    <div>
        <SellerNav />
    <router-view/>
    </div>
</template>

<script>
import SellerNav from '../components/SellerNav.vue'
export default{
    name:"SellerComponent",
    components:{
        SellerNav,
    },
}
</script>

<style scoped>

</style>
