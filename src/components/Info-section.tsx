import React from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { Tooltip } from "react-tooltip";

interface props  {
    heading: string,
    text?: string,
    html? : HTMLElement | any 

}
function InfoSection({ heading, text, html } : props) {
    return ( 
         <div style={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: "20px 0",
                    width: "100%"
                }}>
                    <p style={{ marginRight: "4px", fontSize: 20, fontWeight: "bold", color: "white" }}>T3 Play Visionaries Staking Vault</p>
                        <IoIosInformationCircle data-tooltip-id="info-tooltip" style={{ fontSize: 20, cursor: 'pointer', color : "#FFFFFF" }}  />
                        <Tooltip id="info-tooltip" place="bottom" delayHide={200} style={{backgroundColor : '#636363'}} clickable>
                            {/* <p style={{fontSize : 12}}>You need to own Visionaries NFTs to <br></br>lock in this reward vault.</p> */}
                            <p style={{ fontSize: 12 }}>{ html() || text || "text not provided"}</p>
                        <p>
                            <a
                            style={{fontSize : 12, color: "yellow", textDecoration: "underline" }}
                            href="https://element.market/collections/t3playvisionaries"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {heading || "Purchase Visionaries here"}
                          </a>
                        </p>
                    </Tooltip>
                </div>
     );
}

export default InfoSection;
 