import { useState } from "react";

import Link from "next/link";

import * as icons from "react-icons/fa6";

import TrackDrawer from "../drawers/track-drawer";

export interface ITrackProps {
    track: any;
    className?: string;
    onClose?: () => void;
}

export default function Track(props: ITrackProps) {
    const { track } = props;

    const [open, setOpen] = useState<boolean>(false);

    function parseTime(duration: number): string {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
    }

    return (
        <div className={`${props.className} relative text-white h-full`}>
            <div className="absolute w-full bg-spotify-darkgray bg-opacity-75 z-[100]">
                <button 
                    className="m-2.5 p-2 text-[#C1C1C1] hover:text-white active:text-white"

                    onClick={() => props.onClose?.()}
                >
                    <icons.FaXmark size={25}/>
                </button>
            </div>
            
            <div className="absolute w-full px-5 pt-3 pb-5 bottom-0 left-0 bg-spotify-darkgray bg-opacity-75">
                <div>
                    <div className="text-lg text-spotify-white text-opacity-75 font-bold">
                        <Link 
                            className="hover:text-spotify-white"
                            href={track.album.external_urls.spotify}
                            target="_blank"
                        >
                            Open in Spotify <icons.FaSpotify className="inline -mt-1 ml-0.5"/>
                        </Link>
                    </div>

                    <div className="text-base text-[#868686]">
                        <p><b>Duration</b>: { parseTime(track.duration_ms) } minutes</p>

                        <p><b>Release date</b>: { new Date(track.album.release_date).toLocaleDateString("it-IT") }</p>
                    </div>
                </div>
            </div>


            <div className="w-full h-[60vh] relative">
                <img 
                    src={track.album.images[0].url}

                    className="w-full h-full object-cover"
                />

                <button 
                    className="absolute bottom-0 right-0 m-3 p-2 rounded-full 
                        bg-spotify-green hover:bg-spotify-lightgreen
                        active:bg-spotify-lightgreen text-black"

                    onClick={(_) => setOpen(true)}
                >
                    <icons.FaPlus size={25}/>
                </button>
            </div>


            <div className="w-full px-5">
                <div className="text-3xl text-spotify-white font-bold mt-2 truncate">
                    { track.name }
                </div>

                <div className="text-[#868686]">
                    <div className="truncate">
                        <Link 
                            className="text-lg hover:text-spotify-white hover:underline"
                            href={track.album.external_urls.spotify}
                            target="_blank"
                        >
                            { track.album.name }
                        </Link>
                    </div>

                    <div className="truncate mt-0.5">
                        <Link 
                            className="text-xl hover:text-spotify-white hover:underline"
                            href={track.artists[0].external_urls.spotify}
                            target="_blank"
                        >
                            { track.artists[0].name }
                        </Link>
                    </div>

                    { track.explicit &&
                        <p className="text-lg mt-2.5">
                            Explicit <icons.FaE className="inline -mt-1 ml-0.5 p-0.5 text-base border-[1px] border-[#868686] rounded-sm"/>
                        </p>
                    }
                </div>
            </div>

            <TrackDrawer 
                track={track.id}

                open={open}
                setOpen={setOpen}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}
