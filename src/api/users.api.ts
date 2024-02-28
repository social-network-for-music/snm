import axios, { AxiosResponse } from "axios";

import type IUser from "@/types/user";

export interface IPostData {
    email: string;
    username: string;
    password: string;
}

export function post(data: IPostData): Promise<AxiosResponse<IUser>> {
    const token = localStorage.getItem("token");

    const headers = {
        "Authorization": `Bearer ${token}`,

        "Content-Type": "application/json"
    };

    return axios(`${process.env.API}/users`,
        {
            method: "POST",
            headers: headers,
            data: data
        }
    );
}

export function get(): Promise<AxiosResponse<IUser>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/users`,
        {
            method: "GET",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}
