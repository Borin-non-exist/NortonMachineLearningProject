import React, { useEffect, useState, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { MessageSquarePlus, History as HistoryIcon } from "lucide-react";
import { BiUndo } from "react-icons/bi";
import Select, { MultiValue, components, OptionProps } from "react-select";
import questions from "./questions.json";
import historyData from "./history.json";

/** Custom Option for react-select with checkbox */
const CheckboxOption = (props: OptionProps<any, boolean>) => (
    <components.Option {...props}>
        <input
            type="checkbox"
            checked={props.isSelected}
            tabIndex={-1}
            style={{ marginRight: 8 }}
            onMouseDown={e => {
                e.stopPropagation();
                e.preventDefault();
                props.selectOption(props.data.value);
            }}
        />
        <label>{props.label}</label>
    </components.Option>
);

// Custom multi-select dropdown component
type MultiSelectProps = {
    id: string;
    options: string[];
    selected: string[];
    onChange: (id: string, value: string[]) => void;
    placeholder: string;
};


function MultiSelect({ id, options, selected, onChange, placeholder }: MultiSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setOpen((prev) => !prev);
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && ref.current.contains && !ref.current.contains(e.target as Node)) setOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onOptionToggle = (opt: string) => {
        if (selected.includes(opt)) onChange(id, selected.filter((o) => o !== opt));
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
                    {options.map((opt) => (
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

type SymptomPageProps = {
    symptoms: string[];
};

type FormDataType = {
    [key: string]: any;
};

type Diagnosis = { prediction: string; confidence?: number };

export default function SymptomFormPage({ symptoms = [] }: SymptomPageProps) {
    const { props } = usePage() as { props: { diagnosis?: Diagnosis; inputSymptoms?: string[]; errors?: Record<string, string> } };


    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormDataType>({});
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isLoggedIn = !!localStorage.getItem("auth_token");
    const [showValidationModal, setShowValidationModal] = useState(false);

    const stepQuestions = questions.filter(q => q.step === step);

    const handleChange = (id: string, value: any) => setFormData((prev) => ({ ...prev, [id]: value }));

    const toggleCheckbox = (id: string, option: string) => {
        const prev: string[] = formData[id] || [];
        handleChange(
            id,
            prev.includes(option) ? prev.filter((o: string) => o !== option) : [...prev, option]
        );
    };

    const handleNext = () => {
        // For step 1, require ageRange and weight
        if (
            step === 1 &&
            (
                !formData["ageRange"] ||
                formData["ageRange"] === "" ||
                !formData["weight"] ||
                formData["weight"] === ""
            )
        ) {
            window.alert("Please fill in both your age range and weight before proceeding to the next page.");
            return setShowValidationModal(true);
        }
        setStep(2);
    };

    const handleSubmit = () => {
        const main = formData["mainSymptom"];
        if (!Array.isArray(main) || main.length === 0) {
            setShowValidationModal(true);
            return;
        }
        router.post("/diagnose", {
            symptoms: formData["mainSymptom"] || []
        });
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
                    <h1 className="text-3xl font-semibold text-blue-600 text-center">Health Information</h1>
                    <div className="flex justify-end mt-4">
                        <span className="text-sm text-gray-400">Page: {step}/2</span>
                    </div>

                    {/* Static questions for step 1 */}
                    {step === 1 && (
                        <>
                            {/* Back Button */}
                            {/* (Back button moved to button row below) */}
                            {/* Age Range */}
                            <div className="mt-6">
                                <div className="px-3 py-2 border rounded-full text-blue-600 bg-white dark:bg-gray-700 mb-2">
                                    What is your age range? <span className="text-red-500">*</span>
                                </div>
                                <select
                                    value={formData["ageRange"] || ""}
                                    onChange={e => handleChange("ageRange", e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg mb-2"
                                >
                                    <option value="">Select your age range</option>
                                    <option value="0-18">0-18</option>
                                    <option value="19-30">19-30</option>
                                    <option value="31-45">31-45</option>
                                    <option value="46-60">46-60</option>
                                    <option value="61+">61+</option>
                                </select>
                            </div>
                            {/* Weight */}
                            <div className="mt-6">
                                <div className="px-3 py-2 border rounded-full text-blue-600 bg-white dark:bg-gray-700 mb-2">
                                    What is your weight? <span className="text-red-500">*</span>
                                </div>
                                <div className="relative mt-3">
                                    <input
                                        type="number"
                                        value={formData["weight"] || ""}
                                        onChange={e => handleChange("weight", e.target.value)}
                                        min={1}
                                        step={0.1}
                                        className="w-full pr-12 px-3 py-2 border rounded-lg mb-2"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">kg</span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Static questions for step 2 */}
                    {step === 2 && (
                        <>
                            {/* Main Symptom */}
                            <div className="mt-6">
                                <div className="px-3 py-2 border rounded-full text-blue-600 bg-white dark:bg-gray-700 mb-2">
                                    What is your main symptom? <span className="text-red-500">*</span>
                                </div>
                                <Select
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    options={symptoms.map(s => ({ value: s, label: s }))}
                                    value={(formData["mainSymptom"] || []).map((s: string) => ({ value: s, label: s }))}
                                    onChange={(val: MultiValue<{ value: string; label: string }>) =>
                                        handleChange("mainSymptom", val.map(v => v.value))
                                    }
                                    placeholder="Select your main symptom"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                            {/* Prior Illnesses */}
                            <div className="mt-6">
                                <div className="px-3 py-2 border rounded-full text-blue-600 bg-white dark:bg-gray-700 mb-2">
                                    Which prior illnesses have you had?
                                </div>
                                <Select
                                    isMulti
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    options={[
                                        { value: "Diabetes", label: "Diabetes" },
                                        { value: "Hypertension", label: "Hypertension" },
                                        { value: "Asthma", label: "Asthma" },
                                        { value: "Heart Disease", label: "Heart Disease" },
                                        { value: "Kidney Disease", label: "Kidney Disease" },
                                        { value: "Liver Disease", label: "Liver Disease" },
                                        { value: "Cancer", label: "Cancer" },
                                        { value: "None", label: "None" }
                                    ]}
                                    value={(formData["priorIllnesses"] || []).map((s: string) => ({ value: s, label: s }))}
                                    onChange={(val: MultiValue<{ value: string; label: string }>) =>
                                        handleChange("priorIllnesses", val.map(v => v.value))
                                    }
                                    placeholder="Select prior illnesses"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                        </>
                    )}

                    <div className="mt-8 flex justify-between">
                        {step === 1 ? (
                            <button
                                onClick={() => router.get("/welcome")}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                <BiUndo />
                                Back
                            </button>
                        ) : (
                            <button
                                onClick={() => setStep(1)}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                <BiUndo />
                                Back
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
