import { getData } from "@/services/fetchData";
import EditShift from "../components/Edit";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const { data } = await getData(`/shift?id=${id}`);
    const { data: ips } = await getData('/ip/index');

    return (
        <EditShift data={data} ips={ips} />
    )
}