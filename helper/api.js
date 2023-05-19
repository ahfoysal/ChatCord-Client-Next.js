import axios from "axios";

const apiHelper = axios.create({
  baseURL: `${process.env.BACKEND}api/v1/`,
});

export const GetRequest = async (url) => {
  try {
    const response = await apiHelper.get(url);
    return response.data;
  } catch (error) {
    console.log(error)
    return error
  }
};

export const LoginRequest = async (url, data) => {
  try {
    const response = await apiHelper.post(url, data);
    return response.data;
  } catch (error) {
    return response.data;
  }
};
