'use client'

import Table from "@/components/case/Table";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SearchCase } from "@/components/case/Search";

export default function Admin() {
    const [cases, setCases] = useState<string | null>(null);
    const t = useTranslations("Public")

    return (    
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">{t("file_list")}</span>
                            </h3>
                            <div className="card-toolbar gap-4">
                                <SearchCase setCases={setCases}/>
                            </div>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <Table cases={cases} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}