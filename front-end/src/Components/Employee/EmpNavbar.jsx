import React, { useEffect,useState } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import '../ProjectManager/PmNavbar.css';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000");

const EmpNavbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search: searchQuery })
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setSearchResults(data);
            console.log("Search Results:", data);
            // window.location.href = '/all-projects';
            window.location.href = `/all-projects?searchQuery=${encodeURIComponent(searchQuery)}`;
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        socket.on("receive-message", (data) => {
            setReceivedMessages((prevMessages) => [data, ...prevMessages]);
        });
        // Cleanup function to remove event listener when component unmounts
        return () => {
            socket.off("receive-message");
        };
    }, []);

    const handleBellClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    const notificationCount = receivedMessages.length;

    return (
        <nav className="navbar">
            <a className='navimg'href="/">
          <img src="/images/pf2.png" alt="Project Fit" />
        </a>
            <div className="left">
                <form className="search-form" onSubmit={handleSearch} >
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                        onChange={handleChange}
                    />
                    <button type="submit" className="search-button"><FaSearch /></button>
                </form>
            </div>
            <div className='box'>
                <div className="bell" onClick={handleBellClick}>
                    <span className="bell-icon"><FaBell /></span>
                    {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
                    {isDropdownVisible && (
                        <div className="dropdown">
                            {receivedMessages.length === 0 ? (
                                <div className="no-notifications">No notifications</div>
                            ) : (
                                receivedMessages.map((message, index) => (
                                    <div key={index} className="message">
                                        <div className="message-title">{message.title}</div>
                                        <div className="message-content">{message.message}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default EmpNavbar;

