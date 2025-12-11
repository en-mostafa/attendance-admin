import { CalenderMonth } from "@/components/admin/check_present/present/date-picker-month";
import Table from "@/components/admin/check_present/present/TablePresent";
import { Link } from "@/i18n/routing";
import { getData } from "@/services/fetchData";
import { getTranslations } from "next-intl/server";

export default async function presents({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [date: string]: string }>
}) {
    const { id } = await params;
    const param = (await searchParams).date;
    const { data } = await getData(`/attendance/index?id=${id}&date=${param}`)
    const t = await getTranslations('Public');

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">{t('Admin.attendance_list')}</span>
                            </h3>
                            <div className="card-toolbar">
                                <CalenderMonth id={id} />

                                <Link href="/admin/check_present" className="btn btn-sm btn-light-primary">
                                    <i className="ki-duotone ki-arrow-right fs-2 mx-1">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                    {t('back')}
                                </Link>
                            </div>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <Table data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}