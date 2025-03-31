import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // state for the username and password fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // hook for navigation
    const navigate = useNavigate();

    // send the data to the backend for authentication
    const handleSignIn = async (event) => {
        event.preventDefault();
        
        // Mock authentication credentials
        const mockUsers = {
            'cashier': {
                username: 'cashier',
                password: 'cashier123',
                role: 'cashier'
            },
            'manager': {
                username: 'manager',
                password: 'manager123',
                role: 'manager'
            }
        };
    
        try {
            // Simulate an API call    
            const user = mockUsers[username];
            
            if (user && user.password === password) {
                // Successful login
                switch (user.role) {
                    case 'cashier':
                        navigate('/cashier');
                        break;
                    case 'manager':
                        navigate('/manager');
                        break;
                    default:
                        alert('Invalid role');
                }
            } else {
                // Invalid login
                alert('Invalid username or password');
            }
        } catch (error) {
            // Handle error
            alert('An error occurred during sign in');
            console.error('Sign in error:', error);
        }
    }

    // navigate to the customer kiosk page
    const handleKioskEntry = () => {
        navigate('/customer');
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col bg-white p-4 rounded-lg gap-6 w-96">
                <h1 className="text-3xl font-semi-bold text-center p-2">Sharetea</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSignIn}>
                    <h3>For Employees</h3>
                    <div>
                        <label htmlFor="username"></label>
                        <input
                            className="bg-gray-100 p-3 w-full rounded-sm text-gray-500"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input
                            className="bg-gray-100 p-3 w-full rounded-sm text-gray-500"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required
                        />
                    </div>
                    <button className="bg-orange-500 p-4 text-xl text-white rounded-sm hover:bg-orange-600 transition-all duration-300 cursor-pointer" type="submit">Sign In</button>
                </form>
                <div className="flex flex-col gap-2">
                    <h3>For Customers</h3>
                    <button 
                        onClick={handleKioskEntry}
                        className="p-4 text-xl w-full border border-2 border-orange-500 text-orange-500 rounded-sm hover:bg-orange-100 transition-all duration-300 cursor-pointer"
                    >
                        Enter Kiosk
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage