export default function Button({ children, onClick }) { return <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={onClick}>{children}</button>; }
