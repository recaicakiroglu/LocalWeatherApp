<template>
  <div class="flex flex-wrap">
    <div
      class="z-40 w-full lg:w-96 gap-4 flex flex-col sm:flex-row lg:flex-col justify-between"
    >
      <div
        class="border-2 border-gray-200 border-dashed rounded-lg p-4 my-auto h-full w-full"
      >
        <AddressCard :location="location" />
      </div>
      <div
        class="border-2 border-gray-200 border-dashed rounded-lg p-4 my-auto h-full w-full"
      >
        <WeatherCard :location="location" />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/Cards/WeatherCard.vue";
import AddressCard from "@/components/Cards/AddressCard.vue";

export default {
  name: "SideBar",
  components: {
    AddressCard,
    WeatherCard,
  },
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
};
</script>
