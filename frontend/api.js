export const getUsers = () => fetch('https://leaderboardservice.onrender.com/api/users').then(res => res.json());
export const addUser = (name) =>
    fetch('https://leaderboardservice.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

export const claimPoints = (userId) =>
    fetch(`https://leaderboardservice.onrender.com/api/claims/${userId}`, { method: 'POST' }).then(res => res.json());

export const getLeaderboard = () =>
    fetch('https://leaderboardservice.onrender.com/api/leaderboard').then(res => res.json());