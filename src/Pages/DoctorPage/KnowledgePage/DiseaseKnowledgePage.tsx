import React, { useState } from "react";
import Sidebar from "../doctor_components/Sidebar";
import Header from "../doctor_components/Header";
import { FaPlus, FaSearch, FaBars } from "react-icons/fa";
import dayjs from "dayjs";
import symptoms from "./symptoms.json";
import affectedSystems from "./affectedSystems.json";

interface Symptom {
  name: string;
  category: string;
  lastUpdated: string;
}

const DiseaseKnowledgePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newSymptom, setNewSymptom] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
    commonWith: "",
    tagAlias: "",
  });

  const filtered: Symptom[] = symptoms.filter((symptom) =>
    symptom.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSymptom = () => {
    if (newSymptom.name && newSymptom.category) {
      console.log("Submitted:", newSymptom);
      setIsModalOpen(false);
      setNewSymptom({
        name: "",
        category: "",
        description: "",
        tags: "",
        commonWith: "",
        tagAlias: "",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white flex relative">
      {/* Desktop Sidebar */}
      <aside className="hidden sm:block fixed inset-y-0 left-0 w-64 z-40 bg-white dark:bg-gray-800 shadow-lg">
        <Sidebar />
      </aside>

      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full sm:ml-64 px-4 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header title="Disease Knowledge" />

          {/* Table Container */}
          <div className="border-2 border-blue-400 rounded-xl p-4 sm:p-6 bg-blue-50 dark:bg-gray-800 shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
              >
                <FaPlus />
                <span>Add New</span>
              </button>

              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              </div>
            </div>

            <p className="text-center text-blue-900 dark:text-blue-300 font-medium mb-4 text-base">
              Symptom Table
            </p>

            {/* Table */}
            <div className="overflow-auto">
              <table className="w-full text-base text-gray-800 dark:text-white">
                <thead className="text-left text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
                  <tr>
                    <th className="p-3">Symptom Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((symptom, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                    >
                      <td className="p-3">{symptom.name}</td>
                      <td className="p-3">{symptom.category}</td>
                      <td className="p-3">
                        {dayjs(symptom.lastUpdated).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No matching symptoms found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add New Symptom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Add New Symptoms
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Symptom Name"
                  value={newSymptom.name}
                  onChange={(e) =>
                    setNewSymptom({ ...newSymptom, name: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700"
                />

                <div className="relative">
                  <select
                    value={newSymptom.tags}
                    onChange={(e) =>
                      setNewSymptom({ ...newSymptom, tags: e.target.value })
                    }
                    className="w-full px-4 py-2 pr-8 border border-blue-200 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
                  >
                    <option value="" disabled>
                      Affected System
                    </option>
                    {affectedSystems.map((system, index) => (
                      <option key={index} value={system}>
                        {system}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                    ▼
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Severity"
                  value={newSymptom.category}
                  onChange={(e) =>
                    setNewSymptom({ ...newSymptom, category: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700"
                />
                <input
                  type="text"
                  placeholder="Common with Diseases"
                  value={newSymptom.commonWith}
                  onChange={(e) =>
                    setNewSymptom({
                      ...newSymptom,
                      commonWith: e.target.value,
                    })
                  }
                  className="px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700"
                />
                <input
                  type="text"
                  placeholder="Tags / Aliases"
                  value={newSymptom.tagAlias}
                  onChange={(e) =>
                    setNewSymptom({ ...newSymptom, tagAlias: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700"
                />
              </div>

              <textarea
                placeholder="Description"
                value={newSymptom.description}
                onChange={(e) =>
                  setNewSymptom({
                    ...newSymptom,
                    description: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSymptom}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseKnowledgePage;
