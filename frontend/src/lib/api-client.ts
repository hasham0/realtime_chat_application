import axios from "axios";
import { HOST } from "@/utils/constants";

const ApiClient = axios.create({
  baseURL: HOST,
});

export default ApiClient;
