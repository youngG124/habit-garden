type GrassCellProps = {
  date: Date;
  isLogged: boolean;
};

const GrassCell: React.FC<GrassCellProps> = ({ date, isLogged }) => {
  return (
    <div
      className={`w-[1.45vw] h-[1.45vw] max-w-[12px] max-h-[12px] rounded-sm hover:bg-green-400 transition-colors ${isLogged ? 'bg-green-500' : 'bg-gray-200'}`}
      title={date.toDateString()}
    />
  );
};

export default GrassCell;
