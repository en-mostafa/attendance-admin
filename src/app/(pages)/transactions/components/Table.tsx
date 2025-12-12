import NodataItems from "@/components/ui/NodataItems"

export const Table = async ({ data }: { data: any }) => {

    return (
        <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
            <thead className="border-gray-200 fs-6 fw-semibold bg-lighten">
                <tr>
                    <th className="min-w-100px ps-9">تاریخ</th>
                    <th className="min-w-100px px-0">ساعت کاری</th>
                    <th className="min-w-100px">اضافه کاری</th>
                    <th className="min-w-125px">تاخیر (ساعت)</th>
                    <th className="min-w-125px">مجموع دریافتی  (تومان)</th>
                    <th className="min-w-125px">پرداخت شده  (تومان)</th>
                    <th className="min-w-125px"> باقی مانده  (تومان)</th>
                    <th className="min-w-100px">وضعیت</th>
                    <th className="min-w-125px text-center">عملیات</th>
                </tr>
            </thead>
            <tbody className="fs-6 fw-semibold text-gray-600">
                <tr>
                    <td className="ps-9">آذر ماه</td>
                    <td className="ps-0">102445788</td>
                    <td className="ps-0">102445788</td>
                    <td className="text-success">$38.00</td>
                    <td className="text-success">$38.00</td>
                    <td className="text-success">$38.00</td>
                    <td className="text-success">$38.00</td>
                    <td className="text-success">تسویه کامل</td>
                    <td className="text-center">
                        <button className="btn btn-light btn-sm btn-active-light-primary">پرداخت</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}