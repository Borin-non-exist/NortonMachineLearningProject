import React, { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "../../Layouts/SidebarAdmin";
import Header from "../../Layouts/HeaderAdmin";
import { FaPlus, FaSearch, FaBars } from "react-icons/fa";
import Select, { MultiValue } from "react-select";
import { router, usePage } from '@inertiajs/react';

interface Disease {
    name: string;
    description: string;
    confidenceScore: number;
    symptoms: number[]; // <-- Use array of IDs, not strings
    treatment: string;
    type: string;
}

interface SymptomOption {
    value: number; // symptom_id
    label: string; // name
}

const DiseaseKnowledgePage: React.FC = () => {
    const { props } = usePage();
    const initialDiseases = (props.diseases as any[]) || [];
    const initialSymptoms = (props.symptoms as any[]) || [];
    const [search, setSearch] = useState<string>("");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [diseases, setDiseases] = useState<Disease[]>(initialDiseases.map(d => ({
        ...d,
        symptoms: d.symptoms ? d.symptoms.map((s: any) => s.symptom_id) : [],
    })));
    const [symptomOptions, setSymptomOptions] = useState<SymptomOption[]>(
        initialSymptoms.map(s => ({ value: s.symptom_id, label: s.name }))
    );

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [viewIndex, setViewIndex] = useState<number | null>(null);
    const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const [newDisease, setNewDisease] = useState<Disease>({
        name: "",
        description: "",
        confidenceScore: 0,
        symptoms: [],
        treatment: "",
        type: "",
    });

    const [newSymptomName, setNewSymptomName] = useState<string>("");

    // Fetch diseases and symptoms from backend on mount (if not provided by SSR)
    useEffect(() => {
        if (!initialDiseases.length) {
            router.get('/diseases', {}, { preserveState: true });
        }
        // REMOVE or COMMENT OUT this block:
        // if (!initialSymptoms.length) {
        //     router.get('/symptoms', {}, { preserveState: true });
        // }
    }, []);

    // Update diseases and symptoms when props change (after navigation/post)
    useEffect(() => {
        setDiseases(((props.diseases as any[]) || []).map(d => ({
            ...d,
            symptoms: d.symptoms ? d.symptoms.map((s: any) => s.symptom_id) : [],
        })));
        setSymptomOptions(((props.symptoms as any[]) || []).map(s => ({ value: s.symptom_id, label: s.name })));
    }, [props.diseases, props.symptoms]);

    const filtered = diseases.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    const openAddModal = () => {
        setEditingIndex(null);
        setNewDisease({ name: "", description: "", confidenceScore: 0, symptoms: [], treatment: "", type: "" });
        setNewSymptomName("");
        setIsModalOpen(true);
        setMenuOpenIndex(null);
    };

    const openEditModal = (index: number) => {
        setEditingIndex(index);
        setNewDisease({ ...diseases[index], symptoms: [...diseases[index].symptoms] });
        setNewSymptomName("");
        setIsModalOpen(true);
        setMenuOpenIndex(null);
    };

    const openViewModal = (index: number) => {
        setViewIndex(index);
        setMenuOpenIndex(null);
    };

    const closeModals = () => {
        setIsModalOpen(false);
        setViewIndex(null);
        setEditingIndex(null);
        setMenuOpenIndex(null);
        setShowDeleteModal(false);
        setDeleteIndex(null);
    };

    const handleSubmit = () => {
        if (editingIndex !== null) {
            // Implement update logic here (PUT/PATCH)
            // router.put(`/diseases/${diseases[editingIndex].id}`, newDisease, { ... });
        } else {
            router.post('/diseases', {
                name: newDisease.name,
                description: newDisease.description,
                confidenceScore: newDisease.confidenceScore,
                treatment: newDisease.treatment,
                type: newDisease.type,
                symptom_ids: newDisease.symptoms, // array of IDs
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    closeModals();
                },
                onError: (errors) => {
                    console.log(errors);
                }
            });
        }
    };

    const handleDelete = (index: number) => {
        setDeleteIndex(index);
        setShowDeleteModal(true);
        setMenuOpenIndex(null);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            // You should call router.delete here for real backend deletion
            setDiseases((d) => d.filter((_, i) => i !== deleteIndex));
            closeModals();
        }
    };

    const onSymptomsChange = (selected: MultiValue<SymptomOption> | null) => {
        setNewDisease((d) => ({
            ...d,
            symptoms: selected ? selected.map((o) => o.value) : [],
        }));
    };

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
            onSuccess: (page: any) => {
                // Expect backend to return the new symptom object
                const newSymptom = page.props?.symptom || null;
                if (newSymptom) {
                    setSymptomOptions((opts) => [...opts, { value: newSymptom.symptom_id, label: newSymptom.name }]);
                    setNewDisease((d) => ({ ...d, symptoms: [...d.symptoms, newSymptom.symptom_id] }));
                }
                setNewSymptomName("");
            }
        });
    };

    // Helper to get symptom names by ID
    const getSymptomNames = (ids: number[]) =>
        symptomOptions.filter(opt => ids.includes(opt.value)).map(opt => opt.label).join(", ");

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
                    <Header title="Disease Knowledge" />

                    {/* Toolbar & Table */}
                    <div className="rounded-2xl p-6 bg-white/80 dark:bg-gray-900/80 shadow-xl border border-blue-200 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <button
                                onClick={openAddModal}
                                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow hover:from-blue-600 hover:to-blue-800 transition"
                            >
                                <FaPlus /> <span>Add Disease</span>
                            </button>
                            <div className="relative w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search disease..."
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
                                        <th className="p-3 text-left font-semibold">Name</th>
                                        <th className="p-3 text-left font-semibold">Confidence %</th>
                                        <th className="p-3 text-left font-semibold">Symptoms</th>
                                        <th className="p-3 text-left font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-6 text-center text-gray-400 dark:text-gray-500">
                                                No diseases found.
                                            </td>
                                        </tr>
                                    )}
                                    {filtered.map((d, idx) => (
                                        <tr key={idx} className="border-b last:border-b-0 hover:bg-blue-100/60 dark:hover:bg-gray-800/60 transition">
                                            <td className="p-3">{d.name}</td>
                                            <td className="p-3">{d.confidenceScore}</td>
                                            <td className="p-3">{getSymptomNames(d.symptoms as number[])}</td>
                                            <td className="p-3 relative">
                                                <button
                                                    onClick={() => setMenuOpenIndex(menuOpenIndex === idx ? null : idx)}
                                                    className="text-xl px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-gray-800"
                                                >
                                                    ⋯
                                                </button>
                                                {menuOpenIndex === idx && (
                                                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-blue-100 dark:border-gray-800 z-10">
                                                        <button onClick={() => openViewModal(idx)} className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-800 rounded-t-lg">
                                                            View
                                                        </button>
                                                        <button onClick={() => openEditModal(idx)} className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-800">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDelete(idx)} className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-800 rounded-b-lg">
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Add/Edit Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl space-y-6 border border-blue-200 dark:border-gray-800">
                                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">{editingIndex !== null ? "Edit Disease" : "Add New Disease"}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newDisease.name}
                                        onChange={e => setNewDisease({ ...newDisease, name: e.target.value })}
                                        className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Confidence %"
                                        value={newDisease.confidenceScore}
                                        onChange={e => setNewDisease({ ...newDisease, confidenceScore: +e.target.value })}
                                        className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Type"
                                        value={newDisease.type}
                                        onChange={e => setNewDisease({ ...newDisease, type: e.target.value })}
                                        className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800"
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={newDisease.description}
                                        onChange={e => setNewDisease({ ...newDisease, description: e.target.value })}
                                        rows={3}
                                        className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800 col-span-2"
                                    />

                                    {/* Inline add symptom */}
                                    <div className="col-span-2 flex gap-2">
                                        <input type="text" placeholder="New symptom..." value={newSymptomName} onChange={e => setNewSymptomName(e.target.value)} className="flex-1 border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800" />
                                        <button onClick={addNewSymptom} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add</button>
                                    </div>

                                    {/* Multi-select dropdown */}
                                    <div className="col-span-2">
                                        <label className="block mb-1 text-blue-700 dark:text-blue-300">Symptoms</label>
                                        <Select<SymptomOption, true>
                                            isMulti
                                            options={symptomOptions}
                                            value={symptomOptions.filter(o => newDisease.symptoms.includes(o.value))}
                                            onChange={onSymptomsChange}
                                            inputId="symptom-select"
                                            instanceId="symptom-select-instance"
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: state.isFocused ? "#e0e7ff" : "#f0f6ff",
                                                    borderColor: state.isFocused ? "#2563eb" : "#bfdbfe",
                                                    boxShadow: state.isFocused ? "0 0 0 2px #2563eb33" : undefined,
                                                    minHeight: 44,
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#f0f6ff",
                                                }),
                                                multiValue: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#dbeafe",
                                                    color: "#1e40af",
                                                }),
                                                multiValueLabel: (base) => ({
                                                    ...base,
                                                    color: "#1e40af",
                                                }),
                                                multiValueRemove: (base) => ({
                                                    ...base,
                                                    color: "#1e40af",
                                                    ':hover': {
                                                        backgroundColor: "#2563eb",
                                                        color: "white",
                                                    },
                                                }),
                                            }}
                                            theme={theme => ({
                                                ...theme,
                                                borderRadius: 8,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: "#dbeafe",
                                                    primary: "#2563eb",
                                                },
                                            })}
                                        />
                                    </div>

                                    <textarea placeholder="Treatment" value={newDisease.treatment} onChange={e => setNewDisease({ ...newDisease, treatment: e.target.value })} rows={2} className="border border-blue-200 dark:border-gray-700 rounded p-2 bg-blue-50 dark:bg-gray-800 col-span-2" />
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button onClick={closeModals} className="px-4 py-2 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800 transition">Cancel</button>
                                    <button onClick={handleSubmit} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 transition">{editingIndex !== null ? "Save" : "Add"}</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* View Modal */}
                    {viewIndex !== null && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6 border border-blue-200 dark:border-gray-800">
                                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Disease Details</h2>
                                <div className="space-y-2">
                                    <p><span className="font-semibold text-blue-700 dark:text-blue-300">Name:</span> {diseases[viewIndex].name}</p>
                                    <p><span className="font-semibold text-blue-700 dark:text-blue-300">Description:</span> {diseases[viewIndex].description}</p>
                                    <p><span className="font-semibold text-blue-700 dark:text-blue-300">Confidence:</span> {diseases[viewIndex].confidenceScore}%</p>
                                    <p><span className="font-semibold text-blue-700 dark:text-blue-300">Symptoms:</span> {getSymptomNames(diseases[viewIndex].symptoms as number[])}</p>
                                    <p><span className="font-semibold text-blue-700 dark:text-blue-300">Treatment:</span> {diseases[viewIndex].treatment}</p>
                                    <p><span className="font-semibold text-blue-700 dark:text-blue-300">Type:</span> {diseases[viewIndex].type}</p>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={closeModals} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 transition">Close</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm space-y-6 border border-blue-200 dark:border-gray-800">
                                <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Confirm Delete</h2>
                                <p className="text-gray-700 dark:text-gray-300">Are you sure you want to delete this disease?</p>
                                <div className="flex justify-end space-x-4">
                                    <button onClick={closeModals} className="px-4 py-2 border border-blue-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800 transition">Cancel</button>
                                    <button onClick={confirmDelete} className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded hover:from-red-600 hover:to-red-800 transition">Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DiseaseKnowledgePage;

