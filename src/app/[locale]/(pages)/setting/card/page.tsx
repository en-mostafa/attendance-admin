"use client";
import React, { useEffect, useState, CSSProperties } from "react";
import {
  getCardsList,
  deleteCard,
  createNewCard,
} from "@/services/settings.server";
import { useTranslations } from "next-intl";

type Card = {
  id: number;
  firstName: string;
  lastName: string;
  bankName: string;
  cardNumber: string;
  accountNumber: string;
  ibanNumber: string;
  ibanSimbol: string;
};

// استایل کارت حرفه‌ای با رنگ مشکی و گرادیانت ملایم
const baseCardStyle: CSSProperties = {
  borderRadius: "16px",
  color: "#fff",
  padding: "20px",
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "linear-gradient(135deg, #000000,rgb(63, 63, 63))",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.3s",
};

const chipStyle: CSSProperties = {
  width: "50px",
  height: "40px",
  background: "#FFD700",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)",
};

const numberStyle: CSSProperties = {
  fontSize: "1.4rem",
  letterSpacing: "2px",
  margin: "12px 0",
  fontFamily: "'Courier New', Courier, monospace",
};

const PaymentSetting: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const t = useTranslations('Public.Setting.Card');

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bankName: "",
    cardNumber: "",
    accountNumber: "",
    ibanNumber: "",
    ibanSimbol: "IR",
  });

  useEffect(() => {
    getCardsList().then((data: any) => {
      const list = Array.isArray(data) ? data : data.cards;
      setCards(list);
    });
  }, []);

  const formatNumber = (num: string) => num.replace(/(\d{4})(?=\d)/g, "$1 ");

  const onDeleteClick = (cardId: number) => {
    setSelectedCardId(cardId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedCardId !== null) {
      deleteCard(selectedCardId).then(() => {
        setCards((prev) => prev.filter((c) => c.id !== selectedCardId));
        setShowModal(false);
        setSelectedCardId(null);
      });
    }
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      bankName,
      cardNumber,
      accountNumber,
      ibanNumber,
      ibanSimbol,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !bankName ||
      !cardNumber ||
      !accountNumber ||
      !ibanNumber ||
      !ibanSimbol
    ) {
      return t('fill_all_fields');
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      return t('card_number_digits');
    }

    if (!/^\d+$/.test(accountNumber)) {
      return t('account_number_numeric');
    }

    if (!/^\d+$/.test(ibanNumber)) {
      return t('iban_number_numeric');
    }

    return "";
  };

  const handleAddCard = async () => {
    const validationMessage = validateForm();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const res = await createNewCard(formData);
    console.log(res);
    window.location.reload();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">{t('cards')}</h2>

      <div className="text-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          {t('create_new_card')}
        </button>
      </div>

      <div className="row g-4 justify-content-center">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} className="col-sm-8 col-md-6 col-lg-4">
              <div style={baseCardStyle}>
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {card.bankName}
                  </span>
                  <div style={chipStyle}>
                    <button
                      className="btn btn-icon btn-active-color-primary btn-sm"
                      onClick={() => onDeleteClick(card.id)}
                    >
                      <i className="ki-outline ki-trash fs-2"></i>
                    </button>
                  </div>
                </div>
                <div style={numberStyle}>{formatNumber(card.cardNumber)}</div>
                <div className="d-flex justify-content-between">
                  <div>
                    <small>{t('card_holder')}</small>
                    <div>{card.firstName} {card.lastName}</div>
                  </div>
                  <div>
                    <small>IBAN</small>
                    <div style={{ fontSize: "0.8rem" }}>
                      {card.ibanSimbol}{card.ibanNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-100">{t('no_registered_card')}</p>
        )}
      </div>

      {/* Modal حذف */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('delete_card')}</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">{t('confirm_card_deletion')}</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>{t('cancellation')}</button>
                <button className="btn btn-danger" onClick={confirmDelete}>{t('delete')}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal افزودن کارت */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('add_new_card')}</h5>
                <button
                  className="btn-close"
                  onClick={() => {
                    setShowAddModal(false);
                    setError("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row g-3">
                  {[
                    ["firstName", t('first_name')],
                    ["lastName", t('last_name')],
                    ["bankName", t('bank_name')],
                    ["cardNumber", t('card_number')],
                    ["accountNumber", t('account_number')],
                    ["ibanNumber", t('iban_number')],
                    ["ibanSimbol", t('iban_simbol')],
                  ].map(([key, label]) => (
                    <div className="col-md-6" key={key}>
                      <label className="form-label">{label}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={(formData as any)[key]}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setError("");
                  }}
                >
                  {t('cancellation')}
                </button>
                <button className="btn btn-success" onClick={handleAddCard}>
                  {t('save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSetting;
