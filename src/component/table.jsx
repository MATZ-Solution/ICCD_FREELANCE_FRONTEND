const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  return (
    <div className="overflow-x-auto w-full">
      <div className="text-sm text-gray-500 mb-2">A list of your recent invoices.</div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 w-[100px]">
              Invoice
            </th>
            <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Method
            </th>
            <th scope="col" className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {invoices.map((invoice) => (
            <tr key={invoice.invoice} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{invoice.invoice}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{invoice.paymentStatus}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{invoice.paymentMethod}</td>
              <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{invoice.totalAmount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <td colSpan={3} className="px-4 py-3 font-medium text-gray-900 dark:text-white">
              Total
            </td>
            <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
              $2,500.00
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
