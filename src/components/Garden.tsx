import GrassCell from './GrassCell';

type GardenProps = {
  name: string;
};

const getStartOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const start = new Date(date);
  start.setDate(date.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

const Garden: React.FC<GardenProps> = ({ name }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = getStartOfWeek(today);
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 7 * 52);

  const days: Date[] = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  return (
    <section className="w-full max-w-screen-lg px-4 flex flex-col items-center mb-4">
      <div className="w-full flex flex-col items-start">
        {/* 제목 + 버튼 */}
        <div className="w-full flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <button className="px-3 py-1 text-sm font-bold bg-blue-400 rounded hover:bg-blue-600 transition">
          Water 💦
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          {/* 잔디 그리드 */}
          <div className="grid grid-rows-7 grid-flow-col gap-[1px] mb-4 overflow-x-auto">
            {days.map((date) => (
              <GrassCell key={date.toISOString()} date={date} />
            ))}
          </div>
        </div>        
      </div>
    </section>
  );
};

export default Garden;
