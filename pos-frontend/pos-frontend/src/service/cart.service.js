import axios from "axios";

export const getTax = ({ success, error }) => {
    [
        axios.get("http://10.30.1.92:8086/redis/getTax")
            .then((res) => {
                success && success(res)
            })
            .catch((err) => {
                error && error(err)
            })
    ]
}

export const updateTax = ({ success, error, tax}) => {
    axios
        .post("http://10.30.1.92:8086/redis/setTax", tax)
        .then((response) => {
            success && success(response);
        })
        .catch((e) => {
            error && error(e);
        });
}