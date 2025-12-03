"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  getCaseAttach,
  createCaseFiles,
  deleteCaseAttach,
} from "@/services/case.server";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import BootstrapModal from "../ui/BootstrapModal";
import { getFileBlob } from "@/services/global.server";
import { useTranslations } from "next-intl";

type Props = {
  caseId: number;
};

const Attachments: React.FC<Props> = ({ caseId }) => {
  const [attachments, setAttachments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState<string>("");
  const t = useTranslations('Public');

  useEffect(() => {
    apiCallGetAttachments();
  }, []);

  const apiCallGetAttachments = async () => {
    const res = await getCaseAttach(caseId);
    if (res) {
      setAttachments(res);
    } else {
      toast.error(t('error_fetching_attachments'));
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
  
    const formData = new FormData();
    formData.append("files[0][file]", selectedFiles[0]); 
    formData.append("files[0][text]", title);
  
    const result = await createCaseFiles(caseId, formData);
  
    if (result) {
      apiCallGetAttachments();
      setSelectedFiles(null);
      setTitle("");
    } else {
      toast.error(t('error_uploading_file'));
    }
  };
  

  const handleDelete = async (id: number) => {
    const result = await deleteCaseAttach(id);
    if (result) {
      apiCallGetAttachments();
    } else {
      toast.error(t('error_deleting_attach'));
    }
  };

  const handleShowAttach = async (path: string) => {
    const blob = await getFileBlob(path.slice(8));
  
    if (!blob || !(blob instanceof Blob)) {
      toast.error(t('file_not_received'));
      return;
    }
  
    // تعیین نوع فایل از پسوند
    const extension = path.split('.').pop()?.toLowerCase();
    const mimeMap: { [key: string]: string } = {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      txt: "text/plain",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      zip: "application/zip"
    };
  
    const mime = mimeMap[extension || ""] || "application/octet-stream";
  
    // ساخت blob جدید با MIME درست
    const typedBlob = new Blob([blob], { type: mime });
  
    const fileURL = URL.createObjectURL(typedBlob);
  
    // باز کردن در تب جدید
    window.open(fileURL, "_blank");
  };  

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-6">
          <h3>{t('attachments')}</h3>
          <button
            className="btn btn-sm btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#create_attachment"
          >
            <i className="ki-outline ki-plus fs-2"></i> {t('new')}
          </button>
        </div>

        {attachments.length === 0 && !loading ? (
          <div className="d-flex flex-column align-items-center">
            <div className="fs-1 fw-bolder text-dark mb-4">{t('not_found')}</div>
            <div className="fs-6">{t('nothing_attachment_created')}</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle table-row-dashed gy-4 text-center">
              <thead className="bg-light">
                <tr className="fw-bold text-muted">
                  <th>{t('id')}</th>
                  <th>{t('title')}</th>
                  <th>{t('creation_date')}</th>
                  <th>{t('download')}</th>
                  <th>{t('operation')}</th>
                </tr>
              </thead>
              <tbody>
                {attachments.map((a, index) => (
                  <tr key={a.id}>
                    <td>{index + 1}</td>
                    <td>{a.text || t('uncertain')}</td>
                    <td>{a.createdAt.slice(0, 10)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-light-success"
                        onClick={() => handleShowAttach(a.path)}
                      >
                        {t('file_download')}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={`#delete_attach_${a.id}`}
                      >
                        <i className="ki-outline ki-trash fs-2"></i>
                      </button>
                      <DeleteConfirmModal
                        id={`delete_attach_${a.id}`}
                        onConfirm={() => handleDelete(a.id)}
                      />
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td colSpan={5} className="py-4">
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
        onCancel={() => setSelectedFiles(null)}
        disabled={!selectedFiles}
        textConfirm={t('add')}
        onConfirm={handleAdd}
        title={t('add_attachment')}
        id="create_attachment"
      >
        <div className="mb-3" style={{ textAlign: "start" }}>
          <label className="form-label">{t('title')}</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">{t('files')}</label>
          <input
            type="file"
            className="form-control"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSelectedFiles(e.target.files);
            }}
          />
        </div>
      </BootstrapModal>
    </div>
  );
};

export default Attachments;
