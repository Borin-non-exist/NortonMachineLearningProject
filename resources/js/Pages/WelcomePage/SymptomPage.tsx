import React, { useEffect, useState, useRef } from "react";
import { router, Link } from "@inertiajs/react";
import { MessageSquarePlus, History as HistoryIcon } from "lucide-react";
import { BiUndo } from "react-icons/bi";
import questions from "./questions.json";
import historyData from "./history.json";

// Custom multi-select dropdown component
function MultiSelect({ id, options, selected, onChange, placeholder }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const toggleOpen = () => setOpen(prev => !prev);
    const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onOptionToggle = opt => {
        if (selected.includes(opt)) onChange(id, selected.filter(o => o !== opt));
        else onChange(id, [...selected, opt]);
    };

    const label =
        selected.length > 0
            ? `${selected.length} Selected`
            : placeholder;

    return (
        <div ref={ref} className="relative mt-3">
            <button
                type="button"
                onClick={toggleOpen}
                className="w-full px-4 py-3 border rounded-lg text-sm flex justify-between items-center bg-white dark:bg-gray-700"
            >
                <span>{label}</span>
                <svg className={`h-4 w-4 transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map(opt => (
                        <label key={opt} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selected.includes(opt)}
                                onChange={() => onOptionToggle(opt)}
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-sm">{opt}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function SymptomFormPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isLoggedIn = !!localStorage.getItem("auth_token");
    const [showValidationModal, setShowValidationModal] = useState(false);

    const stepQuestions = questions.filter(q => q.step === step);

    const handleChange = (id, value) => setFormData(prev => ({ ...prev, [id]: value }));

    const toggleCheckbox = (id, option) => {
        const prev = formData[id] || [];
        handleChange(
            id,
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        );
    };

    const handleNext = () => {
        if (
            stepQuestions.some(
                q =>
                    q.required &&
                    (formData[q.id] === undefined ||
                        (Array.isArray(formData[q.id]) ? formData[q.id].length === 0 : !formData[q.id]))
            )
        ) {
            return setShowValidationModal(true);
        }
        setStep(2);
    };

    const handleSubmit = () => {
        const step2 = questions.filter(q => q.step === 2);
        if (
            step2.some(
                q =>
                    q.required &&
                    (formData[q.id] === undefined ||
                        (Array.isArray(formData[q.id]) ? formData[q.id].length === 0 : !formData[q.id]))
            )
        ) {
            return setShowValidationModal(true);
        }
        localStorage.setItem("symptomForm", JSON.stringify(formData));
        router.get("/results");
    };

    const resetForm = () => {
        setFormData({});
        setStep(1);
        localStorage.removeItem("symptomForm");
    };

    return (
        <div className="relative min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            {/* Header, Modal, Sidebar omitted for brevity */}
            <main className={`pt-20 px-4 pb-12 flex justify-center ${sidebarOpen && isLoggedIn ? "md:mr-64" : ""}`}>
                <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12 border-2 dark:border-gray-600">
                    <h1 className="text-3xl font-semibold text-blue-600 text-center">What are your symptoms?</h1>
                    <div className="flex justify-end mt-4">
                        <span className="text-sm text-gray-400">Page: {step}/2</span>
                    </div>

                    {stepQuestions.map(q => (
                        <div key={q.id} className="mt-6">
                            <div className="px-3 py-2 border rounded-full text-blue-600 bg-white dark:bg-gray-700 mb-2">
                                {q.label} {q.required && <span className="text-red-500">*</span>}
                            </div>

                            {/* Render inputs */}
                            {q.type === "select" && q.multiple && (
                                <MultiSelect
                                    id={q.id}
                                    options={q.options}
                                    selected={formData[q.id] || []}
                                    onChange={handleChange}
                                    placeholder="Select options"
                                />
                            )}

                            {q.type === "select" && !q.multiple && (
                                <select
                                    value={formData[q.id] || ""}
                                    onChange={e => handleChange(q.id, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg mb-2"
                                >
                                    <option value="">Select an option</option>
                                    {q.options.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {/* Numeric input with kg suffix */}
                            {q.id === "weightRange" && (
                                <div className="relative mt-3">
                                    <input
                                        type="number"
                                        value={formData[q.id] || ""}
                                        onChange={e => handleChange(q.id, e.target.value)}
                                        min={1}
                                        step={0.1}
                                        className="w-full pr-12 px-3 py-2 border rounded-lg mb-2"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">kg</span>
                                </div>
                            )}

                            {q.type === "checkbox" && (
                                <div className="grid grid-cols-2 gap-3">
                                    {q.options.map(opt => (
                                        <label key={opt} className="flex items-center space-x-2 p-2 border rounded-lg">
                                            <input
                                                type="checkbox"
                                                checked={(formData[q.id] || []).includes(opt)}
                                                onChange={() => toggleCheckbox(q.id, opt)}
                                            />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            {q.type === "radio" && (
                                <div className="flex flex-wrap gap-3">
                                    {q.options.map(opt => (
                                        <label key={opt} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={opt}
                                                checked={formData[q.id] === opt}
                                                onChange={() => handleChange(q.id, opt)}
                                            />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))} {/* <-- THIS LINE CLOSES THE MAP PROPERLY */}

                <div className="mt-8 flex justify-between">
                    {step === 2 && (
                        <button onClick={() => setStep(1)} className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg">
                            <BiUndo />
                        </button>
                    )}
                    <button
                        onClick={step === 1 ? handleNext : handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        {step === 1 ? "Next" : "Submit"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    PiKrous can be wrong, please double check!
                </p>
            </div>
        </main>
    </div>
  );
}
