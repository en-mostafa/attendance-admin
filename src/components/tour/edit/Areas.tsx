import { useData } from '@/hooks/useData';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
const Select = dynamic(() => import('react-select'), { ssr: false });

interface Props {
    data: any,
    state: any,
    selectedDestination: any,
    setSelectedDestination: (selectedDestination: any) => void
}

export default function Areas({ data, state, selectedDestination, setSelectedDestination } : Props) {
    const {data: countries = []} = useData('/country');
    const [selectedCountryBegin, setSelectedCountryBegin] = useState<any>();
    const [selectedCityBegin, setSelectedCityBegin] = useState<any>([]);
    const {data: cities = []} = useData(selectedCountryBegin ? `/city/${selectedCountryBegin?.value}` : null);
    const t = useTranslations('Public');

    useEffect(() => {
        const item = countries?.find((country: any) => country?.id === Number(data?.route))
        setSelectedCountryBegin({ value: item?.id, label: item?.name })
        
        data?.countries.forEach((element:any) => {
            const item = countries?.find((country: any) => country?.id === element)
            setSelectedDestination([{ value: item?.id, label: item?.name }])
        });

    }, [countries])

    useEffect(() => {
        if(Array.isArray(cities)) {
            const item = cities?.find((city: any) => city?.id === Number(data?.originCityId))
            setSelectedCityBegin({ value: item?.id, label: item?.name })
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
        setSelectedCityBegin(null)
    }, [selectedCountryBegin])

    return (
        <>
        <div className="col-md-4 mt-4">
            <label htmlFor="basic-url" className="form-label">{t('Tour.origin_country_selection')}</label>
            <Select
                value={selectedCountryBegin}
                classNamePrefix={'react-select'}
                onChange={setSelectedCountryBegin}
                options={countriesOption}
                placeholder={t('choose')}
            />
            <input type="text" name="route" defaultValue={selectedCountryBegin?.value} hidden/>
        </div>
        <div className="col-md-4 mt-4 ">
            <label htmlFor="basic-url" className="form-label">{t('Tour.origin_city_selection')}</label>
            <Select
                value={selectedCityBegin}
                classNamePrefix={'react-select'}
                onChange={setSelectedCityBegin}
                options={citiesOption}
                placeholder={t('choose')}
            />
            <input type="text" name="originCityId" defaultValue={selectedCityBegin?.value} hidden/>
            <div className="text-danger mt-2">{state?.errors?.originCityId}</div>
        </div>
        <div className="col-md-4 mt-4">
            <label htmlFor="basic-url" className="form-label">{t('Tour.destination_countries_selection')}</label>
            <Select
                value={selectedDestination}
                classNamePrefix={'react-select'}
                onChange={setSelectedDestination}
                options={countriesOption}
                placeholder={t('choose')}
                isMulti
            />
        </div>
        </>
    )
}