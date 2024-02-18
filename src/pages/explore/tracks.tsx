import { 
    useEffect,
    
    useState
} from "react";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { AxiosError } from "axios";

import * as auth from "@/api/auth.api";

import * as spotify from "@/api/spotify.api";

import Layout from "@/components/layout";
import Search from "@/components/search";
import Message from "@/components/message";

import TrackPreview from "@/components/track-preview";

export default function() {
    const router = useRouter();

    const [value, setValue] = useState<string>();

    const [track, setTrack] = useState<any>();
    const [tracks, setTracks] = useState<any[]>([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);

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

    useEffect(() => {
        spotify.recommendations()
            .then(({ data }) => setRecommendations(data.tracks))
            .catch((_) => {/* ignore */});
    }, []);

    useEffect(() => {
        if (value)
            spotify.tracks(value)
                .then(({ data }) => setTracks(data.tracks.items))
                .catch((_) => setTracks([]));
    }, [value]);

    return (
        <Layout>
            <div className="grid grid-cols-12 gap-0">
                <div
                    className="xs:col-span-12 xl:col-span-7 xs:px-0 md:px-5
                        xs:py-0 md:py-5 xl:pl-5 xl:pr-2.5 min-h-dvh
                        max-h-dvh"
                >
                    <div 
                        className="flex flex-col w-full h-full 
                            px-5 py-5 text-white overflow-y-hidden
                            bg-spotify-darkgray md:rounded-md"
                    >
                        <Search 
                            className="xs:mb-5 md:mb-7"

                            onChange={(value) => setValue(value)}
                        />

                        { !value && (
                            <div className="mb-5">
                                <Message
                                    description="You can search by track's title, genre, artist and release year."
                                >
                                    Start typing to explore millions of awesome tracks
                                </Message>
                            </div>
                        )}

                        { value && tracks.length == 0 && (
                            <Message
                                description="Please make sure your words are spelled correctly, or use fewer or different keywords."
                            >
                                No tracks found for "{value}"
                            </Message>
                        )}

                        <div 
                            className="flex-1 flex flex-row flex-wrap
                                justify-center items-center gap-5 
                                overflow-y-scroll"
                        >
                            { (value ? tracks : recommendations).map((track, i) => (
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
                        px-5 xs:py-5 xl:pl-2.5 xl:pr-5 min-h-dvh max-h-dvh"
                >
                    <div
                        className="w-full h-full rounded bg-spotify-darkgray"
                    >
                        { !track && (
                            <div 
                                className="flex justify-center items-center w-full h-full
                                    text-[#404040] text-xl font-semibold"
                            >
                                Select a track to open its detail card
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}