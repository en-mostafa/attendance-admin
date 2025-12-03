import Table from "@/components/admin/check_present/admins/TableAdmins";
import { getTranslations } from "next-intl/server";

export default async function Admins() {
    const t = await getTranslations ('Public');
    return (    
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">{t('Admin.member_management')}</span>
                            </h3>
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