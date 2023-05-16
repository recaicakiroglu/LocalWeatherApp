<template>
  <l-map
    style="height: 100%"
    ref="map"
    @dblclick="onMapClick"
    :zoom="zoom"
    :max-bounds="maxBounds"
    :center="[position.lat, position.lng]"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker
      v-if="position.lat && position.lng"
      visible
      draggable
      :icon="icon"
      :lat-lng.sync="position"
    >
    </l-marker>
    <v-geosearch :options="geosearchOptions"></v-geosearch>
  </l-map>
</template>

<script>
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";
import { icon, latLngBounds } from "leaflet";
import { fetchAddress } from "@/api/geolocationService";
import { fetchWeather } from "@/api/weatherService";
import { latLng } from "leaflet";
import { isPositionOufOfBounds, showToast } from "@/utils/boundsChecker";
import _ from "lodash";

export default {
  name: "WeatherMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 12,
      position: latLng(52.37, 4.9),
      icon: icon({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      }),
      maxBounds: latLngBounds([
        [82.8, -9.9],
        [34.9, 25.9],
      ]),
      geosearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true,
        style: "bar",
        notFoundMessage: "Sorry, that address could not be found.",
      },
    };
  },
  watch: {
    value(newLocation) {
      this.position = newLocation.position;
    },
    position: {
      deep: true,
      handler: _.debounce(async function (value, oldValue) {
        if (isPositionOufOfBounds(value.lat, value.lng)) {
          this.position = oldValue;
          showToast();
        } else {
          const currentAddress = await this.getAddress();
          const currentWeather = await this.getWeather();
          this.$emit("input", {
            position: value,
            address: currentAddress,
            weather: currentWeather,
          });
        }
      }, 500),
    },
  },
  async created() {
    const currentAddress = await this.getAddress();
    const currentWeather = await this.getWeather();
    this.$emit("input", {
      position: this.position,
      address: currentAddress,
      weather: currentWeather,
    });
  },
  methods: {
    async getAddress() {
      try {
        const { lat, lng } = this.position;
        const address = await fetchAddress(lat, lng);
        return address;
      } catch (e) {
        console.error("Address API Fetch Error:", e);
        return "Unresolved address";
      }
    },
    async getWeather() {
      try {
        const { lat, lng } = this.position;
        const weather = await fetchWeather(lat, lng);
        return weather;
      } catch (e) {
        console.error("Weather API Fetch Error:", e);
        return "Unresolved Weather";
      }
    },
    onSearch(value) {
      if (!isPositionOufOfBounds(value.location.y, value.location.x)) {
        const loc = value.location;
        this.position = { lat: loc.y, lng: loc.x };
      } else {
        showToast();
      }
    },
    async onMapClick(value) {
      if (!isPositionOufOfBounds(value.latlng.lat, value.latlng.lng)) {
        this.position = value.latlng;
      } else {
        showToast();
      }
    },
  },
  mounted() {
    this.$refs.map.mapObject.on("geosearch/showlocation", this.onSearch);
  },
};
</script>

<style scoped>
.leaflet-container {
  border-radius: 0.5rem;
}
</style>
