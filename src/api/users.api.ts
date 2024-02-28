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

export interface IPatchData {
    username?: string;
    artists?: string[];
    genres?: string[];
}

export function patch(data: IPatchData): Promise<AxiosResponse<IUser>> {
    const token = localStorage.getItem("token");

    const headers = {
        "Authorization": `Bearer ${token}`,

        "Content-Type": "application/json"
    };

    return axios(`${process.env.API}/users`,
        {
            method: "PATCH",
            headers: headers,
            data: data
        }
    );
}

export interface IPasswordData {
    password: string;

    oldPassword: string;
}

export function password(data: IPasswordData): Promise<AxiosResponse<IUser>> {
    const token = localStorage.getItem("token");

    const headers = {
        "Authorization": `Bearer ${token}`,

        "Content-Type": "application/json"
    };

    return axios(`${process.env.API}/users/password`,
        {
            method: "PATCH",
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

export function del(): Promise<AxiosResponse<void>> {
    const token = localStorage.getItem("token");

    const headers = {
        "Authorization": `Bearer ${token}`
    };

    return axios(`${process.env.API}/users`,
        {
            method: "DELETE",

            headers: headers
        }
    );
}
