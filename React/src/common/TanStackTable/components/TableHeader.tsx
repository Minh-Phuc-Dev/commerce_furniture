import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon,} from "@radix-ui/react-icons";
import {flexRender, Header} from "@tanstack/react-table";


type TableHeaderProps<T> = {
    header: Header<T, unknown>;
};

function TableHeader<T = any>(props: TableHeaderProps<T>) {
    const { header } = props;
    const { isPlaceholder, id, getSize, column, getContext, getResizeHandler } =
        header;

    const sort = column.getIsSorted();
    return (
        <th
            key={id}
            data-label={id}
            className="text-left bg-zinc-200 select-none text-gray-500 overflow-hidden truncate p-2 border relative hover:bg-main-primary transition-colors duration-300 group"
            style={{ width: getSize() }}
        >
            {
                column.getCanSort() ? (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger className="outline-none flex space-x-1 items-center">
                            {isPlaceholder ? null : (
                                <span>
                                    {flexRender(
                                        column.columnDef.header,
                                        getContext()
                                    )}
                                </span>
                            )}

                            {sort === false ? (
                                <CaretSortIcon />
                            ) : sort === "asc" ? (
                                <ArrowUpIcon className="h-3.5 w-3.5" />
                            ) : (
                                <ArrowDownIcon className="h-3.5 w-3.5" />
                            )}
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                            side="bottom"
                            sideOffset={5}
                            align="start"
                            className="bg-white border shadow rounded max-w-fit"
                        >
                            <DropdownMenu.Item
                                onClick={() => column.toggleSorting(false)}
                                className="outline-none hover:bg-zinc-200 cursor-pointer p-2 flex items-center space-x-1"
                            >
                                <ArrowUpIcon className="h-3.5 w-3.5" />
                                <span className="font-normal">Asc</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                onClick={() => column.toggleSorting(true)}
                                className="outline-none hover:bg-zinc-200 cursor-pointer p-2 flex items-center space-x-1"
                            >
                                <ArrowDownIcon className="h-3.5 w-3.5" />
                                <span className="font-normal">Desc</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item
                                onClick={() => column.toggleVisibility(false)}
                                className="outline-none hover:bg-zinc-200 cursor-pointer p-2 flex items-center space-x-1"
                            >
                                <EyeNoneIcon className="h-3.5 w-3.5" />
                                <span className="font-normal">Hide</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                ) : isPlaceholder ? null : flexRender(column.columnDef.header, getContext())
            }
            <span
                aria-checked={column.getIsResizing()}
                className="absolute top-0 right-0 w-1 cursor-col-resize aria-checked:bg-slate-500 group-hover:bg-slate-500 h-full"
                onMouseDown={getResizeHandler()}
                onTouchStart={getResizeHandler()}
            ></span>
        </th>
    );
}

export default TableHeader;
