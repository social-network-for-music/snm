import type { IconType } from "react-icons";

export interface IInputProps {
    icon: IconType;
    className?: string;
    placeholder?: string;

    value?: string;

    onChange?: (value: string) => void;
}

export default function Input(props: IInputProps) {
    return (
        <div
            className={`${props.className} w-full pr-5
                rounded-full bg-spotify-gray outline-none
                hover:ring-white hover:ring-2`}
        >
            <props.icon size={20} color="#979797" className="inline -mt-2 ml-5 mr-3"/>

            <input 
                type="text" 
                placeholder={props.placeholder}
                className="w-[85%] text-white text-lg bg-spotify-gray 
                    placeholder:text-spotify-lightergray outline-none"

                value={props.value}

                onChange={(e) => props.onChange?.(e.target.value)}
                    
            />
        </div>
    );
}
