import NodataItems from "@/components/ui/NodataItems"
import Items from "./Items";

export const Table = async ({ data }: { data: any }) => {

    return (
        <table className="table align-middle table-row-dashed gs-0 gy-4">
            <thead>
                <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 min-w-150px rounded-start">admin_name"</th>
                    <th className="rounded-start">email</th>
                    <th className="rounded-start">fixed_salary</th>
                    <th className="rounded-start">wallet_amount</th>
                    <th className="rounded-start">wallet_amount</th>
                    <th className="rounded-start">wallet_amount</th>
                    <th className="rounded-start">wallet_amount</th>
                    <th className="rounded-start">wallet_amount</th>
                    <th className="min-w-50px text-end rounded-end px-4"></th>
                </tr>
            </thead>
            <tbody>
                <>
                    {data?.map((item: any, index: number) =>
                        <Items key={index} item={item} />
                    )}
                    {data?.length === 0 && <NodataItems colSpan={8} />}
                </>
            </tbody>
        </table>
    )
}