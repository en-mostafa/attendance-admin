import { Table } from "@/components/admin/work_shift/Table";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function workShift() {
    const t = await getTranslations('Public.Shift');

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">{t("shift")}</span>
                            </h3>
                            <div className="card-toolbar gap-4">
                                <Link href="/fa/admin/work_shift/add" className="btn btn-flex btn-primary btn-sm">
                                    ایجاد
                                </Link>
                            </div>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <Table />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}