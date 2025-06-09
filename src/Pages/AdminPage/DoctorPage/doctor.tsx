import React, { useState } from "react";
import doctorData from "./doctor.json";
import statusOptions from "./statusOptions.json";
import Sidebar from "../Admin_components/Sidebar";
import Header from "../Admin_components/Header";
import { FaPlus, FaSearch, FaBars } from "react-icons/fa";

interface Doctor {
  name: string;
  date: string;
  phone: string;
  status: string;
  image: string;
}

const DoctorPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [form, setForm] = useState({
    name: "",
    date: "",
    phone: "",
    status: "",
    national_id: "",
    address: "",
    yearsofexperience: "",
    email: "",
    password: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted Doctor:", form);
    setIsModalOpen(false);
    setForm({
      name: "",
      date: "",
      phone: "",
      status: "",
      national_id: "",
      address: "",
      yearsofexperience: "",
      email: "",
      password: "",
      image: "",
    });
  };

  const filteredDoctors: Doctor[] = doctorData.filter((doctor: Doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredDoctors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white relative">
      <aside className="hidden sm:block fixed inset-y-0 left-0 w-64 z-40 bg-white dark:bg-gray-800 shadow-lg">
        <Sidebar />
      </aside>

      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white dark:bg-gray-700 rounded-full shadow"
        >
          <FaBars />
        </button>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <main className="flex-1 sm:ml-64 p-6 w-full">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header title="Doctors" />

          <div className="bg-blue-100 dark:bg-blue-900 rounded-xl p-6 shadow-md relative">
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-800"
              >
                <FaPlus />
                ADD NEW
              </button>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-blue-300 overflow-auto">
            <table className="w-full text-sm sm:text-base border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                  <th className="px-3 py-2 text-left">Img</th>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Phone Number</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctors.map((doctor, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-3 py-2">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-3 py-2">{doctor.name}</td>
                    <td className="px-3 py-2">{doctor.date}</td>
                    <td className="px-3 py-2">{doctor.phone}</td>
                    <td className="px-3 py-2">{doctor.status}</td>
                    <td className="px-3 py-2 text-xl text-gray-500 dark:text-white">⋯</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span>Display</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                >
                  {[10, 25, 50].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-red-500 text-white"
                        : "border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Doctor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Doctor</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status: string, index: number) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
              </div>

              {/* Right Column: Image + 3 Fields */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 border border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                  {form.image ? (
                    <img src={form.image} alt="Preview" className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="upload-avatar" />
                <label htmlFor="upload-avatar" className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 text-sm">
                  Upload
                </label>

                {/* Fields below image */}
                <input name="national_id" placeholder="National ID" value={form.national_id} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                <input name="yearsofexperience" placeholder="Years of Experience" value={form.yearsofexperience} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
