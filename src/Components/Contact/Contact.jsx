import "./Contact.css";

const Contact = ({ email, phone, address }) => {
  return (
    <div className="contact">
      <p>{email}</p>
      <p>{phone}</p>
      <p>{address}</p>
    </div>
  );
};

export default Contact;
