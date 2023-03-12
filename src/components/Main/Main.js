import React, { useState } from 'react';
import Spinner from '../Loader/Spinner';

import Univ from '../Universal/Univ';
import Footer from '../Footer/Footer';

const Main = (props) => {

    return (
        <div>
            <Univ windowHeight={props.windowHeight} footerHeight={props.footerHeight} />
        </div>
    )

}

export default Main;