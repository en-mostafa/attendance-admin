"use client";
import Modal from "@/components/ui/Modal";
import React, { startTransition, useActionState, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { updateProduct } from "@/services/services.server";
import dynamic from "next/dynamic";
import Spinner from "@/components/ui/spinner";
import { updateSalary } from "@/services/case.server";
const Select = dynamic(() => import("react-select"), { ssr: false });

export const EditSalary = ({ data }: { data: any }) => {
  const t = useTranslations("Public");
  const role = useContext(SessionContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const label = data?.status === "failed" ? t("Status.incomplete") : data?.status === "pending" ? t("Status.un_settled"): t("Status.settled")
  const [status, setStatus] = useState<any >({ value: data?.status, label: label });
  const [amount, setAmount] = useState(data?.amount);
  const [state, action, pending] = useActionState(updateSalary, null);

  useEffect(() => {
    if (state?.message === "success") {
      setShowModal(false);
      toast.success(t("toast_success"));
    }
  }, [state]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      id: data.id,
      status: status?.value,
      amount
    }
    startTransition(() => action(formData))
  }

  return (
    <>
      {role?.product.create_product && (
        <button
          type="button"
          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
          onClick={() => setShowModal(true)}
        >
          <i className="ki-outline ki-pencil fs-2"></i>
        </button>
      )}

      <Modal
        title={t("salary_edit")}
        show={showModal}
        close={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-body">
            <div className="mb-3 text-start">
              <label className="form-label">{t("user")}</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                defaultValue={`${data.user.client.firstName} ${data.user.client.lastName}`}
                placeholder={t("user_name")}
                disabled
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">{t("email")}</label>
              <input
                type="text"
                className="form-control"
                name="email"
                defaultValue={data.user.email}
                placeholder={t("email")}
                disabled
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">{t("status")}</label>
              <input type="hidden" name="status" defaultValue={data.status} />
              <Select
                value={status}
                onChange={setStatus}
                classNamePrefix={'react-select'}
                placeholder={t("choose")}
                options={[
                  { value: "done", label: t("Status.settled") },
                  { value: "pending", label: t("Status.un_settled") },
                  { value: "failed", label: t("Status.incomplete") },
                ]}
            />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">{t("salary")} {t("euro")}</label>
              <input
                type="text"
                className="form-control"
                name="salary"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder={t("salary")}
              />
            </div>
          </div>
          <input type="hidden" name="id" defaultValue={data.id} />
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={pending}
            >
              {pending ? <Spinner /> : t("register")}
            </button>
            {state?.message === "error" && (
              <span className="text-danger">{state?.error}</span>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};
