import React, { useEffect, useState } from 'react';
import WCSidebar from './WCSidebar';
import './Policies.css'; // Reusing the same CSS as WCPolicies
import axios from 'axios';

function WCPolicies() {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/policies');
                setPolicies(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch policies:', error);
                setError('Failed to fetch policies.');
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    return (
        <div className="policies-page">
            <WCSidebar />
            <div className="policies-content">
                <div className="policies-header">
                    <h1>Waste Management Policies</h1>
                    <p>
                        Our commitment to sustainability is reflected in these carefully crafted policies that aim to promote
                        a cleaner, greener environment for MSU-Marawi.
                    </p>
                </div>

                {/* Loading or Error State */}
                {loading ? (
                    <p>Loading policies...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="policies-list">
                        {policies.map((policy) => (
                            <div className="policy-item" key={policy._id}>
                                <h2 className="policy-title">{policy.title}</h2>
                                <p className="policy-content">{policy.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WCPolicies;
