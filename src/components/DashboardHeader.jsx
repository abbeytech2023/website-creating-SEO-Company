export default function DashboardHeader({ vendor }) {
  return (
    <div className="flex items-center bg-white p-6 rounded-2xl shadow mb-8">
      <img
        src={vendor?.logo_url || "/sample-logo.jpg"}
        alt="Store Logo"
        className="w-24 h-24 rounded-full border-4 border-white shadow mr-6"
      />
      <div>
        <h1 className="text-3xl font-serif text-black">
          {vendor?.businessName}
        </h1>
        <p className="text-gray-600">{vendor?.bio}</p>
      </div>
    </div>
  );
}
