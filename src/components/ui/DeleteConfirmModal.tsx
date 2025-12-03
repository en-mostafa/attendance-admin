import { useTranslations } from "next-intl";
import React from "react";

type DeleteConfirmModalProps = {
  id?: string
  onConfirm: () => void;
};

export default function DeleteConfirmModal({
  onConfirm,
  id="deleteModal"
}: DeleteConfirmModalProps) {
  const t = useTranslations('Public');
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              {t('confirm_delete')}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body text-start">
          {t('ensure_deletion')}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
            {t('cancel')}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
            {t('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
