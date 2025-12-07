'use client'
import { FormEvent, startTransition, useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import DatePickerCalnender from "@/components/ui/DatePicker";
import dynamic from "next/dynamic";
import { addWorkShift } from "@/services/adminServices";
import { useTranslations } from "next-intl";
import { ListIps } from "@/components/admin/work_shift/ListIps";
import { useRouter } from "@/i18n/routing";
const Select = dynamic(() => import('react-select'), { ssr: false });

const defaultShift = [
    { "dayOfWeek": 0, "isActive": true, "startTime": "08:00", "endTime": "16:00" },
    { "dayOfWeek": 1, "isActive": true, "startTime": "08:00", "endTime": "16:00" },
    { "dayOfWeek": 2, "isActive": true, "startTime": "08:00", "endTime": "16:00" },
    { "dayOfWeek": 3, "isActive": true, "startTime": "08:00", "endTime": "16:00" },
    { "dayOfWeek": 4, "isActive": true, "startTime": "08:00", "endTime": "16:00" },
    { "dayOfWeek": 5, "isActive": false, "startTime": null, "endTime": null },
    { "dayOfWeek": 6, "isActive": false, "startTime": null, "endTime": null }
]

export default function AddShift({ ips }: { ips: any }) {
    const [shiftSchedules, setShiftSchedules] = useState(defaultShift)
    const t = useTranslations('Public');
    const [holidays, setHolidays] = useState<any>([]);
    const [title, setTitle] = useState('');
    const [ip, setIp] = useState<any>(null);
    const [state, action, pending] = useActionState(addWorkShift, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.message === 'success') {
            router.push('/admin/work_shift')
            toast.success(t("toast_success"))
        }
    }, [state])

    const renderItems = (item: any) => {
        const handelChange = (dayOfWeek: number, feild: string, value: string | boolean) => {
            setShiftSchedules(prev =>
                prev.map(shift =>
                    shift.dayOfWeek === dayOfWeek
                        ? { ...shift, [feild]: value }
                        : shift
                )
            )
        }

        return (
            <tr key={item.dayOfWeek}>
                <td className="px-3">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={item.isActive}
                        onChange={(e) => handelChange(item.dayOfWeek, e.target.name, e.target.checked)}
                    />
                </td>
                <td>
                    {item.dayOfWeek}
                </td>
                <td>
                    <input
                        type="time"
                        name="startTime"
                        disabled={!item.isActive}
                        value={item.startTime}
                        onChange={(e) => handelChange(item.dayOfWeek, e.target.name, e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="time"
                        name="endTime"
                        disabled={!item.isActive}
                        value={item.endTime}
                        onChange={(e) => handelChange(item.dayOfWeek, e.target.name, e.target.value)}
                    />
                </td>
            </tr>
        )
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            name: title,
            shiftSchedules: {
                create: shiftSchedules
            },
            ips: {
                connect: ip.map((p: any) => {
                    return { id: p.id }
                })
            },
            holidays
        }
        console.log("formData", formData)
        //startTransition(() => action(formData))
    }

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">{t("Shift.add_shift")}</span>
                            </h3>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-5">
                                    <div className="col-md-4">
                                        <label htmlFor="basic-url" className="form-label">{t("Shift.name_shift")}</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            className={`form-control ${state?.message === 'validation' && 'is-invalid'}`}
                                            placeholder={t("Shift.name_shift")}
                                            aria-label="Server"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="basic-url" className="mb-2">{t("ip")}</label>
                                        <Select
                                            value={ip}
                                            onChange={setIp}
                                            isMulti
                                            classNamePrefix={'react-select'}
                                            placeholder={t("choose")}
                                            options={ListIps(ips)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="basic-url" className="mb-2">{t("Shift.holidays_day")}</label>
                                        <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                            <DatePickerCalnender
                                                multiple
                                                date={holidays}
                                                setDate={setHolidays}
                                            />
                                            <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                                <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <table className="table align-middle table-row-dashed gs-0 gy-4 mt-20">
                                    <thead>
                                        <tr className="fw-bold text-muted bg-light border-0">
                                            <th className="ps-4 min-w-150px rounded-start">وضعیت</th>
                                            <th className="ps-4 min-w-150px rounded-start">روز هفته</th>
                                            <th className="ps-4 min-w-150px rounded-start">ساعت شروع شیفت</th>
                                            <th className="ps-4 min-w-150px rounded-start">ساعت پایان شیفت</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shiftSchedules.map(item => (
                                            renderItems(item)
                                        ))}
                                    </tbody>
                                </table>
                                <div className="modal-footer mt-10">
                                    <button type="submit" className="btn btn-primary min-w-150px" disabled={pending}>{pending ? <Spinner /> : t("info_add")}</button>
                                </div>
                                {/*{!validate && <span className="text-danger px-5 pb-10 d-block text-end">{t("Shift.validation_fields")}</span>}*/}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}