import { 
    useEffect,
    
    useState 
} from "react";

import * as _playlists from "@/api/playlists.api";

const PLACEHOLDER = "/static/playlist-placeholder.webp";

interface IContainerProps {
    rows: number;
    columns: number;
    images: string[];

    className?: string;
}

function Container(props: IContainerProps) {
    const { 
        rows,
        columns,
        className
    } = props;

    function padEnd<T = any>(array: T[], length: number, value?: T): T[] {
        return Object.assign(new Array(length).fill(value), array);
    }

    const images = padEnd(props.images, rows * columns, PLACEHOLDER);

    return (
        <div 
            className={`${className} grid grid-rows-${rows} grid-cols-${columns} overflow-hidden rounded-md`}
        >
            { images.map(image => (
                <img 
                    src={image}

                    className="h-full object-cover"
                />
            ))}
        </div>
    );
}

export interface IThumbnailProps {
    id: string;

    className?: string;
}

export default function Thumbnail(props: IThumbnailProps) {
    const { id } = props;

    const [thumbnails, setThumbnails] = useState<string[]>([ ]);

    useEffect(() => {
        _playlists.thumbnail(id)
            .then(({ data }) => setThumbnails(data["sizes"][640]))
            .catch((_) => {/* ignore */});
    }, []);

    return (
        <div className={`${props.className}`}>
            <Container 
                rows={thumbnails.length <= 2 ? 1 : 2}
                columns={thumbnails.length <= 1 ? 1 : 2}
                images={thumbnails}

                className="h-full"
            />
        </div>
    );
}