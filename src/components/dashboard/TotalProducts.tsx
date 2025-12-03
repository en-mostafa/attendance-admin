import { SessionContext } from "@/store";
import Image from "next/image";
import { useContext } from "react";
import IconNoData from "../ui/IconNoData";
import { useTranslations } from "next-intl";

export default function TotalProducts({ data } : { data:any }) {
    const role = useContext(SessionContext);
    const t =  useTranslations('Public');

    return (
        <div className="card overflow-hidden h-md-50 mb-5 mb-xl-10">
            <div className="card-body d-flex justify-content-between flex-column px-0 pb-0">
                {role?.hotel.get_hotel ? (
                    <>
                    <div className="mb-4 px-9">
                        <div className="d-flex align-items-center mb-2">
                            <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1">{data?.data?.products?.total_hotel}</span>
                        </div>
                        <span className="fs-6 fw-semibold text-gray-400">{t('Hotel.total_hotels')}</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Image
                            className="mb-10"
                            width={150}
                            height={150}
                            src="/assets/media/hotel/2373468.jpg"
                            alt="image product"
                        />
                    </div>
                    </>
                ) : (
                    <IconNoData />
                )}
            </div>
        </div>
    )
}