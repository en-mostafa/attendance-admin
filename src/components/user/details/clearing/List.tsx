import NodataItems from "@/components/ui/NodataItems";
import { Items } from "./Items";
import AddRequest from "./AddRequest";
import Spinner from "@/components/ui/spinner";
import useSwr from "@/hooks/useSwr";
import { useTranslations } from "next-intl";

export default function ListClearing({ id } : { id: string }) {
    const t =  useTranslations('Public');
    const { data, mutate } = useSwr(`/payment/slalary/marketer-salary/${id}`)


    return (
        <div className="flex-lg-row-fluid ms-lg-15">
            <div className="card p-10 mb-6 mb-xl-9 card-body">
                <div className="d-flex justify-content-between">
                    <h3>{t('User.settlement_request')}</h3>
                    <AddRequest balance={data?.[0]?.wallet?.balance || 0} id={id} mutate={mutate}/>
                </div>

                <div className="table-responsive mt-5">
                    <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                        <thead>
                            <tr className="fw-bold text-muted bg-light border-bottom-0">
                                <th className="ps-4 rounded-start">{t('amount')} ({t('euro')})</th>
                                <th className="text-center">{t('date_of_registration')}</th>
                                <th className="text-center">{t('status')}</th>
                                <th className="text-end rounded-end pe-4">{t('operation')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item:any) => 
                                <Items key={item.id} item={item} mutate={mutate}/>
                            )}
                            {data?.length === 0 && <NodataItems colSpan={4}/>}
                            <tr>
                                <td colSpan={4}>
                                    {!data &&  <Spinner />}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}














