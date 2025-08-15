import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    RowData,
    SortingState,
    Table,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {isEmpty} from "lodash";
import {useEffect, useRef, useState} from "react";

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, value: TData) => void | TData
        deleteData: (rowIndex: number) => void | TData
        addData: (value: TData, mode?: "shift" | "push") => void | TData
    }
}

export type RowModel<T> = {
    table: Table<T>,
    row: T,
    index: number
}

function useSimpleTable<T>(originalData: T[], columns: ColumnDef<T, any>[], options?: any): Table<T> {
    const firstMount = useRef<boolean>(true)
    const [data, setData] = useState<T[]>(originalData)
    const [rowSelection, setRowSelection] = useState(options?.selected ?? {})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [globalFilter, setGlobalFilter] = useState("")
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
    const config = isEmpty(options) ? {} : options

    useEffect(() => {
        if (firstMount.current) {
            firstMount.current = false
            return
        }
        setData(originalData)
    }, [originalData]);

    return useReactTable<T>(
        {
            ...config,
            data,
            columnResizeMode: "onChange",
            columns,
            getCoreRowModel: getCoreRowModel<T>(),
            onColumnVisibilityChange: setColumnVisibility,
            onSortingChange: setSorting,
            getSortedRowModel: getSortedRowModel<T>(),
            onGlobalFilterChange: setGlobalFilter,
            getFilteredRowModel: getFilteredRowModel<T>(),
            onPaginationChange: setPagination,
            onRowSelectionChange: setRowSelection,
            getPaginationRowModel: getPaginationRowModel<T>(),
            autoResetAll: true,
            state: {
                columnVisibility,
                globalFilter,
                sorting,
                pagination,
                rowSelection
            },
            meta: {
                updateData: (rowIndex: number, value: T) => {
                    setData(
                        data => data.map(
                            (row, index) => index === rowIndex ? value : row
                        )
                    )
                },
                addData: (value: T, mode: "shift" | "push" = "push") => {
                    setData(
                        data => mode === "shift" ? [value, ...data] : [...data, value]
                    )
                },
                deleteData: (rowIndex: number) => {
                    setData(
                        data => data.filter(
                            (_, index) => index !== rowIndex
                        )
                    )
                }
            }
        }
    )
}

export default useSimpleTable