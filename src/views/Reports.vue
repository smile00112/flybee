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
          <label for="order-courier" class="bs-labe-zakaz">Котрагенты</label>

          <select v-model="reportForm.contra" class="bs-input-zakaz" id="order-contra">
            <option v-for="agent in contra" 
            v-bind:key="agent.id" 
            :value="agent.id"
            >{{ agent.name }}</option> 
          </select>
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

        <li class="nav-item-date">
           <button @click="filterOrders"  type="button" class="bs-success-button">Поиск</button>
        </li>
        
      </ul>


      <div class="row justify-content-center bs-m-t-60">
         
      </div>


      <div style="margin: 10% 0% 2% 0%;">


      <download-excel v-if="json_data.length"
          class   = "btn btn-default"
          :data   = "json_data"
          :fields = "json_fields"
          worksheet = "Лист 1"
          name    = "report.xls">
      
          <span class="link">Скачать в .xls</span>
      
      </download-excel>
      <br><br>



      <div v-if="!orders_v.length">Нет данных</div>

      <div v-for="order in orders_v" :key="order.orderId" class="bs-list-zak">
        <div style="display: flex; margin-bottom: 2%">
          <div class="bs-nomer-zak">
            <a :href="getLink(order.orderId)" @click.prevent="$router.push(getLink(order.orderId))">
              <p class="bs-p-zak">№ {{ order.orderId }}  дата:{{ order.date }}  сумма:{{ order.summ }} руб.</p>
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
    computed: mapState(["couriers","history","statuses","companyes"]),
    data: () => ({
        json_fields: {
            '№': 'number',
            'API №': 'orderId',
            'Дата': 'date',
            'Адрес откуда': 'fromAddress',
            'Адрес куда': 'toAddress',
            'Получатель': 'toContactPerson',
            'Цена': 'summ',
            'Итого': 'total',
        },
        json_data: [
          //  {
          //       'number': 'TEST',
          //       'date': 'TEST',
          //       'fromAddress': 'TEST',
          //       'toAddress': 'TEST',
          //       'master': 'TEST',
          //       'summ': 'TEST',
                
          //   },
          //   {
          //       'number': 'Tony Peña',
          //       'date': 'New York',
          //       'addr_from': 'United States',
          //       'addr_to': '1978-03-15',
          //       'master': '1978-03-15',
          //       'summ': '1978-03-15',
          //   }
        ],
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
      filtredCouriers: [],
      newCourierForm:{
        show: false
      },
      reportForm: {
        from: "",
        to: "",
        courier: "",
        contra: ""
      },
      orders: [], 
      orders_v: [], 
      contra: [],
    }),
    methods: {
      ...mapActions(["getCouriers", "getAllOrders","getOrderStatuses", "getCompanyes"]),
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
      filterOrders() {
       
        //Фильтруем
        let $res =  this.orders.filter(i => {

        // let courier_name = i.courier_id ? this.couriers.find(cc => cc.id == i.courier_id) : '';
        //  if( courier_name !== undefined ) courier_name = courier_name.name;

          let courier = this.reportForm.courier ? ( i.courier_id == this.reportForm.courier ) : 1;
          let date_from = 0;
          let date_to = 0;
          let contra = this.reportForm.contra ? ( i.companyId == this.reportForm.contra ) : 1;
          if( i.date && i.date != "undefined" ){ 
            date_from = (this.reportForm.from && i.date ) ? ( new Date( i.date.split(' ')[0] ) >= new Date( this.reportForm.from ) ) : 1;
            date_to = (this.reportForm.to && i.date) ? ( new Date( i.date.split(' ')[0] ) <= new Date( this.reportForm.to ) ) : 1;
          }

          return (  courier && date_from && date_to && contra);

        });

        // console.error('___res');
         
        console.error($res);
        let $rr = [];
        let $total = 0;
        //Формируем данные для exell
        $res.forEach(function(x, i) {
               $rr.push({
                  'number': i+1,
                  'orderId': x.orderId,
                  'date': x.date,
                  'fromAddress': x.fromAddress,
                  'toAddress': x.toAddress,
                  'toContactPerson': x.name,
                  'summ': x.summ
                });
                $total+=x.summ*1;
        });
        //Добавляем "Итого"
        if($total)
          $rr.push({
              'total': $total+' руб.'
          });

        this.json_data = $rr;
        this.orders_v = $res;
        this.sortReports(this.orders_v);

      },
      sortReports($r){

        $r.sort(function(obj1, obj2) {
          if (obj1.orderId*1 > obj2.orderId*1) return -1;
          if (obj1.orderId*1 < obj2.orderId*1) return 1;
          return 0;
        });

      },

    },
    async mounted() {

      await this.getCouriers();
      await this.getAllOrders();
      await this.getOrderStatuses();  //  this.orderStatus = this.statuses.filter(i => i.delivery_id == this.$route.params.id)[0];
      await this.getCompanyes();

      //Объединяем заказы и статусы
      this.orders = this.history.map(x => Object.assign(x, this.statuses.find(y => y.delivery_id == x.orderId)));
      this.orders_v = this.orders;
      this.sortReports(this.orders_v);
      this.contra = this.companyes;


}
  };
</script>
