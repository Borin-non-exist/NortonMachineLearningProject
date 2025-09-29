import React, { useState, useEffect, ChangeEvent } from "react";
import SidebarAdmin from "../../Layouts/SidebarAdmin";
import SidebarDoctor from "../../Layouts/SidebarDoctor";
import HeaderAdmin from "../../Layouts/HeaderAdmin";
import HeaderDoctor from "../../Layouts/HeaderDoctor";
import { FaPlus, FaSearch, FaBars } from "react-icons/fa";
import Select, { MultiValue, SingleValue } from "react-select";
import { router, usePage } from '@inertiajs/react';

interface Disease {
    id: number;
    diseases_name: string;
    type: string;
    description: string;
}

interface Symptom {
    id: number;
    name: string;
}

interface Treatment {
    id: number;
    description: string;
}

interface Priorillness {
    id: number;
    priorillness_name: string;
}

interface Knowledgebase {
    id: number;
    disease: Disease;
    symptoms: Symptom[];
    treatments: Treatment[];
    priorillnesses: Priorillness[];
}

type PageProps = {
    knowledgebases: Knowledgebase[];
    diseases: Disease[];
    symptoms: Symptom[];
    treatments: Treatment[];
    priorillnesses: Priorillness[];
};

const KnowledgebasePage: React.FC = () => {
    const { props } = usePage() as { props: PageProps & { auth: { user: { role: string } } }};
    console.log("DEBUG ALL PROPS:", props);
    const [search, setSearch] = useState<string>("");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const isDarkMode = document.documentElement.classList.contains("dark");

    const role = props.auth?.user?.role ?? 'user';
    const SidebarComponent = role === 'doctor' ? SidebarDoctor : SidebarAdmin;
    const HeaderComponent = role === 'doctor' ? HeaderDoctor : HeaderAdmin;

    // ML retrain additions: local state for retrain button & log visibility
    const [retraining, setRetraining] = useState(false);
    const [showLog, setShowLog] = useState(false);

    // Prefer props directly, but some apps only expose flash in props.flash
    const mlSuccess = (props as any).mlSuccess ?? (props as any).flash?.mlSuccess;
    const mlMessage = (props as any).mlMessage ?? (props as any).flash?.mlMessage;
    const mlLog     = (props as any).mlLog     ?? (props as any).flash?.mlLog;

    // ML retrain action
    const retrainModel = () => {
        if (retraining) return;
        setRetraining(true);
        setShowLog(false);
        router.post('/retrain-model', {}, {
            preserveScroll: true,
            onFinish: () => setRetraining(false),
            onSuccess: () => {
                // Optional: reload data lists in case vocab changed
                router.reload({ only: ['knowledgebases', 'symptoms', 'priorillnesses'] });
            },
        });
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Disease description state for modal
    const [diseaseDescription, setDiseaseDescription] = useState<string>("");

    // For Action dropdown
    const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const dropdowns = document.querySelectorAll('.kb-action-dropdown');
            let clickedInside = false;
            dropdowns.forEach((dropdown) => {
                if (dropdown.contains(e.target as Node)) {
                    clickedInside = true;
                }
            });
            if (!clickedInside) setMenuOpenIndex(null);
        };
        if (menuOpenIndex !== null) {
            document.addEventListener('mousedown', handleClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [menuOpenIndex]);

    // View Detail Modal state
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewKb, setViewKb] = useState<Knowledgebase | null>(null);
    const [viewPriorArr, setViewPriorArr] = useState<string[]>([]);

    // Edit Modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editKb, setEditKb] = useState<Knowledgebase | null>(null);
    const [editDiseaseName, setEditDiseaseName] = useState<string>("");
    const [editDiseaseType, setEditDiseaseType] = useState<string>("airway");
    const [editDiseaseDescription, setEditDiseaseDescription] = useState<string>("");
    const [editSelectedSymptoms, setEditSelectedSymptoms] = useState<MultiValue<{ value: number; label: string }>>([]);
    const [editTreatmentDescription, setEditTreatmentDescription] = useState<string>("");
    const [editSelectedPriorillnesses, setEditSelectedPriorillnesses] = useState<MultiValue<{ value: number; label: string }>>([]);

    // Data from backend
    const [knowledgebases, setKnowledgebases] = useState<Knowledgebase[]>(props.knowledgebases || []);
    const [diseases, setDiseases] = useState<Disease[]>(props.diseases || []);
    const [symptoms, setSymptoms] = useState<Symptom[]>(props.symptoms || []);
    const [treatments, setTreatments] = useState<Treatment[]>(props.treatments || []);
    const [priorillnesses, setPriorillnesses] = useState<Priorillness[]>(props.priorillnesses || []);


    // Sync knowledgebases state with props.knowledgebases when props change
    useEffect(() => {
        setKnowledgebases(props.knowledgebases || []);
    }, [props.knowledgebases]);

    // Sync symptoms state with props.symptoms when props change
    useEffect(() => {
        setSymptoms(props.symptoms || []);
    }, [props.symptoms]);

    // Sync priorillnesses state with props.priorillnesses when props change
    useEffect(() => {
        setPriorillnesses(props.priorillnesses || []);
    }, [props.priorillnesses]);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newDiseaseName, setNewDiseaseName] = useState<string>("");
    const [newDiseaseType, setNewDiseaseType] = useState<string>("airway"); // default to first option

    // Store selected symptoms as option objects
    const [selectedSymptoms, setSelectedSymptoms] = useState<MultiValue<{ value: number; label: string }>>([]);
    const [newSymptomName, setNewSymptomName] = useState<string>("");

    // DEBUG: Log selectedSymptoms on every render
    // Remove this after debugging
    /* useEffect(() => {
        console.log("DEBUG selectedSymptoms", selectedSymptoms);
    }, [selectedSymptoms]); */

    const [treatmentDescription, setTreatmentDescription] = useState<string>("");
    const [selectedPriorillnesses, setSelectedPriorillnesses] = useState<MultiValue<{ value: number; label: string }>>([]);
    const [newPriorillnessName, setNewPriorillnessName] = useState<string>("");



    // Disease type options
    const diseaseTypeOptions = [
        { value: "Circulatory System", label: "Circulatory System" },
        { value: "Respiratory System", label: "Respiratory System" },
        { value: "Digestive System", label: "Digestive System" },
        { value: "Excretory System", label: "Excretory System" },
        { value: "Immune System", label: "Immune System" },
        { value: "Reproductive System", label: "Reproductive System" },
        { value: "Muscular System", label: "Muscular System" },
        { value: "Skeletal System", label: "Skeletal System" },
        { value: "Integumentary System", label: "Integumentary System" },
        { value: "Lymphatic System", label: "Lymphatic System" },
        { value: "Nervous System", label: "Nervous System" },
        { value: "Endocrine System", label: "Endocrine System" }
    ];

    // For symptom select
    /* const symptomOptions = React.useMemo(
        () => symptoms.map(s => ({ value: Number(s.symptom_id), label: s.name })),
        [symptoms]
    ); */
    const [symptomOptions, setSymptomsOptions] = useState<{ value: number; label: string }[]>(
        symptoms.map(s => ({
            value: Number(s.id),
            label: s.name
        })));
    // Rebuild symptomOptions when symptoms change
    useEffect(() => {
        setSymptomsOptions(symptoms.map(s => ({
            value: Number(s.id),
            label: s.name
        })));
    }, [symptoms]);

    // For priorillness select
    const [priorillnessOptions, setPriorillnessOptions] = useState<{ value: number; label: string }[]>(
        priorillnesses.map(p => ({
            value: Number(p.id),
            label: p.priorillness_name
        }))
    );
    // Rebuild priorillnessOptions when priorillnesses change
    useEffect(() => {
        setPriorillnessOptions(priorillnesses.map(p => ({
            value: Number(p.id),
            label: p.priorillness_name
        })));
    }, [priorillnesses]);

    // For treatment select (not used for add, only for display)
    const treatmentOptions = treatments.map(t => ({
        value: t.id,
        label: t.description
    }));

    // Filtered knowledgebases
    const filtered = knowledgebases.filter((kb) =>
        kb.disease.diseases_name.toLowerCase().includes(search.toLowerCase()) ||
        (kb.symptoms && kb.symptoms.some(s => s.name.toLowerCase().includes(search.toLowerCase()))) ||
        (kb.treatments && kb.treatments.some(t => t.description.toLowerCase().includes(search.toLowerCase()))) ||
        (kb.priorillnesses && kb.priorillnesses.some(p => p.priorillness_name.toLowerCase().includes(search.toLowerCase())))
    );
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const currentKnowledgebases = filtered.slice(start, start + itemsPerPage);

    // Add new priorillness inline
    const addNewPriorillness = () => {
        const trimmed = newPriorillnessName.trim();
        if (!trimmed) return;
        if (priorillnessOptions.some((o) => o.label.toLowerCase() === trimmed.toLowerCase())) {
            setNewPriorillnessName("");
            return;
        }
        router.post('/priorillnesses', { priorillness_name: trimmed }, {
            preserveScroll: true,
            onSuccess: () => {
                // Reload the current Inertia page to update all props (including priorillnesses)
                router.get(window.location.pathname, {}, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (page: any) => {
                        setNewPriorillnessName("");
                    }
                });
            }
        });
    };

    // Add new symptom inline
    const addNewSymptom = () => {
        const trimmed = newSymptomName.trim();
        if (!trimmed) return;
        if (symptomOptions.some((o) => o.label.toLowerCase() === trimmed.toLowerCase())) {
            setNewSymptomName("");
            return;
        }
        // Post new symptom to backend
        router.post('/symptoms', { name: trimmed }, {
            preserveScroll: true,
            onSuccess: () => {
                // Reload the current Inertia page to update all props (including symptoms)
                router.get(window.location.pathname, {}, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (page: any) => {
                        setNewSymptomName("");
                    }
                });
            }
        });
    };

    // Add new knowledgebase
    const handleSubmit = () => {
        let disease_name = newDiseaseName.trim();
        let disease_type = newDiseaseType;
        let disease_description = diseaseDescription.trim();
        let symptom_ids = selectedSymptoms.map(s => s.value);
        let treatment_description = treatmentDescription.trim();
        let priorillness_ids = selectedPriorillnesses.map(p => p.value);

        // Validation
        if (!disease_name || !disease_type || !disease_description || symptom_ids.length === 0 || !treatment_description || priorillness_ids.length === 0) {
            alert("Please fill all required fields.");
            return;
        }

        // Post to /knowledgebases
        router.post('/knowledgebases', {
            disease_name,
            disease_type,
            disease_description,
            symptom_ids,
            treatment_description,
            priorillness_ids,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
                setNewDiseaseName("");
                setNewDiseaseType("airway");
                setDiseaseDescription("");
                setSelectedSymptoms([]);
                setTreatmentDescription("");
                setSelectedPriorillnesses([]);
                router.reload({ only: ['knowledgebases', 'diseases', 'symptoms', 'treatments', 'priorillnesses'] });
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    // Modal open
    const openAddModal = () => {
        console.log("DEBUG priorillnesses prop:", props.priorillnesses);
        setIsModalOpen(true);
        setNewDiseaseName("");
        setNewDiseaseType("airway");
        setDiseaseDescription("");
        setSelectedSymptoms([]);
        setTreatmentDescription("");
        setSelectedPriorillnesses([]);
        setNewSymptomName("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white flex relative">
            {/* Sidebar */}
            <aside className="hidden sm:block fixed inset-y-0 left-0 w-64 z-40 bg-white dark:bg-gray-900 shadow-xl border-r border-blue-200 dark:border-gray-800">
                <SidebarComponent />
            </aside>
            {/* Mobile toggle */}
            <div className="sm:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 bg-blue-600 dark:bg-blue-800 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
                >
                    <FaBars />
                </button>
            </div>
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="w-64 h-full bg-white dark:bg-gray-900 shadow-xl border-r border-blue-200 dark:border-gray-800">
                        <SidebarComponent />
                    </div>
                    <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
                </div>
            )}

            {/* Main */}
            <main className="flex-1 w-full sm:ml-64 px-4 py-8 transition-all duration-300">
                <div className="max-w-7xl mx-auto space-y-8">
                    <HeaderComponent title="KnowledgeBase" />

                    {/* ML retrain additions: status banner */}
                    {(mlMessage !== undefined) && (
                        <div className={`rounded-lg p-4 ${mlSuccess ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">{mlMessage}</span>
                                {mlLog && (
                                    <button className="underline text-sm" onClick={() => setShowLog(v => !v)}>
                                        {showLog ? 'Hide log' : 'View log'}
                                    </button>
                                )}
                            </div>
                            {showLog && mlLog && (
                                <pre className="mt-2 text-xs max-h-64 overflow-auto whitespace-pre-wrap">{mlLog}</pre>
                            )}
                        </div>
                    )}

                    {/* Toolbar & Table */}
                    <div className="rounded-2xl p-6 bg-white/80 dark:bg-gray-900/80 shadow-xl border border-blue-200 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex gap-3">
                                <button
                                    onClick={openAddModal}
                                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow hover:from-blue-600 hover:to-blue-800 transition"
                                >
                                    <FaPlus /> <span>Add Knowledgebase</span>
                                </button>
                                {/* ML retrain button */}
                                <button
                                    onClick={retrainModel}
                                    disabled={retraining}
                                    className={`px-6 py-2 rounded-lg shadow text-white transition
                                        ${retraining ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                                    title="Retrain the ML model from current DB data"
                                >
                                    {retraining ? 'Retraining…' : 'Retrain Model'}
                                </button>
                            </div>
                            <div className="relative w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search knowledgebase..."
                                    value={search}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full sm:w-72 border border-blue-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-blue-300" />
                            </div>
                        </div>
                        <div className="overflow-x-auto rounded-lg border border-blue-100 dark:border-gray-800">
                            <table className="w-full text-gray-800 dark:text-white">
                                <thead className="bg-blue-50 dark:bg-gray-800 border-b dark:border-gray-700">
                                    <tr>
                                        <th className="p-3 text-left font-semibold">ID</th>
                                        <th className="p-3 text-left font-semibold">Disease</th>
                                        <th className="p-3 text-left font-semibold">Type</th>
                                        <th className="p-3 text-left font-semibold">Prior Illness</th>
                                        <th className="p-3 text-left font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-6 text-center text-gray-400 dark:text-gray-500">
                                                No knowledgebase records found.
                                            </td>
                                        </tr>
                                    )}
                                    {/* Group by knowledgebase id for prior illnesses */}
                                    {currentKnowledgebases.map((kb, idx) => {
                                        // Only render the first occurrence for each unique knowledgebase id on this page
                                        const realIndex = start + idx;
                                        if (
                                            currentKnowledgebases.findIndex(
                                                k => k.id === kb.id
                                            ) !== idx
                                        ) {
                                            return null;
                                        }
                                        return (
                                            <tr key={kb.id} className="border-b last:border-b-0 hover:bg-blue-100/60 dark:hover:bg-gray-800/60 transition">
                                                <td className="p-3">{kb.id}</td>
                                                <td className="p-3">{kb.disease?.diseases_name}</td>
                                                <td className="p-3">{kb.disease?.type}</td>
                                                <td className="p-3">
                                                    {kb.priorillnesses && kb.priorillnesses.length > 0
                                                        ? kb.priorillnesses.map(p => p.priorillness_name).join(", ")
                                                        : "-"}
                                                </td>
                                                <td className="p-3 relative">
                                                    <button
                                                        onClick={() => setMenuOpenIndex(realIndex)}
                                                        className="text-xl text-gray-600 hover:text-gray-800"
                                                    >
                                                        ⋯
                                                    </button>
                                                    {menuOpenIndex === realIndex && (
                                                        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10 kb-action-dropdown">
                                                            <button
                                                                onClick={() => {
                                                                    setViewKb(kb);
                                                                    setIsViewModalOpen(true);
                                                                    setMenuOpenIndex(null);
                                                                }}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                                                            >
                                                                View Detail
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditKb(kb);
                                                                    setEditDiseaseName(kb.disease?.diseases_name || "");
                                                                    setEditDiseaseType(kb.disease?.type || "airway");
                                                                    setEditDiseaseDescription(kb.disease?.description || "");
                                                                    setEditSelectedSymptoms(
                                                                        kb.symptoms?.map(s => ({ value: s.id, label: s.name })) || []
                                                                    );
                                                                    setEditTreatmentDescription(
                                                                        kb.treatments && kb.treatments.length > 0 ? kb.treatments[0].description : ""
                                                                    );
                                                                    setEditSelectedPriorillnesses(
                                                                        kb.priorillnesses?.map(p => ({ value: p.id, label: p.priorillness_name })) || []
                                                                    );
                                                                    setIsEditModalOpen(true);
                                                                    setMenuOpenIndex(null);
                                                                }}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <span>Display</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={e => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="border border-gray-300 rounded px-2 py-1 bg-white dark:bg-gray-800"
                                >
                                    {[10, 25, 50].map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-2 py-1 border rounded disabled:opacity-50"
                                >
                                    {'<'}
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded ${currentPage === i + 1
                                            ? "bg-blue-500 text-white"
                                            : "border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-2 py-1 border rounded disabled:opacity-50"
                                >
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add Knowledgebase Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6 border border-blue-200 dark:border-gray-800">
                                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Add New Knowledgebase</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Disease */}
                                    <div className="col-span-2">
                                        <label className="block mb-1 text-blue-700 dark:text-blue-300">Disease Name</label>
                                        <input
                                            type="text"
                                            placeholder="Disease name"
                                            value={newDiseaseName}
                                            onChange={e => setNewDiseaseName(e.target.value)}
                                            className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800 w-full"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-1 text-blue-700 dark:text-blue-300">Type</label>
                                        <Select
                                            options={diseaseTypeOptions}
                                            value={diseaseTypeOptions.find(opt => opt.value === newDiseaseType)}
                                            onChange={opt => setNewDiseaseType(opt?.value || "airway")}
                                            isSearchable={false}
                                            className="mb-2"
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: isDarkMode
                                                        ? state.isFocused
                                                            ? "#1e293b"
                                                            : "#0f172a"
                                                        : state.isFocused
                                                            ? "#e0e7ff"
                                                            : "#f0f6ff",
                                                    borderColor: isDarkMode
                                                        ? state.isFocused
                                                            ? "#3b82f6"
                                                            : "#475569"
                                                        : state.isFocused
                                                            ? "#2563eb"
                                                            : "#bfdbfe",
                                                    color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                                    boxShadow: state.isFocused
                                                        ? isDarkMode
                                                            ? "0 0 0 2px rgba(59,130,246,0.3)"
                                                            : "0 0 0 2px rgba(37,99,235,0.2)"
                                                        : undefined,
                                                    minHeight: 44,
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: isDarkMode ? "#0f172a" : "#f0f6ff",
                                                    color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                                }),
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 8,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: isDarkMode ? "#1e293b" : "#dbeafe",
                                                    primary: "#2563eb",
                                                },
                                            })}
                                        />
                                    </div>
                                    {/* Description */}
                                    <div className="col-span-2">
                                        <label className="block mb-1 text-blue-700 dark:text-blue-300">Disease Description</label>
                                        <textarea
                                            placeholder="Disease description"
                                            value={diseaseDescription}
                                            onChange={e => setDiseaseDescription(e.target.value)}
                                            rows={2}
                                            className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800 w-full"
                                        />
                                    </div>
                                    {/* Symptoms multi-select and add */}
                                    <div className="col-span-2">
                                        <label className="block mb-1 text-blue-700 dark:text-blue-300">Symptoms</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="New symptom..."
                                                value={newSymptomName}
                                                onChange={e => setNewSymptomName(e.target.value)}
                                                className="flex-1 border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800"
                                            />
                                            <button onClick={addNewSymptom} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add</button>
                                        </div>
                                        <Select
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={symptomOptions}
                                            value={selectedSymptoms}
                                            onChange={val => setSelectedSymptoms(val ? val : [])}
                                            isSearchable
                                            placeholder="Select symptoms..."
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: isDarkMode
                                                        ? state.isFocused
                                                            ? "#1e293b"
                                                            : "#0f172a"
                                                        : state.isFocused
                                                            ? "#e0e7ff"
                                                            : "#f0f6ff",
                                                    borderColor: isDarkMode
                                                        ? state.isFocused
                                                            ? "#3b82f6"
                                                            : "#475569"
                                                        : state.isFocused
                                                            ? "#2563eb"
                                                            : "#bfdbfe",
                                                    color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                                    boxShadow: state.isFocused
                                                        ? isDarkMode
                                                            ? "0 0 0 2px rgba(59,130,246,0.3)"
                                                            : "0 0 0 2px rgba(37,99,235,0.2)"
                                                        : undefined,
                                                    minHeight: 44,
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: isDarkMode ? "#0f172a" : "#f0f6ff",
                                                    color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                                }),
                                                multiValue: (base) => ({
                                                    ...base,
                                                    backgroundColor: isDarkMode ? "#1e293b" : "#dbeafe",
                                                    color: isDarkMode ? "#fff" : "#1e40af",
                                                }),
                                                multiValueLabel: (base) => ({
                                                    ...base,
                                                    color: isDarkMode ? "#fff" : "#1e40af",
                                                }),
                                                multiValueRemove: (base) => ({
                                                    ...base,
                                                    color: isDarkMode ? "#fff" : "#1e40af",
                                                    ':hover': {
                                                        backgroundColor: "#2563eb",
                                                        color: "white",
                                                    },
                                                }),
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 8,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: isDarkMode ? "#1e293b" : "#dbeafe",
                                                    primary: "#2563eb",
                                                },
                                            })}
                                        />
                                    </div>
                                    
                                    {/* Priorillness */}
                                    <div className="col-span-2">
                                        <label className="block mb-1 text-blue-700 dark:text-blue-300">Prior Illness</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="New prior illness..."
                                                value={newPriorillnessName}
                                                onChange={e => setNewPriorillnessName(e.target.value)}
                                                className="flex-1 border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800"
                                            />
                                            <button onClick={addNewPriorillness} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add</button>
                                        </div>
                                        <Select
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={priorillnessOptions}
                                            value={selectedPriorillnesses}
                                            onChange={val => setSelectedPriorillnesses(val ? val : [])}
                                            isSearchable
                                            placeholder="Select prior illnesses..."
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: isDarkMode
                                                        ? state.isFocused
                                                            ? "#1e293b"
                                                            : "#0f172a"
                                                        : state.isFocused
                                                            ? "#e0e7ff"
                                                            : "#f0f6ff",
                                                    borderColor: isDarkMode
                                                        ? state.isFocused
                                                            ? "#3b82f6"
                                                            : "#475569"
                                                        : state.isFocused
                                                            ? "#2563eb"
                                                            : "#bfdbfe",
                                                    color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                                    boxShadow: state.isFocused
                                                        ? isDarkMode
                                                            ? "0 0 0 2px rgba(59,130,246,0.3)"
                                                            : "0 0 0 2px rgba(37,99,235,0.2)"
                                                        : undefined,
                                                    minHeight: 44,
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: isDarkMode ? "#0f172a" : "#f0f6ff",
                                                    color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                                }),
                                                multiValue: (base) => ({
                                                    ...base,
                                                    backgroundColor: isDarkMode ? "#1e293b" : "#dbeafe",
                                                    color: isDarkMode ? "#fff" : "#1e40af",
                                                }),
                                                multiValueLabel: (base) => ({
                                                    ...base,
                                                    color: isDarkMode ? "#fff" : "#1e40af",
                                                }),
                                                multiValueRemove: (base) => ({
                                                    ...base,
                                                    color: isDarkMode ? "#fff" : "#1e40af",
                                                    ':hover': {
                                                        backgroundColor: "#2563eb",
                                                        color: "white",
                                                    },
                                                }),
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 8,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: isDarkMode ? "#1e293b" : "#dbeafe",
                                                    primary: "#2563eb",
                                                },
                                            })}
                                        />
                                    </div>
                                    {/* Treatment */}
                                    <div className="col-span-2">
                                        <label className="block mb-1 text-blue-700 dark:text-blue-300">Treatment</label>
                                        <textarea
                                            placeholder="Treatment description"
                                            value={treatmentDescription}
                                            onChange={e => setTreatmentDescription(e.target.value)}
                                            rows={2}
                                            className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800 w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800 transition">Cancel</button>
                                    <button onClick={handleSubmit} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 transition">Add</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* View Detail Modal */}
            {isViewModalOpen && viewKb && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6 border border-blue-200 dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Knowledgebase Detail</h2>
                        <div className="space-y-2">
                            <div><strong>ID:</strong> {viewKb.id}</div>
                            <div><strong>Disease:</strong> {viewKb.disease?.diseases_name}</div>
                            <div><strong>Type:</strong> {viewKb.disease?.type}</div>
                            <div>
                                <strong>Description:</strong>{" "}
                                {viewKb.disease?.description || "-"}
                            </div>
                            <div>
                                <strong>Symptoms:</strong>{" "}
                                {viewKb.symptoms && viewKb.symptoms.length > 0
                                    ? viewKb.symptoms.map(s => s.name).join(", ")
                                    : "-"}
                            </div>
                            <div>
                                <strong>Treatments:</strong>{" "}
                                {viewKb.treatments && viewKb.treatments.length > 0
                                    ? viewKb.treatments.map(t => t.description).join(", ")
                                    : "-"}
                            </div>
                            <div>
                                <strong>Prior Illnesses:</strong>{" "}
                                {viewKb.priorillnesses && viewKb.priorillnesses.length > 0
                                    ? viewKb.priorillnesses.map(p => p.priorillness_name).join(", ")
                                    : "-"}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Knowledgebase Modal */}
            {isEditModalOpen && editKb && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6 border border-blue-200 dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Edit Knowledgebase</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Disease */}
                            <div className="col-span-2">
                                <label className="block mb-1 text-blue-700 dark:text-blue-300">Disease Name</label>
                                <input
                                    type="text"
                                    placeholder="Disease name"
                                    value={editDiseaseName}
                                    onChange={e => setEditDiseaseName(e.target.value)}
                                    className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800 w-full"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-1 text-blue-700 dark:text-blue-300">Type</label>
                                <Select
                                    options={diseaseTypeOptions}
                                    value={diseaseTypeOptions.find(opt => opt.value === editDiseaseType)}
                                    onChange={opt => setEditDiseaseType(opt?.value || "airway")}
                                    isSearchable={false}
                                    className="mb-2"
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            backgroundColor: isDarkMode
                                                ? state.isFocused
                                                    ? "#1e293b"
                                                    : "#0f172a"
                                                : state.isFocused
                                                    ? "#e0e7ff"
                                                    : "#f0f6ff",
                                            borderColor: isDarkMode
                                                ? state.isFocused
                                                    ? "#3b82f6"
                                                    : "#475569"
                                                : state.isFocused
                                                    ? "#2563eb"
                                                    : "#bfdbfe",
                                            color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                            boxShadow: state.isFocused
                                                ? isDarkMode
                                                    ? "0 0 0 2px rgba(59,130,246,0.3)"
                                                    : "0 0 0 2px rgba(37,99,235,0.2)"
                                                : undefined,
                                            minHeight: 44,
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: isDarkMode ? "#0f172a" : "#f0f6ff",
                                            color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 8,
                                        colors: {
                                            ...theme.colors,
                                            primary25: isDarkMode ? "#1e293b" : "#dbeafe",
                                            primary: "#2563eb",
                                        },
                                    })}
                                />
                            </div>
                            {/* Description */}
                            <div className="col-span-2">
                                <label className="block mb-1 text-blue-700 dark:text-blue-300">Description</label>
                                <textarea
                                    placeholder="Disease description"
                                    value={editDiseaseDescription}
                                    onChange={e => setEditDiseaseDescription(e.target.value)}
                                    rows={2}
                                    className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800 w-full"
                                />
                            </div>
                            {/* Symptoms multi-select */}
                            <div className="col-span-2">
                                <label className="block mb-1 text-blue-700 dark:text-blue-300">Symptoms</label>
                                <Select
                                    isMulti
                                    options={symptomOptions}
                                    value={editSelectedSymptoms}
                                    onChange={val => setEditSelectedSymptoms(val ? val : [])}
                                    isSearchable
                                    placeholder="Select symptoms..."
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            backgroundColor: isDarkMode
                                                ? state.isFocused
                                                    ? "#1e293b"
                                                    : "#0f172a"
                                                : state.isFocused
                                                    ? "#e0e7ff"
                                                    : "#f0f6ff",
                                            borderColor: isDarkMode
                                                ? state.isFocused
                                                    ? "#3b82f6"
                                                    : "#475569"
                                                : state.isFocused
                                                    ? "#2563eb"
                                                    : "#bfdbfe",
                                            color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                            boxShadow: state.isFocused
                                                ? isDarkMode
                                                    ? "0 0 0 2px rgba(59,130,246,0.3)"
                                                    : "0 0 0 2px rgba(37,99,235,0.2)"
                                                : undefined,
                                            minHeight: 44,
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: isDarkMode ? "#0f172a" : "#f0f6ff",
                                            color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 8,
                                        colors: {
                                            ...theme.colors,
                                            primary25: isDarkMode ? "#1e293b" : "#dbeafe",
                                            primary: "#2563eb",
                                        },
                                    })}
                                />
                            </div>
                            {/* Priorillness multi-select */}
                            <div className="col-span-2">
                                <label className="block mb-1 text-blue-700 dark:text-blue-300">Prior Illness</label>
                                <Select
                                    isMulti
                                    options={priorillnessOptions}
                                    value={editSelectedPriorillnesses}
                                    onChange={val => setEditSelectedPriorillnesses(val ? val : [])}
                                    isSearchable
                                    placeholder="Select prior illnesses..."
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            backgroundColor: isDarkMode
                                                ? state.isFocused
                                                    ? "#1e293b"
                                                    : "#0f172a"
                                                : state.isFocused
                                                    ? "#e0e7ff"
                                                    : "#f0f6ff",
                                            borderColor: isDarkMode
                                                ? state.isFocused
                                                    ? "#3b82f6"
                                                    : "#475569"
                                                : state.isFocused
                                                    ? "#2563eb"
                                                    : "#bfdbfe",
                                            color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                            boxShadow: state.isFocused
                                                ? isDarkMode
                                                    ? "0 0 0 2px rgba(59,130,246,0.3)"
                                                    : "0 0 0 2px rgba(37,99,235,0.2)"
                                                : undefined,
                                            minHeight: 44,
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: isDarkMode ? "#0f172a" : "#f0f6ff",
                                            color: isDarkMode ? "#f9fafb" : "#1e3a8a",
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 8,
                                        colors: {
                                            ...theme.colors,
                                            primary25: isDarkMode ? "#1e293b" : "#dbeafe",
                                            primary: "#2563eb",
                                        },
                                    })}
                                />
                            </div>
                            {/* Treatment */}
                            <div className="col-span-2">
                                <label className="block mb-1 text-blue-700 dark:text-blue-300">Treatment</label>
                                <textarea
                                    placeholder="Treatment description"
                                    value={editTreatmentDescription}
                                    onChange={e => setEditTreatmentDescription(e.target.value)}
                                    rows={2}
                                    className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Edit submit logic
                                    const disease_name = editDiseaseName.trim();
                                    const disease_type = editDiseaseType;
                                    const disease_description = editDiseaseDescription.trim();
                                    const symptom_ids = editSelectedSymptoms.map(s => s.value);
                                    const treatment_description = editTreatmentDescription.trim();
                                    const priorillness_ids = editSelectedPriorillnesses.map(p => p.value);

                                    if (!disease_name || !disease_type || !disease_description || symptom_ids.length === 0 || !treatment_description || priorillness_ids.length === 0) {
                                        alert("Please fill all required fields.");
                                        return;
                                    }

                                    router.put(`/knowledgebases/${editKb.id}`, {
                                        disease_name,
                                        disease_type,
                                        disease_description,
                                        symptom_ids,
                                        treatment_description,
                                        priorillness_ids,
                                    }, {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            setIsEditModalOpen(false);
                                            router.get('/knowledgebases', {}, { preserveState: true });
                                        },
                                        onError: (errors) => {
                                            console.log(errors);
                                        }
                                    });
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KnowledgebasePage;