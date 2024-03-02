import { Link } from "react-router-dom";
import "./MemberShip.css";
import { Card, Descriptions,Button } from "antd";
import checkmart from "../../images/check-solid.svg";
function MemberShip({ profileInfo, devLinkId }) {
  return (
    <>
      <div className="membership-container">

        <div className="membership-inner-container">
       
          <div className="membership-schemas-container">

         <h1>choose your tier</h1>
          <table className="membership-schema">
    <thead>
      <tr>
        <th class="tl tl2"></th>
        <th class="membership-card current-tier" >free tier
        <span>current tier</span>
        </th>
        <th class="membership-card" >DevLinks+ tier</th>
      </tr>
      <tr>
        <th></th>
        <th class="price-info membership-card">
          <div class="price-now"><span>free</span>
           
          </div>
        </th>
        <th class="price-info membership-card">
          <div class="price-now"><span>$1,00</span>
            <p>  /mo</p>
          </div>
        </th>
      
      </tr>
      <tr>
        <th>
          <p>choose today no hidden fees!</p>
        </th>
        <th class="membership-card">
            <div className="membership-schema-field">
            
            <Button type="primary" disabled>
        select tier
      </Button>
            </div>
        </th>
        <th class="membership-card">
        <div className="membership-schema-field">
        <Button type="primary">
        select tier
      </Button>
            </div>
        </th>
      
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td colspan="3">Basic Site features</td>
      </tr>
 
     
      <tr class="compare-row">
        <td>Basic Site features</td>
        <td className="membership-card">
        <div className="membership-check">
        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="var(--background-color)"
                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                              />
                            </svg>
        </div>
        </td>
        <td className="membership-card">
        <div className="membership-check">
        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="var(--background-color)"
                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                              />
                            </svg>
        </div>
        </td>
   
      </tr>
      <tr>
        <td> </td>
        <td colspan="4">links limit</td>
      </tr>
      <tr>
        <td>links limit</td>
        <td className="membership-card"><span>5 links max</span></td>
        <td className="membership-card"><span>10 links max</span></td>
       
      </tr>
      <tr>
        <td> </td>
        <td colspan="3">profile badge</td>
      </tr>
      <tr class="compare-row">
        <td>profile badge</td>
        <td className="membership-card">
        <div className="membership-check">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
        </svg>
        </div>
        </td>
        <td className="membership-card">
        <div className="membership-check">
        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="var(--background-color)"
                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                              />
                            </svg>
        </div>
        </td>

      </tr>
      <tr>
        <td> </td>
        <td colspan="3">uploading of resume , media, notes</td>
      </tr>
      <tr>
        <td>uploading of resume , media, notes</td>
        <td className="membership-card"> <div className="membership-check">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
        </svg>
        </div>
        </td>
        <td className="membership-card">
        <div className="membership-check">
        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="var(--background-color)"
                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                              />
                            </svg>
        </div>
        </td>

      </tr>

    </tbody>
  </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default MemberShip;
