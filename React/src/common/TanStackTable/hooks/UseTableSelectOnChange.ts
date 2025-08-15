import {Table} from "@tanstack/react-table";
import {isFunction} from "lodash";
import {useEffect} from "react";

function useTableSelectOnChange<T>(table: Table<T>, onRowSelectionChange?: (items: T[]) => void | T[]) {
    const { rows } = table.getSelectedRowModel()

    useEffect(() => {
        const items = rows.map(({ original }) => original)
        if (isFunction(onRowSelectionChange)) {
            onRowSelectionChange(items)
        }

    }, [rows, onRowSelectionChange])

}

export default useTableSelectOnChange