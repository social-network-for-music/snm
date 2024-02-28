import { 
    useEffect,
    
    useState 
} from "react";

import * as _playlists from "@/api/playlists.api";

const PLACEHOLDER = "/static/playlist-placeholder.webp";

const Gradient = (
    <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-spotify-darkgray">
        {/* Nothing to do. */}                 
    </div>
);

export interface IThumbnailProps {
    id: string;
    gradient?: boolean;
    className?: string;
}

export default function Thumbnail(props: IThumbnailProps) {
    const { id } = props;

    const [thumbnails, setThumbnails] = useState<string[]>([ ]);

    useEffect(() => {
        _playlists.thumbnail(id)
            .then(({ data }) => setThumbnails(data["sizes"][640]))
            .catch((_) => {/* ignore */});
    }, [props.id]);

    return (
        <>
            { thumbnails.length <= 1 &&
                <div className={`${props.className} grid grid-rows-1 grid-cols-1 overflow-hidden relative`}>
                    <img src={thumbnails[0] ?? PLACEHOLDER} className="w-full h-full object-cover" />

                    { props.gradient &&
                        Gradient
                    }
                </div>
            }

            { thumbnails.length == 2 &&
                <div className={`${props.className} grid grid-rows-1 grid-cols-2 overflow-hidden relative`}>
                    <img src={thumbnails[0]} className="w-full h-full object-cover" />

                    <img src={thumbnails[1]} className="w-full h-full object-cover" />

                    { props.gradient &&
                        Gradient
                    }
                </div>
            }

            { thumbnails.length >= 3 &&
                <div className={`${props.className} grid grid-rows-2 grid-cols-2 overflow-hidden relative`}>
                    <img src={thumbnails[0]} className="w-full h-full object-cover"/>
                    <img src={thumbnails[1]} className="w-full h-full object-cover"/>
                    <img src={thumbnails[2]} className="w-full h-full object-cover"/>

                    <img src={thumbnails[3] ?? PLACEHOLDER} className="w-full h-full object-cover"/>

                    { props.gradient &&
                        Gradient
                    }
                </div>
            }
        </>
    );
}