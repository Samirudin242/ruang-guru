import React, {} from 'react'
import {Container} from "react-bootstrap";
import EnglishAcademy from './EnglishAcademy';
import SkillAcademy from './SkillAcademy';
import RuangGuru from "./RuangGuru";
import NavbarReact from "./Navbar";

function Dashboard() {

    return (
        <div>
            <Container>
                <NavbarReact />
                <EnglishAcademy />
                <SkillAcademy />
                <RuangGuru />
            </Container>
        </div>
    )
}

export default Dashboard
