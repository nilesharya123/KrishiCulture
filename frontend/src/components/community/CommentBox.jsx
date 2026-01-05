import React, { useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';
import useStore from '../../store/useStore';

const CommentBox = ({ postId, onCommentAdded }) => {
    const { token } = useStore();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:5000/api/community/comment/${postId}`,
                { text },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            setText('');
            if (onCommentAdded) onCommentAdded(res.data);
        } catch (error) {
            console.error('Failed to add comment', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
                type="text"
                placeholder="Write a helpful comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
                className="flex-grow px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
            />
            <button
                type="submit"
                disabled={loading || !text.trim()}
                className={`p-2 rounded-full transition-colors ${!text.trim() ? 'bg-gray-200 text-gray-400' : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
            >
                <Send className="w-5 h-5" />
            </button>
        </form>
    );
};

export default CommentBox;
