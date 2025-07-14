import GrassCell from './GrassCell';
import NoteModal from './NoteModal';
import { useState } from 'react';
import axios from 'axios';

type Log = {
  date: string;
  note?: string | null;
};

type GardenProps = {
  name: string;
  logs: Log[];
};

const getStartOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const start = new Date(date);
  start.setDate(date.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

const Garden: React.FC<GardenProps> = ({ name, logs }) => {

  const loggedDates = new Set(logs.map(log => log.date));
  console.log(loggedDates);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = getStartOfWeek(today);
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 7 * 52);

  const days: Date[] = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const handleSaveNote = async () => {
    try {
      console.log('name : ' + name);
      console.log('note : ' + note);
      const response = await axios.post('http://localhost:3000/api/disciplines', {
        name,
        note: note.trim() || null
      });

      const result = await response.data();
      console.log(result);
      setIsModalOpen(false);
      setNote('');

    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create habit log';
      throw new Error(message);
    }
  }

  return (
    <section className="w-full max-w-screen-lg px-2 flex flex-col items-center mb-4">
      <div className="w-full flex flex-col items-start">
        {/* 제목 + 버튼 */}
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1 text-sm font-bold bg-blue-400 rounded hover:bg-blue-600 transition">
          Water 💦
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          {/* 잔디 그리드 */}
          <div className="grid grid-rows-7 grid-flow-col gap-[1px] mb-4 overflow-x-auto">
            {days.map((date) => {
              const isLogged = loggedDates.has(formatDate(date));
              if(isLogged) {
                console.log('logged : ' + formatDate(date));
              }              
              return(
                <GrassCell key={date.toISOString()} date={date} isLogged={isLogged}/>
              );
            })}
          </div>
        </div>        
      </div>

      {isModalOpen && (
        <NoteModal
          note={note}
          onChange={setNote}
          onCancel={() => setIsModalOpen(false)}
          onSave={handleSaveNote}/>
      )}
    </section>
  );
};

export default Garden;

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};