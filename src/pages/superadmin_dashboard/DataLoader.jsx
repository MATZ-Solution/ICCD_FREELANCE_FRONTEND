import React from 'react'

const DataLoader = ({tag}) => {
  return (
    <div>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-300 animate-ping mx-auto"></div>
          </div>
          <p className="mt-6 text-slate-600 font-medium">
            Loading {tag}...
          </p>
        </div>
      </div>
    </div>
  )
}

export default DataLoader