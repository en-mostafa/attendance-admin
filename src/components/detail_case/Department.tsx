"use client";

import { getAdminByDep, getRoles } from "@/services/admin.server";
import { changeTaskAdmin } from "@/services/case.server";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Select = dynamic(() => import("react-select"), { ssr: false });

import {GrUserAdmin} from "react-icons/gr"
import {PiListBulletsDuotone} from "react-icons/pi"
import { useTranslations } from "next-intl";

type Props = {
  caseID: number;
  invoiceDetail: Record<string, any>;
};

const Department: React.FC<Props> = ({ caseID, invoiceDetail }) => {
  const [departments, setDepartments] = useState<Record<string, any>>([]);
  const [admins, setAdmins] = useState<Record<string, any>>([]);
  const [selectedDep, setSelectedDep] = useState<any>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const t = useTranslations('Public');

  useEffect(() => {
    apiCallGetRoles();
  }, []);

  useEffect(() => {
    if (
      departments.length &&
      invoiceDetail &&
      invoiceDetail.asigner.userAccess[0]?.accessId
    ) {
      const invoiceID = invoiceDetail.asigner.userAccess[0]?.accessId;
      const depFind = departments.find((dep: any) => dep.id === invoiceID);
      setSelectedDep({ value: invoiceID, label: depFind?.name });
    }
  }, [departments]);

  useEffect(() => {
    if (!selectedDep) return;
    apiCallGetAdmins();
  }, [selectedDep]);

  const apiCallGetRoles = async () => {
    const res = await getRoles();
    if (!res) return;
    setDepartments(res);
  };

  const apiCallGetAdmins = async () => {
    const res = await getAdminByDep(selectedDep.value);
    //if (!res) return;
    setAdmins(res);
    const adminFind = res.find(
      (admin: any) => admin.id === invoiceDetail.asigner.client.id
    );
    if (adminFind) {
      setSelectedAdmin({
        value: invoiceDetail.asigner.client.id,
        label: `${invoiceDetail.asigner.client.firstName} ${invoiceDetail.asigner.client.lastName}`,
      });
    }
  };

  const apiCallChangeTask = async (id: number) => {
    const res = await changeTaskAdmin(caseID, {
      userId: id || invoiceDetail.asigner.id,
    });
    console.log(res);
    if (res) {
      toast.success(t('updated_successfully'));
    } else {
      toast.error(t('error_in_update'));
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card shadow-sm border-0 w-100"
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body">
          <h4 className="mb-8 fw-bold d-flex align-items-center justify-content-center">
            {t('selection_department_admin')}
          </h4>

          {!invoiceDetail.asigner.userAccess[0]?.accessId && (
            <div className="alert alert-warning py-2 px-3 mb-4">
             {t('super_admin_task_created')}
            </div>
          )}

          <div className="row g-8">
            <div className="col-12">
              <label className="form-label fw-semibold mb-2 d-flex align-items-center">
                <PiListBulletsDuotone className="me-2" style={{fontSize: "22px"}}/> {t('department')}
              </label>
              {departments.length === 0 ? (
                <div className="text-muted fst-italic">
                 {t('not_found_department')}
                </div>
              ) : (
                <Select
                  value={selectedDep}
                  classNamePrefix={'react-select'}
                  onChange={(v: any) => {
                    setSelectedDep(v);
                  }}
                  placeholder={t('department_selection')}
                  options={departments.map((m: any) => ({
                    value: m.id,
                    label: m.name,
                  }))}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "0.5rem",
                      borderColor: "#e4e6ef",
                      minHeight: "42px",
                    }),
                  }}
                />
              )}
            </div>

            {selectedDep && (
              <div className="col-12">
                <label className="form-label fw-semibold mb-2 d-flex align-items-center">
                  <GrUserAdmin className="me-2" style={{fontSize: "22px"}}/> {t('admin')}
                </label>
                {admins.length ? (
                  <Select
                    value={selectedAdmin}
                    classNamePrefix={'react-select'}
                    onChange={(v: any) => {
                      setSelectedAdmin(v);
                      apiCallChangeTask(v.value);
                    }}
                    placeholder={t('Admin.admin_selection')}
                    options={admins.map((m: any) => ({
                      value: m.id,
                      label: `${m.client.firstName} ${m.client.lastName}`,
                    }))}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "0.5rem",
                        borderColor: "#e4e6ef",
                        minHeight: "42px",
                      }),
                    }}
                  />
                ) : (
                  <div className="text-muted fst-italic">
                    {t('not_found_admin_for_department')}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
