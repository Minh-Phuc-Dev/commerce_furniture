import {CustomYAxisTick} from "common/Rechart/CustomYAxisTick";
import {RoundedTopBarFill} from "common/Rechart/RoundedTopBarFill";
import useCallAPIState, {CALL_API_STATUS} from "hooks/UseCallAPIState";
import {useCallback, useEffect} from "react";
import {Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import StatisticsService from "services/StatisticsService";


const data = [
    {
        label: 'Jan',
        new: 565,
        solved: 454,
        overdue: 320,
    },
    {
        label: 'Feb',
        new: 189,
        solved: 551,
        overdue: 68,
    },
    {
        label: 'Mar',
        new: 430,
        solved: 300,
        overdue: 150,
    },
    {
        label: 'Apr',
        new: 571,
        solved: 583,
        overdue: 230,
    },
    {
        label: 'May',
        new: 452,
        solved: 700,
        overdue: 200,
    },
    {
        label: 'Jun',
        new: 438,
        solved: 268,
        overdue: 160,
    },
    {
        label: 'Jul',
        new: 675,
        solved: 170,
        overdue: 100,
    },
    {
        label: 'Aug',
        new: 735,
        solved: 541,
        overdue: 200,
    },
    {
        label: 'Sep',
        new: 479,
        solved: 741,
        overdue: 250,
    },
    {
        label: 'Oct',
        new: 548,
        solved: 421,
        overdue: 110,
    },
    {
        label: 'Nov',
        new: 261,
        solved: 621,
        overdue: 100,
    },
    {
        label: 'Dec',
        new: 757,
        solved: 661,
        overdue: 80,
    },
];
const COLORS = ['#7928ca', '#10b981', '#eab308'];

type OrderStatisticByDate = Record<
    string,
    {
        total: number,
        pending: number,
        processing: number,
        cancelled: number,
        completed: number
    }
>
const OrderBar = () => {

    const [statistics, setStatistics] = useCallAPIState<OrderStatisticByDate[]>(
        {
            status: CALL_API_STATUS.IDLE,
            data: []
        }
    )

    const fetchData = useCallback(
        async () => {
            setStatistics(CALL_API_STATUS.LOADING)
            const {success, payload} = await StatisticsService.getOrderByDate<OrderStatisticByDate[]>()
            if (success) {
                setStatistics(CALL_API_STATUS.SUCCESS, payload!)
            }
        }, [setStatistics]
    )

    useEffect(
        () => {
            fetchData()
        }, [fetchData]
    )

    return (
        <div className="p-5 space-y-5 border rounded shadow">

            <h2 className="text-lg font-semibold">Thống kê đơn hàng</h2>

            <div className="h-80 w-full">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <ComposedChart
                        data={statistics.data}
                        className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeOpacity={0.435}
                            strokeDasharray="8 10"
                        />
                        <XAxis dataKey="label" axisLine={false} tickLine={false}/>
                        <YAxis
                            width={50}
                            axisLine={false}
                            tickLine={false}
                            tick={<CustomYAxisTick/>}
                        />
                        <Tooltip
                            cursor={false}
                        />
                        <Line
                            type="natural"
                            dataKey="total"
                            name="Tổng đơn hàng"
                            stroke="#2e5981"
                            dot={false}
                            strokeWidth={2}
                        />

                        <Bar
                            dataKey="processing"
                            fill="#7928ca"
                            name="Đang xử lý"
                            barSize={28}
                            shape={<RoundedTopBarFill/>}
                        />

                        <Bar
                            type="natural"
                            dataKey="pending"
                            name="Chờ duyệt"
                            fill="#077a88"
                            barSize={28}
                            shape={<RoundedTopBarFill/>}
                        />
                        <Bar
                            type="natural"
                            dataKey="cancelled"
                            name="Đã hủy"
                            fill="#ee0000"
                            barSize={28}
                            shape={<RoundedTopBarFill/>}
                        />

                    </ComposedChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default OrderBar;