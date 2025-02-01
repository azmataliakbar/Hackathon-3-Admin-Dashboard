// src/app/coponents/OrderList.tsx


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - replace with actual API calls in a real application
const orders = [
  { id: 1, customer: "John Doe", date: "2025-01-15", total: 599.98, status: "Shipped" },
  { id: 2, customer: "Jane Smith", date: "2025-01-16", total: 149.99, status: "Processing" },
  { id: 3, customer: "Bob Johnson", date: "2025-01-17", total: 999.97, status: "Delivered" },
  { id: 4, customer: "Joseph Anthony", date: "2025-01-18", total: 599.98, status: "Shipped" },
  { id: 5, customer: "Philip Cant", date: "2025-01-19", total: 149.99, status: "Processing" },
  { id: 6, customer: "Kelvin Butler", date: "2025-01-20", total: 999.97, status: "Delivered" },
  { id: 7, customer: "Paul Daniel", date: "2025-01-21", total: 599.98, status: "Shipped" },
  { id: 8, customer: "Bob Baker", date: "2025-01-22", total: 149.99, status: "Processing" },
  { id: 9, customer: "Ashly Hamton", date: "2025-01-23", total: 999.97, status: "Delivered" },
  { id: 10, customer: "Domnic Filnay", date: "2025-01-24", total: 599.98, status: "Shipped" },
  { id: 11, customer: "Keneth Willis", date: "2025-01-25", total: 149.99, status: "Processing" },
  { id: 12, customer: "Robin Johnathon", date: "2025-01-26", total: 999.97, status: "Delivered" },
]

const OrdersList = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl md:text-5xl font-extrabold text-blue-500 mb-4 hover:text-green-500">
        Recent Orders
      </h2>
      {/* Wrap the table in an overflow container for horizontal scrolling */}
      <div className="overflow-x-auto">
        <Table className="border-2 border-gray-200 min-w-[600px]">
          <TableHeader>
            <TableRow className="bg-yellow-100 rounded border-2 border-gray-300">
              <TableHead className="text-red-500 font-bold text-base md:text-xl">Order ID</TableHead>
              <TableHead className="text-red-500 font-bold text-base md:text-xl">Customer</TableHead>
              <TableHead className="text-red-500 font-bold text-base md:text-xl">Date</TableHead>
              <TableHead className="text-red-500 font-bold text-base md:text-xl">Total</TableHead>
              <TableHead className="text-red-500 font-bold text-base md:text-xl">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="bg-yellow-50 hover:bg-white transition-colors">
                <TableCell className="text-black font-bold text-sm md:text-lg">{order.id}</TableCell>
                <TableCell className="text-black font-bold text-sm md:text-lg">{order.customer}</TableCell>
                <TableCell className="text-black font-bold text-sm md:text-lg">{order.date}</TableCell>
                <TableCell className="text-black font-bold text-sm md:text-lg">
                  $ {order.total.toFixed(2)}
                </TableCell>
                <TableCell className="text-black font-bold text-sm md:text-lg">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <h6 className="text-gray-300 text-center mt-4">Author:Azmat Ali</h6>
    </div>
  )
}

export default OrdersList;
