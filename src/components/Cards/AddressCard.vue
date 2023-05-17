<template>
  <div
    class="flex flex-col justify-center bg-white shadow-xl rounded-lg w-full h-full my-auto"
  >
    <div class="bg-cover bg-center h-16 px-4 flex justify-between items-center">
      <p class="uppercase tracking-widest text-sm text-black px-2 font-bold">
        Coordinates
      </p>
      <p
        class="uppercase tracking-widest text-sm text-white bg-black px-2 rounded opacity-75 shadow-lg"
      >
        {{ displayLocationName }}
      </p>
    </div>
    <div
      class="flex justify-between items-center py-4 px-12 border-t border-gray-300 text-gray-600"
    >
      <label
        for="small-input"
        class="block mr-2 text-sm font-medium text-gray-900"
        >Latitude
      </label>
      <input
        type="number"
        step="0.1"
        :value="location.position?.lat.toFixed(6)"
        @change="positionChanged"
        name="latitude"
        class="block w-32 py-2 text-gray-900 border text-center border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div
      class="flex justify-between items-center py-4 px-12 border-t border-gray-300 text-gray-600"
    >
      <label
        for="small-input"
        class="block mr-2 text-sm font-medium text-gray-900"
        >longitude</label
      >
      <input
        type="number"
        step="0.1"
        :value="location.position?.lng.toFixed(6)"
        @change="positionChanged"
        name="longitude"
        class="block w-32 py-2 text-gray-900 border text-center border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressCard",
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  methods: {
    positionChanged(event) {
      if (event.target.name == "latitude") {
        this.$parent.$emit("position-change", {
          lat: Number(event.target.value),
          lng: this.location.position.lng,
        });
      } else if (event.target.name == "longitude") {
        this.$parent.$emit("position-change", {
          lat: this.location.position.lat,
          lng: Number(event.target.value),
        });
      } else {
        throw new Error("Position changed Error");
      }
    },
  },
  computed: {
    displayLocationName() {
      const city = this.location.address?.address?.city;
      const country = this.location.address?.address?.country;

      if (city) {
        return city;
      } else if (country) {
        return country;
      } else {
        return "Unknown";
      }
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
