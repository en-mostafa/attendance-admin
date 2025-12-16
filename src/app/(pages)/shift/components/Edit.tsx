'use client'
import {
    FormEvent,
    startTransition,
    useActionState,
    useEffect,
    useState
} from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import DatePickerCalnender from "@/components/ui/DatePicker";
import dynamic from "next/dynamic";
import { jalali } from "@/lib/helper/jalali-date";
import { DateObject } from "react-multi-date-picker";
import dayweek from '@/constant/dayweek.json';
import { useRouter } from "next/navigation";
import { ListIps } from "./ListIps";
import { updateWorkShift } from "@/services/shift.services";
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function EditShift({ data, ips }: { data: any, ips: any }) {
    const [shiftSchedules, setShiftSchedules] = useState(data?.shiftSchedules)
    const [holidays, setHolidays] = useState<any>(data?.holidays);
    const [title, setTitle] = useState(data?.name);
    const [ip, setIp] = useState<any>();
    const [state, action, pending] = useActionState(updateWorkShift, null);
    const router = useRouter();
    const days: any = dayweek.data;

    const defaultIps = data?.ips.map((ip: any) => {
        return {
            value: ip.id,
            label: ip.name
        }
    });

    useEffect(() => {
        if (state?.message === 'success') {
            router.refresh();
            toast.success("با موفقیت انجام شد")
        }
    }, [state])

    useEffect(() => {
        setIp(defaultIps)
    }, [data])


    const renderItems = (item: any, index: number) => {
        const handelChange = (dayOfWeek: number, feild: string, value: string | boolean) => {
            setShiftSchedules((prev: any) =>
                prev.map((shift: any) =>
                    shift.dayOfWeek === dayOfWeek
                        ? { ...shift, [feild]: value }
                        : shift
                )
            )
        }

        return (
            <tr key={index}>
                <td className="px-3">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={item.isActive}
                        onChange={(e) => handelChange(item.dayOfWeek, e.target.name, e.target.checked)}
                    />
                </td>
                <td>
                    {days[item.dayOfWeek]}
                </td>
                <td>
                    <input
                        type="time"
                        name="startTime"
                        disabled={!item.isActive}
                        value={item.startTime ?? ''}
                        onChange={(e) => handelChange(item.dayOfWeek, e.target.name, e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="time"
                        name="endTime"
                        disabled={!item.isActive}
                        value={item.endTime ?? ''}
                        onChange={(e) => handelChange(item.dayOfWeek, e.target.name, e.target.value)}
                    />
                </td>
            </tr>
        )
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            id: Number(data.id),
            name: title,
            shiftSchedules: {
                create: shiftSchedules.map((sh: any) => ({
                    dayOfWeek: sh.dayOfWeek,
                    isActive: sh.isActive,
                    startTime: sh.startTime,
                    endTime: sh.endTime
                }))
            },
            ips: {
                set: ip.map((p: any) => {
                    return { id: p.value }
                })
            },
            holidays: holidays.map((h: DateObject) => jalali(h))
        }
        startTransition(() => action(formData))
    }

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">افزودن شیفت</span>
                            </h3>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-5">
                                    <div className="col-md-4">
                                        <label htmlFor="basic-url" className="form-label">عنوان</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            className={`form-control ${state?.message === 'validation' && 'is-invalid'}`}
                                            placeholder="عنوان"
                                            aria-label="Server"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="basic-url" className="mb-2">آی پی</label>
                                        <Select
                                            value={ip}
                                            onChange={setIp}
                                            isMulti
                                            classNamePrefix={'react-select'}
                                            placeholder="انتخاب کنید"
                                            options={ListIps(ips)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="basic-url" className="mb-2">مناسبت ها</label>
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
                                        {shiftSchedules?.map((item: any, index: number) => (
                                            renderItems(item, index)
                                        ))}
                                    </tbody>
                                </table>
                                <div className="modal-footer mt-10">
                                    <button type="submit" className="btn btn-primary min-w-150px" disabled={pending}>{pending ? <Spinner /> : "ثبت"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}