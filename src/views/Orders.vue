<template>
  <toolbar @filter="filter" @search="search">
    <!--При изменении статуса казаза изменяется картинка-->
    <!--white.png новыз заказ-->
    <!--yellow.png заказ в работе-->
    <div style="margin: 10% 0% 2% 0%;">
      <div v-for="order in filtredOrders" :key="order.orderId" class="bs-list-zak">
        <div style="display: flex; margin-bottom: 2%">
          <div class="bs-nomer-zak">
            <a :href="getLink(order.orderId)" @click.prevent="$router.push(getLink(order.orderId))">
              <p class="bs-p-zak">№ {{ order.orderId }}</p>
            </a>
          </div>
          <img class="bs-left-zak" :src="getImg(order.status)" />
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
      ...mapActions(["getAllOrders"]),
      getImg(status) {
        let img;
        if (status == "1") img = "white.png";
        if (status == "2") img = "yellow.png";
        if (status == "4") img = "green.png";
        if (status == "8") img = "red.png";
        return require(`@/assets/image/${img}`);
      },
      getLink(orderId) {
        return `/info/${orderId}`;
      },
      filter({ checkboxes, date }) {
        if (checkboxes.length > 0) {
          this.filtredOrders = this.filtredOrders.filter(i =>
            checkboxes.includes(i.status)
          );
        }
        if (date) {
          this.filtredOrders = this.filtredOrders.filter(
            i => date == i.takeDate.split(" ")[0]
          );
        }
      },
      search(val) {
        this.filtredOrders = this.news.filter(i => {
          return (
            i.fromAddress.indexOf(val) + 1 ||
            i.fromName.indexOf(val) + 1 ||
            i.toAddress.indexOf(val) + 1 ||
            i.toName.indexOf(val) + 1 ||
            i.orderId.indexOf(val) + 1 
          );
        });
      }
    },
    async mounted() {
      await this.getAllOrders();
      this.filtredOrders = this.news;
    }
  };
</script>

<style>
</style>