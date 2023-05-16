import Vue from "vue";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(Toast);
const EUROPE_LAT_MIN = 34.9;
const EUROPE_LAT_MAX = 82.8;
const EUROPE_LNG_MIN = -9.9;
const EUROPE_LNG_MAX = 25.9;

export const isPositionOufOfBounds = (lat, lng) => {
  if (
    lat < EUROPE_LAT_MIN ||
    lat > EUROPE_LAT_MAX ||
    lng < EUROPE_LNG_MIN ||
    lng > EUROPE_LNG_MAX
  ) {
    return true;
  }
  return false;
};

export const showToast = () => {
  Vue.$toast.open({
    message: "Latitude or Longitude is out of bounds. (Europe Only)",
    type: "error",
    duration: 7000,
  });
};
