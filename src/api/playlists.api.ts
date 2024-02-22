import axios, { AxiosResponse } from "axios";

export function search(params: {
    title?: string;
    tag?: string;
    track?: string;
}): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/search`,
        {
            method: "GET",
            params: params,
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}
