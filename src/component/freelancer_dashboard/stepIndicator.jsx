function stepIndicator({completionPercentage}) {
    return (
        <div className="flex flex-col w-full sm:w-auto gap-2">
            <div className="text-sm font-medium text-gray-700 whitespace-nowrap text-center sm:text-right">
                Completion Rate: {completionPercentage}%
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
                <div
                    className="bg-blue-600 h-2 rounded transition-all duration-500 ease-in-out"
                    style={{ width: `${completionPercentage}%` }}
                ></div>
            </div>
        </div>
    )
}

export default stepIndicator