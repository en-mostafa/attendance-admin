import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items"
import { getData } from "@/services/fetchData"

export const Table = async () => {
    const data = await getData('/shift/index')

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-150px rounded-start">شناسه</th>
                    <th className="ps-4 min-w-150px rounded-start">نام شیفت</th>
                    <th className="ps-4 min-w-150px rounded-start">تاریخ ایجاد</th>
                    <th className="ps-4 min-w-150px rounded-start">وضعیت</th>
                    <th className="min-w-50px text-end rounded-end px-4">عملیات</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {data?.data.map((item: any) =>
                        <Items key={item.id} item={item} />
                    )}
                    {data?.data.length === 0 && <NodataItems colSpan={5} />}
                </>
            </tbody>
        </table>
    )
}