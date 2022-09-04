import axios from "axios";
// import { baseUrl } from "@/utils/urls"
import { baseOrderUrl } from "@/utils/urls"

export const addNewSeller = ({ success, error, data }) => {

  axios
    .post("http://10.30.1.92:8086/user/register", data, {
      headers: {
        'Authorization': localStorage.getItem("sessionId")
      }
    })
    .then((response) => {
      success && success(response);
    })
    .catch((e) => {
      error && error(e);
    });
}

export const deleteSeller = ({ success, error, sellerId }) => {
  axios.delete(`http://10.30.1.92:8086/user/remove/${sellerId}`)
    .then((response) => {
      success && success(response)
    })
    .catch((err) => {
      error && error(err)
    })
}

export const getSeller = ({ success, error }) => {
  // console.log(sellerId)
  axios.get("http://10.30.1.92:8086/user/userAll", {
    headers: {
      'Authorization': localStorage.getItem("sessionId")
    }
  })
    .then((response) => {
      success && success(response)
    })
    .catch((err) => {
      error && error(err)
    })
}

export const getSellerOrder = ({ success, error, uid }) => {
  // console.log(sellerId)
  let sellerId = uid
  console.log(sellerId, uid)
  axios.get(`${baseOrderUrl}/sellerId/${sellerId}`)
    .then((response) => {
      success && success(response)
    })
    .catch((err) => {
      error && error(err)
    })
}

export const getSellerCount = ({ success, error }) => {
  axios.get("http://10.30.1.92:8086/user/sellerCount")
    .then((response) => {
      success && success(response)
    })
    .catch((err) => {
      error && error(err)
    })
}

export const updateSellerData = ({ success, error, seller }) => {
  axios.put("http://10.30.1.92:8086/user/update", seller)
    .then((response) => {
      success && success(response)
    })
    .catch((err) => {
      error && error(err)
    })
}

export const getSearchedSeller = ({ success, error, key }) => {
  axios.get("http://10.30.1.92:8086/user/userSearch", {
    headers: {
      'Authorization': localStorage.getItem("sessionId")
    }
  }, { params: { seller: key } })
    .then((res) => {
      success && success(res)
    })
    .catch((err) => {
      error && error(err)
    })
}



////////////////////////////////////////////////////////////


export const getInventoryCount = ({ success, error }) => {

  axios.get("http://10.30.1.92:8082/inventory/productCount")
    .then((response) => {
      success && success(response)
    })
    .catch((err) => {
      error && error(err)
    })
}
export const getOutOfStockCount = ({ success, error }) => {
  axios.get("http://10.30.1.92:8082/inventory/outOfStockCount")
    .then((response) => {
      success && success(response)
    })
    .catch((err) => {
      error && error(err)
    })
}

export const getLowInStockCount = ({ success, error }) => {
  axios.get("http://10.30.1.92:8082/inventory/minimumStockCount")
    .then((response) => {
      success && success(response)
    })
    .catch((err) => {
      error && error(err)
    })
}



