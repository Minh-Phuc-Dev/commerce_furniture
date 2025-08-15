import Item from "components/Item";
import useCallAPIState, {CALL_API_STATUS} from "hooks/UseCallAPIState";
import {useCallback, useEffect} from "react";
import ProductService from "services/ProductService";
import {Product} from "types/Product";

const TopNew = () => {

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
            setItems(CALL_API_STATUS.SUCCESS, payload)
            return
        }
        setItems(CALL_API_STATUS.ERROR, [])
    }, [setItems])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <div
            className="max-w-1200 mx-auto py-16"
        >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">Hàng mới về</h2>
            <div
                className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6"
            >
                {
                    items.data.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    ).slice(0, 4).map((item) => <Item key={item.id} item={item}/>)
                }

            </div>
        </div>
    );
};

export default TopNew;