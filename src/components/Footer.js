import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div id='footer'>
    <Link className='footer-link' to='https://github.com/trinhmatt'>Created by: Matthew Trinh</Link>
    <Link className='footer-link' to='mailto:trinhmatthew@gmail.com'>Contact</Link>
    <Link className='footer-link' to='https://github.com/trinhmatt/Census'>Source</Link>
  </div>
)

export default Footer;
