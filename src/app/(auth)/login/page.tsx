import Form from "@/app/(auth)/login/components/Form";

export default function Login() {

    return (
        <div className="bg-auth d-flex justify-content-center align-items-center p-12">
            <div className="bg-body d-flex flex-column flex-center rounded-4 h-600px w-100 w-md-600px p-10">
                <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-100 w-md-400px">
                    <div className="d-flex flex-center flex-column flex-column-fluid pt-20">
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}