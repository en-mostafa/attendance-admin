import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
export const typeFile = [
  { id:0, title: 'image/jpg'},
  { id:1, title: 'image/jpeg'},
  { id:2, title: 'image/png'},
  { id:3, title: 'application/zip' },             
  { id:4, title: 'application/x-zip-compressed' }, 
  { id:5, title: 'application/x-rar-compressed' }, 
  { id:6, title: 'application/pdf' } 
]

export default function Fileupload({
  data,
  setFiles,
  style,
}: {
  setFiles: any;
  data?: any;
  style?: string;
}) {
  const [error, setError] = useState("");
  const [filesUp, setFilesUp] = useState<any>([]);
  const t = useTranslations('Public');

  useEffect(() => {
    setFiles(filesUp);
  }, [filesUp]);

  useEffect(() => {
    if (data) {
      async function fetchDefaultFile() {
        try {
          const files = await Promise.all(
            data.map(async (url: any, index: number) => {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${url.path}`
              );
              const blob = await response.blob();
              return new File([blob], `default-image-${index}.png`, {
                type: blob.type,
              });
            })
          );
          setFilesUp(files);
        } catch (error) {
          console.error("Error loading default file", error);
        }
      }
      fetchDefaultFile();
    }
  }, []);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const inValidFile = typeFile.some((type) => type.title === file.type);
    const inValidSize = file.size > 100 * 1024 * 1024;
    if (inValidFile && inValidSize) {
      setError(t('check_file_format_size'));
      return;
    }
    if (filesUp.length < 20) {
      setFilesUp([...filesUp, file]);
      setError('')
    }
  };

  const handleDelete = (index: number) => {
    setFilesUp(filesUp.filter((file: any, i: number) => i !== index));
  };
  return (
    <>
      {error !== "" && (
        <span className="text-red-500 text-sm font-bold block text-center mb-2">
          {error}
        </span>
      )}
      <div className={`${style} border border-dashed border-primary rounded p-4 bg-light-primary`}>
        <label
          htmlFor="up"
          className="d-flex flex-column align-items-center text-sm cursor-pointer"
        >
          <i className="ki-duotone ki-file-up text-primary fs-3x">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <div className="fw-bold mt-4 mb-2">
            {t('click_to_select_image')}
          </div>
          <p className="text-center fw-semibold text-gray-500 mb-2">
            {" "}
            jpeg, png, jpg, pdf, zip ({t('maximum_image_size')})
          </p>
          <p className="text-center fw-semibold text-gray-500 mb-2">
            {" "}
            ({t('maximum_upload_image_size')})
          </p>
        </label>
        <input
          id="up"
          type="file"
          onChange={handleChangeFile}
          className="d-none"
        />
      </div>
      <div className="d-flex flex-wrap gap-4">
        {filesUp.map((file: any, index: number) => (
          <div key={index} className="position-relative mt-6">
            <div className=" text-gray-700 d-flex align-items-center fs-8 w-100px fw-semibold pt-1">
              {file.type.startsWith("image/") ? (
                <Image
                  src={URL.createObjectURL(file)}
                  width={100}
                  height={100}
                  className="rounded"
                  alt="file"
                />
              ) : (
                <div className="w-100px h-100px bg-secondary d-flex align-items-center justify-content-center rounded">
                  {file.name}
                </div>
              )}
            </div>
            <i
              className="ki-solid ki-cross-circle remove-file text-danger fs-2x cursor-pointer"
              onClick={() => handleDelete(index)}
            ></i>
          </div>
        ))}
      </div>
    </>
  );
}
