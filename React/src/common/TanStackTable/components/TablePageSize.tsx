import * as Popover from '@radix-ui/react-popover';
import {Table} from '@tanstack/react-table';

function TablePageSize<T>(props: { table: Table<T> }) {
    const {table} = props
    const items = [5, 10, 20, 50, 100]

    return (
        <Popover.Root>
            <div className="inline-flex items-center space-x-1">
                <span>Số hàng mỗi trang</span>
                <Popover.Trigger asChild>
                    <button
                        className='inline-flex space-x-1 items-center border h-7 min-w-7 px-1.5 rounded bg-gemini-slate-150 text-slate-700'>
                        <span>{table.getState().pagination.pageSize}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className="w-4 h-4">
                            <path fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"/>
                        </svg>
                    </button>
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content
                        align="end"
                        sideOffset={5}
                    >
                        <ul className="py-2 rounded border bg-white">
                            {
                                items.map(
                                    (number) => (
                                        <li
                                            key={number}
                                            onClick={() => table.setPageSize(number)}
                                            className="px-1.5 min-w-12 hover:bg-gemini-slate-150 cursor-pointer"
                                        >
                                            {number}
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </Popover.Content>
                </Popover.Portal>

            </div>
        </Popover.Root>
    )
}

export default TablePageSize