import BookModel from "../../models/books";
import qs from "querystring";

export const setBooks = (payload) => ({
  type: "SET_BOOKS",
  payload: new Promise((resolve, reject) => {
    BookModel.get(qs.stringify(payload))
      .then((res) => {
        resolve({ books: res.data.data, pageInfo: res.data.pageInfo });
      })
      .catch((rej) => {
        reject({ books: [], pageInfo: {} });
      });
  }),
});
