export function CardDemo() {
  return (
    <div className="w-full max-w-sm mx-auto border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Login to your account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Enter your email below to login to your account
        </p>
        <div className="mt-2">
          <button className="text-sm text-blue-600 hover:underline">
            Sign Up
          </button>
        </div>
      </div>

      {/* Content */}
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
}
