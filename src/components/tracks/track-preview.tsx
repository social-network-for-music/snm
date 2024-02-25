import { 
    MouseEventHandler,
    
    useState
} from "react";

import Image from "next/image";

import * as icons from "react-icons/fa";

export interface ITrackPreviewProps {
    track: any;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function TrackPreview(props: ITrackPreviewProps) {
    const { track } = props;

    const [audio, setAudio] = useState<HTMLAudioElement>();

    const start = (): void => {
        const audio = new Audio(track.preview_url);

        audio!.play();

        setAudio(audio);
    }

    const stop = (): void => {
        audio!.pause();

        setAudio(undefined);
    };

    return (
        <div 
            className={`${props.className} relative
                w-[175px] h-[235px] bg-[#181818]
                hover:bg-[#282828] rounded-xl 
                cursor-pointer`}

            onClick={(event) => props.onClick?.(event)}
        >
            <div className="pt-5 px-5">
                <Image 
                    src={track.album.images[0].url}
                    alt="Cover"
                    width={200}
                    height={200}
                    className="rounded-md"
                />

                <button 
                    className={`absolute bottom-[57.5px] right-0 m-3 p-2 text-xl
                        rounded-full bg-spotify-green hover:bg-spotify-lightgreen 
                        active:bg-spotify-lightgreen text-black
                        ${!track.preview_url && "hidden"}`}

                    onClick={(event) => {
                        event.stopPropagation();

                        audio ? stop() : start();
                    }}
                >
                    { audio ?
                        <icons.FaPause/> :
                        <icons.FaPlay/> 
                    }
                </button>

                <div
                    className="text-lg text-spotify-white font-semibold mt-3 truncate"
                >
                    { track.name }
                </div>

                <div
                    className="text-md text-[#868686] mt-1 truncate"
                >
                    { track.album.release_date.split("-")[0] } • 
                        By { track.artists[0].name }
                </div>
            </div>
        </div>
    );
}
