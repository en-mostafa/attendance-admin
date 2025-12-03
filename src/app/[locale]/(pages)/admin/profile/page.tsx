import Details from "@/components/admin/profile/Details";
import { getData } from "@/services/fetchData";
import { getTranslations } from "next-intl/server";

export default async function AdminDetail() {
    const t = await getTranslations("Public")
    const data = await getData('/profile')

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_toolbar" className="app-toolbar pt-5 pt-lg-10">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack flex-wrap">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">{t("edit_profile")}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <Details data={data}/>
                </div>
            </div>
        </div>
    )
}

                     