import React,{ useState} from "react";
import Axios from "axios";
import {link} from "react-router-dom";
import prairiecheval from "../../../assets/images/prairiecheval.png"
// import { useAlert } from 'react-alert'
require("./_register.scss");

export default function Register(props) {
  const [register, setRegister] = useState(
    {firstName: '', lastName: '', email: '', password: '',birthday:'',country:'',picture:'' }
);

// const [redirect, setRedirect] = useState(
//     false
// )

const [errorForm, setErrorForm] = useState(" ")

// const alert = useAlert()

const handleChange = (event) => {
    setRegister({...register, [event.target.name]: event.target.value})
}

const handleSubmit = (e) => {
    e.preventDefault()
    console.log(register)
    Axios.post('http://localhost:8001/api/register', register)
        .then((res) => {
            // console.log("#666",response)
            setRegister({ firstName: '', lastName: '', email: '', password: '',birthday:'',country:'',picture:''  })
            // setRedirect(true)
            // props.setIsOpen(false)
            // alert.show('Inscription validée!')
        })
        .catch((error) => {
            console.log("#777",error.res)
            console.log("#777",typeof error)
            // setErrorForm(error.res.data.error)
            // return response.status(500).json({
            //     'error': "Impossible de faire cela"
            // })
        })
}

  return (
    <div className="ContainerReg media_phone">
     <div className="ContainerReg_header">S'inscrire</div>
      <div className="ContainerReg_content">
      <div className="ContainerReg_content_image">
      <img src={prairiecheval} alt="prairie avec un cheval"/>
      </div>
      </div>
    <div className="ContainerReg_from">
    <div className="ContainerReg_form_group">
        <label htmlFor="firstName">Nom</label>
        <input type="text" name="firstName"id="firstName" value={register.firstName} onChange={handleChange} required/>
      
      <div className="ContainerReg_form_group">
        <label htmlFor="lastName">Prénom</label>
        <input type="text" name="lastName" id="lastName" value={register.lastName} onChange={handleChange} required />
      </div>
      <div className="ContainerReg_form_group">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="emailRegister" value={register.email} onChange={handleChange} required />
      </div>
      <div className="ContainerReg_form_group">
        <label htmlFor="password">Password</label>
        <input type="text" id="passRegister" name="password" value={register.password} onChange={handleChange} required />
      </div>
      <div className="ContainerReg_form_group">
        <label htmlFor="country">Pays</label>
        <input type="text" name="country" id="country" value={register.country} onChange={handleChange} required />
      </div>
      <div className="ContainerReg_form_group">
        <label htmlFor="birthday">Birthday</label>
        <input type="date" name="birthday" id="birthday" value={register.birthday} onChange={handleChange} required />
      </div>
      <div className="ContainerReg_form_group">
        <label htmlFor="picture">Photo</label>
        <input type="text" name="picture" id="picture"  value={register.picture} onChange={handleChange} required />
      </div>
    </div>
  </div>
    <div className="ContainerReg_from_bouton">
      <button type="button"className="btn" onClick={handleSubmit}>S'inscrire</button>
    </div>
   <div>
      {
        errorForm
      }
    </div>
  </div>
  );
}