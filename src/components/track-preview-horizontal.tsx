import { 
    MouseEventHandler,
    
    useState
} from "react";

import Image from "next/image";

import * as icons from "react-icons/fa";

export interface ITrackPreviewHorizontalProps {
    track: any;
    className?: string;
    onClick?: MouseEventHandler;
}

export default function TrackPreviewHorizontal(props: ITrackPreviewHorizontalProps) {
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
            className={`${props.className}
                w-full h-[75px] bg-[#181818]
                hover:bg-[#282828] rounded-md
                cursor-pointer`}

            onClick={(event) => props.onClick?.(event)}
        >
           <div className="flex gap-1 justify-between items-center">
                <div className="flex-none p-2">
                    <Image 
                        src={track.album.images[1].url}
                        alt="Cover"
                        width={60}
                        height={60}
                        className="rounded-md"
                    />
                </div>

                <div className="flex-initial w-full truncate">
                    <div
                        className="text-sm text-[#F8F8F8] font-semibold"
                    >
                        { track.name }
                    </div>

                    <div
                        className="text-xs text-[#868686] mt-1"
                    >
                        { track.album.release_date.split("-")[0] } • 
                            By { track.artists[0].name }
                    </div>
                </div>

                <div className="flex-none p-4">
                    <button 
                        className={`p-3 rounded-full bg-spotify-green 
                            hover:bg-spotify-lightgreen active:bg-spotify-lightgreen 
                            ${!track.preview_url && "hidden"}`}

                        onClick={() => audio ? stop() : start()}
                    >
                        { audio ?
                            <icons.FaPause color="black" size={15}/> :
                            <icons.FaPlay color="black" size={15}/> 
                        }
                    </button>
                </div>
           </div>
        </div>
    );
}
