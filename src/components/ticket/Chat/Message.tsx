// components/ticket/Chat/Message.tsx
import { useTranslations } from "next-intl";
import { MessageType } from "./ticket.type";
import { DownloadLink } from "@/components/ui/DownloadLink";

const Message = ({
  message,
  isCurrentUser,
}: {
  message: MessageType;
  isCurrentUser: boolean;
}) => {
  const t = useTranslations('Public');
  return (
    <div
      className="d-flex mb-10"
      style={{ justifyContent: isCurrentUser ? "flex-end" : "flex-start" }}
      dir="ltr"
    >
      <div
        className="d-flex flex-column"
        style={{ alignItems: isCurrentUser ? "flex-end" : "flex-start" }}
      >
        {/* Header: avatar, name, time */}
        <div className="d-flex align-items-center mb-2">
          {!isCurrentUser && (
            <div className="symbol symbol-35px symbol-circle">
              <img
                alt="Profile"
                src={
                  message.user?.profileImage?.length
                    ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${message.user.profileImage}`
                    : "/assets/media/avatars/blank.png"
                }
              />
            </div>
          )}

          <div className="mx-3 mt-4">
            {isCurrentUser ? (
              <div
                className="d-flex flex-column"
                style={{ alignItems: "flex-end", textAlign: "right" }}
              >
                <a
                  href="#"
                  className="fs-5 fw-bold text-gray-900 text-hover-primary"
                >
                  {t('Chat.you')}
                </a>
                <div className="text-muted d-flex align-items-center justify-content-end gap-3 mt-3">
                  <small className="badge badge-light-success">
                    {message.createdAt.slice(0, 10)}
                  </small>
                  <small>{message.createdAt.slice(11, 16)}</small>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "left" }}>
                <a
                  href="#"
                  className="fs-5 fw-bold text-gray-900 text-hover-primary"
                >
                  {message.user.client.firstName || t('Chat.anonymous_user')}
                </a>
                <div className="text-muted d-flex align-items-center justify-content-end gap-3 mt-3">
                  <small className="badge badge-light-primary">
                    {message.createdAt.slice(0, 10)}
                  </small>
                  <small>{message.createdAt.slice(11, 16)}</small>
                </div>
              </div>
            )}
          </div>

          {isCurrentUser && (
            <div className="symbol symbol-35px symbol-circle">
              <img
                alt="Profile"
                src={
                  message.user?.profileImage?.length
                    ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${message.user.profileImage}`
                    : "/assets/media/avatars/blank.png"
                }
              />
            </div>
          )}
        </div>

        {/* Message bubble */}
        <div
          className={`p-5 rounded ${
            isCurrentUser
              ? "bg-light-primary text-right"
              : "bg-light-info text-left"
          } text-gray-900 fw-semibold mw-lg-400px`}
          style={{ textAlign: isCurrentUser ? "right" : "left" }}
        >
          <div>{message.text}</div>

          {message.file?.length > 0 && (
            <div className="mt-3 d-flex flex-column gap-3">
              {message.file?.map(item => 
                <DownloadLink key={item.id} url={`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${item.path}`} fileName={item.path} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
