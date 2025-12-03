import { useData } from '@/hooks/useData';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
const Select = dynamic(() => import('react-select'), { ssr: false });

interface Props {
    data: any,
    state: any,
}

export default function Areas({ data, state } : Props) {
    const t = useTranslations('Public.Hotel');
    const {data: countries = []} = useData('/country');
    const [country, setCountry] = useState<any>();
    const [city, setCity] = useState<any>([]);
    const {data: cities = []} = useData(country ? `/city/${country?.value}` : null);  

    useEffect(() => {
        const item = countries?.find((country: any) => country?.id === data?.locationCountryId)
        setCountry({ value: item?.id, label: item?.name })
    }, [countries])

    useEffect(() => {
        if(Array.isArray(cities)) {
            const item = cities?.find((city: any) => city?.id === data?.locationCityId)
            setCity({ value: item?.id, label: item?.name })
        }
    }, [cities])


    const countriesOption = useMemo(
        () =>
            countries?.map((item: any) => ({
                value: item.id,
                label: item.name,
            })),
        [countries]
    );
    const citiesOption = useMemo(
        () =>
            cities?.length > 0
                ? cities?.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                }))
                : [],
        [cities]
    );

    useEffect(() => {
        setCountry(null)
    }, [setCountry])

    return (
        <>
        <div className="col-md-4 mt-4 mt-md-0">
            <label htmlFor="basic-url" className="form-label">{t("choose_location_country_hotel")}</label>
            <Select
                value={country}
                classNamePrefix={'react-select'}
                onChange={setCountry}
                options={countriesOption}
                placeholder={t('choose')}
            />
            <input type="text" name="locationCountryId" defaultValue={country?.value} hidden />
            <div className="text-danger mt-2">{state?.errors?.locationCountryId}</div>
        </div>
        <div className="col-md-4 mt-4 mt-md-0">
            <label htmlFor="basic-url" className="form-label">{t("choose_location__city_hotel")}</label>
            <Select
                value={city}
                classNamePrefix={'react-select'}
                onChange={setCity}
                options={citiesOption}
                placeholder={t('choose')}
            />
            <input type="text" name="locationCityId" defaultValue={city?.value} hidden />
            <div className="text-danger mt-2">{state?.errors?.locationCityId}</div>
        </div>
        </>
    )
}