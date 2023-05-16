<template>
  <div
    class="flex flex-col justify-center bg-white shadow-xl rounded-lg w-full h-full my-auto"
  >
    <div class="bg-cover bg-center h-16 px-4 flex justify-between items-center">
      <p class="uppercase tracking-widest text-sm text-black px-2 font-bold">
        Weather
      </p>
      <p
        class="uppercase tracking-widest text-sm text-white bg-black px-2 rounded opacity-75 shadow-lg"
      >
        {{ getCurrentDate }}
      </p>
    </div>
    <div class="px-4 text-gray-700 flex flex-col border-t">
      <div class="flex flex-row justify-between items-center">
        <div>
          <img :src="getImageSource()" class="w-28" alt="Weather" />
        </div>
        <div class="leading-loose text-sm">
          <div class="flex items-center">
            <i class="mr-2 wi wi-horizon-alt text-yellow-500"></i>
            <span class="font-bold text-xs">{{
              getTimefromDate(location.weather?.sunrise)
            }}</span>
          </div>
          <div class="flex items-center">
            <i class="mr-2 wi wi-horizon text-purple-400"></i>
            <p>
              <span class="font-bold text-xs">{{
                getTimefromDate(location.weather?.sunset)
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <p class="text-sm pb-4 px-4 w-full">
        <span class="font-bold">{{
          weatherCodeData ? weatherCodeData.description : "Unknown"
        }}</span>
        throughout the day
      </p>
    </div>
    <div
      class="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600"
    >
      <div class="flex justify-between px-8 w-full">
        <div class="flex items-center">
          <i class="mr-2 wi wi-thermometer-exterior text-blue-400 text-3xl"></i>
          <p class="flex flex-col">
            <span class="font-bold text-sm">Minimum</span>
            <span class="text-sm text-gray-600"
              >{{ location.weather?.temperature_2m_min }}º</span
            >
          </p>
        </div>
        <div class="flex items-center">
          <i class="mr-2 wi wi-thermometer text-red-500 text-3xl"></i>
          <p class="flex flex-col">
            <span class="font-bold text-sm">Maximum</span>
            <span class="text-sm text-gray-600"
              >{{ location.weather?.temperature_2m_max }}º</span
            >
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600"
    >
      <div class="flex justify-between px-8 w-full">
        <div class="flex items-center">
          <i class="mr-2 wi wi-rain text-gray-700 text-2xl"></i>
          <p class="flex flex-col">
            <span class="font-bold text-sm">Precip</span>
            <span class="text-sm text-gray-600"
              >{{ location.weather?.precipitation_sum }} mm</span
            >
          </p>
        </div>
        <div class="flex items-center">
          <i class="mr-2 wi wi-hot text-gray-700 text-2xl"></i>
          <p class="flex flex-col">
            <span class="font-bold text-sm">UV Index</span>
            <span class="text-sm text-gray-600">{{
              location.weather?.uv_index_max
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeatherDescription } from "@/utils/WeatherCodes.js";
export default {
  name: "WeatherCard",
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  computed: {
    weatherCodeData() {
      if (this.location.weather != undefined) {
        return getWeatherDescription(this.location.weather.weathercode);
      } else {
        return null;
      }
    },
    getCurrentDate() {
      const currentDate = new Date();
      const options = { month: "long", day: "numeric" };
      const formattedDate = currentDate.toLocaleString("en-US", options);
      return formattedDate;
    },
  },
  methods: {
    getTimefromDate(weatherDate) {
      const date = new Date(weatherDate);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    getImageSource() {
      if (this.weatherCodeData && this.weatherCodeData.image) {
        return this.weatherCodeData.image;
      } else {
        return "";
      }
    },
  },
};
</script>
