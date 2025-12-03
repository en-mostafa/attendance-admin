import { useTranslations } from 'next-intl';
import '../../../public/assets/css/loading.css';

export default function LoadingPage() {
    const t =  useTranslations('Public');
    return (
        <div className="spinnerContainer">
            <div className="spinner"></div>
            <div className="loader">
                <p>{t('receiving')}</p>
            </div>
      </div>
    )
}