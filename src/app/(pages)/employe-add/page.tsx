import { getData } from "@/services/fetchData";
import AddUser from "./components/AddUser";

export default async function Page() {
    const shifts = await getData("/shift/index");
    return (
        <AddUser shifts={shifts?.data} />
    )
}