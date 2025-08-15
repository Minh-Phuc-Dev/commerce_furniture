import {Table} from '@tanstack/react-table';
import {isEmpty} from "lodash";
import Pagination from 'rc-pagination';

function TablePagination<T>(props: { table: Table<T> }) {
    const { table: { getPageCount, getState, setPageIndex , getRowModel} } = props
    const pageCount = getPageCount()
    const { pageIndex, pageSize } = getState().pagination
    const total = pageCount * pageSize

    return isEmpty(getRowModel().rows) ? null : (
        <Pagination
            current={pageIndex + 1}
            pageSize={pageSize}
            onChange={(page) => setPageIndex(Math.max(0, page - 1))}
            total={total}
            className="flex space-x-1"
            prevIcon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                </svg>
            }
            nextIcon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                </svg>
            }
            jumpNextIcon={
                <span>...</span>
            }
            jumpPrevIcon={
                <span>...</span>
            }
            showTitle={false}
        />
    )
}

export default TablePagination