import React from 'react';
import { MessageCircle, ThumbsUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunitySnippet = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <MessageCircle className="text-krishi-teal" /> Community
                </h3>
                <span className="text-xs font-bold text-krishi-moss bg-green-50 px-2 py-1 rounded-full">Trending</span>
            </div>

            <div className="flex-1 space-y-4">
                {/* Featured Post Card */}
                <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-krishi-teal/20 to-transparent rounded-bl-full -mr-8 -mt-8 transition-all group-hover:-mr-4 group-hover:-mt-4"></div>

                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">RK</div>
                        <div>
                            <p className="text-sm font-bold text-gray-800">Ramesh Kumar</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">Best time to plant potatoes in Punjab?</h4>

                    {/* ID: AI Summary Section */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-purple-700 mb-1">AI Contextual Advice</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Based on soil temp (15°C), the optimal window is <b className="text-gray-800">Nov 1 - Nov 15</b>. Ensure spacing of 20cm.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-gray-500 text-xs font-medium">
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> 24 Likes</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 18 Comments</span>
                    </div>
                </div>
            </div>

            <Link to="/community" className="mt-auto text-center text-sm text-krishi-teal hover:underline py-2">Join the Discussion</Link>
        </div>
    );
};

export default CommunitySnippet;
