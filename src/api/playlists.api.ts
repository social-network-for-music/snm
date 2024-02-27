import axios, { AxiosResponse } from "axios";

import type IPlaylist from "@/types/playlist";

import type IPlaylistPreview from "@/types/playlist-preview";

import type IThumbnail from "@/types/thumbnail";

export interface ISearchParams {
    title?: string;
    tag?: string;
    track?: string;
}

export function search(params: ISearchParams): Promise<AxiosResponse<IPlaylistPreview[]>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/search`,
        {
            method: "GET",
            params: params,
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function index(select: "all" | "owner" | "follower"): Promise<AxiosResponse<IPlaylistPreview[]>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists`,
        {
            method: "GET",
            params: { select },
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function get(id: string): Promise<AxiosResponse<IPlaylist>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/${id}`,
        {
            method: "GET",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function del(id: string): Promise<AxiosResponse<IPlaylist>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/${id}`,
        {
            method: "DELETE",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function thumbnail(id: string): Promise<AxiosResponse<IThumbnail>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/${id}/thumbnail`,
        {
            method: "GET",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function add(id: string, track: string): Promise<AxiosResponse<IPlaylist>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/${id}/add/${track}`,
        {
            method: "PATCH",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function remove(id: string, track: string): Promise<AxiosResponse<IPlaylist>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/${id}/remove/${track}`,
        {
            method: "PATCH",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function follow(id: string): Promise<AxiosResponse<IPlaylist>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/${id}/follow`,
        {
            method: "PATCH",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function unfollow(id: string): Promise<AxiosResponse<IPlaylist>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/playlists/${id}/unfollow`,
        {
            method: "PATCH",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}
