
import Button from 'common/Button';
import Item from 'components/Item';
import { SortBy } from 'components/Products/elements/ProductFilter';
import useCallAPIState, { CALL_API_STATUS } from 'hooks/UseCallAPIState';
import { isEmpty } from 'lodash';
import { FC, HTMLAttributes, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductService from 'services/ProductService';
import { Product } from 'types/Product';

const Products: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();


    const [products, setProducts] = useCallAPIState<Product[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )

    const fetchData = useCallback(
        async () => {
            setProducts(CALL_API_STATUS.LOADING)

            const { payload, success } = await ProductService.get(searchParams.toString())
            if (success) {
                setProducts(CALL_API_STATUS.SUCCESS, payload)
            }

        }, [setProducts, searchParams]
    )

    useEffect(
        () => {
            fetchData()
        },
        [fetchData]
    )

    return (
        <div
            {...props}
        >
            <SortBy className='ml-auto mb-5 w-fit' />

            {
                isEmpty(products.data) ? (
                    <div className="p-5 flex flex-col justify-center space-y-5">
                        <h1 className='text-center opacity-80'>Không tìm thấy sản phẩm phù hợp!</h1>
                        <Button onClick={() => setSearchParams({})} className="block w-fit mx-auto" intent="primary" variantType="intent">Xóa bộ lọc</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                        {
                            products.data.map(
                                product => (
                                    <div key={product.id}>
                                        <Item item={product} />
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }

        </div>
    )
}

export default Products