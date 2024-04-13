import axios from "axios";
import { usersEndpoint } from "./endpoints";
export interface ILoginResp {
  access_token: string;
  token_type: string;
}
export interface IUser {
  username: string;
}
export async function login(username: string, password: string) {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const response = await axios.post(usersEndpoint.login, formData);
    return response.data as ILoginResp;
  } catch (error: any) {
    throw Error(error?.response?.data?.detail || "Invalid credentials");
  }
}

export async function signup(username: string, password: string) {
  try{
    const response = await axios.post(usersEndpoint.signup, null, {
      params: { username, password },
    });
    return response.data;
  }
  catch(error: any) {
    throw Error(error?.response?.data?.detail || "unable to signup try again");
  }
}

export async function me() {
  const response = await axios.get(usersEndpoint.me);
  return response.data as IUser;
}
