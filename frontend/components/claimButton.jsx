"use client";
import { useState } from "react";
import { claimPoints } from "@/api";

const ClaimButton = ({ userId, onClaim, disabled }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClaim = async () => {
        if (!userId || loading) return;
        setLoading(true);
        try {
            const data = await claimPoints(userId);
            setResult(data);
            onClaim(data);
        } catch (error) {
            console.error("Claim error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center gap-2 min-md:pt-34">
            <button
                onClick={handleClaim}
                disabled={disabled || loading}
                className={`px-6 py-2 rounded-xl text-white text-lg font-semibold transition duration-300
          ${
                    disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:scale-105"
                }`}
            >
                {loading ? "Claiming..." : "Claim Points"}
            </button>

            {result && (
                <p className="text-sm text-green-600 font-medium mt-1 animate-pulse">
                    +{result.points} pts | Total: {result.totalPoints}
                </p>
            )}
        </div>
    );
};

export default ClaimButton;
