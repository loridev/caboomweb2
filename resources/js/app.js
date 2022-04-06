/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/Example');

import Home from './pages/Home';
import { render } from 'react-dom';
import React, { useContext } from 'react';
import Navbar from './UI/Navbar/Navbar';
import NavLink from './UI/Navbar/NavLink';
import css from './../css/app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Rankings from './pages/Rankings';
import RankList from './components/Ranking/RankList';
import Register from './pages/Register';
import AuthContext, { AuthContextProvider } from './context/AuthContext';

function App() {
    const LINKS = [
        {
            to: '/',
            text: 'Home'
        },
        {
            to: '/rankings',
            text: 'Rankings'
        },        
        {
            to: '/shop',
            text: 'Shop'
        },        
        {
            to: '/login',
            text: 'Log in'
        },
        {
            to: '/register',
            text: 'Register',
        }
    ];

    const ctx = useContext(AuthContext);

    if (ctx.token) {
        LINKS[4].to = '/logout';
        LINKS[4].text = 'Log out';
        if (ctx.isAdmin) {
            LINKS[3].to = '/admin';
            LINKS[3].text = 'Admin Panel';
        } else {
            LINKS[3].to = '#';
            LINKS[3].text = '';
        }
    }

    return(
        <Navbar>
            {LINKS.map((link) => <NavLink to={link.to} text={link.text} key={link.text} />)}
        </Navbar>
    );
}

export default App;

if (document.getElementById('root')) {
    render(
        (
            <React.StrictMode>
                <AuthContextProvider>
                    <BrowserRouter>
                        <App />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/rankings' element={<Rankings />}>
                                <Route path=':page' element={<RankList />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </AuthContextProvider>
            </React.StrictMode>
        ),
        document.getElementById('root')
    );
}