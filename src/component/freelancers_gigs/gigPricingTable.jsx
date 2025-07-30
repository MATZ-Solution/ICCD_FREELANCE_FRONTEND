import  { useState } from "react";

const packages = ["basic", "standard", "premium"];
const features = [
  { label: "Title", type: "text", field: "title" },
  { label: "Description", type: "textarea", field: "desc" },
  { label: "Delivery Days", type: "select", field: "delivery", options: ["2", "4", "6", "10"] },
  { label: "Revisions", type: "select", field: "revisions", options: ["0", "2", "4", "6"] },
];

export default function PricingTable() {

  const [pricing, setPricing] = useState({
    basic: { name: 'basic' }, standard: { name: 'standard' }, premium: { name: 'premium' }
  });

  const handleChange = (pkg, field, value) => {
    setPricing(prev => ({
      ...prev,
      [pkg]: { ...prev[pkg], [field]: value }
    }));
  };

  console.log("pricing: ", pricing)



  return (
    <div className="overflow-x-auto mt-6">
      <table className="table-auto w-full border border-gray-300 text-sm shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left font-semibold w-64">Packages</th>
            {packages.map(pkg => (
              <th key={pkg} className="p-4 text-center font-semibold border-l border-gray-300">{pkg}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map(({ label, type, field, options }) => (
            <tr key={field} className="border-t border-gray-200">
              <td className="p-3 font-medium">{label}</td>
              {packages.map(pkg => (
                <td key={pkg} className="p-2 text-center">
                  {type === "text" && (
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded"
                      value={pricing[pkg]?.[field] || ""}
                      onChange={(e) => handleChange(pkg, field, e.target.value)}
                    />
                  )}
                  {type === "textarea" && (
                    <textarea
                      className="w-full px-2 py-1 border rounded"
                      value={pricing[pkg]?.[field] || ""}
                      rows={2}
                      onChange={(e) => handleChange(pkg, field, e.target.value)}
                    />
                  )}
                  {type === "select" && (
                    <select
                      className="w-full px-2 py-1 border rounded"
                      value={pricing[pkg]?.[field] || ""}
                      onChange={(e) => handleChange(pkg, field, e.target.value)}
                    >
                      <option value="">SELECT</option>
                      {options.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                  {type === "checkbox" && (
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={!!pricing[pkg]?.[field]}
                      onChange={(e) => handleChange(pkg, field, e.target.checked)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
