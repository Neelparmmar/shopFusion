import apiClient from "../components/utils/apiClient";

export function signup(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  if (profile) {
    body.append("profilePic", profile);
  }

  // No need to set 'Content-Type', Axios does this automatically for FormData
  return apiClient.post("/user/signup", body);
}

export function login(user) {
  return apiClient.post("/user/login", user);
}
export function getjwt() {
  const tokenName = "token";
  return localStorage.getItem(tokenName);
}
