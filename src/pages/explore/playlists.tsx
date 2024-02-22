import { 
    useEffect,
    
    useState
} from "react";

import * as icons from "react-icons/fa";

import * as _playlists from "@/api/playlists.api";

import Template from "@/components/template";
import Input from "@/components/utilities/input";
import Message from "@/components/utilities/message";

import Playlist from "@/components/playlists/playlist";

import PlaylistPreview from "@/components/playlists/playlist-preview";

import PlaylistPreviewHorizontal from "@/components/playlists/playlist-preview-horizontal";

import type { ISearchParams } from "@/api/playlists.api";

export default function Playlists() {
    const [playlist, setPlaylist] = useState<any>();

    const [playlists, setPlaylists] = useState<any[]>([]);

    const [query, setQuery] = useState<ISearchParams>({ });

    useEffect(() => {
        _playlists.search(query)
            .then(({ data }) => setPlaylists(data))
            .catch((_) => setPlaylists([]));
    }, [query]);

    return (
        <Template auth={true}>
            <div className="grid grid-cols-12 gap-0">
                <div
                    className="xs:col-span-12 xl:col-span-7 xs:px-0 md:px-5
                        xs:py-0 md:py-5 xl:pl-5 xl:pr-2.5 min-h-dvh
                        max-h-dvh"
                >
                    <div 
                        className="w-full h-full bg-spotify-darkgray md:rounded-md overflow-y-hidden"
                    >
                        <div className={`${playlist ? "xs:hidden xl:flex" : "flex"} flex-col w-full h-full p-5 text-white`}>
                            <Input 
                                icon={icons.FaSearch}
                                className="xs:mb-5 md:mb-7"
                                placeholder="What do you want to listen to?"

                                onChange={(title) => setQuery({ ...query, title })}
                            />

                            { playlists.length == 0 && (
                                <Message
                                    description="Try using other filters to get more results."
                                >
                                    No playlists found
                                </Message>
                            )}

                            <div className="flex-1 overflow-y-scroll">
                                <div 
                                    className="xs:hidden md:flex flex-row
                                        flex-wrap justify-center items-center 
                                        gap-5"
                                >
                                    { playlists.map((playlist, i) => (
                                        <PlaylistPreview 
                                            key={i}
                                            playlist={playlist}
                                            className="flow-initial"

                                            onClick={(_) => setPlaylist(playlist)}
                                        />
                                    ))}
                                </div>

                                <div
                                    className="xs:block md:hidden mx-3"
                                >
                                    { playlists.map((playlist, i) => (
                                        <PlaylistPreviewHorizontal
                                            key={i}
                                            playlist={playlist}
                                            className="mb-3"

                                            onClick={(_) => setPlaylist(playlist)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`${playlist ? "xs:block xl:hidden" : "hidden"}`}>
                            { playlist && (
                                <Playlist 
                                    id={playlist._id} 

                                    onClose={() => setPlaylist(null)}
                                />
                            )}
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
                        { !playlist && (
                            <div 
                                className="flex justify-center items-center w-full h-full
                                    text-[#404040] text-xl font-semibold"
                            >
                                Select a playlist to open its detail card
                            </div>
                        )}

                        { playlist && (
                            <Playlist
                                id={playlist._id} 
                                
                                onClose={() => setPlaylist(null)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Template>
    );
}