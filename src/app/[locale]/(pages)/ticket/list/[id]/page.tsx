import { getMessageForTicket } from "@/services/ticket.server";
import Chat from "@/components/ticket/Chat/Chat";

type Props = {
  params:  Promise<{ id: string }>;
};

const TicketPage = async ({ params }: Props) => {
  const { id } = await params;
  const res = id ? await getMessageForTicket(+id) : { data: [] };

  return <Chat messages={res.data} detail={res.detail} ticketId={+id}/>;
};

export default TicketPage;
