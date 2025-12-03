"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
type UploadFileProps = {
  onFileSelect?: (files: File[]) => void;
  name?: string; // اضافه برای اینکه فرم بتونه فایل‌ها رو بگیره
  resetSignal?: boolean;
};

const UploadFile: React.FC<UploadFileProps> = ({
  onFileSelect,
  name = "files",
  resetSignal,
}) => {
  const t = useTranslations('Public.Chat');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formInputRef = useRef<HTMLInputElement | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    setSelectedFiles([]);
    if (formInputRef.current) {
      formInputRef.current.files = new DataTransfer().files;
    }
  }, [resetSignal]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError(t("allowed_files"));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError(t("allowed_space"));
        return;
      }

      validFiles.push(file);
    }

    const newFileList = [...selectedFiles, ...validFiles].slice(0, 10);
    setSelectedFiles(newFileList);
    setError(null);
    onFileSelect?.(newFileList);

    if (formInputRef.current) {
      const dt = new DataTransfer();
      newFileList.forEach((file) => dt.items.add(file));
      formInputRef.current.files = dt.files;
    }
  };

  const handleRemove = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    onFileSelect?.(updatedFiles);

    if (formInputRef.current) {
      const dt = new DataTransfer();
      updatedFiles.forEach((file) => dt.items.add(file));
      formInputRef.current.files = dt.files;
    }
  };

  return (
    <div className="d-flex flex-column align-items-start me-2 gap-2">
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-icon btn-active-light-primary me-1"
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          <i className="ki-outline ki-paper-clip fs-3"></i>
        </button>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="position-relative"
              style={{ width: "40px", height: "40px" }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`uploaded-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
              <button
                type="button"
                className="btn btn-sm btn-icon btn-light-danger position-absolute top-0 left-0 translate-middle"
                style={{
                  transform: "translate(50%, -50%)",
                  width: "18px",
                  height: "18px",
                  fontSize: "10px",
                }}
                onClick={() => handleRemove(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* input برای انتخاب فایل */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />

      {/* input واقعی برای فرم */}

      <input ref={formInputRef} type="file" name={name} multiple hidden />

      {error && <small className="text-danger mt-1">{error}</small>}
    </div>
  );
};

export default UploadFile;
