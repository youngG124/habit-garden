import Garden from './components/Garden';

export default function App() {

  const habitNames = ["Run", "Read", "Clean", "Sleep Well"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-6 flex justify-between items-center shadow p-4">
        <div className="text-green-700 text-2xl font-bold flex items-center gap-2">          
          <span>Habit Garden</span><span>🌱</span>
        </div>
        <p className="text-sm text-gray-500">
          Grow your habits, day by day
        </p>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start py-8">
        {habitNames.map((name) => (
          <Garden key={name} name={name} />
        ))}
      </main>


      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © 2025 Habit Garden. All rights reserved.
      </footer>
    </div>
  );
}