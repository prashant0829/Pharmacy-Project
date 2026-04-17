import axios from "axios";

const API = "http://localhost:5000/api/medicine"; // adjust port

export const getMedicines = () => axios.get(API);
export const addMedicine = (data) => axios.post(API, data);
