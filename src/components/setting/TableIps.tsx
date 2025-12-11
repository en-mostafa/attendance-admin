import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items"

export const Table = async ({ data }: { data: any }) => {

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 rounded-start">شناسه</th>
                    <th className="text-center">عنوان</th>
                    <th className="text-center">IP</th>
                    <th className="min-w-50px text-end rounded-end px-4">عملیات</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {data?.map((item: any, index: number) =>
                        <Items key={index} item={item} />
                    )}
                    {data?.length === 0 && <NodataItems colSpan={4} />}
                </>
            </tbody>
        </table>
    )
}