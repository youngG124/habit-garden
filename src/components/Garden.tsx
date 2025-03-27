import GrassCell from './GrassCell';

// 유틸 함수: 요일을 0(일) → 1(월)로 시작하도록 조정
const getStartOfWeek = (date: Date) => {
  const day = date.getDay(); // 0 (Sun) ~ 6 (Sat)
  const diff = (day === 0 ? -6 : 1 - day); // 월요일이 시작되도록 조정
  const start = new Date(date);
  start.setDate(date.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

const Garden: React.FC = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 제거

  const endDate = getStartOfWeek(today); // 이번 주 월요일
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 7 * 52); // 52주 = 1년

  // 날짜 배열 생성 (월요일 시작, 일요일 끝)
  const days: Date[] = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  
  return (
    <section className="w-full px-4 flex flex-col items-center">
      <div className="w-[726px] flex flex-col items-start">
        <h2 className="text-2xl font-semibold mb-4">Run</h2>
  
        <div className="grid grid-rows-7 grid-flow-col gap-[2px] mb-4">
          {days.map((date) => (
            <GrassCell key={date.toISOString()} date={date} />
          ))}
        </div>
      </div>
    </section>
  );  
};

export default Garden;
