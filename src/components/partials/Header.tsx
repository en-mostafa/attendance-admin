import Image from "next/image";


export default function Header() {

    return (
        <div id="kt_app_header" className="app-header">
            <div className="app-container container-fluid d-flex align-items-stretch flex-stack">
                <div className="d-flex align-items-center d-block d-lg-none ms-n3" title="as">
                    <div className="btn btn-icon btn-active-color-primary w-35px h-35px me-2">
                        <i className="ki-outline ki-abstract-14 fs-2"></i>
                    </div>
                    <a href="index.html">
                        <Image src="/logo.png" width={100} height={100} className="h-100px" alt="Logo" />
                    </a>
                </div>
                <div className="app-navbar flex-lg-grow-1" id="kt_app_header_navbar">
                    <div className="app-navbar-item d-flex align-items-stretch flex-lg-grow-1">
                        <div className="header-search d-flex align-items-center w-lg-200px">
                            <h2>خوش آمدید</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
