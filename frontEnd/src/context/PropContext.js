import React, { useState, useContext } from 'react'
import axios from 'axios';
import { Auth } from "./AuthContext";
import { useHistory } from "react-router-dom";


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
                history.push('/');

            }


        } catch (error) {
            console.log(error);
        }
    }


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
                setRenderData(data?.data);

            }


        } catch (error) {
            console.log(error);
        }
    }

    async function changeStatusApprove(_id) {
        try {
            if (AuthObject.role === 'admin') {

                let obj = {
                    reqStatus: 'approved'
                }

                let updatedData = await axios.put(`${host}/changeStatus/${_id}`, obj, config);

                getPropForAdmins()

                console.log(updatedData, 'changed');

            }


        } catch (error) {
            console.log(error);
        }
    }

    async function changeStatusReject(_id) {

        try {
            if (AuthObject.role === 'admin') {

                let obj = {
                    reqStatus: 'rejected'
                }
                let updatedData = await axios.put(`${host}/changeStatus/${_id}`, obj, config);


                getPropForAdmins()
                console.log(updatedData, 'changed');

            }


        } catch (error) {
            console.log(error);
        }
    }



    return (
        <Prop.Provider value={{ addProp, getPropForUsers, getPropForAdmins, renderData, setRenderData, changeStatusApprove, changeStatusReject,  }}>
            {props.children}
        </Prop.Provider>
    )
}

export default PropContext
