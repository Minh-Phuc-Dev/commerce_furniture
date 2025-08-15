import { FC, MouseEvent, useCallback, useState } from "react"
import { twMerge } from "tailwind-merge"
import { getImageURL } from "utils/Image"

const Gallery: FC<{ images: string[], raw?: boolean }> = ({ images, raw = false }) => {

    const [activeImage, setActiveImage] = useState(0)

    const image = images?.at(activeImage)

    const selectImage = useCallback((event: MouseEvent<HTMLElement>) => {
        const index = event.currentTarget.dataset.index ?? "0"
        setActiveImage(parseInt(index))

    }, [])

    return (
        <div className="grid grid-cols-6 gap-2">

            <div className="col-span-1 flex flex-col gap-y-2">
                {
                    images?.map(
                        (image, index) => (
                            <img
                                key={image}
                                onClick={selectImage}
                                data-index={index}
                                className={
                                    twMerge(
                                        "block w-full aspect-square border cursor-pointer transition-all duration-300",
                                        activeImage === index ? "border-primary" : "border-transparent hover:border-primary"
                                    )
                                }
                                src={raw ? image : getImageURL(image)}
                                alt={image}
                            />
                        )
                    )
                }
            </div>
            <div className="col-span-5">
                <img
                    className="block w-full aspect-square"
                    src={raw ? image : getImageURL(image)}
                    alt={image}
                />

            </div>


        </div>
    )
}

export default Gallery