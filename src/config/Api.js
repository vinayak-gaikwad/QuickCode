import axios from "axios";
const baseURL = 'http://localhost:8080'
const API = axios.create({
  baseURL: baseURL
});

export default{API}