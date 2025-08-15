import CircleProgressBar from "common/Chart/CircleProgressBar";
import Loading from "common/Loading";
import useCallAPIState, {CALL_API_STATUS} from "hooks/UseCallAPIState";
import {nanoid} from "nanoid/non-secure";
import {useCallback, useEffect, useMemo} from "react";
import StatisticsService from "services/StatisticsService";
import {calculatePercentage} from "utils/Number";

const OrderStatistics = () => {

    const [statistics, setStatistics] = useCallAPIState(
        {
            status: CALL_API_STATUS.IDLE,
            data: {
                total: 0,
                completed: 0,
                processing: 0,
                pending: 0,
                cancelled: 0,
            }
        }
    )

    const fetchData = useCallback(
        async () => {
            setStatistics(CALL_API_STATUS.LOADING)
            const {success, payload} = await StatisticsService.getOrder()
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
    const data = useMemo(
        () => (
            [
                {
                    id: 1,
                    title: 'đã hoàn thành',
                    metric: statistics.data.completed,
                    fill: '#59b259',
                    percentage: calculatePercentage(statistics.data.completed, statistics.data.total),
                    increased: true,
                    decreased: false,
                    value: '+32.40',
                },
                {
                    id: 2,
                    title: 'đang chờ xử lý',
                    metric: statistics.data.pending,
                    fill: '#077a88',
                    percentage: calculatePercentage(statistics.data.pending, statistics.data.total),
                    increased: true,
                    decreased: false,
                    value: '+32.40',
                },
                {
                    id: 3,
                    title: 'đang xử lý',
                    metric: statistics.data.processing,
                    fill: '#3872FA',
                    percentage: calculatePercentage(statistics.data.processing, statistics.data.total),
                    increased: false,
                    decreased: true,
                    value: '-18.45',
                },
                {
                    id: 4,
                    title: 'đã hủy',
                    metric: statistics.data.cancelled,
                    fill: '#EE0000',
                    percentage: calculatePercentage(statistics.data.cancelled, statistics.data.total),
                    increased: true,
                    decreased: false,
                    value: '+20.34',
                },
            ]
        ), [statistics.data]
    )

    return (
        <div className="p-5 border rounded shadow space-y-5">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Trạng thái đơn hàng</h2>
                {
                    statistics.loading ? (
                        <Loading size={16}/>
                    ) : (
                        <button
                            className="text-gray-500 opacity-50 hover:opacity-100 hover:text-primary"
                            onClick={fetchData}
                        >
                            <svg className="size-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )
                }

            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                {
                    data.map(
                        item => (
                            <div
                                key={nanoid()}
                                className="space-y-2"
                            >

                                <div className="mx-auto size-24">
                                    <CircleProgressBar
                                        percentage={item.percentage}
                                        size={80}
                                        stroke="#D7E3FE"
                                        strokeWidth={10}
                                        progressColor={item.fill}
                                        useParentResponsive={true}
                                        label={
                                            <span
                                                style={{color: item.fill ?? '#D7E3FE'}}
                                                className="font-lexend text-base font-medium"
                                            >
                                                        {item.percentage}%
                                                    </span>
                                        }
                                        strokeClassName="dark:stroke-gray-300"
                                    />
                                </div>
                                <p
                                    className="text-xs space-x-1 text-center text-gray-400"
                                    style={
                                        {
                                            color: item.fill
                                        }
                                    }
                                >
                                    <span className="text-md font-medium">{item.metric}</span>
                                    <span>{item.title}</span>
                                </p>
                            </div>
                        )
                    )
                }
            </div>
            <p className="text-xs font-semibold text-center text-primary">{statistics.data.total} đơn hàng</p>


        </div>
    );
};

export default OrderStatistics;