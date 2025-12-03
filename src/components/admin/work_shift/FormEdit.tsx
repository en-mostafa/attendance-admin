"use client";
import {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import DatePickerCalnender from "@/components/ui/DatePicker";
import { useTimezoneSelect, allTimezones } from "react-timezone-select";
import dynamic from "next/dynamic";
import { useData } from "@/hooks/useData";
import { useTranslations } from "next-intl";
import { ListIps } from "@/components/admin/work_shift/ListIps";
import { ListAdmins } from "@/lib/helper/getAdmins";
import { dayoff } from "@/constant";
import { updateWorkShift } from "@/services/adminServices";
import { Link } from "@/i18n/routing";
const Select = dynamic(() => import("react-select"), { ssr: false });

const labelStyle = "original";
const timezones = {
  ...allTimezones,
  "Europe/Berlin": "Frankfurt",
};

export default function FormEdit({ data }: { data: any }) {
  const t = useTranslations("Public");
  const { data: admins } = useData("/admin/manager/retrive-admins?limit=1000");
  const { data: ips } = useData("/attendance/ip");
  const [endDate, setEndDate] = useState<any>(data?.vacations);
  const [title, setTitle] = useState(data?.title);
  const [timeStart, setTimeStart] = useState(data?.startHour);
  const [timeEnd, setTimeEnd] = useState(data?.endHour);
  const [dayOff, setDayOff] = useState<any>(null);
  const [adminId, setAdminId] = useState<any>(null);
  const [ip, setIp] = useState<any>(null);
  const [lunchTime, setLunchTime] = useState(data?.breakTime);
  const {options, parseTimezone } = useTimezoneSelect({
    labelStyle,
    timezones,
  });
  const [selectedTimezone, setSelectedTimezone] = useState<any>(data?.timeZone);
  const [validate, isValidate] = useState(true);
  const [state, action, pending] = useActionState(updateWorkShift, null);

  useEffect(() => {
    if (state?.message === "success") {
      toast.success(t("toast_success"));
    }
  }, [state]);

  useEffect(() => {
    const result = ips
      ?.filter((ip: any) => data?.ipIds?.includes(ip.id))
      .map((ip: any) => ({
        value: ip.id,
        label: ip.ip + ` (${ip.description})`,
      }));

    setIp(result);
  }, [ips]);

  useEffect(() => {
    const result = admins?.data
      .filter((admin: any) => data?.userIds?.includes(admin.id))
      .map((admin: any) => ({
        value: admin.id,
        label: admin.client.firstName + " " + admin.client.lastName,
      }));

    setAdminId(result);
  }, [admins]);

  useEffect(() => {
    const result = dayoff
      .filter((days) => data?.dayOffs?.includes(days.value))
      .map((days) => ({
        value: days.value,
        label: days.label,
      }));
    setDayOff(result);
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ip.length || !timeStart || !timeEnd || !adminId || !title) {
      isValidate(false);
      return;
    }
    const formData = {
      id: data?.id,
      title,
      breakTime: +lunchTime,
      startHour: timeStart,
      endHour: timeEnd,
      vacations: endDate,
      timeZone: selectedTimezone,
      ipIds: ip.map((i: any) => i.value),
      dayOffs: dayOff.map((i: any) => i.value),
      userIds: adminId.map((i: any) => i.value),
    };
    startTransition(() => action(formData));
  };

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-xxl"
        >
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  {t("Shift.edit_shift")}
                </span>
              </h3>
              <Link href="/admin/work_shift">
                <i className="ki-duotone ki-arrow-left text-primary fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </Link>
            </div>
            {/*Tabel*/}
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-5">
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="form-label">
                      {t("Shift.name_shift")}
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`form-control ${
                        state?.message === "validation" && "is-invalid"
                      }`}
                      placeholder={t("Shift.name_shift")}
                      aria-label="Server"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="mb-2">
                      {t("Shift.hour_start")}
                    </label>
                    <div
                      className="input-group flex-nowrap"
                      id="kt_td_picker_simple"
                      data-td-target-input="nearest"
                      data-td-target-toggle="nearest"
                    >
                      <input
                        type="time"
                        value={timeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
                        className="form-control"
                      />
                      <span
                        className="input-group-text"
                        data-td-target="#kt_td_picker_basic"
                        data-td-toggle="datetimepicker"
                      >
                        <i className="ki-duotone ki-time fs-2">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="mb-2">
                      {t("Shift.hour_end")}
                    </label>
                    <div
                      className="input-group flex-nowrap"
                      id="kt_td_picker_simple"
                      data-td-target-input="nearest"
                      data-td-target-toggle="nearest"
                    >
                      <input
                        type="time"
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                        className="form-control"
                      />
                      <span
                        className="input-group-text"
                        data-td-target="#kt_td_picker_basic"
                        data-td-toggle="datetimepicker"
                      >
                        <i className="ki-duotone ki-time fs-2">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="mb-2">
                      {t("Shift.timezone")}
                    </label>
                    <select
                      className="form-select"
                      value={selectedTimezone}
                      onChange={(e) =>
                        setSelectedTimezone(e.currentTarget.value)
                      }
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="form-label">
                      {t("Shift.time_lunch")} ({t("Shift.hour")})
                    </label>
                    <input
                      type="number"
                      name="lunchTime"
                      value={lunchTime}
                      onChange={(e) => setLunchTime(e.target.value)}
                      className={`form-control text-start ${
                        state?.message === "validation" && "is-invalid"
                      }`}
                      placeholder={t("required_number")}
                      aria-label="lunchTime"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="mb-2">
                      {t("ip")}
                    </label>
                    <Select
                      value={ip}
                      onChange={setIp}
                      isMulti
                      placeholder={t("choose")}
                      classNamePrefix={'react-select'}
                      options={ListIps(ips)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="mb-2">
                      {t("choose_admin")}
                    </label>
                    <Select
                      value={adminId}
                      onChange={setAdminId}
                      isMulti
                      placeholder={t("choose")}
                      classNamePrefix={'react-select'}
                      options={ListAdmins(admins?.data)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="mb-2">
                      {t("Shift.holidays")}
                    </label>
                    <Select
                      value={dayOff}
                      onChange={setDayOff}
                      classNamePrefix={'react-select'}
                      isMulti
                      placeholder={t("choose")}
                      options={[
                        { value: "Saturday", label: t("Shift.Saturday") },
                        { value: "Sunday", label: t("Shift.Sunday") },
                        { value: "Monday", label: t("Shift.Monday") },
                        { value: "Tuesday", label: t("Shift.Tuesday") },
                        { value: "Wednesday", label: t("Shift.Wednesday") },
                        { value: "Thursday", label: t("Shift.Thursday") },
                        { value: "Friday", label: t("Shift.Friday") },
                      ]}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="basic-url" className="mb-2">
                      {t("Shift.holidays_day")}
                    </label>
                    <div
                      className="input-group flex-nowrap"
                      id="kt_td_picker_simple"
                      data-td-target-input="nearest"
                      data-td-target-toggle="nearest"
                    >
                      <DatePickerCalnender
                        multiple
                        date={endDate}
                        setDate={setEndDate}
                      />
                      <span
                        className="input-group-text"
                        data-td-target="#kt_td_picker_basic"
                        data-td-toggle="datetimepicker"
                      >
                        <i className="ki-duotone ki-calendar fs-2">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer mt-10">
                  <button
                    type="submit"
                    className="btn btn-primary min-w-150px"
                    disabled={pending}
                  >
                    {pending ? <Spinner /> : t("info_add")}
                  </button>
                </div>
                {!validate && (
                  <span className="text-danger px-5 pb-10 d-block text-end">
                    {t("Shift.validation_fields")}
                  </span>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
