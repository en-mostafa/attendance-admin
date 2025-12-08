import AddUser from "@/components/user/manage/AddUser";
import { getData } from "@/services/fetchData";

export default async function Page() {
    const shifts = await getData("/shift/index");
    return (
        <AddUser shifts={shifts?.data} />
    )
}