"use client"
import RequestForm from "@/components/form";

export default function Home() {
    const postIssue = async (data) => {
        try {
            const response = await fetch("/api/ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                return { status: "success", data: result.data };
            } else {
                return { status: "failed", message: result.error || "Error" };
            }
        } catch (error) {
            return { status: "failed", message: error.message };
        }
    };

    return (
        <section className=" min-h-screen w-screen">
            <div className="flex flex-col w-full h-screen">

                <div className="flex w-full justify-center my-5 h-10">

                    <span>
                        
                    </span>
                </div>
                <div className=" flex flex-col-reverse md:flex-row w-full h-full md:px-4 my-48 md:my-0">
                    <div className="flex flex-col justify-center content-center items-center mb-20 md:mb-0 w-full md:w-1/2">
                        <div className="flex flex-col justify-center content-center items-center md:ml-0">
                            <div className="">
                                <img src="/images/form-background.jpg" alt="Deskripsi Gambar" style={{ width: 400 }} />
                            </div>
                            <div className="flex flex-col w-full items-center justify-center text-center">
                                <div className="">
                                    <span className="text-lg font-bold text-slate-950">Report Bugs Instantly and Automatically</span>
                                </div>
                                <div className="w-4/5 pt-2">
                                    <span className="text-sm">Use our automation tools to submit bug tickets directly to IT, ensuring quick and efficient resolution.</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" flex flex-col justify-center content-center items-center w-full md:w-1/2 mb-10">
                        <div className="container w-full h-2/3  flex flex-col justify-center content-center items-center md:mr-48">
                            <div className="w-full mx-4 my-4">
                                <div className="w-full text-center">
                                    <span className="font-bold text-xl">Let us help fix your bug!</span>
                                </div>
                                <div className="w-full text-center">
                                    <span className="text-sm">Have you reported a bug? Please wait, and we will notify you as soon as it’s resolved.</span>
                                </div>
                                {/* <ClientFlashComponent /> */}
                            </div>
                            <div className="w-5/6 rounded-2xl shadow-lg flex flex-col">
                                <div className="p-8 flex flex-col w-full">
                                    <RequestForm
                                        submitHandler={postIssue} 
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}