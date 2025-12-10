import Items from "./ItemsPresent";
import NodataItems from "@/components/ui/NodataItems";
import { LoadingList } from "@/components/ui/LoadingList";
import { getTranslations } from "next-intl/server";

export default async function Table({ data }: { data: any[] }) {
    const t = await getTranslations('Public');

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="px-4 min-w-150px rounded-start">شناسه کاربر</th>
                    <th className="min-w-150px">{t("day_week")}</th>
                    <th className="min-w-150px">{t("date")}</th>
                    <th className="min-w-150px">ساعت ورود</th>
                    <th className="min-w-150px">ساعت خروج</th>
                    <th className="min-w-150px">آی پی</th>
                    <th className="min-w-100px text-end rounded-end px-4">
                        <div className="d-flex align-items-center justify-content-end gap-15">
                            <span>{t("present")}</span>
                            <span>{t("absent")}</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item: any, index: number) =>
                    <Items key={index} item={item} />
                )}

                {!data.length && <NodataItems colSpan={4} />}
                {!data && <LoadingList colSpan={4} />}
            </tbody>
        </table>
    )
}