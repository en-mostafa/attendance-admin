"use client";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFeeds, deleteFeeds } from "@/services/suggestion.server";
import Spinner from "@/components/ui/spinner";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";

type Feed = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

const Feeds = () => {
  const role = useContext(SessionContext);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const t = useTranslations('Public');

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    setLoading(true);
    const res = await getFeeds();
    if (res?.message) {
      toast.error(res.message);
    } else {
      setFeeds(res);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const ok = await deleteFeeds(id);
    if (ok) {
      toast.success(`${t('suggestion_successfully_deleted')}`);
      fetchFeeds();
    } else {
      toast.error(`${t('suggestion_error_deleted')}`);
    }
  };

  return (
    <div className="container mt-12">
      <div className="card pt-4 mb-6 mb-xl-9 card-body">
        <div className="d-flex justify-content-between align-items-center mb-6">
          <h3>{t('suggestions_list')}</h3>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner />
          </div>
        ) : feeds.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-3 fw-bold mb-2">{t('nothing_was_found')}</div>
            <div className="fs-6">{t('no_suggestion_submitted')}</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
              <thead>
                <tr className="fw-bold text-muted bg-light border-bottom-0">
                  <th className="ps-4 rounded-start">#</th>
                  <th>{t('title')}</th>
                  <th className="text-start">{t('description')}</th>
                  <th>{t('date_of_registration')}</th>
                  {role?.suggestion.delete_suggestion && (
                    <th className="pe-4 rounded-end">{t('operation')}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {feeds.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="ps-4">{idx + 1}</td>
                    <td>{item.title}</td>
                    <td className="text-start">{item.description}</td>
                    <td>{item.createdAt.slice(0, 10)}</td>
                    {role?.suggestion.delete_suggestion && (
                      <td>
                        <button
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target={`#delete_modal_${item.id}`}
                          onClick={() => setSelectedDeleteId(item.id)}
                        >
                          <i className="ki-outline ki-trash fs-2"></i>
                        </button>
                        <DeleteConfirmModal
                          id={`delete_modal_${item.id}`}
                          onConfirm={() =>
                            selectedDeleteId && handleDelete(selectedDeleteId)
                          }
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feeds;
