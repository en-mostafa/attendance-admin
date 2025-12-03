import { Table } from "@/components/finance/salary/details/Table";
import { Link } from "@/i18n/routing";
import { getData } from "@/services/fetchData";
import { getTranslations } from "next-intl/server";

export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const t = await getTranslations('Public.Finance');
    const { id } = await params;
    const data = await getData(`/payment/slalary/user-salary/${id}`);
    const user = data[0]?.wallet?.user?.client;

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1"> {t("list_deposit_withdraw")} ({user?.firstName + user?.lastName})</span>
                            </h3>
                            <div className="card-toolbar gap-4">
                                <Link href="/finance/salary" className="btn btn-flex btn-primary btn-sm">
                                    {t("back")}
                                </Link>
                            </div>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <Table data={data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}