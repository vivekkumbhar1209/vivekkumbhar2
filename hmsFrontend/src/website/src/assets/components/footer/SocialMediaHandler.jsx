import React from "react";
import Copyright from "./Copyright";
const socialMediaHandlers = ["Facebook", "Twitter", "Instagram", "Youtube"];

const SocialMediaHandlers = () => {
  return (
    <div className="flex flex-col items-center mt-4 mb-4">
      <div className="font-bold">Get In Touch</div>
      <div className="flex gap-2">
        {socialMediaHandlers.map((item, index) => {
          return (
            <div key={index}>
              <a
                key={item}
                href="#"
                className=""
              >
                {item}
              </a>
            </div>
          );
        })}
      </div>
      <Copyright />
    </div>
  );
};

export default SocialMediaHandlers;
