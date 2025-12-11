import Table from "@/components/admin/list/Table";
import AddUser from "@/components/admin/manage/AddUser";
import { getTranslations } from "next-intl/server";

export default async function Admin() {
    const t = await getTranslations("Public")
    return (    
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">{t("manage_user")}</span>
                            </h3>
                            <div className="card-toolbar gap-4">
                                {/*<SearchUser />*/}
                                <AddUser />
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