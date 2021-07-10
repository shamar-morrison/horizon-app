// For more help visit https://formspr.ee/react-help

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
	const [state, handleSubmit] = useForm('xdoylolz');
	if (state.succeeded) {
		return <p className="success-msg">Message sent! We'll try and get back to you asap.</p>;
	}
	return (
		<div className="contact__form container">
			<form onSubmit={handleSubmit} action="https://formspree.io/f/xdoylolz" method="post">
				<h3 className="title">Contact Us</h3>
				<div className="contact__form--item">
					<label htmlFor="name">Name</label>
					<input id="name" type="text" name="name" required />
				</div>
				<div className="contact__form--item">
					<label htmlFor="email">Email Address</label>
					<input id="email" type="email" name="email" required />
					<ValidationError prefix="Email" field="email" errors={state.errors} />
				</div>
				<div className="contact__form--item">
					<label htmlFor="subject">Subject</label>
					<input id="subject" type="text" name="subject" required />
					<ValidationError prefix="Subject" field="subject" errors={state.errors} />
				</div>
				<div className="contact__form--item">
					<label htmlFor="message">Message</label>
					<textarea id="message" name="message" rows="10" required />
					<ValidationError prefix="Message" field="message" errors={state.errors} />
				</div>
				<button type="submit" disabled={state.submitting} className="btn btn-lg">
					Submit
				</button>
			</form>
			<div className="msg">
				<p>Please note that it may take some time for us to get back to you.</p>
			</div>
		</div>
	);
};

export default ContactForm;
