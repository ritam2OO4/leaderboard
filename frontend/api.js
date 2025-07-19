export const getUsers = () => fetch('http://localhost:5000/api/users').then(res => res.json());
export const addUser = (name) =>
    fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });

export const claimPoints = (userId) =>
    fetch(`http://localhost:5000/api/claims/${userId}`, { method: 'POST' }).then(res => res.json());

export const getLeaderboard = () =>
    fetch('http://localhost:5000/api/leaderboard').then(res => res.json());