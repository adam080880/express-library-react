import Axios from "axios";

import { appUrl } from "../configs/app";

// import qs from 'querystring'

const books = {
  get: (param) => {
    return Axios.get(appUrl(`books?${param}&limit=4`));
  },
  find: (id) => {
    return Axios.get(appUrl(`books/${id}`));
  },
  post: (formData) => {
    return Axios.post(appUrl("books"), formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  patch: (formData, id) => {
    return Axios.patch(appUrl(`books/${id}`), formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete: (id) => {
    return Axios.delete(appUrl(`books/${id}`), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default books;
