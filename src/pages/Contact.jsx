import { useState, useEffect, useRef } from 'react';
import { useToast } from '../context/ToastContext';

export default function ContactForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        radioOption: ''
    });

    const { addToast } = useToast();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addToast("handleSubmit Function Called", "success");  
    };

    return (
        <div className='bg-orange-400'>
            <div className='p-4'>
                <h1>Welcome to the Contact Page</h1>
                <p>This is where people go to send us a message and stuff.</p>
            </div>
            <form>
            {/* Name Input */}
            <div>
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Enter your name"
                onChange={handleChange}
                required
                />
            </div>

            {/* Email Input */}
            <div>
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email"
                onChange={handleChange}
                required
                />
            </div>

            {/* Message Text Area */}
            <div>
                <label htmlFor="message">Message</label>
                <textarea 
                name="message" 
                id="message" 
                rows={4}
                placeholder="Type your message here..."
                onChange={handleChange}
                required
                />
            </div>

            {/* Radio Button Group */}
            <div>
                <span>Select an Option</span>
                
                <label>
                <input type="radio" name="choice" value="option1" onChange={handleChange} required/>
                <span>Option 1</span>
                </label>

                <label>
                <input type="radio" name="choice" value="option2" onChange={handleChange} />
                <span>Option 2</span>
                </label>

                <label>
                <input type="radio" name="choice" value="option3" onChange={handleChange} />
                <span>Option 3</span>
                </label>
            </div>

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
            </form>
        </div>
    );
};