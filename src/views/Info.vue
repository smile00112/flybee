<template>
  <div class="col-sm-8 col-md-9 bg-white">
    <p style="margin-top: 5%;">
      Сегодня:
      <span>{{ date }}</span>
    </p>
    <!--При выдоре даты в фильтре меняется сегодняшняя дата-->
    <div class="row">
      <div class="col bs-border-hist bs-padding-hist" style="overflow: auto; height: 667px;">
        <p>
          ДОГОВОР: 0711-19
          <br />
          <br />
            №: {{ order.orderId }}    
          <br />
          <br />ОТКУДА:
          <br />
          <br />
          Адрес: {{ order.fromAddress }}
          <br />
          Отправитель: {{ order.fromName }}
          <br />
          Контактное Лицо: {{ order.fromContactPerson }}
          <br />
          Тел.: {{ order.fromPhone }}
          <br />
          Информация: {{ order.fromInfo }}
          <br />
          <br />КУДА:
          <br />
          <br />
          Адрес: {{ order.toAddress }}
          <br />
          Получатель: {{ order.toName }}
          <br />
          Контактное Лицо: {{ order.toContactPerson }}
          <br />
          Тел.: {{ order.toPhone }}
          <br />
          Информация: {{ order.toInfo }}
          <br />
          <br />ГРУЗ:
          <br />
          Тип груза: {{ order.cargoType | getCargoType }}
          <br />
          Вес груза, кг: {{ order.weight }}
          <br />
          Число мест: {{ order.qty }}
          <br />
          Описание груза: {{ order.description }}
          <br />Габариты (ШxВxГ), см:
          <br />
          {{ order.l }}x{{ order.h }}x{{ order.w }} - 1 шт.
          <br />
          <br />ДОСТАВКА:
          <br />
          Дата забора: {{ order.takeDate }}
          <br />
          Время с {{ order.timeFrom }} до {{ order.timeTo }}
          <br />
          Вид доставки: {{ order.directionType | getDirectionType }}
          <br />
          Срочность: {{ order.urgentType | getUrgentType }}
          <br />
          Способ оплаты: {{ order.paymentType | getPaymentType }}
          <br />
          Плательщик: {{ order.payer | getPayer }}
          <br />
          Примечание: {{ order.comments }}
          <br />
        </p>
      </div>
      <div class="col">
        <label for="zakaz-date" class="bs-labe-zakaz">Дата выполнения заказа</label>
        <br />
        <input v-model="datetime.date" class="bs-input-zakaz" type="date" id="zakaz-date" />
        <br />
        <label for="zakaz-date" class="bs-labe-zakaz">Время выполнения заказа</label>
        <br />
        <input v-model="datetime.time" class="bs-input-zakaz" type="time" id="zakaz-date" />
        <br />
        <label for="zakaz-summ" class="bs-labe-zakaz">Сумма</label>
        <br />
        <input v-model="confirm.summ" class="bs-input-zakaz" type="text" id="zakaz-summ" />
        <br />
        <label for="zakaz-face" class="bs-labe-zakaz">Получатель</label>
        <br />
        <input v-model="confirm.name" class="bs-input-zakaz" type="text" id="zakaz-face"/>
        <br />
        <label for="zakaz-date" class="bs-labe-zakaz">Курьер</label>
        <br />
        <select v-model="confirm.courier" class="bs-input-zakaz">
          <option v-for="courier in couriers" 
          v-bind:key="courier.id" 
          :value="courier.id"
           >{{ courier.name }}</option>
        </select>
        <br />
        <label for="zakaz-dop" class="bs-labe-zakaz">Комментарий</label>
        <br />
        <textarea
          v-model="confirm.comment"
          id="zakaz-dop"
          class="bs-input-dop-zakaz"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
    <div class="row justify-content-center bs-m-t-60">
      <button @click="inWork" v-if="actionButtons.show" type="button" class="bs-okey-button">В работу</button>
      <button @click="success" v-if="actionButtons.show" type="button" class="bs-success-button">Выполненно</button>
      <button @click="cancel" v-if="actionButtons.show" class="bs-nope-button" type="button">Отмена</button>
      <button @click="$router.go(-1)" class="bs-back-button" type="button">Назад</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState(["date", "orders", "statuses", "couriers"]),
  filters: {
    getCargoType(val) {
      if (val === "1") return "Документы";
      if (val === "2") return "Обычный груз";
      if (val === "4") return "Негабаритный груз";
    },
    getDirectionType(val) {
      if (val == "1") return "Отправка в одну сторону";
      if (val == "2") return "Отправка с возвратом";
    },
    getUrgentType(val) {
      if (val == "1") return "Экономная доставка";
      if (val == "2") return "Стандартная доставка";
      if (val == "4") return "Экспресс доставка";
      if (val == "8") return " Доставка ко времени";
      if (val == "16") return "Доставка в выходные и праздничные дни";
    },
    getPayer(val) {
      if (val == "1") return "клиент с оплатой по безналичному расчету";
      if (val == "2") return "доставку оплачивает отправитель";
      if (val == "4") return "доставку оплачивает получатель";
    },
    getPaymentType(val) {
      if (val == "1") return "оплата по-безналичному расчету";
      if (val == "2") return "оплата наличными курьеру";
    }
  },
  data: () => ({
    order: {},
    datetime: {
      date: "",
      time: ""
    },
    confirm: {
      orderId: null,
      name: "",
      date: "",
      summ: "",
      courier: "",
      comment: "",
      status: ""
    },
    actionButtons: {
      show: true
    }
  }),
  methods: {
    ...mapActions(["getAllOrders", "getOrderStatuses", "setStatus", "getCouriers"]),
    async inWork() {
      this.confirm.status = 2;
      await this.setStatus({ payload: this.confirm });
      this.$router.go(-1);
    },
    async success() {
      this.confirm.status = 4;
      await this.setStatus({ payload: this.confirm });
      this.$router.go(-1);
    },
    async cancel() {
      this.confirm.status = 8;
      await this.setStatus({ payload: this.confirm });
      this.$router.go(-1);
    }
  },
  async mounted() {
    await this.getAllOrders();
    this.order = this.orders.filter(i => i.orderId == this.$route.params.id)[0];
    this.confirm.orderId = this.order.orderId;
    await this.getCouriers();
    
    await this.getOrderStatuses();  
    this.orderStatus = this.statuses.filter(i => i.delivery_id == this.$route.params.id)[0];

    if( ['4', '8'].includes(this.order.status) ){

        this.confirm.name = this.orderStatus.name;
        this.confirm.comment = this.orderStatus.comment;
        this.confirm.courier = this.orderStatus.courier_id;
        this.confirm.summ = this.orderStatus.summ;
        this.confirm.date = this.orderStatus.date;

        if(this.confirm.date){
          this.datetime.date = this.confirm.date.split(' ')[0];
          this.datetime.time = this.confirm.date.split(' ')[1];
        }

        //Скрываем кропки, если заказ в истории
        this.actionButtons.show = false;
    }
  },
  watch: {
    datetime: {
      deep: true,
      handler() {
        this.confirm.date = this.datetime.date + " " + this.datetime.time;
      }
    }
  }
};
</script>

<style>
</style>