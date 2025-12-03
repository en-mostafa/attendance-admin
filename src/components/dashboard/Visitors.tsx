import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Spinner from "../ui/spinner";
import { useTranslations } from "next-intl";

export default function Visitors({ visitor } : { visitor:any }) {
    const [data, setData] = useState(visitor?.data?.in_12_month);
    const t =  useTranslations('Public');

    useEffect(() => {
        setData(visitor?.data?.in_12_month)
    }, [visitor])

    return (
        <div className="card card-xl-stretch mb-xl-8 h-100">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">{t('visitor_statistics')}</span>
                </h3>
                <div className="card-toolbar" data-kt-buttons="true">
                    <a className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${ data?.[0]?.label === 'January' ? 'active' : '' }`} id="kt_charts_widget_3_year_btn" onClick={() => setData(visitor?.data?.in_12_month)}>{t('year')}</a>
                    <a className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${ data?.length === 30 ? 'active' : '' }`} id="kt_charts_widget_3_month_btn" onClick={() => setData(visitor?.data?.in_30_day)}>{t('month')}</a>
                    <a className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${ data?.[0]?.label === 'Saturday' ? 'active' : '' }`} id="kt_charts_widget_3_week_btn" onClick={() => setData(visitor?.data?.in_7_day)}>{t('week')}</a>
                    <a className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${ data?.length === 24 ? 'active' : '' }`} id="kt_charts_widget_3_week_btn" onClick={() => setData(visitor?.data?.in_24_hour)}>{t('twenty_four_hours')}</a>
                </div>
            </div>
            <div className="card-body" style={{ height: '300px', width: '100%' }}>
                {data ? (
                    <Line
                        data={{
                            labels: data.map((data: any) => data.label),
                            datasets: [{
                                data: data.map((data:any) => data.view),
                                fill: true,
                                borderColor: '#1b84ff',
                                backgroundColor: '#1b84ff3d',
                                tension: 0.3,
                            }]
                        }}
                        height={300}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    grid: {
                                        color: 'white'
                                    },
                                    border: {
                                        display: false
                                    }
                                },
                                y: {
                                    border: {
                                        dash: [2, 4],
                                        display: false
                                    },
                                    min: 0,
                                    ticks: {
                                        stepSize: 20
                                    }
                                },
                            },
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    )
}