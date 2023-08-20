<template>
  <l-map style="height: 100vh; width: 80vw" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

    <l-circle-marker
      v-for="info in INFO"
      :lat-lng="createdPoint(info.geometry.coordinates)"
      :color="circle.color"
      :radius="circle.radius"
      @click="showInfo(info)"
    >
      <l-popup>{{ infoAbDot }}</l-popup>
    </l-circle-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LCircleMarker, LPolygon, LGeoJson, LPopup } from 'vue2-leaflet';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircleMarker,
    LPolygon,
    LGeoJson,
    LPopup,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 13,
      center: [52.608826, 39.599229],
      circle: {
        color: 'red',
        radius: 6,
      },
      infoAbDot: '',
    };
  },
  computed: {
    ...mapGetters(['INFO']),
  },
  mounted() {
    this.GET_INFO_FROM_API();
  },
  beforeUpdated() {
    // Отрисовываем точки
    this.createdPoint();
  },
  methods: {
    // Получаем данные из VUEX
    ...mapActions(['GET_INFO_FROM_API']),
    // Выводим точки
    createdPoint(point) {
      // Делаем проверку на тип (Длинна 1 - Полигон, 2 - точка)
      if (point.length === 2) {
        // Переворачиваем местами массив с точками, потому что он приходит не в том виде
        return [point[1], point[0]];
      }
    },
    // Получение информации о точке
    showInfo(info) {
      return (this.infoAbDot = `${info.properties.info.Адрес} \n${info.properties.info.Наименование}`);
    },
  },
};
</script>
