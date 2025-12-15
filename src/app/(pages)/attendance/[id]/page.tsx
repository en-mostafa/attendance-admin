import { getData } from "@/services/fetchData";
import Link from "next/link";
import { CalenderMonth } from "../components/date-picker-month";
import Table from "../components/TablePresent";

export default async function presents({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [date: string]: string }>
}) {
    const { id } = await params;
    const param = (await searchParams).date;
    const { data } = await getData(`/attendance/index?id=${id}&date=${param}`)

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">کارمندان</span>
                            </h3>
                            <div className="card-toolbar">
                                <CalenderMonth id={id} />
                            </div>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <Table data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}