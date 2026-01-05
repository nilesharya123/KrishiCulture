import React, { useState } from 'react';
import { Image, X, Tag } from 'lucide-react';
import axios from 'axios';
import useStore from '../../store/useStore';

const CreatePost = ({ onPostCreated }) => {
    const { user, token } = useStore();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        // Process tags: split by comma, trim whitespace
        if (tags) {
            const processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            processedTags.forEach(tag => formData.append('tags', tag));
        }

        try {
            const res = await axios.post('http://localhost:5000/api/community/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            setContent('');
            setTags('');
            removeImage();
            if (onPostCreated) onPostCreated(res.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Share with the Community</h3>

            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    rows="3"
                    placeholder={`What's on your mind, ${user?.fullName || 'farmer'}?`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                {imagePreview && (
                    <div className="relative mt-3 inline-block">
                        <img src={imagePreview} alt="Preview" className="h-32 rounded-lg object-cover border border-gray-200" />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full p-1 hover:bg-red-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <label className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-green-600 text-sm px-3 py-2 bg-gray-50 rounded-lg transition-colors">
                            <Image className="w-4 h-4" />
                            <span>Add Photo</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>

                        <div className="relative flex-grow sm:flex-grow-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className={`w-full sm:w-auto px-6 py-2 rounded-lg text-white font-medium transition-colors ${loading || !content.trim()
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-krishi-green hover:bg-green-700 shadow-md hover:shadow-lg'
                            }`}
                    >
                        {loading ? 'Posting...' : 'Post Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
