import Vue from "vue";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(Toast);

export const showToast = () => {
  Vue.$toast.open({
    message: "Latitude or Longitude is out of bounds. (Europe Only)",
    type: "error",
    duration: 7000,
  });
};
