import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';

const services = [
   {
    name: ""
  },
   {
    name: ""
  },
   {
    name: ""
  },
  {
    name: "Revisions"
  },
  {
    name: "Number of concepts included"
  },
  {
    name: "Logo tansparency"
  },
  {
    name: "Vector files"
  },
  {
    name: "Printable files"
  },
  {
    name: "3D Mockups"
  },
  {
    name: "Source file"
  },
  {
    name: "Stationary Design"
  },

];

function Table() {
  const table_head = ['BASIC', 'STANDARD', 'PREMIUM']
  const [package_name, setPackageName] = useState([])
  console.log("package name: ", package_name)

  const handleService = (name, services) => {
    setPackageName([...package_name, { name: name, services: [services] }])
    console.log("a: ", a)
  }
  return (
    <div className="overflow-x-auto w-full">
      <div className="text-sm text-gray-500 mb-2">A list of your recent invoices.</div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-500 ">
          <tr>
            <th></th>
            {
              table_head.map((data, index) => (
                <th key={index} scope="col" className="text-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 w-[100px]">
                  {data}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody className="bg-gray-400 divide-x-2 divide-y-2 divide-gray-200">
          {services.map((invoice, rowIndex) => (
            <tr key={rowIndex}>
              <td className="w-24 h-16 text-center font-medium text-gray-900 dark:text-white">
                {invoice.name}
              </td>
              {table_head.map((data, index) => (
                <td
                  key={index}
                  className="w-24 h-16 text-center text-gray-700 dark:text-gray-300"
                >
                  <CheckBoxOutlineBlankIcon
                    onClick={() => handleService(invoice.name, data)}
                    className="cursor-pointer"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* <tfoot className="bg-gray-500 ">
          <tr>
            <td colSpan={3} className="px-4 py-3 font-medium text-gray-900 dark:text-white">
              Total
            </td>
            <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
              $2,500.00
            </td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
}

export default Table;
