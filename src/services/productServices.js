import apiClient from "../components/utils/apiClient";

export function getSuggestionAPI(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}
