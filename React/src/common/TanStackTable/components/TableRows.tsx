import {Table} from "@tanstack/react-table";
import TableCell from "common/TanStackTable/components/TableCell.tsx";
import {nanoid} from "nanoid/non-secure";

function TableRows<T = unknown>(props: { table: Table<T> }) {
    const { table } = props;

    return table.getRowModel().rows.map((row) => (
        <tr
            key={row.id}
            className="border-b text-secondary last:border-b-0 hover:bg-primary hover:text-white transition-all duration-300"
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={nanoid(20)} cell={cell} />
            ))}
        </tr>
    ));
}

export default TableRows;
