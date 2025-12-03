
import { ListItems } from "@/components/task/ListItems";
import NodataItems from "@/components/ui/NodataItems";
import { getData } from "@/services/fetchData";
import { getTranslations } from "next-intl/server";

export default async function Page() {
    const data = await getData('/task/user/task');
    const t = await getTranslations('Public');
    
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
                    <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex align-items-stretch">
                        <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                            <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                                <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">{t('my_tasks')}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div id="kt_app_content" className="app-content flex-column-fluid">
                        <div className="row">
                            {data.map((items:any, index:number) => (
                                <ListItems key={index} items={items}/>
                            ))}
                            {data.length === 0 && (
                                <div className="d-flex flex-column align-items-center pt-14">
                                    <i className="ki-outline ki-search-list fs-3x"></i>
                                    <span className="text-muted mt-2">{t('no_exist_info')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}