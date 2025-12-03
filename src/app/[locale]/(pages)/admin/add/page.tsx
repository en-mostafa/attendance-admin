import { FormAdd } from "@/components/admin/add/Form";
import { getTranslations } from "next-intl/server";

export default async function AddAmin() {
    const t = await getTranslations ('Public');

    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
                    <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex align-items-stretch">
                        <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                            <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                                <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">
                                {t('Admin.add_new_admin')}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div id="kt_app_content" className="app-content flex-column-fluid">
                        <div className="card">
                            <div className="card-body pt-6">
                                <FormAdd />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

