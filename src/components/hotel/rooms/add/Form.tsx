'use client'
import { startTransition, useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { pipe } from "@/services/pipe";
import { addRoomHotelForm } from "@/services/hotelServices";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";


export default function AddRoomForm({ id } : { id: string }) {
    const t = useTranslations('Public.Hotel');
    const router = useRouter();
    const [rooms, setRooms] = useState([{ type:'', numberOfGuests:'', price:'', discount:'', tax:'', options:['']}]);
    const [state, action, pending] = useActionState(addRoomHotelForm, null);

    useEffect(() => {
        if(state?.message === 'success') {
            router.push(`/hotel/list/rooms/${id}`)
        }
    }, [state])


    //Rooms
    const handleChangeFeild = (index: number, name: string, value: string) => {
        const data: any[] = [...rooms];
        data[index][name] = value
        setRooms(data)
    }
    const addRooms = () => {
        let newInput = {type:'', numberOfGuests:'', price:'', discount:'', tax:'', options:['']};
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
        const data = {
            id,
            rooms
        }
        startTransition(() => {
            action(data)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="row">
                    <label htmlFor="basic-url" className="form-label fw-bold fs-3">{t("rooms")} :</label>
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
                                                    placeholder={t('title')} 
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
                                                <label className="form-label">{t('price')} ({t('euro')})</label>
                                                <input 
                                                    type="text" 
                                                    value={pipe(room.price)}
                                                    onChange={e => handleChangeFeild(index, 'price', (e.target.value).replace(/\,/g, ''))}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t('price')} 
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">{t('discount')} ({t('digit')})</label>
                                                <input 
                                                    type="text" 
                                                    value={room.discount}
                                                    onChange={e => handleChangeFeild(index, 'discount', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t('discount')} 
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">{t('tax')} ({t('digit')})</label>
                                                <input 
                                                    type="text" 
                                                    value={room.tax}
                                                    onChange={e => handleChangeFeild(index, 'tax', e.target.value)}
                                                    className="form-control mb-2 mb-md-0" 
                                                    placeholder={t('tax')} 
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <div className="inner-repeater">
                                                    <div data-repeater-list="kt_docs_repeater_nested_inner">
                                                        {room.options.map((option, i) => 
                                                            <div key={i} data-repeater-item>
                                                                <label className="form-label mt-4">{t('options')}</label>
                                                                <div className="input-group pb-3">
                                                                    <input 
                                                                        type="text" 
                                                                        value={option}
                                                                        onChange={e => handleChangeOption(i, index, e.target.value)}
                                                                        className="form-control" 
                                                                        placeholder={t('options')} 
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
                            <button type="button" onClick={addRooms} className="btn btn-flex btn-light-primary">
                                <i className="ki-duotone ki-plus fs-3"></i>
                                {t("room_add")}
                            </button>
                        </div>
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