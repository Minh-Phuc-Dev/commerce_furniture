import useCallAPIState, { CALL_API_STATUS } from "hooks/UseCallAPIState";
import { nanoid } from "nanoid/non-secure";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryService from "services/CategoryService";
import { Category } from "types/Category";
import { getImageURL } from "utils/Image";


const Categories = () => {
    const [categories, setCategories] = useCallAPIState<Category[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )

    const fetchData = useCallback(
        async () => {
            setCategories(CALL_API_STATUS.LOADING)
            const { payload, success } = await CategoryService.get()
            if (success) {
                setCategories(CALL_API_STATUS.SUCCESS, payload)
            }
        }, [setCategories]
    )

    useEffect(
        () => {
            fetchData()
        },
        [fetchData]
    )
    return (
        <div className="max-w-1200 mx-auto pb-16">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">Mua theo danh mục</h2>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">

                {
                    categories.data.map(
                        (category) => (
                            <div key={nanoid()} className="relative group rounded-sm overflow-hidden">
                                <img
                                    src={getImageURL(category?.attributes?.image)}
                                    className="w-full"
                                    alt="category"
                                />
                                <Link

                                    to={
                                        {
                                            pathname: "/products",
                                            search: `category=${category.id}`
                                        }
                                    }
                                    className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center text-xl text-white font-roboto font-medium tracking-wide transition"
                                >
                                    {category.name}
                                </Link>
                            </div>
                        )
                    )
                }

            </div>
        </div>
    );
};

export default Categories;