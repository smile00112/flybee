<template>
  <toolbar>
      
    
      <!--Диапазон для отчетов-->
      <ul class="nav justify-content-center" v-if="$route.path == '/reports'">
        <li class="nav-item-date">

          <label for="order-from" class="bs-labe-zakaz">Дата от</label>
          
          <input v-model="reportForm.from" class="bs-input-zakaz" type="date" id="order-from" />

        </li>
        <li class="nav-item-date">
          <label for="order-to" class="bs-labe-zakaz">Дата до</label>

          <input v-model="reportForm.to" class="bs-input-zakaz" type="date" id="order-to" />
        </li>

        <li class="nav-item-date">
          <label for="order-courier" class="bs-labe-zakaz">Курьер</label>

          <select v-model="reportForm.courier" class="bs-input-zakaz" id="order-courier">
            <option v-for="courier in couriers" 
            v-bind:key="courier.id" 
            :value="courier.id"
            >{{ courier.name }}</option> 
          </select>
        </li>
        
      </ul>

      <div class="row justify-content-center bs-m-t-60">
          <button @click="filterOrders"  type="button" class="bs-success-button">Поиск</button>
      </div>
  </toolbar>
</template>

<script>
  import Toolbar from "../components/Toolbar";
  import { mapActions, mapState } from "vuex";

  export default {
    components: { Toolbar },
    computed: mapState(["couriers","history","statuses",]),
    data: () => ({
      filtredCouriers: [],
      newCourierForm:{
        show: false
      },

      reportForm: {
        from: "",
        to: "",
        courier: "",
      },      
    }),
    methods: {
      ...mapActions(["getCouriers", "getAllOrders","getOrderStatuses"]),

      filterOrders() {
        console.log(this.reportForm);
        console.log(this.history); 
        console.warn(this.statuses);    
        console.warn(this.couriers);   

        //let $r_f = this.reportForm;
        let $res =  this.history.filter(i => {
          return (
            i.name.toLowerCase().indexOf(val)
          );
        });
return $res;
                 
      },


    },
    async mounted() {
      await this.getCouriers();
      await this.getAllOrders();
      await this.getOrderStatuses();  //  this.orderStatus = this.statuses.filter(i => i.delivery_id == this.$route.params.id)[0];
      //this.filtredOrders = this.history;
     // this.filtredCouriers = this.couriers;
    }
  };
</script>

<style>
</style>