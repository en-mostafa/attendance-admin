'use client'

import { Chart as ChartJS, defaults, Ticks } from "chart.js/auto";
import NewTickets from "@/components/dashboard/NewTickets";
import Payment from "@/components/dashboard/Payment";
import TotalProducts from "@/components/dashboard/TotalProducts";
import SaleIncome from "@/components/dashboard/SaleIncome";
import TotalCustomer from "@/components/dashboard/TotalCustomer";
import Visitors from "@/components/dashboard/Visitors";
import React, { useContext } from "react";
import useSwr from "@/hooks/useSwr";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
defaults.plugins.title.display = true;

export default function Home() {
    const role = useContext(SessionContext);
    const { data } = useSwr('/dashboard');
    const t = useTranslations('Public');

    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex align-items-stretch">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">{t('dashboard')}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div className="row g-5 g-xl-10 mb-xl-10">
                        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
                            {/*<Payment data={data?.summary?.data?.factors} />
                            <TotalProducts data={data?.summary} />*/}
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
                            {/*<SaleIncome sales={data?.factors} />
                            <TotalCustomer users={data?.summary?.data?.total_users} />*/}
                        </div>
                        <div className="col-lg-12 col-xl-12 col-xxl-6 mb-5 mb-xl-0">
                            {/*<Visitors visitor={data?.views} />*/}
                        </div>
                    </div>
                    <div className="row g-5 g-lg-10">
                        {/*<NewUsers data={data}/>*/}
                        {/*<NewPurchases />*/}
                        {role?.ticket.get_ticket && (
                            <NewTickets data={data?.summary?.data?.tickets} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
