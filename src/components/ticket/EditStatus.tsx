"use client";

import { editTicket } from "@/services/ticket.server";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  ticketId: number;
  onUpdate: () => void
};

const EditStatus: React.FC<Props> = ({ ticketId, onUpdate }) => {
  const [status, setStatus] = useState<string>("");
  const t = useTranslations('Public');
  const handleLogicEditStatus = async (selectedStatus: string) => {
    const res = await editTicket(ticketId, selectedStatus);
    if (res) {
      toast.success(t('edit_successfully'));
      onUpdate()
    } else {
      toast.error(t('toast_error'));
    }
  };

  return (
    <div>
      <select
        className="form-select form-select-sm"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          handleLogicEditStatus(e.target.value);
        }}
        style={{ width: "120px", display: "inline-block" }}
      >
        <option value="" disabled>{t('status_selection')}</option>
        <option value="new">{t('Status.new')}</option>
        <option value="under_review">{t('Status.under_review')}</option>
        <option value="closed">{t('Status.closed')}</option>
        <option value="answered_by_admin">{t('Status.answered_by_admin')}</option>
        <option value="answered_by_client">{t('Status.answered_by_client')}</option>
      </select>
    </div>
  );
};

export default EditStatus;
