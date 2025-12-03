import { typeFile } from "@/hooks/useUploadFiles";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Avatar({ setFile } : { setFile: (file: File) => void }) {
    const t = useTranslations('Public');
    const defaultImg = '/assets/media/svg/avatars/blank.svg';
    const [preview, setPreview] = useState<null | string>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const inValidFile = typeFile.some(type => type.title === file.type);
            const inValidSize = file.size < 5 * 1024 * 1024;
            if(inValidFile && inValidSize) {
                setFile(file)
                const objectUrl = URL.createObjectURL(file); 
                setPreview(objectUrl);
            }
        }
    }
 
    return (
    <>
        <div className="image-input image-input-outline" data-kt-image-input="true" style={{ backgroundImage: "url(" + "/assets/media/svg/avatars/blank.svg" + ")" }}>
            <div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: `url(${preview ?? defaultImg})` }}></div>
            <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" aria-label="تعویض آواتار" data-bs-original-title="تعویض آواتار" data-kt-initialized="1">
                <i className="ki-outline ki-pencil fs-7"></i>
                <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFile} />
            </label>
        </div>
        <div className="form-text"> {t('allowed_files')}: png, jpg, jpeg.</div>
    </>
    )
}