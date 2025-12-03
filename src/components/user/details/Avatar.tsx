import { typeFile } from "@/hooks/useUploadFiles";

export default function Avatar({ profile, setFile } : { profile: string, setFile: (file: File) => void }) {
    const defaultImg = '/assets/media/svg/avatars/blank.svg';
    const profileImage = process.env.NEXT_PUBLIC_API_BACKEND_URL + "/" + profile;

//    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//        const file = e.target.files?.[0];
//        if(file) {
//            const inValidFile = typeFile.some(type => type.title === file.type);
//            const inValidSize = file.size < 5 * 1024 * 1024;
//            if(inValidFile && inValidSize) {
//                setFile(file)
//            }
//        }
//
//    }

    return (
    <>
        <div className="image-input image-input-outline" data-kt-image-input="true" style={{ backgroundImage: "url(" + "/assets/media/svg/avatars/blank.svg" + ")" }}>
            <div className="image-input-wrapper w-125px h-125px" style={{ backgroundImage: "url(" + (profile ? profileImage : defaultImg)  + ")" }}></div>
            {/*<label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" aria-label="تعویض آواتار" data-bs-original-title="تعویض آواتار" data-kt-initialized="1">
                <i className="ki-outline ki-pencil fs-7"></i>
                <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFile} readOnly/>
            </label>*/}
        </div>
        {/*<div className="form-text"> فایل های مجاز: png, jpg, jpeg.</div>*/}
    </>
    )
}