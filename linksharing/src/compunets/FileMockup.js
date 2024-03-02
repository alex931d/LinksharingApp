import { FILETYPES } from "./lib/allowedFileType";
import { generateBackgroundColorForFileTypes } from "./lib/allowedFileType";
import { generateFileTypeIcon } from "./fileTypeIcon";
import './SocialLink.css'
import './FileMockup.css'
const FileMockup = ({file,settings}) =>{
return (

        <a 
            href={file.fileTempUrl || `${process.env.PUBLIC_URL}/nonAuthFiles/${file.url}`}
            style={{
  backgroundColor: 
    file.foreground ? 
      (settings.enable_color_customization ? file.foreground : 'var(--light-light-purple)') :
      'var(--light-light-purple)'
}}   
            className={`social-link`}
            target="_blank"
           rel="noopener noreferrer"
        > 
    <div class="social-link-first-container file">
       
       {generateFileTypeIcon(file.fileType,true)}
       <p style={{
  fontSize: file.font_size ? `${file.font_size}px` : "20px",
  color: 
    file.link_color ? 
      (settings.enable_color_customization ? file.link_color : "") :
      "",
  fontFamily: file.font_family ? `${file.font_family}` : `Rethink Sans`
}}> {file.name}</p>
      </div>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
        />
      </svg>
        </a>
    
)
}
export default FileMockup;