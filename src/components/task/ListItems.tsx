import { Description } from "@/components/task/Description";
import { FooterTask } from "@/components/task/FooterTask";
import { TaskStatus } from "@/components/task/TaskStatus";
import { useJalaliFormat } from "@/services/formatDate";
import { getLocale, getTranslations } from "next-intl/server";

export const ListItems = async ({ items } : { items:any }) => {
    const t = await getTranslations('Public');
    const locale = await getLocale();

    return (
        <div className="col-md-6 col-xl-4">
            <div className="card border-hover-primary">
                <div className="card-header border-0 pt-9">
                    <div className="card-title m-0">
                        <div className="symbol symbol-50px w-50px bg-light d-flex justify-content-center p-3">
                            <i className="ki-outline ki-questionnaire-tablet fs-2x"></i>
                        </div>
                    </div>
                    <div className="card-toolbar">
                        <TaskStatus items={items}/>
                    </div>
                </div>
                <div className="card-body p-9">
                    <div className="fs-3 fw-bold text-gray-900">{items?.title}</div>
                    <Description text={items?.description}/>
                    <div className="d-flex flex-wrap mb-5">
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3">
                            <div className="fs-7 text-gray-800 fw-bold">{useJalaliFormat(items?.createdAt, locale)}</div>
                            <div className="fw-semibold text-gray-500">{t('start_time')}</div>
                        </div>
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
                            <div className="fs-7 text-gray-800 fw-bold">{useJalaliFormat(items?.time, locale)}</div>
                            <div className="fw-semibold text-gray-500">{t('end_time')}</div>
                        </div>
                    </div>
                    <div className="h-4px w-100 bg-light mb-5" data-bs-toggle="tooltip" aria-label="This project 60% completed" data-bs-original-title="This project 60% completed" data-kt-initialized="1">
                        <div className="bg-info rounded h-4px" role="progressbar" style={{ width: "100%" }} ></div>
                    </div>
                    <FooterTask data={items}/>
                </div>
            </div>
        </div>
    )
}