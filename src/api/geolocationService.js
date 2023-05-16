import axios from "axios";

const geolocationApi = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
});

export function fetchAddress(lat, lng) {
  return geolocationApi
    .get("/reverse", {
      params: {
        format: "jsonv2",
        lat: lat,
        lon: lng,
        zoom: 12,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const body = response.data;
        return body;
      }
      throw new Error("Failed to fetch address");
    });
}
