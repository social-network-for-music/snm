import axios, { AxiosResponse } from "axios";

export interface ILoginData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export function login(data: ILoginData): Promise<AxiosResponse<{ token: string }>> {
    return axios(`${process.env.API}/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: data
        }
    );
}

export function verify(): Promise<AxiosResponse<void>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/auth/verify`,
        {
            method: "HEAD",
            
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}