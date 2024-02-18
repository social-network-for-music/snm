import * as icons from "react-icons/fa";

export interface ISearchProps {
    className?: string;

    onChange?: (value: string) => void;
}

export default function Search(props: ISearchProps) {
    return (
        <div
            className={`${props.className} mt-2 w-full
                py-3 pr-5 rounded-full bg-spotify-gray 
                outline-none hover:ring-white hover:ring-2`}
        >
            <icons.FaSearch size={20} color="#979797" className="inline -mt-1 ml-5 mr-3"/>

            <input 
                type="text" 
                placeholder="What are your favorite songs?"
                className="w-[85%] text-white text-lg bg-spotify-gray 
                    placeholder:text-spotify-lightergray outline-none"

                onChange={(e) => props.onChange?.(e.target.value)}
                    
            />
        </div>
    );
}
