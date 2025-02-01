import Header1 from "./Header1"


export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header1 />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
      
    </>
  )
}

