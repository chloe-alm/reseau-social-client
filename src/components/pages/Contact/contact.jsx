import Axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import NavBar from "../../molecules/NavBar";
import chevalmustang from "../../../assets/images/Un-cheval-mustang.png";
import Footer from "../../organisms/Footer/Footer";
require("./_contact.scss");

export function Contact(props) {
  const history = useHistory();
  const alert = useAlert();
  

  const [mailSender, setMailSender] = useState({
    email: null,
    messageSubject: null,
    text: null,
    isSubmitting: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    setMailSender({ ...mailSender, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setMailSender({
        ...mailSender,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8001/api/contact",
        data: JSON.stringify(mailSender),
      });
      if (result.status === 201) {
        return alert.show("Message envoyé!"), history.push("./");
      }
    } catch (error) {
     
      setMailSender({
        ...mailSender,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <div className="ContainerContact">
      <div className="ContainerContact_header">Contact</div>
      <NavBar />
      <div className="ContainerContact_content">
        <div className="ContainerContact_content_image">
          <img src={chevalmustang} alt="cheval" />
        </div>
      </div>

      <form
        className="mailSender"
        method="POST"
        action="/contact"
        onSubmit={handleSubmit}
      >
        <div className="mailSender_email">
          <p>Email:</p>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={mailSender.email}
            onChange={handleChange}
          />
        </div>
        <div className="mailSender_subject">
          <p>Subject:</p>
          <input
            type="text"
            name="messageSubject"
            id="messageSubject"
            placeholder="Subject"
            value={mailSender.messageSubject}
            onChange={handleChange}
          />
        </div>

        <div className="mailSender_message">
          <p>Message:</p>
          <textarea
            type="text"
            name="text"
            id="text"
            placeholder="texte"
            value={mailSender.text}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mailSender_erreur">{mailSender.errorMessage}</div>
        <button
          
          type="submit"
          name="Envoyer"
          onClick={handleSubmit}
        >
          Envoyer
        </button>
      </form>

      <Footer />
    </div>
  );
}
//     <div>
//      <NavBar/>
//       <form
//         className="mailSender"
//         method="POST"
//         action="/contact"
//         onSubmit={handleSubmit}
//       >
//           <h2>Contact</h2>

//         <div className="mailSender_subject">
//         <div className="mailSender_subject_image">
//           <img src={chevalmustang} alt="cheval" />
//         </div>

//           <p>Email:</p>
//           <input
//             type="text"
//             name="email"
//             id="email"
//             value={mailSender.email}
//             onChange={handleChange}
//           />
//           <p>Subject:</p>
//           <input
//             type="text"
//             name="messageSubject"
//             id="messageSubject"
//             value={mailSender.messageSubject}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mailSender_content">
//           <p>Message:</p>
//           <textarea
//             type="text"
//             name="text"
//             id="text"
//             value={mailSender.text}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mailSender_erreur">{mailSender.errorMessage}</div>
//         <button
//           className="mailSender_bouton"
//           type="submit"
//           name="Envoyer"
//           onClick={handleSubmit}
//           > Envoyer
//         <button/>
//       </form>
//       <Footer/>
//     <div/>
//   );
// }
