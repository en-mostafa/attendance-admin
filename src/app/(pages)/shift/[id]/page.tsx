import { getData } from "@/services/fetchData";
import AddShift from "../components/Add";

export default async function Page() {
    const { data } = await getData('/ip/index');
    return (
        <AddShift ips={data} />
    )
}