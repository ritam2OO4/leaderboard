import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../api';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 10;

    const fetchLeaderboard = async () => {
        setIsLoading(true);
        try {
            const data = await getLeaderboard();
            setLeaderboard(data);
        } catch (error) {
            console.error("Failed to fetch leaderboard:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const topThree = leaderboard.slice(0, 3);
    const otherPlayers = leaderboard.slice(3);

    const totalPages = Math.ceil(otherPlayers.length / playersPerPage);
    const startIndex = (currentPage - 1) * playersPerPage;
    const currentPlayers = otherPlayers.slice(startIndex, startIndex + playersPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="rounded-t-xl bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-[0_0_20px_rgba(255,215,0,0.6)] border border-yellow-300">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-indigo-800">🏆 Leaderboard</h2>
                    <button
                        onClick={fetchLeaderboard}
                        disabled={isLoading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Refreshing...' : '🔄 Refresh'}
                    </button>
                </div>

                {/* Podium */}
                <div className="podium-container flex justify-center items-end gap-4 mb-12 h-64">
                    {/* 2nd place */}
                    <div className="podium-item w-32 bg-gradient-to-b from-gray-300 to-gray-200 rounded-t-lg h-48 flex flex-col items-center">
                        <div className="text-2xl mb-2">🥈</div>
                        <div className="w-full bg-gray-100 p-3 rounded-b-lg text-center">
                            <p className="font-bold truncate">{topThree[1]?.name || '--'}</p>
                            <p className="text-lg font-mono">{topThree[1]?.totalPoints || '0'}</p>
                        </div>
                    </div>

                    {/* 1st place */}
                    <div className="podium-item w-32 bg-gradient-to-b from-yellow-400 to-yellow-300 rounded-t-lg h-56 flex flex-col items-center">
                        <div className="text-3xl mb-2">👑</div>
                        <div className="w-full bg-yellow-100 p-3 rounded-b-lg text-center">
                            <p className="font-bold truncate">{topThree[0]?.name || '--'}</p>
                            <p className="text-lg font-mono">{topThree[0]?.totalPoints || '0'}</p>
                        </div>
                    </div>

                    {/* 3rd place */}
                    <div className="podium-item w-32 bg-gradient-to-b from-amber-600 to-amber-500 rounded-t-lg h-40 flex flex-col items-center">
                        <div className="text-2xl mb-2">🥉</div>
                        <div className="w-full bg-amber-100 p-3 rounded-b-lg text-center">
                            <p className="font-bold truncate">{topThree[2]?.name || '--'}</p>
                            <p className="text-lg font-mono">{topThree[2]?.totalPoints || '0'}</p>
                        </div>
                    </div>
                </div>

                {/* Paginated List for Other Players */}
                <div className="players-list space-y-3">
                    {currentPlayers.map((player, index) => (
                        <div
                            key={player._id}
                            className="player-card flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <span className="rank font-bold w-8 text-right text-gray-500">
                                    {startIndex + index + 4}
                                </span>
                                <div className="avatar w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                                    {player.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="name font-medium">{player.name}</span>
                            </div>
                            <span className="points font-mono font-bold text-indigo-600">
                                {player.totalPoints} pts
                            </span>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="pagination mt-8 flex justify-center items-center gap-3 text-indigo-800 font-semibold">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-white rounded-md border border-indigo-300 hover:bg-indigo-50 disabled:opacity-50"
                        >
                            ⬅ Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => goToPage(i + 1)}
                                className={`px-3 py-1 rounded-md border ${
                                    currentPage === i + 1
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white hover:bg-indigo-100'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-white rounded-md border border-indigo-300 hover:bg-indigo-50 disabled:opacity-50"
                        >
                            Next ➡
                        </button>
                    </div>
                )}

                {isLoading && (
                    <div className="text-center py-8 text-gray-500">
                        Loading leaderboard data...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
