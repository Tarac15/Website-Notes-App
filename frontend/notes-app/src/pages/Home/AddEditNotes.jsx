import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import TagInput from '../../components/input/TagInput';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  // Add note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit note
  const editNote = async () => {
    const noteId = noteData._id

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto overflow-y-auto max-h-[80vh]">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
        onClick={onClose}
      >
        <MdClose className="text-lg text-gray-600" />
      </button>

      {/* Title Input */}
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-xs font-semibold text-gray-600">Title</label>
        <input
          type="text"
          className="w-full text-sm p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content Input */}
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-xs font-semibold text-gray-600">Content</label>
        <textarea
          className="w-full text-sm p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your note here..."
          rows={6}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* Tags Input */}
      <div className="mb-3">
        <label className="text-xs font-semibold text-gray-600">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded text-sm hover:bg-blue-600 transition-all"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'update' : 'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;
