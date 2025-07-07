import React from 'react'


const SidebarCard = ({price , description , deliverytime ,Revisions , pages}) => {
  return (
    <div>
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">PKR {price}</h3>
              <span className="text-xs text-gray-600 bg-yellow-100 px-2 py-1 rounded">
                Save up to 10% with Subscribe to Save
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-4">
              {description}
            </p>

            <div className="space-y-3 flex flex-row  ">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-700">{deliverytime} day delivery  </span>
              </div>
              <div className="flex mb-2 items-center ml-4">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-sm  text-gray-700">{Revisions} Revisions</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">

                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">{pages} Page</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                  </svg>
                </div>
                
                <span className="text-sm text-gray-700">Responsive Design</span>
              </div>
               <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                  </svg>
                </div>
                
                <span className="text-sm text-gray-700">Prototype</span>
              </div>
               <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                  </svg>
                </div>
                
                <span className="text-sm text-gray-700">Sourcefile</span>
              </div>
            </div>

            <button className="w-full bg-black hover:bg-blue-500 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-3">
              Continue 
            </button>

            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-colors">
              Contact me
            </button>
          </div>
    </div>
  )
}

export default SidebarCard