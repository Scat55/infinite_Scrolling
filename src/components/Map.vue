<template>
  <l-map
    style="height: 100vh"
    :zoom="zoom"
    :center="center"
  >
    <l-tile-layer
      :url="url"
      :attribution="attribution"
    ></l-tile-layer>

    <l-circle-marker
      v-for="info in INFO"
      :lat-lng="createdPoint(info.geometry.coordinates)"
      :color="circle.color"
      :radius="circle.radius"
    ></l-circle-marker>

  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LCircleMarker, LPolygon, LGeoJson } from 'vue2-leaflet';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircleMarker,
    LPolygon,
    LGeoJson
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
        radius: 6
      }

    };
  },
  computed: {
    ...mapGetters(['INFO'])
  },
  mounted() {
    this.GET_INFO_FROM_API()
  },
  beforeUpdated() {
    // Отрисовываем точки
    this.createdPoint()

  },
  methods: {
    // Получаем данные из VUEX
    ...mapActions(['GET_INFO_FROM_API']),
    // Выводим точки
    createdPoint(point) {
      // Делаем проверку на тип (Длинна 1 - Полигон, 2 - точка)
      if (point.length === 2) {
        // Переворачиваем местами массив с точками, потому что он приходит не в том виде
        return [point[1], point[0]]
      }
    },

  },

}
</script>