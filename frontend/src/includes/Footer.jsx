import React from 'react'
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi'

const Footer = () => {
  return (

    <>
  <footer className="footer bg-body-light mt-5">
    <div className="container">
      <div className="row f-info d-flex flex-column flex-md-row justify-content-between align-items-center text-center gap-2">
        <div className="f-info-socials d-flex gap-3 justify-content-center">
          <a className="text-dark" href="#"><BiLogoFacebook /></a>
          <a className="text-dark" href="#"><BiLogoInstagram /></a>
          <a className="text-dark" href="#"><BiLogoTwitter /></a>
        </div>
        <div className="text-muted small">
          &copy; {new Date().getFullYear()} All rights reserved to JSSalary
        </div>
        <div className="f-info-links d-flex gap-3 justify-content-center">
          <a href="#" className="text-decoration-none text-dark">Privacy</a>
          <a href="#" className="text-decoration-none text-dark">Terms</a>
        </div>

      </div>
    </div>
  </footer>
</>

  )
}

export default Footer