import axios from "axios";
import { journalEndpoint } from "./endpoints";
import { getToken } from "../utils/auth";

export interface IJournal{
    journal: string;
    prompts: string[];
}
export interface IJournalResp {
    status: string;
    data: IJournal[]
}

export interface IJournalPost {
    journal: string;
    data: {prompt: string, answer: string}[]
}

export interface IJournalPostResp {
  message:string
}

export interface IJournalUser extends IJournalPost {
  time_stamp:number
}
export interface IJournalUserResp {
  data: IJournalUser[]
}
axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export async function getRandomJournals() {
  try {
    const response = await axios.get(journalEndpoint.randomJournals);
    return response.data as IJournalResp;
  } catch (error: any) {
    throw Error(error?.response?.data?.detail || "unable to fetch journals");
  }
}

export async function getJournals(text: string) {
  try{
    const response = await axios.get(journalEndpoint.getJournals, {params: {text: text}});
    const data = response.data as IJournalResp
    if (data.status === "error") {
      throw Error;
    }
    return data
  }
  catch(error: any) {
    throw Error(error?.response?.data?.detail || "Invalid input try again");
  }
}


export async function postJournal(journal: IJournalPost) {
  try {
    const response = await axios.post(journalEndpoint.postJournal, journal);
    return response.data as IJournalPostResp
  }
  catch(error: any) {
    throw Error(error?.response?.data?.detail || "Unable to submit journal");
  }
}

export async function getUserJournals() {
  try {
    const response = await axios.get(journalEndpoint.getUserJournal);
    return response.data as IJournalUserResp
    
  }
  catch(error: any) {
    throw Error(error?.response?.data?.detail || "Unable to fetch your journals");
  }
}