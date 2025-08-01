import React from 'react'

function ErrorMessage({ title, isShowSecondTitle = true }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <svg
                className="w-12 h-12 mb-3 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                />
            </svg>
            <p className="text-sm font-medium">{title}</p>
            {isShowSecondTitle && (<p className="text-xs text-gray-400 mt-1">
                Try adding a new {title} or check your filters.
            </p>)}

        </div>
    )
}

export default ErrorMessage