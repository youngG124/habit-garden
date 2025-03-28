type GrassCellProps = {
  date: Date;
};

const GrassCell: React.FC<GrassCellProps> = ({ date }) => {
  return (
    <div
      className="w-[1.45vw] h-[1.45vw] max-w-[12px] max-h-[12px] bg-gray-200 rounded-sm hover:bg-green-400 transition-colors"
      title={date.toDateString()}
    />
  );
};

export default GrassCell;
