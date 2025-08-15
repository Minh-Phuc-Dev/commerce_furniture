import {MagnifyingGlassIcon} from "@radix-ui/react-icons"
import {Table} from "@tanstack/react-table"
import {isEmpty} from "lodash";
import {ChangeEvent, useCallback, useEffect, useState} from "react";

function TableSearch<T>(props: { table: Table<T> }) {
    const {table} = props
    const [value, setValue] = useState(table.getState().globalFilter)
    const {setGlobalFilter} = table


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setGlobalFilter(value)
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [value, setGlobalFilter]);

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }, [])

    return (
        <div
            className="flex bg-transparent space-x-1 w-96 px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus-within:outline-none focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus-within:invalid:border-pink-500 focus-within:invalid:ring-pink-500"
        >
            <MagnifyingGlassIcon className="flex-none text-gray-500 h-5 w-5"/>
            <input
                value={value}
                onChange={onChange}
                placeholder="Search"
                className="flex-1 bg-transparent outline-none"
                data-table-global-filter={table.getState().globalFilter ?? ""}
            />
            {
                isEmpty(value) ? null : (
                    <button
                        type="button"
                        onClick={() => setValue("")}
                        className="text-gray-500 hover:text-red-500 outline-none"
                    >
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        >
                            <path
                                d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
                        </svg>
                    </button>
                )
            }
        </div>
    );
}

export default TableSearch;
