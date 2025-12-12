import '../../../public/assets/css/loading.css';

export default function LoadingPage() {
    return (
        <div className="spinnerContainer">
            <div className="spinner"></div>
            <div className="loader">
                <p>در حال دریافت اطلاعات ...</p>
            </div>
        </div>
    )
}