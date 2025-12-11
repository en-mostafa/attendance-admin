import Header from "@/components/partials/Header"
import Sidebar from "@/components/partials/Sidebar"

export default function PageLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
            <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                <Header />
                <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                    <Sidebar />
                    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}