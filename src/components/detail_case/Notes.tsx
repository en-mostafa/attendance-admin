"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import Image from "next/image";
import { LuNotebookPen } from "react-icons/lu";
import {
  createCaseNote,
  getCaseNotes,
  deleteCaseNotes,
} from "@/services/case.server";
import DeleteConfirmModalProps from "../ui/DeleteConfirmModal";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface CaseNote {
  id: number;
  createdAt: string;
  message: string;
  user: {
    id: number;
    profileImage: string;
    client: {
      firstName: string;
      lastName: string;
    };
  };
}

const Notes = ({ caseID }: { caseID: number }) => {
  const [notes, setNotes] = useState<CaseNote[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const noteBoxRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("Public");

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (notes.length) {
      goToBottomBox()
    }
  }, [notes])

  const fetchNotes = async () => {
    setLoading(true);
    const res = await getCaseNotes(caseID);
    console.log(res.caseNotes);
    
    if (res) setNotes(res.caseNotes || []);
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setLoading(true);

    const created = await createCaseNote(caseID, newMessage.trim());
    if (created) {
      fetchNotes();
      setNewMessage("")
    } else {
      toast.error(t('note_create_error'));
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    console.log("TTTTTTTTTTTTTTTTTTTTT", id);
    
    const res = await deleteCaseNotes(id);
    console.log(res);
    if (res) {
      fetchNotes();
    } else {
      toast.error(t('note_delete_error'));
    }
  };

  const goToBottomBox = () => {
    noteBoxRef.current?.scrollTo({top: noteBoxRef.current.scrollHeight, behavior: "smooth"})
  }

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      {/* عنوان */}
      <div className="mb-8 d-flex align-items-center justify-content-center gap-2">
        <LuNotebookPen style={{ fontSize: "24px" }} />
        <h3 className="fw-bold mb-0">{t('file_notes')}</h3>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid lightgray",
          height: "600px",
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      >
        {/* لیست یادداشت‌ها */}
        <div className="flex-grow-1 overflow-auto p-3" ref={noteBoxRef}>
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="card mb-3 shadow-sm rounded-xl">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <Image
                        src={
                          note.user.profileImage
                            ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${note.user.profileImage}`
                            : "/assets/media/svg/avatars/blank.svg"
                        }
                        alt="profile"
                        width={50}
                        height={50}
                        style={{ borderRadius: "10px" }}
                      />
                      <h6 className="mb-0 fw-semibold px-3">
                        {note.user.client.firstName} {note.user.client.lastName}
                      </h6>
                    </div>
                    <button
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteModal_${note.id}`}
                    >
                      <i className="ki-outline ki-trash fs-3"></i>
                    </button>
                    <DeleteConfirmModalProps
                      id={`deleteModal_${note.id}`}
                      onConfirm={() => {
                        handleDelete(note.id)
                      }}
                    />
                  </div>
                  <div className="flex-grow-1 mt-6">
                    <p className="mb-2 px-4">{note.message}</p>
                    <div className="text-end">
                      <div className="text-muted d-flex align-items-center justify-content-end gap-3">
                        <small>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                        <small className="badge badge-light-primary">{note.createdAt.slice(0, 10)}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted mt-4">
              📭 {t('no_exist_note')}
            </div>
          )}
        </div>

        {/* فرم ارسال یادداشت */}
        <form onSubmit={handleSubmit} className="border-top">
          <div className="input-group shadow-sm rounded overflow-hidden">
            <input
              type="text"
              className="form-control border-0"
              placeholder={t('write_new_note')}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn btn-success"
              type="submit"
              disabled={loading}
            >
              {loading ? t('Chat.sending') : t('send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notes;
