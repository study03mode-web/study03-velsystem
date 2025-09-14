import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, GitMerge, Tag as TagIcon } from 'lucide-react';
import { useTags, useUpdateTag, useMergeTag, useDeleteTag } from '../hooks/useTags';
import TagMergeModal from '../components/TagMergeModal';
import TagUpdateModal from '../components/TagUpdateModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { Tag } from '../types/tag';

interface TagWithTransactions {
  tag: Tag;
  transactions: number;
}

function Tags() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(6);
  const [selectedTag, setSelectedTag] = useState<TagWithTransactions | null>(null);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: tagsData, isLoading } = useTags(currentPage, pageSize);
  const updateTag = useUpdateTag();
  const mergeTag = useMergeTag();
  const deleteTag = useDeleteTag();

  const tags = tagsData?.content || [];
  const totalPages = tagsData?.totalPages || 0;

  const handleUpdateTag = async (name: string) => {
    if (selectedTag) {
      try {
        await updateTag.mutateAsync({ id: selectedTag.tag.id, data: { name } });
        setIsUpdateModalOpen(false);
        setSelectedTag(null);
      } catch (error) {
        console.error('Failed to update tag:', error);
      }
    }
  };

  const handleMergeTag = async (targetTagId: string) => {
    if (selectedTag) {
      try {
        await mergeTag.mutateAsync({ id: selectedTag.tag.id, data: { tagId: targetTagId } });
        setIsMergeModalOpen(false);
        setSelectedTag(null);
      } catch (error) {
        console.error('Failed to merge tags:', error);
      }
    }
  };

  const handleDeleteTag = async () => {
    if (selectedTag) {
      try {
        await deleteTag.mutateAsync(selectedTag.tag.id);
        setIsDeleteModalOpen(false);
        setSelectedTag(null);
      } catch (error) {
        console.error('Failed to delete tag:', error);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize your transactions with custom tags
          </p>
        </div>
      </div>

      {/* Tags List */}
      {isLoading ? (
        <div className="animate-pulse grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      ) : tags.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          <TagIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tags yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            Start organizing your transactions by creating tags
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((item) => (
            <div
              key={item.tag.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <h3 className="font-medium text-gray-900">{item.tag.name}</h3>
                <p className="text-xs text-gray-500">
                  {item.transactions} transaction
                  {item.transactions !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedTag(item);
                    setIsMergeModalOpen(true);
                  }}
                  disabled={tags.length <= 1}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                >
                  <GitMerge className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedTag(item);
                    setIsUpdateModalOpen(true);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedTag(item);
                    setIsDeleteModalOpen(true);
                  }}
                  disabled={deleteTag.isPending}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 border rounded-lg bg-gray-50">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modals */}
      {selectedTag && (
        <>
          <TagMergeModal
            isOpen={isMergeModalOpen}
            onClose={() => {
              setIsMergeModalOpen(false);
              setSelectedTag(null);
            }}
            sourceTag={selectedTag}
            availableTags={tags}
            onMerge={handleMergeTag}
            isPending={mergeTag.isPending}
          />

          <TagUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={() => {
              setIsUpdateModalOpen(false);
              setSelectedTag(null);
            }}
            tag={selectedTag}
            onUpdate={handleUpdateTag}
            isPending={updateTag.isPending}
          />

          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedTag(null);
            }}
            onConfirm={handleDeleteTag}
            title="Delete Tag"
            message={`Are you sure you want to delete "${selectedTag.tag.name}"? This tag is used in ${selectedTag.transactions} transaction(s). This action cannot be undone.`}
            confirmText="Delete Tag"
            confirmButtonClass="bg-red-600 hover:bg-red-700"
            isPending={deleteTag.isPending}
          />
        </>
      )}
    </div>
  );
}

export default Tags;