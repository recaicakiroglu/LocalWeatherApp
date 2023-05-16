<template>
  <div class="border-2 border-gray-200 border-dashed rounded-lg mb-4">
    <nav class="p-4">
      <div
        class="flex bg-white shadow-lg rounded-l flex-wrap flex-row items-center justify-start p-4 rounded-lg"
      >
        <div>
          <img
            src="@/assets/images/location.png"
            class="h-14 mr-3"
            alt="Current Location"
          />
        </div>
        <div class="flex flex-col justify-start">
          <span class="text-2xl font-semibold whitespace-nowrap"
            >Current Location</span
          >
          {{ location.address?.display_name }}
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
};
</script>
