"use client"
import React, { useState } from 'react';
import UserSelector from '../components/UserSelector';
import ClaimButton from '../components/claimButton';
import Leaderboard from '../components/leaderboard';
import {getLeaderboard} from "@/api";


const App = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [notification, setNotification] = useState(null);


    const handleClaim = (claimData) => {
        setRefreshKey(prev => prev + 1);
        setNotification({
            user: selectedUser.name,
            points: claimData.points,
            total: claimData.totalPoints
        });
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-indigo-700">Points Leaderboard</h1>
                    <p className="text-gray-600 mt-2">
                        Select a user and claim random points to update the leaderboard
                    </p>
                </header>

                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex-1">
                            <UserSelector
                                onSelect={setSelectedUser}
                                selectedUser={selectedUser}
                            />
                        </div>

                        <div className="flex items-center">
                            <ClaimButton
                                userId={selectedUser?._id}
                                onClaim={handleClaim}
                                disabled={!selectedUser}
                            />
                        </div>
                    </div>
                </div>

                {notification && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg animate-fadeIn">
                        <p className="font-medium">
                            Awarded <span className="font-bold">{notification.points} points</span> to {notification.user}!
                        </p>
                        <p>New total: <span className="font-bold">{notification.total} points</span></p>
                    </div>
                )}

                <Leaderboard key={refreshKey} />
            </div>
        </div>
    );
};

export default App;