"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import BootstrapModal from "@/components/ui/BootstrapModal";
import { searchUsers, getCategoriesUser } from "@/services/search.server";
import { useTranslations } from "next-intl";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface Option {
  value: string | number | boolean;
  label: string;
}

interface Props {
  onResult: (items: any[]) => void;
  onQuery: (params: any) => void;
}



export default function SearchUser({ onResult, onQuery }: Props) {
  const t =  useTranslations('Public');
  const [userId, setUserId] = useState<string>("");
  const [status, setStatus] = useState<Option | null>(null);
  const [email, setEmail] = useState<string>("");
  const [cellphone, setCellphone] = useState<string>("");
  const [isLegal, setIsLegal] = useState<Option | null>(null);
  const [gender, setGender] = useState<Option | null>(null);
  const [category, setCategory] = useState<Option | null>(null);
  const [nationalCode, setNationalCode] = useState<string>("");
  const [marketer, setMarketer] = useState<Option | null>(null);
  const [categories, setCategories] = useState<Option[]>([]);

  const genderOptions: Option[] = [
  { value: "male", label: t('male') },
  { value: "female", label: t('female') },
  { value: "other", label: t('other') },
];

const legalOptions: Option[] = [
  { value: "true", label: t('legal_user') },
  { value: "false", label: t('real_user') },
];

const booleanOptions: Option[] = [
  { value: true, label: t('yes') },
  { value: false, label: t('no') },
];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const ct = await getCategoriesUser();
        setCategories(
          (ct || []).map((c: any) => ({ value: c.id, label: c.name }))
        );
      } catch (err) {
        toast.error(t('error_fetching_categories_list'));
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = async () => {
    const params = {
      userId: userId ? Number(userId) : undefined,
      status: status?.value,
      email: email || undefined,
      cellphone: cellphone || undefined,
      isLegal: isLegal?.value,
      marketer: marketer?.value,
      gender: gender?.value,
      categoryId: category?.value,
      nationalCode: nationalCode || undefined,
      page: 1,
    };

    const data = await searchUsers(params);
    if (data) {
      onResult(data);
      onQuery(params);
    } else {
      toast.error(t('User.error_search_users'));
    }
  };

  return (
    <>
      <button
        className="btn btn-sm btn-light-primary"
        data-bs-toggle="modal"
        data-bs-target="#searchUserModal"
      >
        {t('User.search_user')}
        <FiSearch className="fs-2 mx-2" />
      </button>

      <BootstrapModal
        id="searchUserModal"
        title={t('User.search_user')}
        onConfirm={handleSearch}
        textConfirm={t('search')}
      >
        <div className="mb-3">
          <label className="form-label">{t('User.user_id')}</label>
          <input
            type="number"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('active_status')}</label>
          <Select
            value={status}
            classNamePrefix={'react-select'}
            onChange={(opt: any) => setStatus(opt)}
            options={booleanOptions}
            isClearable
            placeholder={t('choose')}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('email')}</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('mobile')}</label>
          <input
            type="text"
            className="form-control"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('national_id')}</label>
          <input
            type="text"
            className="form-control"
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('User.legal_personality')}</label>
          <Select
            value={isLegal}
            classNamePrefix={'react-select'}
            onChange={(opt: any) => setIsLegal(opt)}
            options={legalOptions}
            isClearable
            placeholder={t('choose')}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('gender')}</label>
          <Select
            value={gender}
            classNamePrefix={'react-select'}
            onChange={(opt: any) => setGender(opt)}
            options={genderOptions}
            isClearable
            placeholder={t('choose')}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('marketer')}</label>
          <Select
            value={marketer}
            classNamePrefix={'react-select'}
            onChange={(opt: any) => setMarketer(opt)}
            options={booleanOptions}
            isClearable
            placeholder={t('choose')}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('category')}</label>
          <Select
            value={category}
            classNamePrefix={'react-select'}
            onChange={(opt: any) => setCategory(opt)}
            options={categories}
            isLoading={!categories.length}
            isClearable
            placeholder={t('category_selection')}
          />
        </div>
      </BootstrapModal>
    </>
  );
}
