import { useJalaliFormat } from "@/services/formatDate";
import { useLocale, useTranslations } from "next-intl";

const Message = ({
  message,
  isCurrentUser,
}: {
  message: any;
  isCurrentUser: boolean;
}) => {
  const t = useTranslations("Public.Chat");
  const local = useLocale();

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
                  message.sender.profileImage !== null
                    ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${message.sender.profileImage}`
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
                <span className="fs-5 fw-bold text-gray-900">{t("you")}</span>

                <div className="text-muted d-flex align-items-center justify-content-end gap-3 mt-3">
                  <small>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                  <small className="badge badge-light-success">
                    {useJalaliFormat(message.createdAt, local)}
                  </small>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "left" }}>
                <a
                  href="#"
                  className="fs-5 fw-bold text-gray-900 text-hover-primary"
                >
                  {message.sender.client.firstName}{" "}
                  {message.sender.client.lastName}
                </a>
                <div className="text-muted d-flex align-items-center justify-content-end gap-3 mt-3">
                  <small className="badge badge-light-primary">
                      {useJalaliFormat(message.createdAt, local)}
                  </small>
                  <small>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                </div>
              </div>
            )}
          </div>
          {isCurrentUser && (
            <div className="symbol symbol-35px symbol-circle">
              <img
                alt="Profile"
                src={
                  message.sender.profileImage
                    ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${message.sender.profileImage}`
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
              {message.file.map((file: any, index: number) => (
                <img
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${file.path}`}
                  alt="attachment"
                  width={300}
                  style={{ borderRadius: "10px" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
