import { 
    useEffect,
    
    useState
} from "react";

import * as icons from "react-icons/fa";

import * as _playlists from "@/api/playlists.api";

import Template from "@/components/template";

import Message from "@/components/utilities/message";

import Playlist from "@/components/playlists/playlist";
import PlaylistPreview from "@/components/playlists/playlist-preview";
import PlaylistPreviewHorizontal from "@/components/playlists/playlist-preview-horizontal";

export default function Playlists() {
    const [playlist, setPlaylist] = useState<any>();

    const [playlists, setPlaylists] = useState<any[]>([]);

    const [select, setSelect] = useState<"all" | "owner" | "follower">("all");

    useEffect(() => {
        _playlists.index(select)
            .then(({ data }) => setPlaylists(data))
            .catch((_) => {/* ignore */});
    }, [select]);

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
                            <div className="xs:mb-3 md:mb-5">
                                <Message
                                    description="Add or follow a playlist to view it in your collection."
                                >
                                    Your favorite playlists are here!
                                </Message>
                            </div>

                            <div
                                className="flex justify-center items-center"
                            >   
                                <button
                                    className="w-48 text-lg py-2 rounded-full font-bold
                                        bg-spotify-green hover:bg-spotify-darkgreen
                                        active:bg-spotify-darkgreen leading-tight 
                                        mb-5"
                                >
                                    Add playlist <icons.FaPlus className="inline -mt-1 ml-1"/>
                                </button>
                            </div>

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
