import apiClient from "../components/utils/apiClient";
export function checkoutAPI() {
  return apiClient.post("/order/checkout");
}
