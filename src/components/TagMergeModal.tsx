import { useState } from 'react';
import { X, Search, ArrowRight, Check } from 'lucide-react';
import { TagWithTransactions } from '../types/tag';

interface TagMergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceTag: TagWithTransactions;
  availableTags: TagWithTransactions[];
  onMerge: (targetTagId: string) => void;
  isPending?: boolean;
}

export default function TagMergeModal({ 
  isOpen, 
  onClose, 
  sourceTag,
  availableTags,
  onMerge,
  isPending = false
}: TagMergeModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<TagWithTransactions | null>(null);

  const filteredTags = availableTags
    .filter(tag => tag.tag.id !== sourceTag.tag.id)
    .filter(tag =>
      searchTerm.trim() === ''
        ? true
        : tag.tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleMerge = () => {
    if (selectedTag) {
      onMerge(selectedTag.tag.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Merge Tag</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Merge Operation */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Merge Operation</h3>
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg text-sm">
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-medium">
                {sourceTag.tag.name}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              {selectedTag ? (
                <>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                    {selectedTag.tag.name}
                  </span>
                </>
              ) : (
                <span className="text-gray-400">Select target</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              All transactions from <span className="font-medium">"{sourceTag.tag.name}"</span> will
              be moved, then this tag will be deleted.
            </p>
          </div>

          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 focus:outline-none w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Tag List */}
          <div className="max-h-40 overflow-y-auto space-y-2">
            {filteredTags.map((tag) => (
              <button
                key={tag.tag.id}
                onClick={() => setSelectedTag(tag)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-sm transition-colors ${
                  selectedTag?.tag.id === tag.tag.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{tag.tag.name}</span>
                </div>
                {selectedTag?.tag.id === tag.tag.id && (
                  <Check className="w-4 h-4 text-indigo-600" />
                )}
              </button>
            ))}

            {filteredTags.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-500">
                No tags found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleMerge}
            disabled={!selectedTag || isPending}
            className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Merging...' : 'Merge'}
          </button>
        </div>
      </div>
    </div>
  );
}