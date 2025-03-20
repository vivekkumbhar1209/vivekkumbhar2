import React from "react";
import footerLinks from "./footerLinks";
import FooterAction from "./FooterActions";
import SocialMediaHandlers from "./SocialMediaHandler";
import logo from '../../../../Images/Fortune-Logo-1536x1143.png'

const Footer = () => {
  return (
    <footer className=" p-1 pt-4  primary-footer font-family-roboto text-white">
      <section className="flex flex-col lg:flex-row lg:gap-6 justify-evenly">
        <div
          key="image-footer-action"
          className="gap-6 m-1 p-2 justify-center items-center flex"
        >
          <img key="image-footer-logo" src={logo} alt="Fortune Hospital Logo" className="w-30 bg-white bg-opacity-50 rounded-lg p-2 h-30 object-cover" />
          <FooterAction />
        </div>
        <div className="flex lg:flex-row flex-col ">

          {footerLinks.map((linkSectionItem, index) => {
            return (
              <div key={index} className="   p-2  max-w-60  ">
                <div
                  className="font-bold text-md"
                >
                  {linkSectionItem.linkSection}
                </div>
                <ul
                  className=" text-nowrap  "
                >
                  {linkSectionItem.links.map((link, index) => {
                    return (
                      <li
                        key={index}
                        className="text-wrap group "
                      >
                        <a
                          href="#"
                          className="transform-transition duration-400  mr-3 group-hover:ml-3 group-hover:mr-0  "
                        >
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      <SocialMediaHandlers />
    </footer>
  );
};

export default Footer;
