import axios from "axios";
import { baseInventoryUrl } from "@/utils/urls"

export const addNewProduct = ({ productData, successCallback, errrorCallback }) => {
  axios
    .post(`${baseInventoryUrl}/add`, productData)
    .then((response) => {
      successCallback && successCallback(response);
    })
    .catch((e) => {
      errrorCallback && errrorCallback(e);
    });
}

export const updateProductDetail = ({ productData, successCallback, errrorCallback }) => {
  axios
    .put(`${baseInventoryUrl}/update`, productData)
    .then((response) => {
      successCallback && successCallback(response);
    })
    .catch((e) => {
      errrorCallback && errrorCallback(e);
    });
}

export const deleteProductData = ({ productId, successCallback, errrorCallback }) => {
  axios
    .delete(`${baseInventoryUrl}/${productId}`)
    .then((response) => {
      successCallback && successCallback(response);
    })
    .catch((e) => {
      errrorCallback && errrorCallback(e);
    });
}

export const getProductByName = ({ searchKey, successCallback, errorCallback }) => {
  axios
    .get(`${baseInventoryUrl}/search?name=${searchKey}&page=0&size=20`,{
      headers: {
        'Authorization': localStorage.getItem("sessionId")
      }
    })
    .then((response) => {
      successCallback && successCallback(response);
    })
    .catch((e) => {
      errorCallback && errorCallback(e);
    });
}

export const getInventory = ({ successCallback, errrorCallback }) => {
  axios
    .get(`${baseInventoryUrl}/all?page=0&size=100`,{
      headers: {
        'Authorization': localStorage.getItem("sessionId")
      }
    })
    .then((response) => {
      successCallback && successCallback(response);
    })
    .catch((e) => {
      errrorCallback && errrorCallback(e);
    });
}


export const getRecentOrders = ({ success, error }) => {
  axios
    .get("http://10.30.1.92:8085/redis/getAll")
    .then((response) => {
      success && success(response);
    })
    .catch((e) => {
      error && error(e);
    });
}

