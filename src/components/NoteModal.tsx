type NoteModalProps = {
  note: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

const NoteModal: React.FC<NoteModalProps> = ({ note, onChange, onCancel, onSave }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <h3 className="text-lg font-semibold mb-2">Add a note 💬</h3>
        <textarea
          value={note}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-24 p-2 border rounded mb-4"
          placeholder="Add without note"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
