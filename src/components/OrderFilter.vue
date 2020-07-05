<template>
  <div class="bs-filtr-zak">
    <button @click="$emit('close')" class="bs-close">
      <img src="@/assets/image/close.png" />
    </button>
    <p class="bs-p-zagl">Статус</p>
    <ul v-for="status in statuses" :key="status.val" class="bs-list-filtr">
      <li>
        <img class="bs-img-ring" :src="getImg(status.img)" />
        <input v-model="checkboxes" type="checkbox" :id="status.val" :value="status.val" hidden />
        <label :for="status.val">{{ status.label }}</label>
        <img v-if="checkboxes.includes(status.val)" src="@/assets/image/gal.png" />
      </li>
    </ul>
    <input v-model="date" type="date" />
    <br />
    <button @click="$emit('apply', { checkboxes, date })" class="bs-prim-filtr">Применить</button>
    <button @click="clear" class="bs-clear-filtr">Очистить</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    checkboxes: [],
    date: "",
    statuses: []
  }),
  methods: {
    clear() {
      this.checkboxes = [];
      this.date = "";
    },
    getImg(name) {
      return require(`@/assets/image/${name}`);
    }
  },
  mounted() {
    if (this.$route.path == "/orders") {
      this.statuses = [
        {
          img: "yellow.png",
          val: "2",
          label: "В работе"
        },
        {
          img: "white.png",
          val: "1",
          label: "Новые"
        }
      ];
    } else if (this.$route.path == "/history") {
      this.statuses = [
        {
          img: "red.png",
          val: "8",
          label: "Отмененно"
        },
        {
          img: "green.png",
          val: "4",
          label: "Выполнено"
        }
      ];
    }
  }
};
</script>

<style>
</style>