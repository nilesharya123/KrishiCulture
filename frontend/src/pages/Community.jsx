import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Filter, BookOpen } from 'lucide-react';
import CreatePost from '../components/community/CreatePost';
import PostCard from '../components/community/PostCard';
import useStore from '../store/useStore';

const Community = () => {
    const { user } = useStore();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/community/all');
            setPosts(res.data);
        } catch (error) {
            console.error('Error fetching community posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 pb-20 animate-fadeIn">
            {/* Header */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-krishi-teal to-krishi-moss text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Users className="w-8 h-8 opacity-90" />
                        Farmer's Community
                    </h1>
                    <p className="text-green-100 max-w-xl">
                        A space to share knowledge, ask experts, and grow together. Join the conversation with thousands of verified farmers.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    {user ? (
                        <CreatePost onPostCreated={handlePostCreated} />
                    ) : (
                        <div className="glass-panel p-6 text-center text-gray-500">
                            Please log in to share posts and comments with the community.
                        </div>
                    )}

                    {loading ? (
                        <div className="space-y-6">
                            {[1, 2].map(i => (
                                <div key={i} className="animate-pulse bg-white/50 rounded-xl h-64 border border-gray-100"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {posts.length === 0 ? (
                                <div className="text-center py-10 glass-panel">
                                    <p className="text-gray-500">No posts yet. Be the first to start a conversation!</p>
                                </div>
                            ) : (
                                posts.map(post => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            )}
                        </>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="hidden lg:block space-y-6">
                    {/* Trending Topics */}
                    <div className="glass-panel p-5">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-krishi-teal" /> Trending Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['Organic', 'PestControl', 'Monsoon', 'MarketPrice', 'Fertilizer', 'Subsidy'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white border border-gray-100 text-gray-600 rounded-full text-xs hover:border-krishi-teal hover:text-krishi-teal cursor-pointer transition-colors shadow-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* AI Advisory Promo */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-xl shadow-lg text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl group-hover:scale-110 transition-transform duration-700"></div>
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" /> Knowledge Hub
                        </h3>
                        <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
                            Access our library of farming guides and AI-curated pest management strategies.
                        </p>
                        <button className="w-full py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors shadow-md">
                            Browse Guides
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
