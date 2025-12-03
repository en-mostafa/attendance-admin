"use client";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  disabled?: any;
  onConfirm?: () => void;
  onCancel?: () => void;
  textConfirm?: string;
  isShowFooter?: boolean;
};

const BootstrapModal: React.FC<Props> = ({
  id,
  title,
  children,
  disabled,
  onCancel,
  onConfirm,
  isShowFooter = true,
  textConfirm,
}) => {
  const t = useTranslations('Public');
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal" // برای بستن مودال با دکمه بستن
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          {isShowFooter ? (
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onCancel}
              >
                {t('cancellation')}
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={onConfirm}
                disabled={disabled}
              >
                {textConfirm}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
