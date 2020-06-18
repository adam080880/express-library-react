import Axios from "axios";

import { appUrl } from "../configs/app";

import qs from "querystring";

const auth = {
  register: (data) => {
    const { email, password } = data;
    return Axios.post(
      appUrl("auth/register"),
      qs.stringify({ email, password })
    );
  },
  login: (data) => {
    const { email, password } = data;
    return Axios.post(appUrl("auth/login"), qs.stringify({ email, password }));
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("session_user");
  },
  completeRegis: (data) => {
    const { name, birth, phone, gender } = data;
    console.log(qs.stringify({ name, birth, phone, gender }));
    return Axios.post(
      appUrl("auth/complete_registration"),
      qs.stringify({ name, birthdate: birth, phone, gender }),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
};

export default auth;
