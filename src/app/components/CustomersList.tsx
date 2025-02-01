// src/app/components/CustomersList.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for customers' order details
const customers = [
  {
    id: 1,
    srNo: 1,
    name: "John Doe",
    phone: "+123456789",
    email: "john.doe@example.com",
    date: "2025-01-15",
    performance: "Low",
    status: "Active",
  },
  {
    id: 2,
    srNo: 2,
    name: "Jane Smith",
    phone: "+987654321",
    email: "jane.smith@example.com",
    date: "2025-01-16",
    performance: "Medium",
    status: "Active",
  },
  {
    id: 3,
    srNo: 3,
    name: "Bob Johnson",
    phone: "+1122334455",
    email: "bob.johnson@example.com",
    date: "2025-01-17",
    performance: "High",
    status: "Active",
  },
  {
    id: 4,
    srNo: 4,
    name: "Joseph Anthony",
    phone: "+123456789",
    email: "jos.ant@example.com",
    date: "2025-01-18",
    performance: "Low",
    status: "Active",
  },
  {
    id: 5,
    srNo: 5,
    name: "Philip Cant",
    phone: "+987654321",
    email: "php.cnt@example.com",
    date: "2025-01-19",
    performance: "Medium",
    status: "Active",
  },
  {
    id: 6,
    srNo: 6,
    name: "Kelvin Butler",
    phone: "+1122334455",
    email: "klvn.btlr@example.com",
    date: "2025-01-20",
    performance: "High",
    status: "Active",
  },
  {
    id: 7,
    srNo: 7,
    name: "Paul Daniel",
    phone: "+123456789",
    email: "paul.dnl@example.com",
    date: "2025-01-21",
    performance: "Low",
    status: "Active",
  },
  {
    id: 8,
    srNo: 8,
    name: "Bob Baker",
    phone: "+987654321",
    email: "bob.bkr@example.com",
    date: "2025-01-22",
    performance: "Medium",
    status: "Active",
  },
  {
    id: 9,
    srNo: 9,
    name: "Ashly Hamton",
    phone: "+1122334455",
    email: "ash.hmtn@example.com",
    date: "2025-01-23",
    performance: "High",
    status: "Active",
  },
  {
    id: 10,
    srNo: 10,
    name: "Domnic Filnay",
    phone: "+123456789",
    email: "dom.flny@example.com",
    date: "2025-01-24",
    performance: "Low",
    status: "Active",
  },
  {
    id: 11,
    srNo: 11,
    name: "Keneth Willis",
    phone: "+987654321",
    email: "knth.wil@example.com",
    date: "2025-01-25",
    performance: "Medium",
    status: "Active",
  },
  {
    id: 12,
    srNo: 12,
    name: "Robin Johnathon",
    phone: "+1122334455",
    email: "rob.john@example.com",
    date: "2025-01-26",
    performance: "High",
    status: "Active",
  },
];

const CustomersList = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl md:text-5xl font-extrabold text-blue-500 hover:text-green-500 mb-4">
        Customer Details
      </h2>
      <div className="overflow-x-auto">
        <Table className="border-2 border-gray-200 min-w-[800px] md:min-w-full">
          <TableHeader>
            <TableRow className="bg-yellow-100 rounded border-2 border-gray-300">
              <TableHead className="text-red-500 font-bold text-sm md:text-lg">
                Sr. No
              </TableHead>
              <TableHead className="text-red-500 font-bold text-sm md:text-lg">
                Name
              </TableHead>
              <TableHead className="text-red-500 font-bold text-sm md:text-lg">
                Phone
              </TableHead>
              <TableHead className="text-red-500 font-bold text-sm md:text-lg">
                Email
              </TableHead>
              <TableHead className="text-red-500 font-bold text-sm md:text-lg">
                Date
              </TableHead>
              <TableHead className="text-red-500 font-bold text-sm md:text-lg">
                Performance
              </TableHead>
              <TableHead className="text-red-500 font-bold text-sm md:text-lg">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                className="bg-yellow-50 hover:bg-white border-2 border-gray-200"
              >
                <TableCell className="text-black font-bold text-xs md:text-sm">
                  {customer.srNo}
                </TableCell>
                <TableCell className="text-black font-bold text-xs md:text-sm">
                  {customer.name}
                </TableCell>
                <TableCell className="text-black font-bold text-xs md:text-sm">
                  {customer.phone}
                </TableCell>
                <TableCell className="text-black font-bold text-xs md:text-sm">
                  {customer.email}
                </TableCell>
                <TableCell className="text-black font-bold text-xs md:text-sm">
                  {customer.date}
                </TableCell>
                <TableCell className="text-black font-bold text-xs md:text-sm">
                  {customer.performance}
                </TableCell>
                <TableCell className="text-black font-bold text-xs md:text-sm">
                  {customer.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <h6 className="text-gray-300 text-center mt-4">Author: Azmat Ali</h6>
    </div>
  );
};

export default CustomersList;