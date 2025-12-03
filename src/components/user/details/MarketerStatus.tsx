import { marketerStatus } from "@/services/userServices";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useState } from "react"

export default function MarketerStatus({ data }: { data:any }) {
    const[checked, setChecked] = useState(data?.marketer);
    const [state, action] = useActionState(marketerStatus, null);
    const t =  useTranslations('Public');

    useEffect(() => {
        state?.message === 'enable' && setChecked(true);
        state?.message === 'unable' && setChecked(false);
    }, [state])

    const handleChange = () => {
        const formData = {
            id: data?.id,
            status: checked
        }
        startTransition(() => {
            action(formData)
        })
        setChecked(!checked)
    }

    return (
        <div className="form-check form-check-solid form-check-custom form-switch d-flex mx-3">
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={handleChange} 
                className="form-check-input w-45px h-30px mt-3 mb-2"  
            />
            <label className="form-check-label " htmlFor="githubswitch">{checked ? t('active') : t('not_active')}</label>
        </div>
    )
}