"use client";
import React, { useState, useEffect } from "react";
import { getUsers, addUser } from "../api";

const UserSelector = ({ onSelect, selectedUser }) => {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError("Failed to load players");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        if (!newUserName.trim()) return;

        try {
            setIsAdding(true);
            await addUser(newUserName.trim());
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setNewUserName("");
            setError(null);
        } catch (err) {
            setError("Failed to add player");
            console.error(err);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="space-y-8 px-4 py-8 max-w-3xl mx-auto">

            {/* Add New Player */}
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-purple-100 to-indigo-100 shadow-lg p-[2px]">
                <div className="rounded-2xl bg-white p-6">
                    <h3 className="text-2xl font-extrabold text-indigo-700 mb-4 flex items-center gap-2">
                        🎮 Add New Player
                    </h3>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-gray-400"
                            placeholder="Enter player name"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            disabled={isAdding}
                            onKeyDown={(e) => e.key === "Enter" && handleAddUser()}
                        />
                        <button
                            onClick={handleAddUser}
                            disabled={isAdding || !newUserName.trim()}
                            className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 shadow-md disabled:opacity-60"
                        >
                            {isAdding ? "Adding..." : "Add"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Select Player */}
            <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-indigo-100 to-purple-100 shadow-lg p-[2px]">
                <div className="rounded-2xl bg-white p-6">
                    <h3 className="text-2xl font-extrabold text-purple-700 mb-4 flex items-center gap-2">
                        🧑 Select Player
                    </h3>
                    <select
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400"
                        value={selectedUser?._id || ""}
                        onChange={(e) => onSelect(users.find((u) => u._id === e.target.value))}
                        disabled={isLoading}
                    >
                        <option value="">Choose a player...</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    {selectedUser && (
                        <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold rounded-full">
                                {selectedUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-gray-800 font-semibold">{selectedUser.name}</p>
                                <p className="text-sm text-gray-500">Selected for points claim</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="p-4 bg-red-100 text-red-700 border-l-4 border-red-400 rounded-xl shadow">
                    ⚠️ {error}
                </div>
            )}
        </div>
    );
};

export default UserSelector;
