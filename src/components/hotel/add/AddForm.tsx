'use client'
import { startTransition, useActionState, useEffect, useMemo, useState } from "react";
import UseUploadFiles from "@/hooks/useUploadFiles";
import dynamic from 'next/dynamic';
import Editor from "./Editor";
import { useData } from "@/hooks/useData";
import Spinner from "@/components/ui/spinner";
import { pipe } from "@/services/pipe";
import Link from "next/link";
import { addHotelForm } from "@/services/hotelServices";
import { useRouter } from "@/i18n/routing";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
const Select = dynamic(() => import('react-select'), { ssr: false });
const Map = dynamic(() => import('../map/Map'), { ssr: false });



export default function AddForm() {
    const t = useTranslations('Public.Hotel');
    const router = useRouter();
    const { data: countries = [] } = useData('/country');
    const [country, setCountry] = useState<null | any>(null);
    const [city, setCity] = useState<null | any>(null);
    const [files, setFiles] = useState<File | any>(null);
    const { data: cities = [] } = useData(country ? `/city/${country?.value}` : null);
    const [options, setOptions] = useState([{ title:'', icon:'' }]);
    const [rooms, setRooms] = useState([{ type:'', numberOfGuests:'', price:'', discount:'0', tax:'0', options:['']}]);
    const [position, setPosition] = useState<any>([51.505, -0.09]);
    const [state, action, pending] = useActionState(addHotelForm, null);
    const defaultValueQuill = {
    ops: [
           { insert: `${t('hotel_description')}\n` },
         ]
    };
    const [description, setDescription] = useState<any>(defaultValueQuill);

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
            router.push('/hotel/list')
        }
    }, [state])


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


    //Hotel option
    const handleChange = (index: number, name: string, value: string) => {
        const data: any[] = [...options];
        data[index][name] = value
        setOptions(data)
    }
    const addOption = () => {
        let newInput = { title:'', icon:'' };
        setOptions([...options, newInput])
    }
    const removeOption = (i: number) => {
        const newItem = options.filter((input, index) => index !== i);
        setOptions(newItem)
    }


    //Rooms
    const handleChangeFeild = (index: number, name: string, value: string) => {
        const data: any[] = [...rooms];
        data[index][name] = value
        setRooms(data)
    }
    const addRooms = () => {
        let newInput = {type:'', numberOfGuests:'', price:'', discount:'0', tax:'0', options:['']};
        setRooms([...rooms, newInput])
    }
    const removeRooms = (i: number) => {
        const newItem = rooms.filter((input, index) => index !== i);
        setRooms(newItem)
    }

    //Room option
    const handleChangeOption = (i:number, index: number, value:string) => {
        const updateRoom: any[] = [...rooms]; 
        updateRoom[index].options[i] = value;
        setRooms(updateRoom)
    }
    const addRoomOption = (index: number) => {
        const updatedRooms = [...rooms];
        updatedRooms[index].options.push('');
        setRooms(updatedRooms);
    }
    const removeOptionRoom = (index: number, indexOp: number) => {
        const updatedRooms = [...rooms];
        updatedRooms[index].options.splice(indexOp, 1);
        setRooms(updatedRooms);
    }
  
   
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        files.forEach((file: File) => {
            formData.append('files', file)
        });
        formData.append('options', JSON.stringify(options))
        formData.append('rooms', JSON.stringify(rooms))
        formData.append("latitude", position.lat ?? position[0])
        formData.append("longitude", position.lng ?? position[1])
        formData.append('description', description)
        startTransition(() => {
            action(formData)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t("hotel_name")}</label>
                        <input type="text" name="name" className={`form-control ${state?.errors?.name && 'is-invalid'}`} placeholder={t("title")} aria-label="Server" />
                        <div className="invalid-feedback">{state?.errors?.name}</div>
                    </div>
                    <div className="col-md-4 mt-4 mt-md-0">
                        <label htmlFor="basic-url" className="form-label">{t("choose_location_country_hotel")}</label>
                        <Select
                            value={country}
                            classNamePrefix={'react-select'}
                            onChange={setCountry}
                            options={countriesOption}
                            placeholder={t("choose")}
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
                            placeholder={t("choose")}
                        />
                        <input type="text" name="locationCityId" defaultValue={city?.value} hidden />
                        <div className="text-danger mt-2">{state?.errors?.locationCityId}</div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <label htmlFor="basic-url" className="form-label"> {t("star")} ({t("digit")})</label>
                        <input type="text" name="stars" className={`form-control ${state?.errors?.stars && 'is-invalid'}`} placeholder={t("star")} aria-label="Server" />
                        <div className="invalid-feedback">{state?.errors?.stars}</div>
                    </div>
                    <div className="col-md-8 mt-4">
                        <label htmlFor="basic-url" className="form-label">{t("hotel_address")}</label>
                        <input type="text" name="address" className={`form-control ${state?.errors?.address && 'is-invalid'}`} placeholder={t("hotel_address")} aria-label="Server" />
                        <div className="invalid-feedback">{state?.errors?.address}</div>
                    </div>
                    <div id="kt_docs_repeater_nested" className="mt-4">
                        <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_nested_outer">
                                {options.map((option, index) => (
                                    <div key={index} data-repeater-item>
                                        <div className="form-group row mb-5">
                                            <div className="col-md-4">
                                                <label className="form-label">{t("hotel_option")}</label>
                                                <input 
                                                    type="text" 
                                                    name="title" 
                                                    value={option.title}
                                                    onChange={e => handleChange(index, 'title', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t("options")}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">{t('icon')}</label>
                                                <input 
                                                    type="text" 
                                                    name="icon" 
                                                    value={option.icon}
                                                    onChange={e => handleChange(index, 'icon', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={`${t("example")}: bx bx-buildings`} 
                                                />
                                                <Link href="https://boxicons.com/" target="_blank" className="text-primary text-decoration-underline mt-1 d-inline-block">{t("get_icon")}</Link>
                                            </div>
                                            <div className="col-md-2 mt-8" onClick={() => removeOption(index)}>
                                                <button type="button" data-repeater-delete className="btn mx-2 btn-flex btn-light-danger">
                                                    {t("delete")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" data-repeater-create className="btn btn-flex btn-light-primary" onClick={addOption}>
                                <i className="ki-duotone ki-plus fs-3"></i>
                                {t("add_option")}
                            </button>
                        </div>
                    </div>

                    {/*Rooms*/}
                    <label htmlFor="basic-url" className="form-label mt-20 fw-bold fs-3">{t("rooms")} :</label>
                    <div id="kt_docs_repeater_nested" className="mt-2">
                        <div className="form-group">
                            <div data-repeater-list="kt_docs_repeater_nested_outer">
                                {rooms.map((room, index) => 
                                    <div key={index} data-repeater-item>
                                        <div className="form-group row mb-5">
                                            <div className="col-md-4">
                                                <label className="form-label">{t("title")}</label>
                                                <input 
                                                    type="text" 
                                                    value={room.type}
                                                    onChange={e => handleChangeFeild(index, 'type', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t("title")} 
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">{t("capacity")} ({t('digit')})</label>
                                                <input 
                                                    type="text" 
                                                    value={room.numberOfGuests}
                                                    onChange={e => handleChangeFeild(index, 'numberOfGuests', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t("capacity")}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">{t("price")} ({t("euro")})</label>
                                                <input 
                                                    type="text" 
                                                    value={pipe(room.price)}
                                                    onChange={e => handleChangeFeild(index, 'price', (e.target.value).replace(/\,/g, ''))}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t("price")}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">{t('discount')} ({t("digit")})</label>
                                                <input 
                                                    type="number" 
                                                    value={room.discount}
                                                    onChange={e => handleChangeFeild(index, 'discount', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t("enter_number")} 
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">{t("tax")} ({t('digit')})</label>
                                                <input 
                                                    type="number" 
                                                    value={room.tax}
                                                    onChange={e => handleChangeFeild(index, 'tax', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t("enter_number")} 
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <div className="inner-repeater">
                                                    <div data-repeater-list="kt_docs_repeater_nested_inner">
                                                        {room.options.map((option, i) => 
                                                            <div key={i} data-repeater-item>
                                                                <label className="form-label mt-4">{t("options")}</label>
                                                                <div className="input-group pb-3">
                                                                    <input 
                                                                        type="text" 
                                                                        value={option}
                                                                        onChange={e => handleChangeOption(i, index, e.target.value)}
                                                                        className="form-control" 
                                                                        placeholder={t("options")}
                                                                    />
                                                                    <button onClick={() => removeOptionRoom(index, i)} className="border border-secondary btn btn-icon btn-flex btn-light-danger" data-repeater-delete type="button">
                                                                        <i className="ki-duotone ki-trash fs-5"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3 d-flex align-items-end">
                                                <button onClick={() => addRoomOption(index)} className="btn btn btn-flex btn-light-primary mb-2" type="button">
                                                    <i className="ki-duotone ki-plus fs-5"></i>
                                                    {t("add_option")}
                                                </button>
                                                <button onClick={() => removeRooms(index)} type="button" className="btn mx-2 btn-flex btn-light-danger mb-2">
                                                   {t("room_delete")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" onClick={addRooms} className="btn btn-flex btn-primary">
                                <i className="ki-duotone ki-plus fs-3"></i>
                                {t("room_add")}
                            </button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <UseUploadFiles setFiles={setFiles} />
                    </div>
                    <div className="mt-10">
                        <Editor description={description} setDescription={setDescription} />
                    </div>
                    <div className="mt-20">
                        <label htmlFor="basic-url" className="form-label form-label fw-bold fs-3">{t("hotel_location")}</label>
                        <Map position={position} setPosition={setPosition}/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{pending ? <Spinner /> : t('info_add')}</button>
                { state?.message === 'error' && <span className="text-danger d-block mt-3">{state?.error}</span> }
            </div>
        </form>
    )
}