import { useState } from "react";
import "./Contact.css";

const Contact = (props) => {
  const [Email, setEmail] = useState(props.email);
  const [Phone, setPhone] = useState(props.phone);
  const [Address, setAddress] = useState(props.address);

  return (
    <div className="contact">
      <p>{Email}</p>
      <p>{Phone}</p>
      <p>{Address}</p>
    </div>
  );
};

export default Contact;
