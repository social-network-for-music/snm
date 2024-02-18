import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { AxiosError } from "axios";

import * as auth from "@/api/auth.api";

import * as spotify from "@/api/spotify.api";

import Layout from "@/components/layout";
import Search from "@/components/search";
import TrackPreview from "@/components/track-preview";

export default function() {
    const router = useRouter();

    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        if (!localStorage.getItem("token"))
            router.push("/");
        else
            auth.verify()
                .catch((error: AxiosError) => {
                    if (error.response?.status == 401)
                        router.push(`/?timeout=1`);
                    else
                        toast.error("Generic error, try again later...");
                });
    }, []);

    async function search(value: string): Promise<void> {
        try {
            const data = (await spotify.tracks(value)).data;

            setTracks(data.tracks.items);
        } catch (_) {
            setTracks([]);
        }
    }

    return (
        <Layout>
            <div className="grid grid-cols-12 gap-0">
                <div
                    className="xs:col-span-12 xl:col-span-7 xs:px-0 md:px-5
                        xs:py-0 md:py-5 xl:pl-5 xl:pr-2.5 min-h-dvh"
                >
                    <div
                        className="w-full h-full px-7 py-5 md:rounded-md bg-spotify-darkgray text-white"
                    >
                        <Search 
                            className="mb-10"

                            onChange={(value) => search(value)}
                        />

                        <div className="flex flex-wrap justify-center gap-5">
                            { tracks.map((track, i) => (
                                <TrackPreview 
                                    key={i}
                                    track={track}
                                    className="flow-initial"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div 
                    className="xs:hidden xs:col-span-0 xl:block xl:col-span-5
                        px-5 xs:py-5 xl:pl-2.5 xl:pr-5 min-h-dvh"
                >
                    <div
                        className="w-full h-full rounded bg-spotify-darkgray"
                    >

                    </div>
                </div>
            </div>
        </Layout>
    );
}
