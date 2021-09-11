import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Auth } from "./AuthContext";
import { useHistory, useLocation } from "react-router-dom";

import { Redirect } from "react-router";

export const Prop = React.createContext();

function PropContext(props) {
const [renderData, setRenderData] = useState([])

    let history = useHistory();
    const AuthObject = useContext(Auth);
    const host = 'http://localhost:3001';
    const token = AuthObject.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    console.log(AuthObject.userId, 'userId', AuthObject.lastName, AuthObject.firstName);

    async function addProp(houseDescription, salePrice, location, size) {
        const obj = {
            ownerId: AuthObject.userId,
            ownerName: `${AuthObject.firstName} ${AuthObject.lastName}`,
            houseDescription: houseDescription,
            salePrice: salePrice,
            location: location,
            size: size,
            reqStatus: 'pending'
        }

        try {
            if (AuthObject.role === 'user') {

                let data = await axios.post(`${host}/addprop`, obj, config);
                console.log(data, 'added');
                history.push('/s');

            }


        } catch (error) {
            console.log(error);
        }
    }

    // router.post('/addprop', bearerAuth.forUsers, permissions('create'), addProperty);
    // router.get('/getpropforusers/:userId', bearerAuth.forUsers, permissions('read'), getForUsers);
    // router.get('/getpropforadmins', bearerAuth.forAdmin, permissions('read'), getForAdmins);
    // router.put('/changeStatus/:propId', bearerAuth.forAdmin, permissions('update'), updateStatus);


    async function getPropForUsers() {

        try {
            if (AuthObject.role === 'user') {

                let data = await axios.get(`${host}/getpropforusers/${AuthObject.userId}`, config);
                console.log(data, 'userDataProp');
                setRenderData(data.data)
            }


        } catch (error) {
            console.log(error);
        }
    }

    async function getPropForAdmins() {

        try {
            if (AuthObject.role === 'admin') {

                let data = await axios.get(`${host}/getpropforadmins`, config);
                console.log(data, 'adminDataProp');
                setRenderData(data.data)

            }


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Prop.Provider value={{ addProp, getPropForUsers, getPropForAdmins,renderData, setRenderData }}>
            {props.children}
        </Prop.Provider>
    )
}

export default PropContext
