import axios, { AxiosResponse } from "axios";

export function tracks(q: string): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/spotify/tracks`,
        {
            method: "GET",
            params: { q },
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function artists(q: string): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/spotify/artists`,
        {
            method: "GET",
            params: { q },
            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function genres(): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/spotify/genres`,
        {
            method: "GET",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function recommendations(): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/spotify/recommendations`,
        {
            method: "GET",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}

export function artist(id: string): Promise<AxiosResponse<any>> {
    const token = localStorage.getItem("token");

    return axios(`${process.env.API}/spotify/artists/${id}`,
        {
            method: "GET",

            headers: { "Authorization": `Bearer ${token}` }
        }
    );
}
