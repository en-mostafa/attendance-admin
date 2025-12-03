import { FormAdd } from "@/components/task/add/Form";
import { getAdmins } from "@/services/task.server";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const admins = await getAdmins();
    const t = await getTranslations('Public');


    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
                    <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack flex-wrap">
                        <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                            <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                                <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">
                                   {t('add_new_task')}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="kt_app_content_container" className="app-container container-xxl d-flex flex-stack flex-wrap">
                    <div id="kt_app_content" className="app-content flex-column-fluid">
                        <div className="card">
                            <div className="card-body pt-6">
                                <FormAdd admins={admins?.data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}