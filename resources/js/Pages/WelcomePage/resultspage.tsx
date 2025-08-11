import React, { useEffect, useState } from "react";
import { router, Link } from "@inertiajs/react";
import diagnosisData from "./diagnosisData.json";

export default function ResultsPage() {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("symptomForm");
        if (!stored) return router.get("/symptom-form");
        try {
            const parsed = JSON.parse(stored);
            setFormData(parsed);
        } catch (err) {
            console.error("Failed to parse stored form:", err);
            router.get("/symptom-form");
        }
    }, []);

    if (!formData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-900 text-red-500">
                <p>No data found. Please complete the symptom form.</p>
            </div>
        );
    }

    const {
        age = "N/A",
        weightRange = "N/A",
        primarySymptom = [],
        pastIllness = [],
    } = formData;

    const mainSymptom = primarySymptom[0]; // taking first symptom as main for simplicity
    const diagnosis = diagnosisData[mainSymptom];

    if (!diagnosis) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-900 text-red-600">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Diagnosis Not Found</h1>
                    <p>
                        No diagnosis available for: <strong>{mainSymptom || "your symptom"}</strong>
                    </p>
                    <button
                        onClick={() => router.get("/symptom-form")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Go Back to Form
                    </button>
                </div>
            </div>
        );
    }

    const { disease, recommendations } = diagnosis;

    return (
        <div className="flex min-h-screen bg-blue-50 dark:bg-gray-900">
            <div className="flex-1 p-6 sm:p-10">
                <header className="flex justify-between items-center mb-8">
                    <img src={"/assets/logo.jpg"} alt="PiKrous Logo" className="h-12" />
                    <button
                        onClick={() => router.get("/symptom-form")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Start Over
                    </button>
                </header>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-10 shadow space-y-6">
                    <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-300 text-center">
                        Diagnosis Summary
                    </h1>

                    <div>
                        <h2 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">Age Range:</h2>
                        <p>{age}</p>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">Weight:</h2>
                        <p>{weightRange} kg</p>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">Selected Symptoms:</h2>
                        {primarySymptom.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {primarySymptom.map((symptom, idx) => (
                                    <li key={idx}>{symptom}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No symptoms selected</p>
                        )}
                    </div>

                    <div>
                        <h2 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">Past Illnesses:</h2>
                        {pastIllness.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {pastIllness.map((ill, idx) => (
                                    <li key={idx}>{ill}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>None indicated</p>
                        )}
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md text-blue-800 dark:text-blue-200">
                        <p>
                            Based on your symptoms, you may be experiencing <strong>{disease}</strong>.
                            <br />
                            <span className="block mt-2">{recommendations}</span>
                            <br />
                            <em>This is not a medical diagnosis. Always consult a licensed healthcare provider.</em>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}