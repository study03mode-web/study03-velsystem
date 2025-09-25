import { useState, useEffect } from 'react';
import { X, Tag as TagIcon } from 'lucide-react';
import { TagWithTransactions } from '../types/tag';



interface TagUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  tag: TagWithTransactions;
  onUpdate: (name: string) => void;
  isPending?: boolean;
}

export default function TagUpdateModal({
  isOpen,
  onClose,
  tag,
  onUpdate,
  isPending = false
}: TagUpdateModalProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(tag.tag.name);
    }
  }, [isOpen, tag.tag.name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed && trimmed !== tag.tag.name) {
      onUpdate(trimmed);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Update Tag</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Input */}
          <div>
            <label
              htmlFor="tagName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tag Name
            </label>
            <input
              type="text"
              id="tagName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter tag name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              autoFocus
            />
          </div>

          {/* Info Box */}
          <div className="flex items-center gap-2 bg-indigo-50 rounded-lg p-2.5">
            <TagIcon className="w-4 h-4 text-indigo-600" />
            <p className="text-xs text-gray-700">
              {tag.transactions > 0 && (
                <>
                  <span className="font-medium">{tag.transactions}</span>{" "}
                  transaction{tag.transactions !== 1 ? "s" : ""}
                </>
              )}

              {tag.transactions > 0 && tag.scheduledTransactions > 0 && " · "}

              {tag.scheduledTransactions > 0 && (
                <>
                  <span className="font-medium">{tag.scheduledTransactions}</span>{" "}
                  scheduled
                </>
              )}

              {tag.transactions === 0 && tag.scheduledTransactions === 0 && "Not used yet"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || name.trim() === tag.tag.name || isPending}
              className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}