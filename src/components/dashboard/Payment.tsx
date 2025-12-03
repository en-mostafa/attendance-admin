'use client'
import { Doughnut } from "react-chartjs-2";
import IconNoData from "../ui/IconNoData";
import { useContext } from "react";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";

export default function Payment({ data } : { data:any }) {
    const role = useContext(SessionContext);
    const t =  useTranslations('Public');

    return (
        <div className="card card-flush h-md-50 mb-5 mb-xl-10">
            {role?.transaction.get_transaction ? (
                <>
                <div className="card-header pt-5">
                    <div className="card-title d-flex flex-column">
                        <div className="d-flex align-items-center">
                            <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{ data?.total }</span>
                        </div>
                        <span className="text-gray-400 pt-1 fw-semibold fs-6">{t('number_cryptocurrency_card_payment')}</span>
                    </div>
                </div>
                <div className="card-body pt-2 pb-4 d-flex align-items-center">
                    <div className="d-flex flex-center me-5 pt-2">
                        <div className="position-relative" style={{ top: '-30px' }}>
                            <Doughnut
                                data={{
                                    datasets: [
                                        {
                                            label: t('number'),
                                            data:[
                                                {
                                                    "value": data?.total_card //card
                                                },
                                                {
                                                    "value": 100 //default
                                                },
                                                {
                                                    "value": data?.total_cash //gate
                                                },
                                            ],
                                            backgroundColor: [
                                                "#1B84FF",
                                                "rgba(228, 230, 238, 1)",
                                                "rgba(250, 192, 19, 0.8)",
                                            ],
                                            borderColor: [
                                                "#1B84FF",
                                                "rgba(228, 230, 238, 1)",
                                                "rgba(250, 192, 19, 0.8)",
                                            ],

                                        },
                                    ],
                                }}
                                width={150}
                                height={160}
                                options={{
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-column content-justify-center w-100">
                        <div className="d-flex fs-6 fw-semibold align-items-center mb-3">
                            <div className="bullet w-8px h-6px rounded-2 bg-primary me-3"></div>
                            <div className="text-gray-500 flex-grow-1 me-4">{t('currency')}</div>
                        </div>
                        <div className="d-flex fs-6 fw-semibold align-items-center mb-3">
                            <div className="bullet w-8px h-6px rounded-2 bg-warning me-3"></div>
                            <div className="text-gray-500 flex-grow-1 me-4">{t('card_to_card')}</div>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <IconNoData />
            )}
        </div>
    )
}