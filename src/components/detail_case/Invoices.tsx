// components/detail_case/Invoices.tsx  (Client Component)
"use client";

import { useState, useEffect } from "react";
import { getCaseDetails, updateFactorCase } from "@/services/case.server";
import { Link } from "@/i18n/routing";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { pipeNumber } from "@/services/pipe";

interface Invoice {
  id: number;
  percent: number;
  status: string;
  step: number;
  description?: string;
  amount: number
}

interface Props {
  caseID: number;
}

export default function Invoices({ caseID }: Props) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);


  useEffect(() => {
    apiCallGetInvoices()
  }, [caseID]);

  const apiCallGetInvoices = async () => {
    const data = await getCaseDetails(caseID);
    setInvoices(data?.invoices || []);
  }

  return (
    <div className="container mt-5">
      <div className="row g-4">
        {invoices.map((invoice) => (
          <div className="col-md-4" key={invoice.id}>
            <InvoiceCard invoice={invoice} caseID={caseID} onUpdate={apiCallGetInvoices}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvoiceCard({
  invoice,
  caseID,
  onUpdate,
}: {
  invoice: Invoice;
  caseID: number;
  onUpdate: () => void
}) {
  const {
    id,
    percent,
    status: defaultStatus,
    amount,
    step,
    description: defaultDesc = "",
  } = invoice;

  const [showForm, setShowForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const [displayedStatus, setDisplayedStatus] = useState(defaultStatus);
  const [description, setDescription] = useState<any>(defaultDesc);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Public');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const res = await updateFactorCase(id, { status: selectedStatus, description });
    if (res) {
      onUpdate()
    } else {
      toast.error(t('error_updating_invoice'))
    }
    setDisplayedStatus(selectedStatus);
    setIsSubmitting(false);
    setShowForm(false);
  };

  const statusColor =
    displayedStatus === "done"
      ? "success"
      : displayedStatus === "pending"
      ? "warning"
      : displayedStatus === "failed"
      ? "danger"
      : "secondary";

  return (
    <div className="card shadow-sm rounded-4 border-0 h-100 d-flex flex-column justify-content-between">
      <div className="card-body pb-3">
        {" "}
        {/* add bottom padding */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {" "}
          {/* restored mb-4 */}
          <h5 className="card-title text-primary fw-bold mb-0">
            {step === 1
              ? t('prepayment')
              : step === 2
              ? t('intermediate_payment')
              : t('payment_completion')}
          </h5>
          <span className={`badge bg-${statusColor} fs-6`}>
            {displayedStatus === "done"
              ? t('Status.done')
              : displayedStatus === "pending"
              ? t('Status.awaiting_payment')
              : t('Status.unsuccessfull')}
          </span>
        </div>
        <p className="badge bg-info text-dark mb-3">{t('percentage')}: {percent}%</p>{" "}
        {/* mb-3 */}
        <p className="display-6 text-success fw-bold mb-3">
          {" "}
          {/* mb-3 */}
          {pipeNumber(amount)} {t('euro')}
        </p>
      </div>

      <div className="card-footer bg-transparent border-0 pt-2 px-4">
        {" "}
        {/* pt-2 px-4 */}
        <div className="mb-3 d-flex justify-content-between">
          {" "}
          {/* mb-3 */}
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? t('close') : t('change_payment_status')}
          </button>
          <Link
            href={`/detail_case/${caseID}/invoices/${id}`}
            className="btn btn-sm btn-outline-secondary"
          >
            {t('invoice_info')}
          </Link>
        </div>
        {showForm && (
          <>
            <select
              className="form-select form-select-sm mb-3"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.currentTarget.value)}
              disabled={isSubmitting}
            >
              <option value="pending">{t('Status.awaiting_payment')}</option>
              <option value="done">{t('Status.done')}</option>
              <option value="failed">{t('Status.unsuccessfull')}</option>
            </select>

            <textarea
              className="form-control form-control-sm mb-3"
              rows={3}
              placeholder={t('payment_description')}
              value={description || ''}
              onChange={(e) => setDescription(e.currentTarget.value)}
              disabled={isSubmitting}
            />

            <button
              className="btn btn-sm btn-primary w-100 mb-4"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? t('registering') : t('register')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
