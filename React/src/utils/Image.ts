import {isEmpty} from "lodash";

export const getImageURL = (src?: string) => {
    return isEmpty(src) ? "/images/no-image.jpg" : `${import.meta.env.VITE_API}/media/${src}`
}
