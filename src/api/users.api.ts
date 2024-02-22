import axios, { AxiosResponse } from "axios";

import type IUser from "@/types/user";

export function get(): Promise<AxiosResponse<IUser>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/users`,
        {
            method: "GET",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}
