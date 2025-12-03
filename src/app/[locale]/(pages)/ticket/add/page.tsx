import AddTicketForm from "@/components/ticket/AddTicketForm";
import { getData } from "@/services/fetchData";

const TicketAdd = async () => {
  const res = await getData("/admin/account/retrive-clients?limit=100000");
  const users = res?.data
  
  return (
    <div>
      <AddTicketForm usersList={users}/>
    </div>
  );
};
export default TicketAdd;
