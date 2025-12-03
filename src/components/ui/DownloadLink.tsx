'use client'

import { useTranslations } from "next-intl";

export const DownloadLink = ({ url, fileName } : { url:string, fileName:string }) => {
    const t =  useTranslations('Public');
    const handleDownload = () => {
        fetch(`${url}/download`)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error fetching the file", error)
            })
    }
    return (
        <button 
            type="button" 
            className="btn btn-flex btn-success"
            onClick={handleDownload}>
                <i className="ki-outline ki-folder-down fs-2 mx-2"></i>{t('file_download')}
        </button>
    )        
}

