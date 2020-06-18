import Axios from "axios";

import { appUrl } from "../configs/app";

import qs from "querystring";

const authors = {
  get: () => {
    return Axios.get(appUrl(`author`));
  },
  post: (data) => {
    return Axios.post(appUrl(`author`), qs.stringify(data), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  patch: (data) => {
    const { name, description } = data;
    return Axios.patch(
      appUrl(`author/${data.id}`),
      qs.stringify({ name, description }),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
  delete: (id) => {
    return Axios.delete(appUrl(`author/${id}`), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default authors;
