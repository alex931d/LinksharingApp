import React from 'react';
import './SocialLink.css'
import { PLATFORMS } from './lib/platform';
import { generateBackgroundColor } from './lib/color';
import { generatePlatformIcon } from './platformIcon';
const Socialink = ({ link, settings }) => {
  console.log(settings.enable_global_color_change)
  return (
    <a
      href={link.url}
      style={{
  backgroundColor: 
    link.foreground ? 
      (settings.enable_color_customization ? link.foreground : generateBackgroundColor(link.platform.toUpperCase())) :
      generateBackgroundColor(link.platform.toUpperCase())
}}      className={`social-link`}
      target="_blank"
      rel="noopener noreferrer"
    >
    <div class="social-link-first-container">
       
       {generatePlatformIcon(link.platform, false)}
       <p style={{
  fontSize: link.font_size ? `${link.font_size}px` : "20px",
  color: 
    link.link_color ? 
      (settings.enable_color_customization ? link.link_color : "") :
      "",
  fontFamily: link.font_family ? `${link.font_family}` : `Rethink Sans`
}}> {link.platform}</p>
      </div>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
        />
      </svg>
    </a>
  );
};

export default Socialink;