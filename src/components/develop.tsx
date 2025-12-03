import Image from 'next/image'
import img from '../../public/assets/media/illustrations/sketchy-1/5.png'
import { getTranslations } from 'next-intl/server';

export default async function Develop() {
     const t = await getTranslations('Public');
    return (
        <div className="d-flex flex-column flex-center">
            <Image src={img} className='w-400px h-400px' alt=""/>
            <div className="fs-1 fw-bolder text-dark mb-4">{t('under_review')}</div>
            <div className="fs-6">{t('developing')}</div>
        </div>
    )
}