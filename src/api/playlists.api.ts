import axios, { AxiosResponse } from "axios";

import type Playlist from "@/types/playlist";

import type PlaylistPreview from "@/types/playlist-preview";

export interface ISearchParams {
    title?: string;
    tag?: string;
    track?: string;
}

export function search(params: ISearchParams): Promise<AxiosResponse<PlaylistPreview[]>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/search`,
        {
            method: "GET",
            params: params,
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function get(id: string): Promise<AxiosResponse<Playlist>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/${id}`,
        {
            method: "GET",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}
