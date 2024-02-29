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

export interface IGenresProps {
    user: IUser;
    className?: string;
    onChange?: (genres: string[]) => void;
}

export default function Genres(props: IGenresProps) {
    const { user } = props;

    const { 
        reset,
        watch,
        register,
        setValue,
        getValues
    } = useForm<{ genre: string }>();

    const [open, setOpen] = useState<boolean>(false);

    const [genres, setGenres] = useState<string[]>([]);

    useEffect(() => {
        if (open) {
            _spotify.genres()
                .then(({ data }) => setGenres(data.genres))
                .catch((_) => {/* ignore */});

            reset();
        }
    }, [open]);

    function add(genre: string): void {
        const genres = [ ...user.genres, genre ];

        _users.patch({ genres })
            .then((_) => {
                props.onChange?.(genres);

                setOpen(false);
            })
            .catch((error: any) => {
                toast.error(error.response?.status.error ??
                    "Generic error, try again later...");
            });
    }

    function remove(index: number): void {
        const genres = [ ...user.genres ];

        genres.splice(index, 1);

        _users.patch({ genres })
            .then((_) => props.onChange?.(genres))
            .catch((_) => {/* ignore */});
    }

    function find(genres: string[], genre: string): string[] {
        return genres.filter(g => g.includes(genre.toLowerCase()));
    }

    return (
        <div className={`${props.className} text-nowrap`}>
            { user.genres.map((genre, i) => (
                <div 
                    key={i}

                    className="inline mr-2.5 px-3 bg-spotify-lightgray text-spotify-white rounded-full"
                >
                    { genre } {(
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
                        Add genre <icons.FaMusic className="inline -mt-1 ml-0.5"/>
                    </h1>

                    <input
                        type="text"
                        placeholder="Your new genre (e.g. rock)"
                        className="w-full bg-spotify-gray outline-none mt-2
                            hover:ring-white hover:ring-2 rounded-none px-3.5 py-2
                            text-base text-white placeholder:text-spotify-lightergray
                            peer"

                        {...register("genre")}
                    />

                    { watch("genre") && 
                        find(genres, watch("genre")).length != 0 && (
                            <div 
                                className="absolute w-full max-h-[150px] mt-1.5
                                    bg-spotify-gray rounded-none overflow-y-auto
                                    hidden peer-focus:block peer-focus:py-1"
                            >
                                { find(genres, watch("genre")).map((genre, i) => (
                                    <div
                                        key={i}

                                        className="py-1 px-3.5 text-base text-[#C1C1C1]
                                            hover:text-white active:text-white
                                            cursor-pointer"

                                        onMouseDown={(_) => setValue("genre", genre)}
                                    >
                                        { genre }
                                    </div>
                                ))}
                            </div>
                        )
                    }
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

                        disabled={!watch("genre")}

                        onClick={(_) => add(getValues("genre"))}
                    >
                        Add <icons.FaPlus className="inline -mt-1"/>
                    </button>
                </div>
            </Modal>
        </div>
    );
}