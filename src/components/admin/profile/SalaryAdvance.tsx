"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BootstrapModal from "@/components/ui/BootstrapModal";
import Spinner from "@/components/ui/spinner";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal"; // اضافه‌شده
import {
  getImprests,
  createImprest,
  deleteImprest,
} from "@/services/imprestService";
import { useLocale, useTranslations } from "next-intl";
import { useJalaliFormat } from "@/services/formatDate";

type SalaryItem = {
  id: number;
  price: number;
  description: string;
  status: "Pending" | "Confirmed" | "rejected";
  createdAt: string;
  rejectReason?: string;
};

const SalaryAdvance = () => {
  const t = useTranslations('Public');
  const locale = useLocale();
  const [salaries, setSalaries] = useState<SalaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null); // اضافه‌شده

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    setLoading(true);
    const res = await getImprests();
    !res?.message ? setSalaries(res) : toast.error(res?.message);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast.error(t('validate_amount'));
      return;
    }
    if (description.trim().length < 3) {
      toast.error(t('validate_description'));
      return;
    }
    setSubmitting(true);
    const result = await createImprest({
      description,
      price: Number(price),
    });
    if (result) {
      setPrice("");
      setDescription("");
      fetchSalaries();
    } else {
      toast.error(t("failed_send"));
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    const ok = await deleteImprest(id);
    if (ok) {
      fetchSalaries();
    } else {
      toast.error(t('toast_error'));
    }
  };

  const statusToFarsi = (status: SalaryItem["status"]) => {
    const statusMap: Record<
      SalaryItem["status"],
      { text: string; className: string }
    > = {
      Pending: { text: t("Status.pending"), className: "badge badge-warning" },
      Confirmed: { text: t("Status.confirmed"), className: "badge badge-success" },
      rejected: { text: t("Status.rejected"), className: "badge badge-danger" },
    };

    const { text, className } = statusMap[status];
    return <span className={className}>{text}</span>;
  };

  return (
    <div className="ms-lg-15" style={{ width: "100%" }}>
      <div className="card pt-4 mb-6 mb-xl-9 card-body">
        <div className="d-flex justify-content-between align-items-center mb-6">
          <h3>{t("imprest")}</h3>
          <button
            className="btn btn-sm btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal_new_salary"
            onClick={() => {
              setPrice("");
              setDescription("");
            }}
          >
            <i className="ki-outline ki-plus fs-2"></i> {t("new")}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner />
          </div>
        ) : salaries.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-3 fw-bold mb-2">{t("not_found")}</div>
            <div className="fs-6">{t("not_found")}</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
              <thead>
                <tr className="fw-bold text-muted bg-light border-bottom-0">
                  <th className="ps-4 rounded-start">#</th>
                  <th>{t("amount")}</th>
                  <th className="text-start">{t("description")}</th>
                  <th>{t('status')}</th>
                  <th>{t("date_of_registration")}</th>
                  <th>{t("Admin.answered_admin")}</th>
                  <th className="pe-4 rounded-end">{t("operation")}</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="ps-4">{idx + 1}</td>
                    <td>{item.price.toLocaleString()} {t("euro")}</td>
                    <td className="text-start">{item.description}</td>
                    <td>{statusToFarsi(item.status)}</td>
                    <td>{useJalaliFormat(item.createdAt, locale)}</td>
                    <td className="pe-4">
                      {item.rejectReason ? (
                        <button
                          className="btn btn-sm btn-light-info"
                          data-bs-toggle="modal"
                          data-bs-target="#modal_admin_response"
                          onClick={() =>
                            setSelectedResponse(item.rejectReason!)
                          }
                        >
                          {t("answered_show")}
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={`#delete_modal_${item.id}`}
                        onClick={() => setSelectedDeleteId(item.id)}
                      >
                        <i className="ki-outline ki-trash fs-2"></i>
                      </button>
                      <DeleteConfirmModal
                        id={`delete_modal_${item.id}`}
                        onConfirm={() =>
                          selectedDeleteId && handleDelete(selectedDeleteId)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* مدال ارسال مساعده */}
      <BootstrapModal
        id="modal_new_salary"
        title={t('imprest_new')}
        textConfirm={t("send")}
        onConfirm={handleSubmit}
        disabled={
          submitting ||
          !price ||
          isNaN(Number(price)) ||
          Number(price) <= 0 ||
          description.trim().length < 3
        }
        onCancel={() => {
          setPrice("");
          setDescription("");
        }}
      >
        <div className="mb-3 text-start">
          <label htmlFor="price" className="form-label">
            {t("amount")} ({t('euro')})
          </label>
          <input
            id="price"
            type="number"
            className="form-control"
            placeholder={t("enter_amount")}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={1}
            disabled={submitting}
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="description" className="form-label">
            {t("description")}
          </label>
          <textarea
            id="description"
            className="form-control"
            placeholder={t("description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            disabled={submitting}
          />
        </div>
        {submitting && (
          <div className="d-flex justify-content-center my-2">
            <Spinner />
          </div>
        )}
      </BootstrapModal>

      {/* مدال پاسخ ادمین */}
      <BootstrapModal
        id="modal_admin_response"
        title={t("Admin.answered_admin")}
        textConfirm={t("close")}
        isShowFooter={false}
        onConfirm={() => setSelectedResponse(null)}
        disabled={false}
      >
        <p className="text-start">{selectedResponse}</p>
      </BootstrapModal>
    </div>
  );
};

export default SalaryAdvance;
