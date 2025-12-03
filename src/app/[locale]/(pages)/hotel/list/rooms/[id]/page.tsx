import Table from "@/components/hotel/rooms/Table";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function ListRooms({ params }: { params: Promise<{ id: string }> }) {
    const t = await getTranslations('Public.Hotel');
    const { id } = await params;

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">{t("list_rooms")}</span>
                            </h3>
                            <div className="card-toolbar gap-4">
                                <Link href={`/hotel/add/room/${id}`} type="button" className="btn btn-sm btn-light-primary">
                                    <i className="ki-outline ki-plus fs-2"></i>
                                    {t("room_add")}
                                </Link>
                            </div>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <Table id={id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}