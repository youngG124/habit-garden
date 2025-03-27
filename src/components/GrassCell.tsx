type GrassCellProps = {
  date: Date;
};

const GrassCell: React.FC<GrassCellProps> = ({ date }) => {
  return (
    <div
      className="w-3 h-3 bg-green-200 rounded-sm hover:bg-green-400 transition-colors"
      title={date.toDateString()}
    />
  );
};

export default GrassCell;
