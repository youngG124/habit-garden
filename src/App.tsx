import { useState } from 'react';
import Garden from './components/Garden';
import AddGardenModal from './components/AddGardenModal';

export default function App() {

  const [habitNames, setHabitNames] = useState(["Run", "Read", "Clean", "Sleep Well"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGarden = (name: string) => {
    setHabitNames([...habitNames, name]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-6 flex justify-between items-center shadow p-4">
        <div className="text-green-700 text-2xl font-bold flex items-center gap-2">          
          <span>Habit Garden</span><span>🌱</span>
        </div>
        <p className="text-sm text-gray-500">
          Grow your habits,<br/> day by day
        </p>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start py-4">
        {habitNames.map((name) => (
          <Garden key={name} name={name} />
        ))}
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-green-500 font-bold hover:bg-green-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          + Add New Garden
        </button>
        <AddGardenModal
          isOpen={isModalOpen}
          onClose={()=>setIsModalOpen(false)}
          onSubmit={handleAddGarden}
        />
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © 2025 Habit Garden. All rights reserved.
      </footer>
    </div>
  );
}