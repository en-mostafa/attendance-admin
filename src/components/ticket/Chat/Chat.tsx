"use client";

import { useState, useEffect, useRef, useActionState, useContext } from "react";
import UploadFile from "./UploadFile";
import Message from "./Message";
import { MessageType } from "./ticket.type";
import { sendMessageToTicket } from "@/services/ticket.server";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";

type Props = {
  messages: MessageType[];
  detail: Record<string, any>;
  ticketId: number;
};

const Chat: React.FC<Props> = ({ messages, detail, ticketId }) => {
  const t = useTranslations('Public');
  const role = useContext(SessionContext);
  const [resetFiles, setResetFiles] = useState(false);
  const [chatMessages, setChatMessages] = useState<MessageType[]>(messages);
  const [state, formAction, pending] = useActionState(sendMessageToTicket, {
    success: false,
    errors: {},
    data: null,
  });

  console.log(messages);

  // 📌 ref برای container پیام‌ها
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  // ✅ helper function برای اسکرول به پایین
  const scrollToBottom = () => {
    const el = chatBodyRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  // 🔄 لود اولیه
  useEffect(() => {
    scrollToBottom();
  }, []);

  // 🔄 هر بار پیام جدید اضافه شد
  useEffect(() => {
    if (state.success && state.data) {
      setChatMessages((prev) => [...prev, state.data]);
      setResetFiles((f) => !f);
    }
  }, [state]);

  // 🔄 اسکرول بعد از آپدیت پیام‌ها
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="card" id="kt_chat_messenger" style={{ height: "100%" }}>
      {/* Header Section */}
      <div className="card-header">
        <div
          className="d-flex mt-2 flex-column"
          style={{ justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0 24px",
            }}
          >
            <p>{t('title')}:  {detail.title}</p>
            <p>
              {t('department')}: 
              {detail.department?.type === "accounting"
                ? t('accounting')
                : detail.department?.type === "hr"
                ? t('human_resources')
                : detail.department?.type === "public_relations"
                ? t('public_relations')
                : detail.department?.type === "support"
                ? t('support')
                : detail.department?.type === "sell"
                ? t('sale')
                : "-"}
            </p>
            <p>
              {t('full_name')}: {detail.client.firstName}{" "}
              {detail.client.lastName}
            </p>
          </div>
        </div>
        <div className="card-toolbar">
          {t('ticket_status')}:
          <span
            className={
              "badge fs-7 fw-bold " +
              (detail.status === "new"
                ? "badge-light-primary"
                : detail.status === "under_review"
                ? "badge-light-warning"
                : detail.status === "answered_by_admin"
                ? "badge-light-info"
                : detail.status === "answered_by_client"
                ? "badge-light-success"
                : "badge-light-danger")
            }
          >
            {detail.status === "new"
              ? t('Status.new')
              : detail.status === "under_review"
              ? t('Status.under_review')
              : detail.status === "answered_by_admin"
              ? t('Status.answered_by_admin')
              : detail.status === "answered_by_client"
              ? t('Status.answered_by_client')
              : t('Status.closed')}
          </span>
        </div>
      </div>

      {/* Body Section */}
      <div className="card-body" id="kt_chat_messenger_body">
        <div
          ref={chatBodyRef}
          className="scroll-y me-n5 pe-5 h-300px h-lg-auto"
          style={{ maxHeight: "calc(100vh - 350px)", overflowY: "auto" }}
        >
          {chatMessages.map((message, index) => (
            <Message
              key={index}
              message={message}
              isCurrentUser={message.site === "admin"}
            />
          ))}
        </div>
      </div>

      {(detail.status !== "closed" && role?.ticket.send_ticket) ? (
        <form action={formAction}>
          <div className="card-footer pt-4" id="kt_chat_messenger_footer">
            <input type="hidden" name="ticketId" value={ticketId} />
            <textarea
              className="form-control form-control-flush mb-3"
              rows={1}
              name="text"
              placeholder={t('Chat.writing_message')}
            />
            {state.errors?.text && (
              <small className="text-danger">{state.errors.text}</small>
            )}
            <div className="d-flex flex-stack">
              <UploadFile resetSignal={resetFiles} />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={pending}
              >
                {pending ? t('Chat.sending') : t('Chat.send')}
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Chat;
