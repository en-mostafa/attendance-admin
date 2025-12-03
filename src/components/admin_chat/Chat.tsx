"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import UploadFile from "./UploadFile";
import Message from "./Message";
import { MessageType } from "./ticket.type";
import { sendMessageToAdmin } from "@/services/admin.chat";
import { useTranslations } from "next-intl";

type Props = {
  messages: any;
  userId: number;
  recieverId: number;
};

const Chat: React.FC<Props> = ({ messages, userId, recieverId }) => {
  const t = useTranslations('Public.Chat');
  const [resetFiles, setResetFiles] = useState(false);
  const [chatMessages, setChatMessages] = useState<MessageType[]>(messages);
  const [state, formAction, pending] = useActionState(sendMessageToAdmin, {
    success: false,
    errors: {},
    data: null,
  });

  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const el = chatBodyRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    setChatMessages(messages)
  }, [messages])

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (state.success && state.data) {
      setChatMessages((prev) => [...prev, state.data]);
      setResetFiles((f) => !f);
    }
  }, [state]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="card" id="kt_chat_messenger" style={{ minHeight: "87vh" }}>
      {/* Body Section */}
      <div className="card-body" id="kt_chat_messenger_body">
        <div
          ref={chatBodyRef}
          className="scroll-y me-n5 pe-5 h-300px h-lg-auto"
          style={{ maxHeight: "calc(87vh - 200px)", overflowY: "auto" }}
        >
          {chatMessages.length ? (
            chatMessages.map((message: any) => {
              const isCurrentUser = message.sender.id === userId;

              return (
                <Message
                  key={message.id}
                  message={message}
                  isCurrentUser={isCurrentUser}
                />
              );
            })
          ) : (
            <div
              className="text-center d-flex align-items-center justify-content-center"
              style={{ height: "-webkit-fill-available" }}
            >
              <p className="text-muted">{t("not_active_message")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <form action={formAction}>
        <div className="card-footer pt-4" id="kt_chat_messenger_footer">
          <input type="hidden" name="receiverId" value={recieverId} />
          <textarea
            className="form-control form-control-flush mb-3"
            rows={1}
            name="text"
            placeholder={t("writing_message")}
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
              {pending ? t("sending"): t("send")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
