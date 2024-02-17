import axios, { AxiosResponse } from "axios";

export interface ILoginData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface ILoginResponse {
    token: string;
}

export function login(data: ILoginData): Promise<AxiosResponse<ILoginResponse>> {
    return axios(
        `${process.env.API}/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: data
        }
    );
}