import React, {useContext} from 'react'
import FrontPage from '../components/FrontPage'
import Dashboard from '../components/Dashboard'

import {AuthContext} from "../context/auth";

function Home() {

    const {user} = useContext(AuthContext);

    return (
        <div>
            {user ? <Dashboard /> : <FrontPage/>}
        </div>
    )
}

export default Home
