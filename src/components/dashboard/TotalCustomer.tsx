import { SessionContext } from "@/store"
import { useContext } from "react"
import IconNoData from "../ui/IconNoData";
import { useTranslations } from "next-intl";

export default function TotalCustomer({ users } : { users:any }) {
    const role = useContext(SessionContext);
    const t =  useTranslations('Public');

    return (
        <div className="card card-flush h-md-50 mb-xl-10">
            {role?.user.get_user ? (
                <>
                <div className="pt-5">
                    <div className="card-title d-flex flex-column">
                        <span className="fs-2hx fw-bold text-dark px-5 lh-1 ls-n2">{users}</span>
                        <span className="text-gray-400 pt-1 px-5 fw-semibold fs-6">{t('number_customers')}</span>
                        <div className="d-flex justify-content-center">
                            <i className="ki-duotone ki-profile-user fs-5x mt-14">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            </i>
                        </div>
                    </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-end pe-0">
                    <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">{t('new_customers')}</span>
                    <div className="symbol-group symbol-hover flex-nowrap">
                        <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="">
                            <span className="symbol-label bg-warning text-inverse-warning fw-bold">م</span>
                        </div>
                        <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="">
                        </div>
                        <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="">
                            <span className="symbol-label bg-primary text-inverse-primary fw-bold">ع</span>
                        </div>
                        <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="">
                        </div>
                        <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="">
                            <span className="symbol-label bg-danger text-inverse-danger fw-bold">ح</span>
                        </div>
                        <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="">
                        </div>
                        <a href="#" className="symbol symbol-35px symbol-circle" data-bs-toggle="modal" data-bs-target="#kt_modal_view_users">
                            <span className="symbol-label bg-light text-gray-400 fs-8 fw-bold">+</span>
                        </a>
                    </div>
                </div>
                </>
            ) : (
                <IconNoData />
            )}
        </div>
    )
}