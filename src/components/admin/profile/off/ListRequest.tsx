import NodataItems from "@/components/ui/NodataItems";
import { Items } from "./Items";
import { AddOff } from "./Add";
import Spinner from "@/components/ui/spinner";
import useSwr from "@/hooks/useSwr";
import { useTranslations } from "next-intl";

export default function ListRequest() {
    const t  = useTranslations('Public');
    const { data, isLoading, mutate } = useSwr(`/attendance/leave`);

    return (
        <div className="flex-lg-row-fluid ms-lg-15">
            <div className="card pt-4 mb-6 mb-xl-9 card-body">
                <div className="card-header p-0 cursor-pointer">
                    <div className="card-title m-0">
                        <h3 className="fw-bold m-0">{t('leave')}</h3>
                    </div>
                    <AddOff mutate={mutate}/>
                </div>
                <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                        <thead>
                            <tr className="fw-bold text-muted bg-light border-bottom-0">
                                <th className="ps-4 rounded-start">{t("request_date")}</th>
                                <th className="text-start">{t('date_start_leave')}</th>
                                <th className="text-start">{t("date_end_leave")}</th>
                                <th className="text-end rounded-end pe-4">{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item:any) => 
                                <Items key={item.id} item={item}/>
                            )}
                            {data?.length === 0 && <NodataItems colSpan={4}/>}
                        </tbody>
                    </table>
                    {isLoading && <div className="d-flex justify-content-center my-4"><Spinner /></div>}
                </div>
            </div>
        </div>
    )
}














