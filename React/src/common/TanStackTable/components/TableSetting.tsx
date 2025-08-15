import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import {CheckIcon, Cross2Icon, GearIcon} from '@radix-ui/react-icons';
import * as RadioGroup from '@radix-ui/react-radio-group';
import {Table} from '@tanstack/react-table';
import Button from "common/Button";
import {capitalize, isString, isUndefined} from 'lodash';
import {useCallback, useRef, useState} from 'react';

type Props<T> = {
    table: Table<T>
}

type ColumnVisible = {
    name: string
    header: string
    checked: boolean
}

function Preference<T>(props: Props<T>) {
    const { table } = props

    const [columns, setColumns] = useState<ColumnVisible[]>(
        table.getAllColumns().map<ColumnVisible>(
            column => ({ name: column.id, header: column.columnDef.header as string || column.id, checked: column.getIsVisible() })
        )
    )

    const [pageSize, setPageSize] = useState<number>(table.getState().pagination.pageSize)
    const initialSetting = useRef({ columns, pageSize })

    const toggleHandler = useCallback((name: string) => {
        return (checked: boolean) => {
            setColumns(
                (items) => {
                    const columns: ColumnVisible[] = [...items]
                    const column = columns.find(
                        (column) => column.name === name
                    )

                    if (isUndefined(column)) {
                        return columns
                    }
                    columns.splice(
                        columns.indexOf(column),
                        1,
                        {
                            ...column,
                            checked
                        }
                    )
                    return columns
                }
            )
        }
    }, [])

    const applySetting = () => {
        if (JSON.stringify(columns) !== JSON.stringify(initialSetting.current.columns)) {
            table.setColumnVisibility(
                columns.reduce((values, item) => {
                    values[item.name] = item.checked;
                    return values;
                }, {})
            )
        }

        if (pageSize !== initialSetting.current.pageSize) {
            table.setPageSize(pageSize)
        }
    }

    const handlePageSize = useCallback((value: string) => {
        setPageSize(parseInt(value))
    }, [])


    return (
        <div className="rounded fixed max-w-screen-sm left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow border">
            <div className='border-b flex items-center justify-between px-5 py-3'>
                <p className='font-medium text-lg'>Tùy chọn</p>
                <Dialog.Close asChild>
                    <button className="outline-none h-5 w-5" aria-label="Close">
                        <Cross2Icon className='h-full w-full' />
                    </button>
                </Dialog.Close>
            </div>

            <div className='flex px-5 pb-5 pt-4'>
                <div className='w-96 space-y-2'>
                    <p className='font-medium text-gray-500'>Kích thước trang</p>
                    <RadioGroup.Root
                        onValueChange={handlePageSize}
                        asChild
                    >
                        <ul>
                            {
                                [5, 10, 20, 50, 100].map(
                                    (value) => (
                                        <li key={value}>
                                            <label className="space-x-2 cursor-pointer">
                                                <RadioGroup.Item
                                                    className="bg-white inline-flex items-center justify-center h-4 w-4 border-2 focus:border-indigo-500 rounded-full"
                                                    value={value.toString()}
                                                    checked={value === pageSize}
                                                >
                                                    <RadioGroup.Indicator className="bg-indigo-500 border-indigo-400 rounded-full inline-block w-2 h-2 flex-none" />
                                                </RadioGroup.Item>
                                                <span>{value} hàng</span>
                                            </label>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </RadioGroup.Root>
                </div>
                <div className='border-l pl-5 w-96 space-y-2'>
                    <p className='font-medium text-gray-500'>Cột</p>
                    <ul className='space-y-0.5'>
                        {
                            columns.map(
                                column => (
                                    <li key={column.name}>
                                        <label className='inline-flex space-x-2 items-center cursor-pointer'>
                                            <Checkbox.Root
                                                className="border rounded focus:shadow h-4 w-4 aria-checked:bg-blue-500"
                                                defaultChecked={column.checked}
                                                onCheckedChange={toggleHandler(column.name)}
                                            >
                                                <Checkbox.Indicator>
                                                    <CheckIcon className="text-white" />
                                                </Checkbox.Indicator>
                                            </Checkbox.Root>
                                            <div>{isString(column.header) ? column.header : capitalize(column.name)}</div>
                                        </label>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className='border-t flex justify-end items-center space-x-4 px-5 py-3'>
                <Dialog.Close asChild>
                    <Button
                        variantType="intent"
                        intent="default"
                    >
                        <span className='font-medium'>Cancel</span>
                    </Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                    <Button
                        variantType="intent"
                        intent="success"
                        onClick={applySetting}
                    >
                        <span className='font-medium'>Confirm</span>
                    </Button>
                </Dialog.Close>
            </div>
        </div>
    )
}

function TableSetting<T>(props: Props<T>) {
    const { table } = props

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variantType="intent" intent="default">
                    <GearIcon className='h-full w-full' />
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal >
                <Dialog.Overlay className="fixed flex items-center justify-center inset-0 bg-black/50" />
                <Dialog.Content>
                    <Preference table={table} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default TableSetting