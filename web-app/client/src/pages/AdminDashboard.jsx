import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalReports: 0, pendingCount: 0, resolvedCount: 0 });
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [activeTab, setActiveTab] = useState('reports');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get('http://localhost:5000/api/admin/stats');
            setStats(statsRes.data);

            const usersRes = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(usersRes.data);

            const reportsRes = await axios.get('http://localhost:5000/api/reports');
            setReports(reportsRes.data);

            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`/api/admin/users/${userId}/role`, { role: newRole });
            fetchData(); // Refresh
        } catch (err) {
            alert('Failed to update role');
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '120px' }}>Loading...</div>;

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
            <h1 className="page-title">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>{stats.totalUsers}</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Total Users</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>{stats.totalReports}</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Total Reports</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.5rem', color: '#fbbf24' }}>{stats.pendingCount}</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Pending</p>
                </div>
                <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.5rem', color: '#34d399' }}>{stats.resolvedCount}</h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>Resolved</p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={() => setActiveTab('reports')}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        color: activeTab === 'reports' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        borderBottom: activeTab === 'reports' ? '2px solid var(--color-primary)' : 'none',
                        fontSize: '1.2rem',
                        marginRight: '20px'
                    }}
                >
                    Reports
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        color: activeTab === 'users' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        borderBottom: activeTab === 'users' ? '2px solid var(--color-primary)' : 'none',
                        fontSize: '1.2rem'
                    }}
                >
                    Users
                </button>
            </div>

            {/* Content */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div className="responsive-table-wrapper">
                    {activeTab === 'reports' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <th style={{ padding: '15px' }}>Title</th>
                                    <th style={{ padding: '15px' }}>Reporter</th>
                                    <th style={{ padding: '15px' }}>Date</th>
                                    <th style={{ padding: '15px' }}>Status</th>
                                    <th style={{ padding: '15px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map(report => (
                                    <tr key={report._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '15px' }}>{report.title}</td>
                                        <td style={{ padding: '15px' }}>{report.user?.name}</td>
                                        <td style={{ padding: '15px' }}>{new Date(report.reportedAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '15px' }}>
                                            {report.statusUpdates && report.statusUpdates.length > 0 ? report.statusUpdates[report.statusUpdates.length - 1].status : 'Pending'}
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            <Link to={`/reports/${report._id}`} className="btn btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8rem' }}>View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'users' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <th style={{ padding: '15px' }}>Name</th>
                                    <th style={{ padding: '15px' }}>Email</th>
                                    <th style={{ padding: '15px' }}>Joined</th>
                                    <th style={{ padding: '15px' }}>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '15px' }}>{u.name}</td>
                                        <td style={{ padding: '15px' }}>{u.email}</td>
                                        <td style={{ padding: '15px' }}>{new Date(u.registeredAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '15px' }}>
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                className="form-input"
                                                style={{ padding: '5px', width: 'auto' }}
                                            >
                                                <option value="User" style={{ background: 'var(--color-bg-light)', color: 'var(--color-text)' }}>User</option>
                                                <option value="Volunteer" style={{ background: 'var(--color-bg-light)', color: 'var(--color-text)' }}>Volunteer</option>
                                                <option value="Admin" style={{ background: 'var(--color-bg-light)', color: 'var(--color-text)' }}>Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
