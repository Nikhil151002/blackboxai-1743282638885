export function Tabs({ children }) {
  return (
    <div className="flex border-b border-gray-200">
      {children}
    </div>
  );
}

export function Tab({ label, active, onClick }) {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm focus:outline-none ${
        active 
          ? 'border-b-2 border-indigo-500 text-indigo-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}