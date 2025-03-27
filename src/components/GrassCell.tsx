type GrassCellProps = {
  date: Date;
};

const GrassCell: React.FC<GrassCellProps> = ({ date }) => {
  return (
    <div
      className="w-3.5 h-3.5 bg-gray-200 rounded-sm hover:bg-green-400 transition-colors"
      title={date.toDateString()}
    />
  );
};

export default GrassCell;
