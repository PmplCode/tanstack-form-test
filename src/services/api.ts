import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8080";

interface SendEmailResponse {
  // Empty response for 200
}

interface ValidateEmailRequest {
  email: string;
  code: string;
}

interface ValidateEmailResponse {
  user_id: number;
}

interface Product {
  price: string;
  currency: string;
  trial_days: number;
}

interface ProductsResponse {
  monthly: Product;
  year: Product;
}

interface StartTrialRequest {
  user_id: number;
}

interface StartTrialResponse {
  // Empty response for 200
}

export const sendEmail = async (
  email: string
): Promise<AxiosResponse<SendEmailResponse>> => {
  return axios.get(`${API_URL}/api/send-email`, { params: { email } });
};

export const validateEmail = async (
  data: ValidateEmailRequest
): Promise<AxiosResponse<ValidateEmailResponse>> => {
  return axios.post(`${API_URL}/api/validate-email`, data);
};

export const getProducts = async (): Promise<
  AxiosResponse<ProductsResponse>
> => {
  return axios.get(`${API_URL}/api/products`);
};

export const startTrial = async (
  data: StartTrialRequest
): Promise<AxiosResponse<StartTrialResponse>> => {
  return axios.post(`${API_URL}/api/start-trial`, data);
};
