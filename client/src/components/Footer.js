import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <div className='footer'>
            <div className='footer-support'>
                <h6 className='footer-heading'>SUPPORT</h6>
                <Link className='footer-link'>Contact Us</Link>
                <Link className='footer-link'>About Us</Link>
                <Link className='footer-link'>Privacy Policy</Link>
                <Link className='footer-link'>Return policy</Link>
                <Link className='footer-link'>Refund policy</Link>
                <Link className='footer-link'>Features</Link>


            </div>
            <div className='footer-get-in-touch'>
                <h6 className='footer-heading'>GET IN TOUCH</h6>
                <div>
                    <Link to="https://web.whatsapp.com/" className='footer-link'>9876543210</Link>
                </div>
                <div>
                    <Link to="https://mail.google.com/" className='footer-link'>nest@gmail.com</Link>
                </div>
                <div>
                    <Link to="" className='footer-link'>Our Stores</Link>
                </div>



            </div>
            <div className='footer-follow'>
                <h6 className='footer-heading'>FOLLOW US</h6>
                <Link className='footer-icon'><FaInstagram /></Link>
                <Link className='footer-icon'><FaFacebookF /></Link>
                <Link className='footer-icon'><FaTwitter /></Link>
                <Link className='footer-icon'><FaYoutube /></Link>
                <Link className='footer-icon'><FaWhatsapp /></Link>

            </div>
        </div>
    )
}
export default Footer