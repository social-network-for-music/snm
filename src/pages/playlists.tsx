import { 
    MouseEventHandler,

    PropsWithChildren,
    useEffect,
    useState
} from "react";

import { toast } from "react-toastify";

import * as icons from "react-icons/fa";

import * as _users from "@/api/users.api";

import * as _playlists from "@/api/playlists.api";

import Template from "@/components/template";

import Message from "@/components/utilities/message";

import Create from "@/components/playlists/modals/create";

import Playlist from "@/components/playlists/playlist";
import PlaylistPreview from "@/components/playlists/playlist-preview";
import PlaylistPreviewHorizontal from "@/components/playlists/playlist-preview-horizontal";

import type IUser from "@/types/user";
import type IPlaylist from "@/types/playlist";
import type IPlaylistPreview from "@/types/playlist-preview";

import type { IPostData } from "@/api/playlists.api";

interface ISelectProps extends PropsWithChildren {
    active: boolean;

    onClick: MouseEventHandler
}

function Select(props: ISelectProps) {
    return (
        <div
            className={`${props.active ? "bg-spotify-green text-black" : "bg-spotify-lightgray text-white"}
                inline font-semibold text-center rounded-full
                mr-3 px-5 py-1 xs:text-sm sm:text-base
                cursor-pointer
            `}

            onClick={(event) => props.onClick?.(event)}
        >
            { props.children }
        </div>
    );
}

export default function Playlists() {
    const [user, setUser] = useState<IUser>();
    const [playlist, setPlaylist] = useState<IPlaylistPreview>();
    const [playlists, setPlaylists] = useState<IPlaylistPreview[]>([]);

    const [select, setSelect] = useState<"all" | "owner" | "follower">("all");

    const [open, setOpen] = useState<boolean>(false); 

    useEffect(() => {
        _users.get()
            .then(({ data }) => setUser(data))
            .catch((_) => {/* ignore */});
    }, []);

    useEffect(() => {
        index(select);
    }, [select]);

    function index(select: "all" | "owner" | "follower"): void {
        _playlists.index(select)
            .then(({ data }) => setPlaylists(data))
            .catch((_) => {/* ignore */});
    }

    function heart(playlist: IPlaylist | IPlaylistPreview): void {
        const endpoint = 
            playlist.followers.includes(user!._id) ?
                _playlists.unfollow : 
                _playlists.follow;

        endpoint(playlist._id)
            .then((_) => index(select))
            .catch((_) => {/* ignore */});
    }

    function create(data: IPostData): void {
        _playlists.post(data)
            .then((_) => {
                index(select);

                setOpen(false);

                toast.success("Your playlist has been created!");
            })
            .catch((error: any) => {
				toast.error(error.response?.data.error ??
					"Generic error, try again later...");
            });
    }

    return (
        <Template auth={true} title="Social Network for Music | My playlists">
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
                            <div className="xs:mb-3 sm:mb-5">
                                <Select 
                                    active={select == "all"}

                                    onClick={(_) => setSelect("all")}
                                >
                                    All
                                </Select>

                                <Select 
                                    active={select == "owner"}

                                    onClick={(_) => setSelect("owner")}
                                >
                                    Owner
                                </Select>

                                <Select 
                                    active={select == "follower"}
                                    
                                    onClick={(_) => setSelect("follower")}
                                >
                                    Follower
                                </Select>
                            </div>

                            <div className="xs:mb-3 md:mb-5">
                                <Message
                                    description="Add or follow a playlist to view it in your collection."
                                >
                                    Your personal collection of awesome playlists!
                                </Message>
                            </div>

                            <div
                                className="flex justify-center items-center xs:mb-5 md:mb-7"
                            >   
                                <button
                                    className="w-48 text-black text-lg py-2 rounded-full
                                        font-bold bg-spotify-green hover:bg-spotify-darkgreen
                                        active:bg-spotify-darkgreen leading-tight"
                                    
                                    onClick={(_) => setOpen(true)}
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

                        <div className={`${playlist ? "xs:block xl:hidden" : "hidden"} h-full`}>
                            { playlist && (
                                <Playlist 
                                    id={playlist._id} 

                                    user={user!}

                                    className="h-full"
                                    onChange={(_) => index(select)}
                                    onClose={() => setPlaylist(undefined)}
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

                                className="h-full"
                                onChange={(_) => index(select)}
                                onClose={() => setPlaylist(undefined)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <Create
                open={open}
                onCancel={(_) => setOpen(false)}
                onSubmit={(data) => create(data)}
            />
        </Template>
    );
}
