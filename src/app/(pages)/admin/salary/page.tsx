"use client";

import React, { useContext, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import BootstrapModal from "@/components/ui/BootstrapModal";
import { toast } from "react-toastify";
import {
  getAllImprests,
  updateImprestStatus,
  deleteImprest,
  Imprest,
} from "@/services/imprestService";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";

const SalaryAdvance = () => {
  const t = useTranslations('Public');
  const role = useContext(SessionContext);
  const [salaries, setSalaries] = useState<Imprest[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedItem, setSelectedItem] = useState<Imprest | null>(null);
  const [viewReason, setViewReason] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      const res = await getAllImprests();
      console.log(res);
      
      setSalaries(res);
    } catch (err) {
      toast.error(t('toast_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await updateImprestStatus(id, { status: "Confirmed" });
      toast.success(t('toast_success'));
      await fetchSalaries();
    } catch {
      toast.error(t('toast_error'));
    }
  };

  const handleReject = async () => {
    if (!selectedItem || rejectReason.trim().length < 3) return;
    try {
      await updateImprestStatus(selectedItem.id, {
        status: "rejected",
        rejectReason,
      });
      toast.success(t('toast_success'));
      setRejectReason("");
      setSelectedItem(null);
      await fetchSalaries();
    } catch {
      toast.error(t('toast_error'));
    }
  };

  const handleDelete = async () => {
    if (deleteId == null) return;
    try {
      await deleteImprest(deleteId);
      toast.success(t('toast_success'));
      setDeleteId(null);
      await fetchSalaries();
    } catch {
      toast.error(t('toast_error'));
    }
  };

  const getStatusBadge = (status: Imprest["status"]) => {
    const map = {
      Pending: "badge badge-warning",
      Confirmed: "badge badge-success",
      rejected: "badge badge-danger",
    };
    const text = {
      Pending: t('Status.pending'),
      Confirmed: t('Status.confirmed'),
      rejected: t("Status.rejected"),
    };
    return (
      <span className={map[status as keyof typeof map]}>
        {text[status as keyof typeof text]}
      </span>
    );
  };

  return (
    <div className="container card pt-4 mb-6 mb-xl-9 mt-12">
      <h3 className="fw-bold mb-6 mt-4">{t("imprest")}</h3>

      <div className="table-responsive">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
          <thead>
            <tr className="fw-bold text-muted bg-light border-bottom-0">
              <th className="ps-4 rounded-start">#</th>
              <th>{t("Admin.admin_name")}</th>
              <th>{t("amount")}</th>
              <th>{t("description")}</th>
              <th>{t("status")}</th>
              <th>{t("date_create")}</th>
              <th className="pe-4 rounded-end">{t("operation")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <div className="my-4">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : salaries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4">
                  {t("not_found")}
                </td>
              </tr>
            ) : (
              salaries?.map((item: any, index) => (
                <tr key={item.id}>
                  <td className="ps-4">{index + 1}</td>
                  <td className="ps-4">{item.admin.user.client.firstName} {item.admin.user.client.lastName}</td>
                  <td>{item.price.toLocaleString()} {t("euro")}</td>
                  <td>{item.description}</td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td>{item.createdAt?.slice(0, 10) || "—"}</td>
                  <td className="pe-4 d-flex gap-2 justify-content-center flex-wrap">
                    {role?.imprest.update_imprest && (
                      <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleApprove(item.id)}
                        disabled={item.status !== "Pending"}
                      >
                        {t("register")}
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#reject_modal"
                        onClick={() => {
                          setSelectedItem(item);
                          setRejectReason("");
                        }}
                        disabled={item.status !== "Pending"}
                      >
                        رد
                      </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#view_reason_modal"
                      onClick={() => setViewReason(item.rejectReason || "")}
                    >
                      {t("reason_rejection")}
                    </button>
                    {role?.imprest.delete_imprest && (
                      <>
                      <button
                        className="btn btn-sm btn-light-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#delete_salary_${item.id}`}
                        onClick={() => setDeleteId(item.id)}
                        disabled={item.status !== "Pending"}
                      >
                      {t("delete")}
                      </button>

                      <DeleteConfirmModal
                        id={`delete_salary_${item.id}`}
                        onConfirm={handleDelete}
                      />
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* مدال رد کردن */}
      <BootstrapModal
        id="reject_modal"
        title={t('imprest_reject')}
        textConfirm={t("reject")}
        onConfirm={handleReject}
        onCancel={() => {
          setSelectedItem(null);
          setRejectReason("");
        }}
        disabled={rejectReason.trim().length < 3}
      >
        <div className="mb-3 text-start">
          <p>
            <strong>{t("description_user")}:</strong> {selectedItem?.description || "—"}
          </p>
        </div>
        <div className="mb-3 text-start">
          <label className="form-label">{t("reason_request_reject")}</label>
          <textarea
            className="form-control"
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder={t("reason_rejection_enter")}
          />
          {rejectReason.trim().length > 0 && rejectReason.trim().length < 3 && (
            <small className="text-danger">{t("validate_description")}</small>
          )}
        </div>
      </BootstrapModal>

      {/* مدال مشاهده دلیل رد */}
      <BootstrapModal
        id="view_reason_modal"
        title={t("reason_request_reject")}
        textConfirm={t("close")}
        isShowFooter={false}
        onConfirm={() => {}}
        disabled={false}
      >
        <div className="text-start">
          {viewReason ? (
            <p>{viewReason}</p>
          ) : (
            <p className="text-muted">
              {t("not_found")}
            </p>
          )}
        </div>
      </BootstrapModal>
    </div>
  );
};

export default SalaryAdvance;
