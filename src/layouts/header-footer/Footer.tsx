import React from "react";

function Footer() {
    return (
        <div className="container-fluid bg-dark text-light">
            <div className="container">
                <footer className="pt-5 pb-1">
                    <div className="row">
                        <div className="col-6 col-md-2 mb-3">
                            <h5>PRODUCTS</h5>
                            <ul className="nav flex-column mt-5">
                                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Home</a></li>
                                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Features</a></li>
                                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Pricing</a></li>
                                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">FAQs</a></li>
                                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">About</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>CONTACT</h5>
                            <ul className="nav flex-column mt-5">
                                <li className="nav-item mb-2"><a className="nav-link p-0 text-light" href="https://www.facebook.com/danglinh1502"><i className="fa-brands fa-facebook text-light fs-5"></i> <span className="ms-1">Facebook</span> </a></li>
                                <li className="nav-item mb-2"><a className="nav-link p-0 text-light" href="https://www.instagram.com/dlinh_152"><i className="fa-brands fa-instagram text-light fs-5"></i> <span className="ms-1">Instagram</span> </a></li>
                                <li className="nav-item mb-2"><a className="nav-link p-0 text-light" href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBpRhPQZlZSJpvCMctRjKLBQPlpvffrGGFVJDcDbjHWswNQZmQMWNJdLbXgrrzLSgwkvtTp"><i className="fa-solid fa-envelope text-light fs-5"></i> <span className="ms-1">Gmail</span> </a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>DOWNLOAD</h5>
                            <ul className="nav flex-column mt-5">
                                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light"><i className="fa-brands fa-app-store"></i> <span className="ms-1">App Store</span> </a></li>
                                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light"><i className="fa-brands fa-google-play"></i> <span className="ms-1">Google Play</span> </a></li>
                            </ul>
                        </div>
                        <div className="col-md-5 offset-md-1 mb-3">
                            <form>
                                <h5>Subscribe to our newsletter</h5>
                                <p>Monthly digest of what's new and exciting from us.</p>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                    <button className="btn btn-primary" type="button">Subscribe</   button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between py-3 my-3 border-top">
                        <p>&copy; 2024 Linh's Bookstore, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3"><a className="link-body-emphasis" href="https://www.facebook.com/danglinh1502"><i className="fa-brands fa-facebook text-light fs-5"></i></a></li>
                            <li className="ms-3"><a className="link-body-emphasis" href="https://www.instagram.com/dlinh_152"><i className="fa-brands fa-instagram text-light fs-5"></i></a></li>
                            <li className="ms-3"><a className="link-body-emphasis" href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBpRhPQZlZSJpvCMctRjKLBQPlpvffrGGFVJDcDbjHWswNQZmQMWNJdLbXgrrzLSgwkvtTp"><i className="fa-solid fa-envelope text-light fs-5"></i></a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;