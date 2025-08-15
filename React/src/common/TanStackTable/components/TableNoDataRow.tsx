import {Table} from "@tanstack/react-table";

function TableNoDataRow<T>(props: { table: Table<T>, message?: string }) {
    const {table, message} = props
    return (
        <tr>
            <td colSpan={table.getVisibleLeafColumns().length}>
                <p className="text-sm text-center py-2 font-medium text-zinc-400">{message ?? "No data!"}</p>
            </td>
        </tr>
    )
}

export default TableNoDataRow