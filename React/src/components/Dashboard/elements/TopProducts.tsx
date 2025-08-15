import Loading from "common/Loading";
import useCallAPIState, {CALL_API_STATUS} from "hooks/UseCallAPIState";
import {nanoid} from "nanoid/non-secure";
import {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import StatisticsService from "services/StatisticsService";
import {Product} from "types/Product";
import {getImageURL} from "utils/Image";

const TopProducts = () => {

    const [products, setProducts] = useCallAPIState<Product[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )

    const fetchData = useCallback(
        async () => {
            setProducts(CALL_API_STATUS.LOADING)
            const {success, payload} = await StatisticsService.getProducts()
            if (success) {
                setProducts(CALL_API_STATUS.SUCCESS, payload!)
            }
        }, [setProducts]
    )

    useEffect(
        () => {
            fetchData()
        }, [fetchData]
    )


    return (
        <div className="p-5 border rounded shadow space-y-5">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Sản phẩm bán chạy</h2>
                {
                    products.loading ? (
                        <Loading size={16}/>
                    ) : (
                        <button
                            className="text-gray-500 opacity-50 hover:opacity-100 hover:text-primary"
                            onClick={fetchData}
                        >
                            <svg className="size-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )
                }

            </div>
            <ul className="rounded overflow-hidden border">
                <li className="flex bg-primary text-white py-1 px-5">
                    <p className="grow">Tên</p>
                    <p className="flex-none w-40 px-2">Số lượng</p>
                    <p className="flex-none w-40 px-2">Giá</p>
                    <p className="flex-none w-20 px-2">Top</p>
                </li>
                {
                    products.data.map(
                        (item, index) => (
                            <li
                                key={item.id}
                                className="flex py-2 px-5"
                            >
                                <div className="grow flex space-x-5">
                                    <img
                                        className="block h-10 w-10 rounded"
                                        alt={item.name}
                                        src={getImageURL(item.attributes?.image?.at(-1))}
                                    />
                                    <div>
                                        <Link className="hover:text-primary" to={`/product?slug=${item.id}`}>{item.name}</Link>
                                        <p className="text-xs">{item.rating}</p>
                                    </div>
                                </div>
                                <p className="flex-none w-40 px-2">{item.quantity}</p>
                                <p className="flex-none w-40 px-2">{Number(item.price).toLocaleString('vi-VN')}₫</p>
                                <p className="flex-none w-20 px-2 font-semibold text-indigo-500">{(index + 1).toString().padStart(2, "0")}</p>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
};

export default TopProducts;