import React, {useState} from 'react';
import Footer from '../Footer/Footer';

const Desktop = () => {

    // Footer state handler!
    const [footer, setFooter] = useState();

  return (
    <div>
        <Footer footer = {setFooter} />
    </div>
  )
}

export default Desktop;