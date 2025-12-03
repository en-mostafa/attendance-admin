import NodataItems from "@/components/ui/NodataItems";
import { Items } from "./Items";
import { useData } from "@/hooks/useData";
import { useTranslations } from "next-intl";

export default function Activity({ id } : { id: string }) {
    const t = useTranslations('Public');
    const { data } = useData(`/admin/account/sessions/${id}`);

    return (
        <div className="flex-lg-row-fluid ms-lg-15">
            <div className="card pt-4 mb-6 mb-xl-9 card-body">
                <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                        <thead>
                            <tr className="fw-bold text-muted bg-light border-bottom-0">
                                <th className="ps-4 rounded-start">{t("device")}</th>
                                <th className="text-start">{t("ip")}</th>
                                <th className="text-end rounded-end pe-4">{t("activity")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item:any) => 
                                <Items key={item.id} item={item}/>
                            )}
                            {data?.length === 0 && <NodataItems colSpan={3}/>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}














