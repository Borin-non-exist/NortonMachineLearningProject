import React, { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "../../Layouts/SidebarAdmin";
import Header from "../../Layouts/HeaderAdmin";
import { FaPlus, FaSearch, FaBars } from "react-icons/fa";
import Select, { MultiValue, SingleValue } from "react-select";
import { router, usePage } from '@inertiajs/react';

interface Disease {
    id: number;
    diseases_name: string;
    type: string;
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
    symptom: Symptom;
    treatment: Treatment;
    priorillness: Priorillness;
}

type PageProps = {
    knowledgebases: Knowledgebase[];
    diseases: Disease[];
    symptoms: Symptom[];
    treatments: Treatment[];
    priorillnesses: Priorillness[];
};

const KnowledgebasePage: React.FC = () => {
    const { props } = usePage() as { props: PageProps };
    console.log("DEBUG ALL PROPS:", props);
    const [search, setSearch] = useState<string>("");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const isDarkMode = document.documentElement.classList.contains("dark");

    // Data from backend
    const [knowledgebases, setKnowledgebases] = useState<Knowledgebase[]>(props.knowledgebases || []);
    const [diseases, setDiseases] = useState<Disease[]>(props.diseases || []);
    const [symptoms, setSymptoms] = useState<Symptom[]>(props.symptoms || []);
    const [treatments, setTreatments] = useState<Treatment[]>(props.treatments || []);
    const [priorillnesses, setPriorillnesses] = useState<Priorillness[]>(props.priorillnesses || []);


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
        { value: "airway", label: "airway" },
        { value: "stomach", label: "stomach" }
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
        kb.symptom.name.toLowerCase().includes(search.toLowerCase()) ||
        kb.treatment.description.toLowerCase().includes(search.toLowerCase()) ||
        kb.priorillness.priorillness_name.toLowerCase().includes(search.toLowerCase())
    );

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
        let symptom_ids = selectedSymptoms.map(s => s.value);
        let treatment_description = treatmentDescription.trim();
        let priorillness_ids = selectedPriorillnesses.map(p => p.value);

        // Validation
        if (!disease_name || !disease_type || symptom_ids.length === 0 || !treatment_description || priorillness_ids.length === 0) {
            alert("Please fill all required fields.");
            return;
        }

        // Post to /knowledgebases
        router.post('/knowledgebases', {
            disease_name,
            disease_type,
            symptom_ids,
            treatment_description,
            priorillness_ids,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
                setNewDiseaseName("");
                setNewDiseaseType("airway");
                setSelectedSymptoms([]);
                setTreatmentDescription("");
                setSelectedPriorillnesses([]);
                router.get('/knowledgebases', {}, { preserveState: true });
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
        setSelectedSymptoms([]);
        setTreatmentDescription("");
        setSelectedPriorillnesses([]);
        setNewSymptomName("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white flex relative">
            {/* Sidebar */}
            <aside className="hidden sm:block fixed inset-y-0 left-0 w-64 z-40 bg-white dark:bg-gray-900 shadow-xl border-r border-blue-200 dark:border-gray-800">
                <Sidebar />
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
                        <Sidebar />
                    </div>
                    <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
                </div>
            )}

            {/* Main */}
            <main className="flex-1 w-full sm:ml-64 px-4 py-8 transition-all duration-300">
                <div className="max-w-7xl mx-auto space-y-8">
                    <Header title="KnowledgeBase" />

                    {/* Toolbar & Table */}
                    <div className="rounded-2xl p-6 bg-white/80 dark:bg-gray-900/80 shadow-xl border border-blue-200 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <button
                                onClick={openAddModal}
                                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow hover:from-blue-600 hover:to-blue-800 transition"
                            >
                                <FaPlus /> <span>Add Knowledgebase</span>
                            </button>
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
                                        <th className="p-3 text-left font-semibold">Disease</th>
                                        <th className="p-3 text-left font-semibold">Symptom</th>
                                        <th className="p-3 text-left font-semibold">Treatment</th>
                                        <th className="p-3 text-left font-semibold">Prior Illness</th>
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
                                    {filtered.map((kb, idx) => (
                                        <tr key={kb.id} className="border-b last:border-b-0 hover:bg-blue-100/60 dark:hover:bg-gray-800/60 transition">
                                            <td className="p-3">{kb.disease?.diseases_name} ({kb.disease?.type})</td>
                                            <td className="p-3">{kb.symptom?.name}</td>
                                            <td className="p-3">{kb.treatment?.description}</td>
                                            <td className="p-3">{kb.priorillness?.priorillness_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Add Knowledgebase Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6 border border-blue-200 dark:border-gray-800">
                                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Add New Knowledgebase</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Disease select or add */}
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
                                    {/* Symptoms multi-select and add */}
                                    <div className="col-span-2">
                                        <label className="block mb-1 text-blue-700 dark:text-blue-300">Symptoms</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="New prior illness..."
                                                value={newSymptomName}
                                                onChange={e => setNewSymptomName(e.target.value)}
                                                className="flex-1 border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800"
                                            />
                                            <button onClick={addNewSymptom} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add</button>
                                        </div>
                                        <Select
                                            isMulti
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
        </div>
    );
};

export default KnowledgebasePage;

