"use client";
import Image from "next/image";
import { Report } from "notiflix";
import { useState } from "react";

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export default function RequestForm({ submitHandler }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        request: ""
    });
    const [formTyping, setFormTyping] = useState({
        nameTyping: false,
        emailTyping: false,
        subjectTyping: false,
        requestTyping: false
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        subject: "",
        request: ""
    });
    const [pending, setPending] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) {
            newErrors.name = "Name is required!";
        }
        if (!form.email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!validateEmail(form.email)) {
            newErrors.email = "Invalid email address!";
        }
        if (!form.subject.trim()) {
            newErrors.subject = "Subject is required!";
        }
        if (!form.request.trim()) {
            newErrors.request = "Issue/Request is required!";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        } else {
            setErrors({});
        }

        setPending(true);
        try {
            const result = await submitHandler(form);
            if (result.status === "success") {
                Report.success(
                    "Success",
                    "Your issue/request has been successfully submitted!",
                    "Ok",
                    () => {
                        setForm({ name: "", email: "", subject: "", request: "" });
                    }
            );
        } else {
            Report.failure("Error", result.message || "Something went wrong", "Ok");
        }
        } catch (error) {
            Report.failure("Error", error.message, "Ok");
        } finally {
            setPending(false);
        }
    };

return (
        <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="pb-1">
                <label htmlFor="name" className="text-black/90 text-sm">
                Name<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-2">
                <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setFormTyping({ ...formTyping, nameTyping: true });
                }}
                className={`focus:bg-blue-100 focus:outline-none p-4 border-solid rounded-lg h-8 w-full pr-10 ${
                    errors.name ? "border-red-500" : "border-slate-800/10"
                }`}
                style={{ borderWidth: 1 }}
                />
                {errors.name && (
                <span className="text-[0.80rem] text-red-500">{errors.name}</span>
                )}
                {formTyping.nameTyping && form.name !== "" && (
                <div
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setForm({ ...form, name: "" })}
                    style={{ top: "0.35rem" }}
                >
                    <Image
                    src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"
                    alt="Clear input"
                    width={24}
                    height={24}
                    />
                </div>
                )}
            </div>

            {/* Email Field */}
            <div className="pb-1">
                <label htmlFor="email" className="text-black/90 text-sm">
                Email<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-2">
                <input
                type="text"
                id="email"
                value={form.email}
                onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setFormTyping({ ...formTyping, emailTyping: true });
                }}
                className={`focus:bg-blue-100 focus:outline-none p-4 border-solid rounded-lg h-8 w-full pr-10 ${
                    errors.email ? "border-red-500" : "border-slate-800/10"
                }`}
                style={{ borderWidth: 1 }}
                />
                {errors.email && (
                <span className="text-[0.80rem] text-red-500">{errors.email}</span>
                )}
                {formTyping.emailTyping && form.email !== "" && (
                <div
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setForm({ ...form, email: "" })}
                    style={{ top: "0.35rem" }}
                >
                    <Image
                    src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"
                    alt="Clear input"
                    width={24}
                    height={24}
                    />
                </div>
                )}
            </div>

            {/* Subject Field */}
            <div className="pb-1">
                <label htmlFor="subject" className="text-black/90 text-sm">
                Issue Subject<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-2">
                <input
                type="text"
                id="subject"
                value={form.subject}
                onChange={(e) => {
                    setForm({ ...form, subject: e.target.value });
                    setFormTyping({ ...formTyping, subjectTyping: true });
                }}
                className={`focus:bg-blue-100 focus:outline-none p-4 border-solid rounded-lg h-8 w-full pr-10 ${
                    errors.subject ? "border-red-500" : "border-slate-800/10"
                }`}
                style={{ borderWidth: 1 }}
                />
                {errors.subject && (
                <span className="text-[0.80rem] text-red-500">{errors.subject}</span>
                )}
                {formTyping.subjectTyping && form.subject !== "" && (
                <div
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setForm({ ...form, subject: "" })}
                    style={{ top: "0.35rem" }}
                >
                    <Image
                    src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"
                    alt="Clear input"
                    width={24}
                    height={24}
                    />
                </div>
                )}
            </div>

            {/* Issue/Request Field */}
            <div className="pb-1">
                <label htmlFor="request" className="text-black/90 text-sm">
                Issue/Request<span className="text-red-500">*</span>
                </label>
            </div>
            <div className="relative pb-2">
                <textarea
                id="request"
                value={form.request}
                onChange={(e) => {
                    setForm({ ...form, request: e.target.value });
                    setFormTyping({ ...formTyping, requestTyping: true });
                }}
                className={`focus:bg-blue-100 focus:outline-none p-4 border-solid rounded-lg w-full pr-10 resize-none ${
                    errors.request ? "border-red-500" : "border-slate-800/10"
                }`}
                style={{ borderWidth: 1, minHeight: "100px" }}
                ></textarea>
                {errors.request && (
                <span className="text-[0.80rem] text-red-500">{errors.request}</span>
                )}
                {formTyping.requestTyping && form.request !== "" && (
                <div
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setForm({ ...form, request: "" })}
                    style={{ top: "2.3rem", right: "1.5rem" }}
                >
                    <Image
                    src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"
                    alt="Clear input"
                    width={24}
                    height={24}
                    />
                </div>
                )}
            </div>

            {pending ? (
                <div className="h-12 rounded-xl flex justify-center items-center cursor-pointer mt-4 bg-blue-600 text-black/40">
                <span className="loading loading-spinner loading-md text-white"></span>
                </div>
            ) : (
                <button
                type="submit"
                className="h-12 bg-blue-700 rounded-xl flex justify-center items-center cursor-pointer mt-4 w-full hover:bg-blue-500"
                >
                <span className="font-bold text-white">Submit</span>
                </button>
            )}
        </form>
    );
}
