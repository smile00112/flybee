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
            №: {{ courier.id }}    
          <br />
          Имя: {{ courier.name }}
          <br />
          Тел.: {{ courier.phone }}
          <br />
          Статус: {{ courier.status ? 'Работает' : 'Уволен' }}
          <br />

        </p>
      </div>
      <div class="col">
        <label for="c-name" class="bs-labe-zakaz">Имя</label>
        <br />
        <input v-model="confirm.name" class="bs-input-zakaz" type="text" id="c-name" />
        <br />
        <label for="c-phone" class="bs-labe-zakaz">Телефон</label>
        <br />
        <input v-model="confirm.phone" class="bs-input-zakaz" type="text" id="c-phone" />
        <br />
        <label for="c-status" class="bs-labe-zakaz">Статус</label>
        <br />
        <select select v-model="confirm.status" id="c-status" class="bs-input-zakaz">
          <option v-for="status in courier_statuces" 
          v-bind:key="status.id" 
          :value="status.id"
           >{{ status.name }}</option>
        </select>        
        <br /> 
      </div>
    </div>
    <div class="row justify-content-center bs-m-t-60">
      <button @click="saveCourier" v-if="actionButtons.show" type="button" class="bs-success-button">Сохранить</button>
      <button @click="$router.go(-1)" class="bs-back-button" type="button">Назад</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState(["date", "couriers"]),
  filters: {
    getCargoType(val) {
      if (val === "1") return "Документы";
      if (val === "2") return "Обычный груз";
      if (val === "4") return "Негабаритный груз";
    }

  },
  data: () => ({
    courier: {},
    courier_statuces: [
      { id: 1, 'name':'Работает' },
      { id: 0, 'name':'Уволен' },
    ],
    datetime: {
      date: "",
      time: ""
    },
    confirm: {
      id: null,
      name: "",
      date: "",
      status: ""
    },
    actionButtons: {
      show: true
    }
  }),
  methods: {
    ...mapActions(["getCouriers", "EditCourier"]),
    async saveCourier() {
      await this.EditCourier({ payload: this.confirm });
      this.$router.go(-1);
    },
  },
  async mounted() {
    await this.getCouriers();
    this.courier = this.couriers.filter(i => i.id == this.$route.params.id)[0];
    this.confirm = this.courier;
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