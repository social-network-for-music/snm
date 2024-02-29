import { 
    useEffect, 
    
    useState
} from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { Modal } from "antd/lib";

import * as icons from "react-icons/fa6";
import * as _users from "@/api/users.api";
import * as _spotify from "@/api/spotify.api";

import type IUser from "@/types/user";

const FaXmark = <icons.FaXmark 
    className="text-[#C1C1C1] hover:text-white active:text-white"

    size={25}
/>;

export interface IArtistsProps {
    user: IUser;
    className?: string;
    onChange?: (artists: string[]) => void;
}

export default function Artists(props: IArtistsProps) {
    const { user } = props;

    const { 
        reset,
        watch,
        register,
        setValue,
        getValues
    } = useForm<{ artist: string }>();

    const [open, setOpen] = useState<boolean>(false);

    const [artist, setArtist] = useState<any>();
    const [artists, setArtists] = useState<any[]>([ ]);
    const [options, setOptions] = useState<any[]>([ ]);

    useEffect(() => {
        if (open)
            reset();
    }, [open]);

    useEffect(() => {
        fetch(user.artists)
            .then((artists) => setArtists(artists))
            .catch((_) => {/* ignore */});
    }, [user]);

    useEffect(() => {
        const artist = getValues("artist");

        if (artist)
            _spotify.artists(artist)
                .then(({ data }) => setOptions(data.artists.items))
                .catch((_) => {/* ignore */});
        else
            setOptions([ ]);
    }, [watch("artist")]);

    function fetch(artists: string[]): Promise<any[]> {
        const promises = artists.map(id => 
            _spotify.artist(id)
                .then(({ data }) => data)
                .catch((_) => {/* ignore */})
        );

        return Promise.all(promises);
    }

    function add({ id }: any): void {
        const artists = [ ...user.artists, id ];

        _users.patch({ artists })
            .then((_) => {
                props.onChange?.(artists);

                setOpen(false);
            });
    }

    function remove(index: number): void {
        const artists = [ ...user.artists ];

        artists.splice(index, 1);

        _users.patch({ artists })
            .then((_) => props.onChange?.(artists))
            .catch((_) => {/* ignore */});
    }

    return (
        <div className={`${props.className} text-nowrap`}>
            { artists.map((artist, i) => (
                <div 
                    key={i}

                    className="inline mr-2.5 px-3 bg-spotify-lightgray text-spotify-white rounded-full"
                >
                    { artist.name } {(
                        <span 
                            className="text-sm text-[#C1C1C1] hover:text-white active:text-white cursor-pointer"

                            onClick={(_) => remove(i)}
                        >
                            <icons.FaTrash className="inline -mt-1" />
                        </span> 
                    )}
                </div>
            ))}

            <div 
                className="inline mr-2.5 text-[#C1C1C1] hover:text-white active:text-white rounded-full cursor-pointer"
            
                onClick={(_) => setOpen(true)}
            >
                { <icons.FaPlus className="inline -mt-1" /> }
            </div>

            <Modal
                open={open}    
                closeIcon={FaXmark}
                footer={null}

                width={400}

                onCancel={(_) => setOpen(false)}
            >
                <form className="text-spotify-white relative">
                    <h1 className="text-lg font-semibold">
                        Add artist <icons.FaHeadphonesSimple className="inline -mt-1 ml-0.5"/>
                    </h1>

                    <input
                        type="text"
                        placeholder="Your new artist (e.g. Queen)"
                        className="w-full bg-spotify-gray outline-none mt-2
                            hover:ring-white hover:ring-2 rounded-none px-3.5 py-2
                            text-base text-white placeholder:text-spotify-lightergray
                            peer"

                        {...register("artist")}
                    />

                    { options.length != 0 && (
                        <div 
                            className="absolute w-full max-h-[150px] mt-1.5
                                bg-spotify-gray rounded-none overflow-y-auto
                                hidden peer-focus:block peer-focus:py-1"
                        >
                            { options.map((option, i) => (
                                <div
                                    key={i}

                                    className="py-1 px-3.5 text-base text-[#C1C1C1]
                                        hover:text-white active:text-white
                                        cursor-pointer"

                                    onMouseDown={(_) => {
                                        setValue("artist", option.name);

                                        setArtist(option);
                                    }}
                                >
                                    { option.name }
                                </div>
                            ))}
                        </div>
                    )}
                </form>

                <div className="w-full mt-3 text-right">
                    <button
                        className="text-black text-base py-1.5 px-3.5 rounded-full
                            font-semibold bg-spotify-green hover:bg-spotify-darkgreen
                            active:bg-spotify-darkgreen leading-tight mr-3"

                        onClick={(_) => setOpen(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="text-black text-base py-1.5 px-3.5 rounded-full font-semibold 
                            bg-spotify-green hover:bg-spotify-darkgreen active:bg-spotify-darkgreen 
                            disabled:bg-opacity-65 disabled:hover:bg-opacity-65 disabled:active:bg-opacity-65 
                            disabled:hover:bg-spotify-green disabled:active:bg-spotify-green leading-tight"

                        disabled={!artist || 
                            watch("artist") != artist.name}

                        onClick={(_) => add(artist!)}
                    >
                        Add <icons.FaPlus className="inline -mt-1"/>
                    </button>
                </div>
            </Modal>
        </div>
    );
}