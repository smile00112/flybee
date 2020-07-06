<template>
  <div class="col-sm-8 col-md-9 bg-white">
    <div class="justify-content-start h-100">
      <div style="margin-top: 70px;">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a
              :class="{active: $route.path == '/orders'}"
              class="nav-link bs-a-ul-zak"
              href="/orders"
              @click.prevent="$router.push('/orders')"
            >Заказы</a>
            <!--Класс active должен применяться к активной ссылке-->
          </li>
          <li class="nav-item">
            <a
              :class="{active: $route.path == '/history'}"
              class="nav-link bs-a-ul-zak"
              href="/history"
              @click.prevent="$router.push('/history')"
            >История</a>
            <!--Класс active должен применяться к активной ссылке-->
          </li>
          <li class="nav-item">
            <a
              :class="{active: $route.path == '/couriers'}"
              class="nav-link bs-a-ul-zak"
              href="/couriers"
              @click.prevent="$router.push('/couriers')"
            >Курьеры</a>
            <!--Класс active должен применяться к активной ссылке-->
          </li>
        </ul>
      </div>
      <div style="margin-top: 70px;">
        <p>
          Сегодня:
          <span>{{ date }}</span>
        </p>
        <!--При выдоре даты в фильтре меняется сегодняшняя дата-->
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <input v-model="search" class="bs-input-search-zak" type="text" placeholder="Поиск" />
            <input class="bs-button-search-zak" type="button" disabled />
          </li>
          <li class="nav-item">
            <p @click="showFilter" class="bs-a-filtr-zak">
              Фильтр
              <img src="@/assets/image/filtr.png" />
            </p>
            <order-filter v-if="filter" @close="filter = false" @apply="applyFilter" />
          </li>
        </ul>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import OrderFilter from "../components/OrderFilter";
import { mapState, mapActions } from "vuex";

export default {
  components: { OrderFilter },
  data: () => ({
    filter: false,
    search: ""
  }),
  methods: {
    ...mapActions(["setFilterDate"]),
    showFilter() {
      this.filter = true;
    },
    applyFilter({ checkboxes, date }) {
      if (date) {
        this.setFilterDate({ date });
      }
      this.$emit("filter", { checkboxes, date });
      this.filter = false;
    }
  },
  computed: mapState(["date"]),
  watch: {
    search(val) {
      this.$emit("search", val);
    }
  },
  mounted() {}
};
</script>

<style>
</style>