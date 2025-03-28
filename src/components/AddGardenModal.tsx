import { useState } from 'react';

interface AddGardenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function AddGardenModal({ isOpen, onClose, onSubmit }: AddGardenModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 space-y-4">
        <h2 className="text-lg font-semibold">Add New Garden</h2>
        <input
          type="text"
          placeholder="Name of the new Garden"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 font-bold rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}