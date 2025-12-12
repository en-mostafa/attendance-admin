import NodataItems from "@/components/ui/NodataItems"
import { jalali } from "@/lib/helper/jalali-date"
import { useJalaliFormat } from "@/services/formatDate"
import { pipeNumber } from "@/services/pipe"

export const Table = async ({ data }: { data: any }) => {

    return (
        <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
            <thead className="border-gray-200 fs-6 fw-semibold bg-lighten">
                <tr>
                    <th className="min-w-100px ps-9">تاریخ</th>
                    <th className="min-w-100px px-0">ساعت کاری</th>
                    <th className="min-w-100px">اضافه کاری</th>
                    <th className="min-w-125px">تاخیر (ساعت)</th>
                    <th className="min-w-125px">حقوق دریافتی  (تومان)</th>
                    <th className="min-w-125px">پرداخت شده  (تومان)</th>
                    <th className="min-w-125px"> باقی مانده  (تومان)</th>
                    <th className="min-w-100px">وضعیت</th>
                    <th className="min-w-125px text-center">عملیات</th>
                </tr>
            </thead>
            <tbody className="fs-6 fw-semibold text-gray-600">
                {data.map((item: any) =>
                    <tr key={item.id}>
                        <td className="ps-9">{useJalaliFormat(item.createdAt)}</td>
                        <td>{item.totalHours}</td>
                        <td>{item.totalOvertime}</td>
                        <td>{item.totalDelayTime}</td>
                        <td>{pipeNumber(item.totalSalary)}</td>
                        <td className="text-success">{pipeNumber(item.totalPaid)}</td>
                        <td className="text-danger">{pipeNumber(item.totalRemain)}</td>
                        <td className="text-success">
                            <span
                                className={`badge ${item?.status === 'SETTLED' ? 'badge-light-success' : 'badge-light-danger'}`}>
                                {item?.status === 'SETTLED' ? "تسویه کامل" : "تسویه نشده"}
                            </span>
                        </td>
                        <td className="text-center">
                            <button className="btn btn-light btn-sm btn-active-light-primary">پرداخت</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}