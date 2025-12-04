export default function DashboardProfile({ vendor }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-8 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-serif text-black mb-2">Store Profile</h2>
        <p className="text-gray-600">Update store info and settings</p>
      </div>
      <button className="px-6 py-3 bg-[#d4af37] text-black rounded-xl shadow hover:opacity-90">
        Edit Profile
      </button>
    </div>
  );
}
