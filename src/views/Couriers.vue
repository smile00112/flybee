<template>
  <toolbar @filter="filter" @search="search">
    <!--При изменении статуса казаза изменяется картинка-->
    <!--white.png новыз заказ-->
    <!--yellow.png заказ в работе-->
    <div style="margin: 10% 0% 2% 0%;">
      <div v-for="courier in filtredCouriers" :key="courier.id" class="bs-list-zak">
        <div style="display: flex; margin-bottom: 2%">
          <div class="bs-nomer-zak">
            <a :href="getLink(courier.id)" @click.prevent="$router.push(getLink(courier.id))">
              <p class="bs-p-zak">№ {{ courier.id }}</p>
            </a>
          </div>
          <img class="bs-left-zak" :src="getImg(courier.status)" />
        </div>
      </div>
    </div>
  </toolbar>
</template>

<script>
  import Toolbar from "../components/Toolbar";
  import { mapActions, mapState } from "vuex";

  export default {
    components: { Toolbar },
    computed: mapState(["news"]),
    data: () => ({
      filtredOrders: []
    }),
    methods: {
      ...mapActions(["getCouriers"]),
      getImg(status) {
        let img;
        if (status == "1") img = "green.png";
        if (status == "2") img = "yellow.png";
        if (status == "4") img = "white.png";
        if (status == "0") img = "red.png";
        return require(`@/assets/image/${img}`);
      },
      getLink(orderId) {
        return `/courier/${orderId}`;
      },
      // filter({ checkboxes, date }) {
      //   if (checkboxes.length > 0) {
      //     this.filtredOrders = this.filtredOrders.filter(i =>
      //       checkboxes.includes(i.status)
      //     );
      //   }
      //   if (date) {
      //     this.filtredOrders = this.filtredOrders.filter(
      //       i => date == i.takeDate.split(" ")[0]
      //     );
      //   }
      // },
      search(val) {
        this.filtredCouriers = this.couriers.filter(i => {
          return (
            i.name.indexOf(val) + 1
          );
        });
      }
    },
    async mounted() {
      await this.getCouriers();
      //this.filtredOrders = this.news;
    }
  };
</script>

<style>
</style>