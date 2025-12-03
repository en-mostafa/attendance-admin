import { TranslateForm } from "@/components/admin/access/TranslateForm";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
    
export default async function TranslateAccess({
    params
} : {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const t = await getTranslations ('Public');
    
    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_toolbar" className="app-toolbar pt-5 pt-lg-10">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack flex-wrap">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">{t('Admin.translate_room')}</h1>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <Link href={`/admin/access`}>
                                <i className="ki-duotone ki-arrow-left fs-1">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card card-flush">
                        <div className="card-body">
                            <TranslateForm id={id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}