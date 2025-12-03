import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Sidebar({ data, activeTab, setActiveTabe } : { data: any, activeTab:string, setActiveTabe: (activeTab: string) => void }) {
    const t = useTranslations('Public');
    const defaultImg = '/assets/media/svg/avatars/blank.svg';
    const profileImage = process.env.NEXT_PUBLIC_API_BACKEND_URL + "/" + data?.profileImage;

    return (
        <div className="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
            <div className="card mb-5 mb-xl-8">
                <div className="card-body pt-15">
                    <div className="d-flex flex-center flex-column mb-5">
                        <div className="symbol symbol-100px symbol-circle mb-7">
                            <Image src={data?.profileImage ?  profileImage : defaultImg } width={100} height={100} alt="image"/>
                        </div>
                        <span className="fs-3 text-gray-800 fw-bold mb-1">{data?.client?.firstName ?? t('user') + ' ' + (data?.client?.lastName ?? t('anonymous')) }</span>
                        <div className="fs-5 fw-semibold text-muted mb-6">{data?.email}</div>
                    </div>
                    <div className="fw-bold rotate collapsible collapsed" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="kt_customer_view_details"> 
                        {t("details")}      
                    </div>
                    <div className="separator separator-dashed my-3"></div>
                    <div className="p-0">
                        <div className={`d-flex justify-content-between cursor-pointer bg-hover-light-primary p-3 rounded ${activeTab === 'general' && 'bg-light-primary text-primary'}`} onClick={() => setActiveTabe('general')}>
                            <span>{t("general")}</span>
                            <i className="ki-outline ki-left fs-3"></i>
                        </div>
                        <div className={`d-flex justify-content-between cursor-pointer p-3 bg-hover-light-primary ${activeTab === 'off' && 'bg-light-primary text-primary'}`} onClick={() => setActiveTabe('off')}>
                            <span>{t("request_leave")}</span>
                            <i className="ki-outline ki-left fs-3"></i>
                        </div>
                        <div className={`d-flex justify-content-between cursor-pointer p-3 bg-hover-light-primary ${activeTab === 'salary-advance' && 'bg-light-primary text-primary'}`} onClick={() => setActiveTabe('salary-advance')}>
                            <span>{t("imprest_form")}</span>
                            <i className="ki-outline ki-left fs-3"></i>
                        </div>
                        <div className={`d-flex justify-content-between cursor-pointer p-3 bg-hover-light-primary ${activeTab === 'feedback' && 'bg-light-primary text-primary'}`} onClick={() => setActiveTabe('feedback')}>
                            <span>{t("register_feedback")}</span>
                            <i className="ki-outline ki-left fs-3"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}