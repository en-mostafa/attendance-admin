import { useTranslations } from "next-intl";

export default function IconNoData() {
    const t =  useTranslations('Public');
    return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <i className="ki-outline ki-search-list fs-3x"></i>
            <span className="text-muted mt-2">{t('no_exist_info')}</span>
        </div>
    )
}