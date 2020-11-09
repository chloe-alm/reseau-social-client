import React from 'react'
import NavBar from '../../molecules/NavBar';
import img404 from '../../../assets/images/img404.png'
import Footer from '../../organisms/Footer/Footer';
require("./_notFound.scss");
export function Notfound(props) {
    

    return (
        <>
        <h2><strong>Oopsss</strong> Page 404 !!!!</h2>
        <NavBar/>
        <div className="image404">
        <img src={img404} alt="cheval 404" />
        </div>
      
        <Footer/>
       

        </>
    )
}
