<template>
  <div class="aside">
    <input
      type="search"
      placeholder="Введите название объекта"
      class="aside__search"
      v-model="search"
    />
    <div class="aside__info" v-for="info in searchHandler">
      <div class="aside__text">
        <p class="aside__adress">
          Адрес: <span class="aside__litle">{{ info.properties.info.Адрес }}</span>
        </p>
        <p class="aside__name">
          Наименование: <span class="aside__litle">{{ info.properties.info.Наименование }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      search: '',
    };
  },
  computed: {
    // Получаем геттер из VUEX
    ...mapGetters(['INFO']),
    // Реалезуем функция поиска по Адресу
    searchHandler() {
      return this.INFO.filter((adress) => {
        return adress.properties.info.Адрес.toLowerCase().includes(this.search);
      });
    },
  },
  methods: {
    // Получаем данные из VUEX
    ...mapActions(['GET_INFO_FROM_API']),

    createdInformation(info) {},
  },
  mounted() {
    this.GET_INFO_FROM_API();
  },
};
</script>

<style lang="scss" scoped>
.aside {
  width: 20rem;
  height: 90vh;
  margin: 20px 40px 0 20px;
  padding-top: 20px;
  border: 1px solid blue;
  border-radius: 0.5rem;
  overflow: auto;

  &__info {
    padding: 10px;
    border-bottom: 1px solid #000;
    background-color: #cee8e8;
    list-style: none;
    cursor: pointer;

    &:hover {
      background-color: #b8e9e9;
    }
  }

  &__search {
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    border: 0.5px solid #837e7e;
    width: 250px;
  }

  &__litle {
    font-size: 12px;
    color: #837e7e;
  }
}
</style>
