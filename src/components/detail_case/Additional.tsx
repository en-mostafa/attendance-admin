"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  getCaseAdditionals,
  createCaseAdditionals,
  deleteCaseAdditional,
  updateCaseAdditional,
} from "@/services/case.server";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import BootstrapModal from "../ui/BootstrapModal";
import { useTranslations } from "next-intl";

type Props = {
  caseId: number;
};

const Additional: React.FC<Props> = ({ caseId }) => {
  const [additionals, setAdditionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // States for modal inputs
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const t = useTranslations('Public');

  useEffect(() => {
    apiCallGetAdditionals();
  }, []);

  const apiCallGetAdditionals = async () => {
    const res = await getCaseAdditionals(caseId);
    if (res) {
      setAdditionals(res);
    } else {
      toast.error(t('error_fetching_additional_section'));
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    const result = await createCaseAdditionals(caseId, { title, value });
    if (result) {
      apiCallGetAdditionals();
      setTitle("");
      setValue("");
    } else {
      toast.error(t('error_adding_new_item'));
    }
  };

  const handleEdit = async (id: number) => {
    const result = await updateCaseAdditional(id, { title, value });
    if (result) {
      apiCallGetAdditionals();
      setTitle("");
      setValue("");
    } else {
      toast.error(t('error_editing'));
    }
  };

  const handleDelete = async (id: number) => {
    const result = await deleteCaseAdditional(id);
    if (result) {
      apiCallGetAdditionals();
    } else {
      toast.error(t('error_deleting'));
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-6">
          <h3> </h3>
          <button
            className="btn btn-sm btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#create_additional"
          >
            <i className="ki-outline ki-plus fs-2"></i> {t('new')}
          </button>
        </div>

        {/* Table */}
        {additionals.length === 0 && !loading ? (
          <div className="d-flex flex-column align-items-center">
            <div className="fs-1 fw-bolder text-dark mb-4">{t('not_found')}</div>
            <div className="fs-6">{t('nothing_created')}</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle table-row-dashed gy-4 text-center">
              <thead className="bg-light">
                <tr className="fw-bold text-muted">
                  <th>{t('id')}</th>
                  <th>{t('title')}</th>
                  <th>{t('description')}</th>
                  <th>{t('creation_date')}</th>
                  <th>{t('details')}</th>
                  <th>{t('operation')}</th>
                </tr>
              </thead>
              <tbody>
                {additionals.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td style={{ maxWidth: "50px" }}>
                      <p
                        className="text-truncate mb-0"
                        style={{ maxWidth: "100%" }}
                      >
                        {p.title}
                      </p>
                    </td>
                    <td style={{ maxWidth: "100px" }}>
                      <p
                        className="text-truncate mb-0"
                        style={{ maxWidth: "100%" }}
                      >
                        {p.value}
                      </p>
                    </td>
                    <td>{p.createdAt.slice(0, 10)}</td>
                    <td>
                      <div className="card-toolbar gap-4">
                        <button
                          className="btn btn-sm btn-light-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#show_more_${p.id}`}
                        >
                          {t('show')}
                        </button>
                      </div>
                      <BootstrapModal
                        title={`${t('creation_date')}: ${p.createdAt.slice(0,10)}`}
                        id={`show_more_${p.id}`}
                        isShowFooter={false}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "start",
                            flexDirection: "column",
                          }}
                        >
                          <div style={{ textAlign: "start" }}>
                            <p>■ {t('title')}</p>
                            <p className="px-6">{p.title}</p>
                          </div>
                          <div style={{ textAlign: "start" }}>
                            <p>■ {t('description')}</p>
                            <p className="px-6">{p.value}</p>
                          </div>
                        </div>
                      </BootstrapModal>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-4">
                        <button
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target={`#edit_additional_${p.id}`}
                          onClick={() => {
                            setTitle(p.title)
                            setValue(p.value)
                          }}
                        >
                          <i className="ki-outline ki-pencil fs-2"></i>
                        </button>
                        <button
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target={`#delete_modal_${p.id}`}
                        >
                          <i className="ki-outline ki-trash fs-2"></i>
                        </button>
                      </div>
                      <BootstrapModal
                        title={t('additional_edit')}
                        id={`edit_additional_${p.id}`}
                        textConfirm={t('edit')}
                        onConfirm={() => handleEdit(p.id)}
                        onCancel={() => {
                          setTitle("")
                          setValue("")
                        }}
                      >
                        <div className="mb-3" style={{textAlign: "start"}}>
                          <label className="form-label">{t('title')}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="mb-3" style={{textAlign: "start"}}>
                          <label className="form-label">{t('description')}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </BootstrapModal>
                      <DeleteConfirmModal
                        id={`delete_modal_${p.id}`}
                        onConfirm={() => handleDelete(p.id)}
                      />
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td colSpan={6} className="py-4">
                      {t('loading')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BootstrapModal
        onCancel={() => {
          setTitle("");
          setValue("");
        }}
        disabled={!title.trim() || !value.trim()}
        textConfirm={t('add')}
        onConfirm={() => handleAdd()}
        title={t('additional_add')}
        id="create_additional"
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </BootstrapModal>
    </div>
  );
};

export default Additional;
