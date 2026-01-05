import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, MoreHorizontal, User, Sparkles } from 'lucide-react';
import CommentBox from './CommentBox';

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments || []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric'
        });
    };

    const handleCommentAdded = (updatedPost) => {
        setComments(updatedPost.comments);
    };

    // Mock logic to show AI advice for demo
    const showAiAdvice = post.content.toLowerCase().includes('help') || post.content.toLowerCase().includes('disease') || post.content.length > 50;

    return (
        <div className="glass-panel mb-8 animate-fadeIn">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-krishi-teal to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {post.author?.fullName?.charAt(0) || <User className="w-5 h-5" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm">{post.author?.fullName || 'Amandeep Singh'}</h4>
                        <p className="text-xs text-gray-500">{post.author?.role || 'Farmer'} • {formatDate(post.createdAt)}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-krishi-teal transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-2">
                <p className="text-gray-800 text-sm leading-relaxed mb-3">{post.content}</p>

                {/* AI Contextual Summary (Mockup) */}
                {showAiAdvice && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-3 mb-4 flex gap-3 shadow-inner">
                        <div className="min-w-[24px] h-6 flex items-center justify-center bg-purple-100 rounded-full">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wide mb-0.5">Krishi AI Insight</p>
                            <p className="text-xs text-gray-600">Based on symptoms described, this could be <b>Late Blight</b>. Recommended action: Apply fungicide and reduce irrigation.</p>
                        </div>
                    </div>
                )}

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] uppercase font-bold text-krishi-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Media (Graphical First) */}
            {post.image ? (
                <div className="w-full h-64 md:h-80 bg-gray-100 relative group overflow-hidden cursor-pointer">
                    <img
                        src={`http://localhost:5000${post.image}`}
                        alt="Post content"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ) : null}

            {/* Actions */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex gap-6">
                    <button className="flex items-center gap-1.5 group text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{post.likes?.length || 0}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center gap-1.5 transition-colors ${showComments ? 'text-krishi-teal' : 'text-gray-500 hover:text-krishi-teal'}`}
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{comments.length}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="bg-gray-50/50 p-4 border-t border-gray-100 animate-slideDown">
                    <CommentBox postId={post._id} onCommentAdded={handleCommentAdded} />
                    <div className="mt-4 space-y-4 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        {comments.map((comment, idx) => (
                            <div key={idx} className="flex gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                                    {comment.user?.fullName?.charAt(0) || 'U'}
                                </div>
                                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm flex-grow border border-gray-100">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-xs text-gray-900">{comment.user?.fullName || 'User'}</span>
                                        <span className="text-[10px] text-gray-400">{formatDate(comment.date)}</span>
                                    </div>
                                    <p className="text-xs text-gray-700 leading-relaxed">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;
