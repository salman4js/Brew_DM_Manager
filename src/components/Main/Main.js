import React, { useState } from 'react';
import Univ from '../Universal/Univ';
import Footer from '../Footer/Footer';
import {Link, useParams} from "react-router-dom";

const Main = (props) => {

    // ID instance!
    const {id} = useParams();

    // Footer state handler!
    const [footer, setFooter] = useState();

    return (
        <div>
            <Univ windowHeight={props.windowHeight} footerHeight={footer} id = {id} />
            <Footer footer = {setFooter} />
        </div>
    )

}

export default Main;