"use client";

import React, { useState, useEffect } from "react";
import DatePickerCalnender from "@/components/ui/DatePicker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import {
  getCaseReminders,
  createCaseReminder,
  deleteCaseReminder,
} from "@/services/case.server";
import { toast } from "react-toastify";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import BootstrapModal from "@/components/ui/BootstrapModal";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type Props = {
  caseId: number;
};

const Reminders: React.FC<Props> = ({ caseId }) => {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [notifChecked, setNotifChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(true);
  const [adminChecked, setAdminChecked] = useState(false);

  const t = useTranslations("Public");

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    setLoading(true);
    const res = await getCaseReminders(caseId);
    if (res) {
      setReminders(res);
    } else {
      toast.error(t('reminder_fetching_error'));
    }
    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(null);
    setNotifChecked(true);
    setEmailChecked(true);
    setAdminChecked(false);
  };

  const handleAdd = async () => {
    if (!date) return;

    setLoadingAdd(true);

    let sendType: "both" | "email" | "notif" = "both";
    if (notifChecked && !emailChecked) sendType = "notif";
    else if (!notifChecked && emailChecked) sendType = "email";

    const payload = {
      title,
      description,
      time: (date as any)?.toDate?.()?.toString?.(),
      sendType,
      doesSendAdmin: adminChecked,
    };
    console.log(payload);
    
    const res = await createCaseReminder(caseId, payload as any);
    if (res) {
      toast.success(t('reminder_registered'));
      fetchReminders();
      resetForm();
    } else {
      toast.error(t('reminder_registered_error'));
    }
    setLoadingAdd(false);
  };

  const handleDelete = async (id: number) => {
    const res = await deleteCaseReminder(id);
    if (res) {
      toast.success(t('reminder_deleted'));
      fetchReminders();
    } else {
      toast.error(t('reminder_dleleted_error'));
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-6">
          <h3>{t('reminders_list')}</h3>
          <button
            className="btn btn-sm btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#create_reminder"
          >
            <i className="ki-outline ki-plus fs-2"></i> {t('new')}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">{t('loading')}</div>
        ) : reminders.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1 fw-bolder text-dark mb-4">{t('not_found')}</div>
            <div className="fs-6">{t('no_added_reminder')}</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle table-row-dashed gy-4 text-center">
              <thead className="bg-light">
                <tr className="fw-bold text-muted">
                  <th>#</th>
                  <th>{t('send_to')}</th>
                  <th>{t('title')}</th>
                  <th>{t('explanation')}</th>
                  <th>{t('date_time')}</th>
                  <th>{t('posting_type')}</th>
                  <th>{t('operation')}</th>
                </tr>
              </thead>
              <tbody>
                {reminders.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <span className="badge badge-light-primary rounded fw-bold fs-6">
                          {r.user.id}
                        </span>
                        <Link
                          href={`/users/${r.user.id}`}
                          className="text-gray-900 fw-bold d-block mb-1 fs-6"
                          target="_blank"
                        >
                          {r.user.client.firstName} {r.user.client.lastName}
                        </Link>
                      </div>
                    </td>
                    <td className="text-truncate" style={{ maxWidth: 150 }}>
                      {r.title}
                    </td>
                    <td className="text-truncate" style={{ maxWidth: 250 }}>
                      {r.description}
                    </td>
                    <td>
                      {new Date(r.time).toLocaleDateString()}<br />
                      {new Date(r.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      {r.sendType === "both"
                        ? `${t('email')}/${t('notif')}`
                        : r.sendType === "notif"
                        ? t('notif')
                        : t('email')}
                    </td>
                    <td>
                      <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={`#delete_reminder_${r.id}`}
                      >
                        <i className="ki-outline ki-trash fs-2"></i>
                      </button>
                      <DeleteConfirmModal
                        id={`delete_reminder_${r.id}`}
                        onConfirm={() => handleDelete(r.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BootstrapModal
        id="create_reminder"
        title={t('add_reminder')}
        textConfirm={loadingAdd ? t('adding') : t('add')}
        disabled={
          !title.trim() ||
          !description.trim() ||
          !date ||
          (!notifChecked && !emailChecked) ||
          loadingAdd
        }
        onConfirm={handleAdd}
        onCancel={resetForm}
      >
        <div className="mb-3">
          <label className="form-label">{t('title')}</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('description')}</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('date_time')}</label>
          <div className="input-group flex-nowrap">
            <DatePickerCalnender
              format="YYYY/MM/DD HH:mm:ss"
              plugins={[<TimePicker position="bottom" />]}
              date={date}
              setDate={setDate}
            />
            <span className="input-group-text">
              <i className="ki-duotone ki-calendar fs-2">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label d-block">{t('posting_type')}</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              checked={notifChecked}
              id="chk-notif"
              onChange={(e) => setNotifChecked(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="chk-notif">
              {t('notif')}
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              checked={emailChecked}
              id="chk-email"
              onChange={(e) => setEmailChecked(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="chk-email">
              {t('email')}
            </label>
          </div>
        </div>
        <div className="form-check mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            checked={adminChecked}
            id="chk-admin"
            onChange={(e) => setAdminChecked(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="chk-admin">
            {t('send_to_admin')}
          </label>
        </div>
      </BootstrapModal>
    </div>
  );
};

export default Reminders;
