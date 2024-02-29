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

    const [artists, setArtists] = useState<any[]>([]);

    useEffect(() => {
        fetch(user.artists)
            .then((artists) => setArtists(artists))
            .catch((_) => {/* ignore */});
    }, [user]);

    function fetch(artists: string[]): Promise<any[]> {
        const promises = artists.map(id => 
            _spotify.artist(id)
                .then(({ data }) => data)
        );

        return Promise.all(promises);
    }

    function remove(index: number): void {
        const artists = [ ...user.artists ];

        artists.splice(index, 1);

        _users.patch({ artists })
            .then((_) => props.onChange?.(artists))
            .catch((_) => {/* ignore */});
    }

    function find(genres: string[], genre: string): string[] {
        return genres.filter(g => g.includes(genre.toLowerCase()));
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
        </div>
    );
}