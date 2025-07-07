import { Clock } from "lucide-react";
import React, { useState } from "react";
import SidebarCard from "./sidebarcard";

export default function Sidebar() {
  const [activeNavTab, setActiveNavTab] = useState("Basic");

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6">
        {/* Package Selection */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                id="Basic"
                onClick={() => setActiveNavTab("Basic")}
                className={`flex-1 py-3 px-4 text-center text-sm font-medium border-b-2 ${
                  activeNavTab === "Basic"
                    ? "border-black text-black bg-green-50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                }`}
              >
                Basic
              </button>
              <button
                id="Standard"
                onClick={() => setActiveNavTab("Standard")}
                className={`flex-1 py-3 px-4 text-center text-sm font-medium border-b-2 ${
                  activeNavTab === "Standard"
                    ? "border-black text-black bg-green-50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                }`}
              >
                Standard
              </button>
              <button
                id="Premium"
                onClick={() => setActiveNavTab("Premium")}
                className={`flex-1 py-3 px-4 text-center text-sm font-medium border-b-2 ${
                  activeNavTab === "Premium"
                    ? "border-black text-black bg-green-50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                }`}
              >
                Premium
              </button>
            </div>
          </div>

          {activeNavTab === "Basic" && (
            <SidebarCard
              price="21,00"
              description="Single page 1 page PSD template/PSD template designed with professional quality"
              deliverytime="3"
              Revisions="Unlimited"
              pages="1"
            />
          )}

          {activeNavTab === "Standard" && (
            <SidebarCard
              price="50,000"
              description="Multiple page PSD template designed with professional quality + Source Code"
              deliverytime="7"
              Revisions="Unlimited"
              pages="1"
            />
          )}

          {activeNavTab === "Premium" && (
            <SidebarCard
              price="90,000"
              description="Unlimited page PSD template designed with professional quality + Source Code"
              deliverytime="14"
              Revisions="Unlimited"
              pages="unlimited"
            />
          )}
        </div>
      </div>
    </div>
  );
}