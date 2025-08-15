import {FC, HTMLAttributes} from 'react';
import {twMerge} from "tailwind-merge";

type LoadingProps = HTMLAttributes<HTMLDivElement> & {
    size?: number
    borderWidth?: number
}
const Loading:FC<LoadingProps> = ({ className, size = 20, borderWidth = 3, ...props}) => {
    return (
        <div
            style={
                {
                    width: size,
                    height: size,
                    borderWidth,
                    borderRadius: `${size}px`
                }
            }
            className={twMerge("animate-spin inline-block border-indigo-300 border-b-indigo-500", className)}
            {...props}
        ></div>
    );
};

export default Loading;