import { 
    useEffect,
    
    useState
} from "react";

import * as icons from "react-icons/fa";

import * as _users from "@/api/users.api";

import * as _playlists from "@/api/playlists.api";

import Template from "@/components/template";
import Input from "@/components/utilities/input";
import Message from "@/components/utilities/message";

import Playlist from "@/components/playlists/playlist";
import PlaylistPreview from "@/components/playlists/playlist-preview";
import PlaylistPreviewHorizontal from "@/components/playlists/playlist-preview-horizontal";

import type IUser from "@/types/user";

import type IPlaylist from "@/types/playlist";

import type IPlaylistPreview from "@/types/playlist-preview";

import type { ISearchParams } from "@/api/playlists.api";

export default function Playlists() {
    const [user, setUser] = useState<IUser>();
    const [playlist, setPlaylist] = useState<IPlaylistPreview>();
    const [playlists, setPlaylists] = useState<IPlaylistPreview[]>([]);

    const [collapsed, setCollapsed] = useState<boolean>(true);

    const [query, setQuery] = useState<ISearchParams>({ });

    useEffect(() => {
        _users.get()
            .then(({ data }) => setUser(data))
            .catch((_) => {/* ignore */});
    }, []);

    useEffect(() => {
        search(query);
    }, [query]);

    function search(query: ISearchParams): void {
        _playlists.search(query)
            .then(({ data }) => setPlaylists(data))
            .catch((_) => setPlaylists([]));
    }

    function heart(playlist: IPlaylist | IPlaylistPreview): void {
        const endpoint = 
            playlist.followers.includes(user!._id) ?
                _playlists.unfollow : 
                _playlists.follow;

        endpoint(playlist._id)
            .then((_) => search(query))
            .catch((_) => {/* ignore */});
    }

    return (
        <Template auth={true}>
            <div className="grid grid-cols-12 gap-0">
                <div
                    className="xs:col-span-12 xl:col-span-8 xs:px-0 md:px-5
                        xs:py-0 md:py-5 xl:pl-5 xl:pr-2.5 min-h-dvh
                        max-h-dvh"
                >
                    <div 
                        className="w-full h-full bg-spotify-darkgray md:rounded-md overflow-y-auto"
                    >
                        <div className={`${playlist ? "xs:hidden xl:flex" : "flex"} flex-col w-full h-full p-5 text-white`}>
                            <div className="flex flex-wrap justify-center items-center cursor-pointer xs:mb-3 md:mb-5">
                                <Input 
                                    icon={icons.FaSearch}
                                    placeholder="What do you want to listen to?"
                                    onChange={(title) => setQuery({ ...query, title })}
                                />
 
                                <div 
                                    className="xs:mt-1 md:mt-2 xs:text-3xl sm:text-4xl"
                                    
                                    onClick={(_) => setCollapsed(!collapsed)}
                                >
                                    { collapsed ? <icons.FaCaretUp /> : <icons.FaCaretDown />}
                                </div>

                                { !collapsed &&
                                    <div className="w-full mb-1">
                                        <Input 
                                            className="xs:py-1 sm:py-2"

                                            icon={icons.FaTag}
                                            placeholder="Search by tag (e.g. rock)"
                                            onChange={(tag) => setQuery({ ...query, tag })}
                                        />

                                        <Input 
                                            className="xs:py-1 sm:py-2"

                                            icon={icons.FaMusic}
                                            placeholder="Search by track (e.g. Africa)"
                                            onChange={(track) => setQuery({ ...query, track })}
                                        />
                                    </div>
                                }
                            </div>

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
                                            user={user!}
                                            playlist={playlist}
                                            className="flow-initial"

                                            onClick={(_) => setPlaylist(playlist)}

                                            onHeart={(playlist) => heart(playlist)}
                                        />
                                    ))}
                                </div>

                                <div
                                    className="xs:block md:hidden mx-3"
                                >
                                    { playlists.map((playlist, i) => (
                                        <PlaylistPreviewHorizontal
                                            key={i}

                                            user={user!}
                                            playlist={playlist}
                                            className="mb-3"

                                            onClick={(_) => setPlaylist(playlist)}
                                            
                                            onHeart={(playlist) => heart(playlist)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`${playlist ? "xs:block xl:hidden" : "hidden"}`}>
                            { playlist && (
                                <Playlist 
                                    id={playlist._id} 
                
                                    user={user!}
                                    onClose={() => setPlaylist(undefined)}
                                    onChange={(_) => search(query)}
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
                        className="w-full h-full rounded bg-spotify-darkgray overflow-y-auto"
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
                                
                                user={user!}
                                onClose={() => setPlaylist(undefined)}
                                onChange={(_) => search(query)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Template>
    );
}
