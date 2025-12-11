import FormEdit from "@/components/admin/work_shift/FormEdit";
import { getData } from "@/services/fetchData";

export default async function EditWorkShift({ 
    params 
} : { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    const data = await getData(`/attendance/shift/${id}`);
    
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div id="kt_app_content" className="app-content flex-column-fluid">
                        <div className="card-body pt-6">
                            <FormEdit data={data}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

