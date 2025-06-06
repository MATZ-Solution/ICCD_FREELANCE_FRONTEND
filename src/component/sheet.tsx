import { useState } from "react";

export function SheetDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Open
      </button>

      {/* Overlay + Sheet */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sheet Content */}
          <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Sheet Header */}
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Edit profile</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Make changes to your profile here. Click save when you're done.
              </p>
            </div>

            {/* Sheet Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              <div className="space-y-2">
                <label htmlFor="sheet-name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="sheet-name"
                  type="text"
                  defaultValue="Pedro Duarte"
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="sheet-username" className="text-sm font-medium">
                  Username
                </label>
                <input
                  id="sheet-username"
                  type="text"
                  defaultValue="@peduarte"
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <button
                onClick={() => alert("Saved!")}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save changes
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
