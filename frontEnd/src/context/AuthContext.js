import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import cookie from 'react-cookies';
import axios from 'axios';

import jwt from 'jsonwebtoken';

export const Auth = React.createContext();
function AuthContext(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({})
    const [token, setToken] = useState(null);
    const [role, setrRole] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState('')

    const history = useHistory();
    const { pathname } = useLocation();

    const Config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const host = 'http://localhost:3001'
    useEffect(() => {
        let token = cookie.load('auth')
        validateToken(token)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const guestPath = ['/', '/signup', '/signin'];
        const token = cookie.load('auth');
        if (guestPath.includes(pathname)) return
        if (!token || token === 'null') history.push('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    function validateToken(token) {
        if (token !== 'null' && token !== 'undefined') {
            let user = jwt.decode(token);
            setLoginState(true, token, user)
        }
        else {
            setLoginState(false, null, user)
        }
    }
    async function setLoginState(loggedIn, token, user) {
        cookie.save('auth', token, { path: '/' });
        setToken(token);
        setUser({ user });
        setLoggedIn(loggedIn);

        if (token) {
            const all = await axios.get(`${host}/all`);
            console.log(all, 'all');
            let filteredUsers = all?.data?.filter(e => {
                return (e.email === user.email);
            })
            setFirstName(filteredUsers[0]?.firstName)
            setLastName(filteredUsers[0]?.lastName)
            setrRole(filteredUsers[0]?.role)
            setUserId(filteredUsers[0]?._id)

        }

    }

    async function signIn(email, pass) {

        const basic = {
            auth: {
                username: email,
                password: pass
            }
        }
        const all = await axios.get(`${host}/all`);
        console.log(all, 'all');
        let filteredUsers = all?.data?.filter(e => {
            return (e.email === email);
        })
        if (filteredUsers) {
            try {

                if (filteredUsers[0]?.role === 'user') {
                    console.log('inside user');
                    setrRole('user')
                  
                    const data = await axios.post(`${host}/signin/user`, {}, basic)
                    setFirstName(data.data.user.firstName)
                    setLastName(data.data.user.lastName)
                    setUserId(data.data.user._id)
                    validateToken(data.data.token)
                }
                else {
                    setrRole('admin')
                    console.log('inside admin');
                    const data = await axios.post(`${host}/signin/admin`, {}, basic)
                    console.log(data, 'data');
                    setFirstName(data.data.user.firstName)
                    setLastName(data.data.user.lastName)
                    setUserId(data.data.user._id)
                    validateToken(data.data.token)
                }

            } catch (error) {
                alert('Incorrect Email Or Password');
            }

        }
    }

    async function userSignUp(email, pass, fName, lName) {
        const obj = {
            email: email,
            password: pass,
            firstName: fName,
            lastName: lName
        }
        try {
            const data = await axios.post(`${host}/signup/user`, obj);
            validateToken(data.data.token);
            setrRole('user')

        } catch (error) {

            alert('Email is already exist');

        }
    }

    async function adminSignUp(email, pass, fName, lName) {
        const obj = {
            email: email,
            password: pass,
            firstName: fName,
            lastName: lName
        }
        try {
            const data = await axios.post(`${host}/signup/admin`, obj);
            validateToken(data.data.token);
            setrRole('admin')

        } catch (error) {
            alert('Email is already exist');

        }
    }
    async function signOut() {
        setLoginState(false, null, {});
        history.push('/')
    }

    return (
        <Auth.Provider value={{ loggedIn, user, token, role, Config, host, signIn, userSignUp, adminSignUp, signOut, firstName, setFirstName, lastName, setLastName,userId, setUserId }}>
            {props.children}
        </Auth.Provider>
    )
}

export default AuthContext
