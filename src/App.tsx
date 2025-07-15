import { useEffect, useState } from 'react';
import Garden from './components/Garden';
import AddGardenModal from './components/AddGardenModal';
import axios from 'axios';

type Log = {
  habit_name : string;
  date: string;
  not?: string | null;
}

export default function App() {
  const [habitNames, setHabitNames] = useState(["Run", "Read", "Strength"]);
  const [habitLogs, setHabitLogs] = useState<Record<string, Log[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGarden = (name: string) => {
    setHabitNames([...habitNames, name]);
  };

  useEffect(() => {
    const fetchAllLogs = async () => {
      try {
        //const res = await axios.get("/api/disciplines");
        const ip = 'http://localhost:3000';
        const ip2 = '/grass-api';
        const res = await axios.get(ip2 + '/api/disciplines');
        const data : Log[] = await res.data;

        const grouped: Record<string, Log[]> = {};

        for (const log of data) {
          const dateObj = new Date(log.date);
          const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString()
            .padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;

          const logWithFormattedDate: Log = {
            ...log,
            date: formattedDate,
          };

          if (!grouped[log.habit_name]) {
            grouped[log.habit_name] = [];
          }

          grouped[log.habit_name].push(logWithFormattedDate);
        }
        
        setHabitLogs(grouped);
      } catch (err) {
        console.error('API fetch error : ' + err);
      }
    };

    fetchAllLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-4 py-4 flex justify-between items-center shadow p-4">
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
          <Garden key={name} name={name} logs={habitLogs[name] || []} />
        ))}
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-green-400 font-bold hover:bg-green-600 transition"
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