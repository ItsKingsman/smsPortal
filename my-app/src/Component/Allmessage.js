import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import emailjs from '@emailjs/browser';
import contactSlice from "../smsredux/slices/contactSlice";
import { useForm } from "react-hook-form";

export default function Allmessage() {
  const message = useSelector((state) => state.message.value);
  const [PersonName,PersonNumber,PersonEmail] = useSelector((state) => state.contact.value);
  const form = useRef();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_kz6c9lg', 'template_gh2zqad', form.current, {
        publicKey: 'B3981rqL4yYTU11OQ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          // form.current.reset();

          
          // dispatch(contactSlice());
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div>
      <h3><i class="fa-regular fa-paper-plane"></i>Send Email</h3>
      <form ref={form} onSubmit={sendEmail}>
      <ul className="nav flex-column">
        <li className="nav-item pb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input type="name" name="user_name" class="form-control" value={PersonName}/>
        </li>
        <li className="nav-item pb-3">
          {"Phone Number "}
          <input type="number" class="form-control" defaultValue={PersonNumber}  {...register("PersonNumber", { required: "Number is required" })}/>
          {errors.PersonNumber && <p>{errors.PersonNumber.message}</p>}
        </li>
        
        <li className="nav-item pb-3">
          {"Email "}
          <input
            type="to_name"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            defaultValue={PersonEmail}
            name="user_email"
          />
        </li>
        <li className="nav-item pb-3">
          {"Message"}
          <textarea class="form-control" placeholder="Your Message here!" name="message" id="floatingTextarea" value={message}></textarea>
          
        </li>
        <button type="submit" class="btn btn-primary">Send</button>
      </ul>
      </form>
    </div>
  );
}
