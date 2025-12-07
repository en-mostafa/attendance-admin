import AddShift from "@/components/admin/work_shift/Add";
import { getData } from "@/services/fetchData";

export default async function Page() {
    const { data } = await getData('/ip/index');
    return (
        <AddShift ips={data} />
    )
}