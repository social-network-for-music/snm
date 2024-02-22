import * as icons from "react-icons/fa6";

export interface ITrackProps {
    track: any;
    className?: string;
    onClose?: () => void;
}

export default function Track(props: ITrackProps) {
    const { track } = props;

    function parse(duration: number): string {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
    }

    return (
        <div className={`${props.className} text-white`}>
            <div className="h-auto">
                <button 
                    className="m-3 p-2 text-[#C1C1C1] hover:text-white active:text-white"

                    onClick={() => props.onClose?.()}
                >
                    <icons.FaXmark size={25}/>
                </button>
            </div>

            <div className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center items-center w-[275px]">
                    <img 
                        src={track.album.images[0].url}

                        className="w-full border-[1px] border-[#868686]"
                    />

                    <div className="w-full text-center">
                        <div className="text-xl text-[#F8F8F8] font-semibold mt-2 truncate">
                            { track.name }
                        </div>

                        <div className="text-sm text-[#868686]">
                            <p className="truncate">
                                From { track.album.name }
                            </p>

                            <p className="truncate">
                                By { track.artists[0].name }
                            </p>

                            <p className="mt-1">
                                { track.album.release_date.split("-")[0] } • { parse(track.duration_ms) }
                            </p>

                            { track.explicit &&
                                <p className="mt-1">
                                    Explicit <icons.FaE className="inline -mt-1 text-base p-0.5 border-[1px] border-[#868686]"/>
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
