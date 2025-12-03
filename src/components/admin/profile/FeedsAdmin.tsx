"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendFeeds } from "@/services/suggestion.server";
import { useTranslations } from "next-intl";

const FeedsAdmin = () => {
  const t = useTranslations('Public');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.title.trim().length < 3 ||
      formData.description.trim().length < 5
    ) {
      toast.error(t('toast_error'));
      return;
    }

    setLoading(true);
    const success = await sendFeeds(formData);
    setLoading(false);

    if (success) {
      toast.success(t("toast_success"));
      setFormData({ title: "", description: "" });
    } else {
      toast.error(t('toast_error'));
    }
  };

  return (
    <div className="max-w-xl mx-auto ms-lg-15" style={{ width: "100%" }}>
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4">{t("send_feedback")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              {t("title")}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              {t("description")}
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-100 text-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? t('sending') : t('send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedsAdmin;
