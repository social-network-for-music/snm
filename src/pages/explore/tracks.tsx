import { 
    useEffect,
    
    useState
} from "react";

import * as icons from "react-icons/fa";

import * as spotify from "@/api/spotify.api";

import Template from "@/components/template";
import Input from "@/components/utilities/input";
import Message from "@/components/utilities/message";

import Track from "@/components/tracks/track";

import TrackPreview from "@/components/tracks/track-preview";

import TrackPreviewHorizontal from "@/components/tracks/track-preview-horizontal";

export default function Tracks() {
    const [value, setValue] = useState<string>();

    const [track, setTrack] = useState<any>();
    const [tracks, setTracks] = useState<any[]>([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);

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
        <Template auth={true} title="Social Network for Music | Explore tracks">
            <div className="grid grid-cols-12 gap-0">
                <div
                    className="xs:col-span-12 xl:col-span-8 xs:px-0 md:px-5
                        xs:py-0 md:py-5 xl:pl-5 xl:pr-2.5 min-h-dvh
                        max-h-dvh"
                >
                    <div 
                        className="w-full h-full bg-spotify-darkgray md:rounded-md overflow-y-hidden"
                    >
                        <div className={`${track ? "xs:hidden xl:flex" : "flex"} flex-col w-full h-full p-5 text-white`}>
                            <Input 
                                icon={icons.FaSearch}
                                className="xs:mb-5 md:mb-7 mt-2 py-3"
                                placeholder="What are your favorite songs?"

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

                            <div className="flex-1 overflow-y-scroll">
                                <div 
                                    className="xs:hidden md:flex flex-row
                                        flex-wrap justify-center items-center 
                                        gap-5"
                                >
                                    { (value ? tracks : recommendations).map((track, i) => (
                                        <TrackPreview 
                                            key={i}
                                            track={track}
                                            className="flow-initial"

                                            onClick={(_) => setTrack(track)}
                                        />
                                    ))}
                                </div>

                                <div
                                    className="xs:block md:hidden mx-3"
                                >
                                    { (value ? tracks : recommendations).map((track, i) => (
                                        <TrackPreviewHorizontal
                                            key={i}
                                            track={track}
                                            className="mb-3"

                                            onClick={(_) => setTrack(track)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`${track ? "xs:block xl:hidden" : "hidden"} h-full`}>
                            { track && (
                                <Track 
                                    track={track} 

                                    onClose={() => setTrack(null)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div 
                    className="xs:hidden xs:col-span-0 xl:block xl:col-span-4
                        px-5 xs:py-5 xl:pl-2.5 xl:pr-5 min-h-dvh max-h-dvh"
                >
                    <div
                        className="w-full h-full bg-spotify-darkgray md:rounded-md"
                    >
                        { !track && (
                            <div 
                                className="flex justify-center items-center w-full h-full
                                    text-[#404040] text-xl font-semibold"
                            >
                                Select a track to open its detail card
                            </div>
                        )}

                        { track && (
                            <Track 
                                track={track}
                                
                                onClose={() => setTrack(null)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Template>
    );
}
