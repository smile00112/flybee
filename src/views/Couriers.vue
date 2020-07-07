<template>
  <toolbar  @search="search">
      
      <div class="bs-filtr-zak" v-if="newCourierForm.show">
        <button @click="formClose" class="bs-close">
          <img src="@/assets/image/close.png" />
        </button>
      

        <label for="a1">Имя</label>
        <input v-model="confirm.name" id='a1' type="text" /> 
        <br />
        <label for="a2">Тел.</label>
        <input v-model="confirm.phone" id='a2' type="text" /> 
        <br />


        <button @click="add" class="bs-prim-filtr">Применить</button>
        <button @click="formClear" class="bs-clear-filtr">Очистить</button>
      </div>
    <!--При изменении статуса казаза изменяется картинка-->
    <!--white.png новыз заказ-->
    <!--yellow.png заказ в работе-->
    <div style="margin: 10% 0% 2% 0%;">
      <div v-for="courier in filtredCouriers" :key="courier.id" class="bs-list-zak">
        <div style="display: flex; margin-bottom: 2%">
          <div class="bs-nomer-zak">
            <a :href="getLink(courier.id)" @click.prevent="$router.push(getLink(courier.id))">
              <p class="bs-p-zak">№{{ courier.id }} {{ courier.name }}</p>
            </a>
          </div>
          <img class="bs-left-zak" :src="getImg(courier.status)" />
        </div>
      </div>
    </div>

      <div class="row justify-content-center bs-m-t-60">
          <button @click="formShow"  type="button" class="bs-success-button">Добавить курьера</button>
      </div>
  </toolbar>
</template>

<script>
  import Toolbar from "../components/Toolbar";
  import { mapActions, mapState } from "vuex";

  export default {
    components: { Toolbar },
    computed: mapState(["couriers"]),
    data: () => ({
      filtredCouriers: [],
      newCourierForm:{
        show: false
      },
      confirm: {
        id: null,
        name: "",
        date: "",
        status: 1
      },
    }),
    methods: {
      ...mapActions(["getCouriers", "addCourier"]),
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
      search(val) {
        this.filtredCouriers = this.couriers.filter(i => {
          return (
            i.name.toLowerCase().indexOf(val) + 1
          );
        });
      },
      async add() {
        this.newCourierForm.show = false;
        await this.addCourier({ payload: this.confirm });
        await this.getCouriers();
        this.filtredCouriers = this.couriers;
      },
      formClear() {
        this.confirm.name = this.confirm.phone = '';
      },
      formClose() {
        this.newCourierForm.show = false;
      },
      formShow() {
        this.newCourierForm.show = true;
      },


    },
    async mounted() {
      await this.getCouriers();
      this.filtredCouriers = this.couriers;
    }
  };
</script>

<style>
</style>