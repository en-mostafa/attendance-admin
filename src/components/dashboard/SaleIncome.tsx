import { Bar } from "react-chartjs-2";
import IMask from "imask";
import { useContext } from "react";
import { SessionContext } from "@/store";
import IconNoData from "../ui/IconNoData";
import { useTranslations } from "next-intl";

const numberPipe = IMask.createPipe({
    mask: Number,
    scale: 0,
    thousandsSeparator: ',',
    normalizeZeros: true,
    padFractionalZeros: true,
});

export default function SaleIncome ({ sales } : { sales:any }) {
    const role = useContext(SessionContext);
    const t =  useTranslations('Public');

    return (
        <div className="card card-flush h-md-50 mb-5 mb-xl-10">
            {role?.transaction.get_transaction ? (
                <>
                <div className="card-header pt-5">
                    <div className="card-title d-flex flex-column">
                        <div className="d-flex align-items-center">
                            <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{ numberPipe(`${ sales?.data?.total?.total[0]?.total }`) }</span>
                            <span className="badge badge-light-success fs-base">
                                {t('euro')}
                            </span>
                        </div>
                        <span className="text-gray-400 pt-1 fw-semibold fs-6">{t('monthly_Sale_income')}</span>
                    </div>
                </div>
                <div className="d-flex align-items-end px-4 pb-0">
                    <Bar
                        data={{
                            labels: sales?.data?.per_month?.map((data: any) => data.month),
                            datasets: [
                                {
                                    data: sales?.data?.per_month?.map((data:any) => data.pay),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.4)',
                                        'rgba(255, 159, 64, 0.4)',
                                        'rgba(255, 205, 86, 0.4)',
                                        'rgba(75, 192, 192, 0.4)',
                                        'rgba(54, 162, 235, 0.4)',
                                        'rgba(153, 102, 255, 0.4)',
                                        'rgba(201, 203, 207, 0.4)'
                                    ],
                                    borderColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(255, 159, 64)',
                                        'rgb(255, 205, 86)',
                                        'rgb(75, 192, 192)',
                                        'rgb(54, 162, 235)',
                                        'rgb(153, 102, 255)',
                                        'rgb(201, 203, 207)'
                                    ],
                                    borderRadius: 2,
                                },
                            ],
                        }}
                        height={200}
                        options={{
                            scales: {
                                x: {
                                    grid: {
                                        color: 'white'
                                    }
                                },
                                y: {
                                    grid: {
                                        color: 'white'
                                    }
                                },
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </div>
                </>
            ) : (
                <IconNoData />
            )}
        </div>
    )
}