<template>
  <div id="app">
    <Aside />
    <Map />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import Aside from './components/Aside.vue';

export default {
  components: {
    Map,
    Aside
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
