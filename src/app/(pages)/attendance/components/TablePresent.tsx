import NodataItems from "@/components/ui/NodataItems";
import { LoadingList } from "@/components/ui/LoadingList";
import Items from "./ItemsPresent";

export default async function Table({ data }: { data: any[] }) {

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="px-4 min-w-150px rounded-start">شناسه کاربر</th>
                    <th className="min-w-150px">روز هفته</th>
                    <th className="min-w-150px">تاریخ</th>
                    <th className="min-w-150px">ساعت ورود</th>
                    <th className="min-w-150px">ساعت خروج</th>
                    <th className="min-w-150px">آی پی</th>
                    <th className="min-w-100px text-end rounded-end px-4">
                        <div className="d-flex align-items-center justify-content-end gap-15">
                            <span>حاضر</span>
                            <span>غایب</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item: any, index: number) =>
                    <Items key={index} item={item} />
                )}

                {!data.length && <NodataItems colSpan={8} />}
                {!data && <LoadingList colSpan={8} />}
            </tbody>
        </table>
    )
}