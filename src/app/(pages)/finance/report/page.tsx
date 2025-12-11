import { getData } from "@/services/fetchData"
import { pipeNumber } from "@/services/pipe";
import { getTranslations } from "next-intl/server";

export default async function FinanceReport() {
    const t = await getTranslations('Public.Finance');
    const data = await getData('/payment/summary');
 
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
                    <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex align-items-stretch">
                        <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                            <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                                <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">{t("report_finance")}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div id="kt_app_content" className="app-content flex-column-fluid">
                        <div className="row g-5 g-xl-8">
                            <div className="col-xl-4">
                                <div className="card card-xl-stretch mb-xl-8">
                                    <div className="card-body p-0">
                                        <div className="px-9 pt-7 card-rounded h-275px w-100 bg-success">
                                            <div className="d-flex flex-stack">
                                                <h3 className="m-0 text-white fw-bold fs-3">{t("report_income")}</h3>
                                                <div className="ms-1">
                                                    <i className="ki-outline ki-euro fs-3x text-white"></i>
                                                </div>
                                            </div>
                                            <div className="d-flex text-center flex-column text-white pt-8">
                                                <span className="fw-semibold fs-7">{t("icome_total")} ({t('euro')})</span>
                                                <span className="fw-bold fs-2x pt-1">{pipeNumber(data?.totalincome)}</span>
                                            </div>
                                        </div>
                                        <div className="bg-body shadow-sm card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1" style={{ marginTop: "-100px" }}>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-graph-up fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <div className="fs-5 text-gray-800 fw-bold">{t("week_income")}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.weekincome)} &#x20AC;</div>
                                                        <i className="ki-outline ki-arrow-down fs-5 text-success ms-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-graph-up fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <div className="fs-5 text-gray-800 fw-bold">{t("month_income")}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.monthincome)} &#x20AC;</div>
                                                        <i className="ki-outline ki-arrow-down fs-5 text-success ms-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-graph-up fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <a href="#" className="fs-5 text-gray-800 text-hover-primary fw-bold">{t("year_income")}</a>
                                                        <div className="text-gray-500 fw-semibold fs-7"></div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.yearincome)} &#x20AC;</div>
                                                        <i className="ki-outline ki-arrow-down fs-5 text-success ms-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="card card-xl-stretch mb-xl-8">
                                    <div className="card-body p-0">
                                        <div className="px-9 pt-7 card-rounded h-275px w-100 bg-danger">
                                            <div className="d-flex flex-stack">
                                                <h3 className="m-0 text-white fw-bold fs-3">{t("expenses_report")}</h3>
                                                <div className="ms-1">
                                                    <i className="ki-outline ki-euro fs-3x text-white"></i>
                                                </div>
                                            </div>
                                            <div className="d-flex text-center flex-column text-white pt-8">
                                                <span className="fw-semibold fs-7">{t("total_amount")} ({t("euro")})</span>
                                                <span className="fw-bold fs-2x pt-1">{pipeNumber(data?.totalspending)}</span>
                                            </div>
                                        </div>
                                        <div className="bg-body shadow-sm card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1" style={{ marginTop: "-100px" }}>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-chart-line-down-2 fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <div className="fs-5 text-gray-800 fw-bold">{t("salary")}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.totalsalary)} &#x20AC;</div>
                                                        <i className="ki-outline ki-arrow-up fs-5 text-danger ms-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-chart-line-down-2 fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <a href="#" className="fs-5 text-gray-800 text-hover-primary fw-bold">{t("reward")}</a>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.totalreward)} &#x20AC;</div>
                                                        <i className="ki-outline ki-arrow-up fs-5 text-danger ms-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-chart-line-down-2 fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <a href="#" className="fs-5 text-gray-800 text-hover-primary fw-bold">{t("other")}</a>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.totalother)} &#x20AC;</div>
                                                        <i className="ki-outline ki-arrow-up fs-5 text-danger ms-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="card card-xl-stretch mb-xl-8">
                                    <div className="card-body p-0">
                                        <div className="px-9 pt-7 card-rounded h-275px w-100 bg-primary">
                                            <div className="d-flex flex-stack">
                                                <h3 className="m-0 text-white fw-bold fs-3">{t("treasury")}</h3>
                                                <div className="ms-1">
                                                    <i className="ki-outline ki-euro fs-3x text-white"></i>
                                                </div>
                                            </div>
                                            <div className="d-flex text-center flex-column text-white pt-8">
                                                <span className="fw-semibold fs-7">{t("total_amount")} ({t("euro")})</span>
                                                <span className="fw-bold fs-2x pt-1">{pipeNumber(data?.treasurytotal)}</span>
                                            </div>
                                        </div>
                                        <div className="bg-body shadow-sm card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1" style={{ marginTop: "-100px" }}>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-chart-line-up-2 fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <div className="fs-5 text-gray-800 text-hover-primary fw-bold">{t("total_deposit")}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.treasurydeposit)} &#x20AC;</div>
                                                        <i className="ki-outline ki-arrow-down fs-5 text-success ms-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-chart-line-down-2 fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <div className="fs-5 text-gray-800 text-hover-primary fw-bold">{t("total_withdraw")}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.treasurywithdrawal)} &#x20AC;</div>
                                                        <i className="ki-outline ki-arrow-up fs-5 text-danger ms-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-6">
                                                <div className="symbol symbol-45px w-40px me-5">
                                                    <span className="symbol-label bg-lighten">
                                                        <i className="ki-outline ki-chart-pie-4 fs-1"></i>
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap w-100">
                                                    <div className="mb-1 pe-3 flex-grow-1">
                                                        <div className="fs-5 text-gray-800 text-hover-primary fw-bold">{t("total_amount")}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="fw-bold fs-5 text-gray-800 pe-1">{pipeNumber(data?.treasurytotal)} &#x20AC;</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

