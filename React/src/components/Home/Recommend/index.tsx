import Item from "components/Item";
import useCallAPIState, {CALL_API_STATUS} from "hooks/UseCallAPIState";
import {isEmpty, isUndefined} from "lodash";
import {FC, useCallback, useEffect} from "react";
import ProductService from "services/ProductService";
import {Product} from "types/Product";

const Recommend:FC<{categoryId?: number, productId?: number}> = ({categoryId, productId}) => {
    const [items, setItems] = useCallAPIState<Product[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )

    const fetchData = useCallback(async () => {
        setItems(CALL_API_STATUS.LOADING, [])
        const {payload, success} = await ProductService.get()
        if (success) {
            setItems(
                CALL_API_STATUS.SUCCESS,
                isUndefined(categoryId) && isUndefined(productId) ? payload : payload?.filter(
                    (item) => {
                       return item.categoryId === categoryId && item.id !== productId
                    }
                )
            )
            return
        }
        setItems(CALL_API_STATUS.ERROR, [])
    }, [setItems, categoryId, productId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return isEmpty(items.data) ? null : (
        <div
            className="max-w-1200 mx-auto py-16"
        >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">Đề xuất cho bạn</h2>
            <div
                className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6"
            >
                {
                    items.data.slice(0, 12).map((item) => <Item key={item.id} item={item}/>)
                }
            </div>
        </div>
    );
};

export default Recommend;