import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';


const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition-all ease-in-out">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span className="text-sm text-gray-500">{moment(date).format('Do MMM YYYY')}</span>
        </div>
        <button
          className={`p-2 rounded-full transition-colors ${isPinned ? 'text-yellow-500 bg-yellow-100' : 'text-gray-400 bg-gray-100'
            } hover:bg-yellow-200`}
          onClick={onPinNote}
          aria-label="Pin note"
        >
          <MdOutlinePushPin size={20} />
        </button>
      </div>

      {/* Content Section */}
      <p className="text-sm text-gray-600 mt-4">
        {content?.slice(0, 60)} {content?.length > 60 && '...'}
      </p>

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500 italic">
          {tags.map((tag) => `#${tag}`).join(' ')}
        </span>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-green-600 transition-all"
            onClick={onEdit}
            aria-label="Edit note"
          >
            <MdCreate size={18} />
          </button>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-600 transition-all"
            onClick={onDelete}
            aria-label="Delete note"
          >
            <MdDelete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
