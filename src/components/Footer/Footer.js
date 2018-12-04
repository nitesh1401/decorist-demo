import React from 'react';
import './footer.css';

const Footer = () => {
  return (
      <footer className="Footer position-fixed">
        <div className="col-sm-4 text-lg-left">
          © <span data-dynamic-year="">2018</span> Decorist, Inc. All rights
          reserved.
        </div>
        <div className="col-sm-8 text-lg-right">
          <ul className="list-inline" id="footer-links">
            <li className="list-inline-item">
              <a
                href="http://help.decorist.com/hc/en-us/sections/115000263848-Shipping"
                target="_blank"
                data-sl-processed="1"
              >
                Shipping
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="http://help.decorist.com/hc/en-us/sections/115000263968-Returns"
                target="_blank"
                data-sl-processed="1"
              >
                Returns
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="http://www.decorist.com/privacy-policy/"
                data-sl-processed="1"
              >
                Privacy Policy
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="http://www.decorist.com/terms-of-service/"
                data-sl-processed="1"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </footer>
  );
};

export default Footer;
