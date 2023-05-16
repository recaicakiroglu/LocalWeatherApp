<template>
  <div class="max-w-screen-xl py-4 mx-auto">
    <ScaleLoader :loading="!location.weather"></ScaleLoader>
    <div :style="{ opacity: location.weather ? 1 : 0 }">
      <NavigationBar :location="location" />
      <div class="flex flex-col lg:flex-row justify-between gap-4">
        <SideBar :location="location" @position-change="positionChanged" />
        <div
          class="p-4 border-2 border-dashed rounded-lg w-full h-[40rem] lg:h-auto"
        >
          <WeatherMap v-model="location" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/Layout/NavigationBar.vue";
import SideBar from "@/components/Layout/SideBar.vue";
import WeatherMap from "@/components/Layout/WeatherMap.vue";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import { latLng } from "leaflet";
import { isPositionOufOfBounds } from "@/utils/boundsChecker";
import { showToast } from "@/utils/toast";
import _ from "lodash";

export default {
  name: "App",
  components: {
    NavigationBar,
    SideBar,
    WeatherMap,
    ScaleLoader,
  },
  data: () => ({
    location: {
      address: null,
      position: null,
      weather: null,
    },
  }),
  methods: {
    positionChanged: _.debounce(function (value) {
      if (!isPositionOufOfBounds(value.lat, value.lng)) {
        this.location = {
          ...this.location,
          position: latLng(value.lat, value.lng),
        };
      } else {
        showToast();
      }
    }, 500),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  height: 100vh;
  background-color: rgb(249 250 251);
}

.v-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  max-width: 1280px;
  height: 100%;
}
</style>
