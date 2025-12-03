// app/admin-chats/page.tsx
import Sidebar from "@/components/admin_chat/Sidebar";
import Chat from "@/components/admin_chat/Chat";
import { apiCallGetMessages, apiCallGetUserChats } from "@/services/admin.chat";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams?: Promise<any>;
};

export default async function AdminChatsPage({ searchParams }: Props) {
  const t = await getTranslations('Public.Chat');
  const params = await searchParams;
  const chatIdRaw = params?.chat || null;

  const chatId =
    typeof chatIdRaw === "string" && /^\d+$/.test(chatIdRaw)
      ? parseInt(chatIdRaw, 10)
      : null;

  const sidebarData = await apiCallGetUserChats();
  let chatData = null;
  if (chatId) {
    chatData = await apiCallGetMessages(chatId);
  }

  return (
    <div className="d-flex">
      <Sidebar users={sidebarData?.data || []} />
      <div className="flex-grow-1">
        {chatData && chatId ? (
          <Chat messages={chatData.data} userId={+chatData?.id} recieverId={+chatId} />
        ) : (
          <div
            className="text-center d-flex align-items-center justify-content-center"
            style={{ height: "100%" }}
          >
            <p className="text-muted">{t("choose_conversation")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
