import React from "react";
import Group from "./Group";
import Showgroup from "./Showgroup";
import ShowContact from "./ShowContact";
import ShowLib from "./ShowLib";
import Showmessage from "./Showmessage";
import Allmessage from "./Allmessage";

export default function SmsHome() {
  return (
    <div className="container">
      <div className="row">
        
        <div className="col-4 sec">
          <section className="side">
            <h2><i class="fa-solid fa-people-group"></i>Group</h2>

            <Showgroup />
          </section>
          <section className="side">
            <h2><i class="fa-solid fa-address-book"></i>Contact </h2>
            <ShowContact />
          </section>
        </div>
        <div className="col-4 sec">
          <section className="center">
            
            <Allmessage />
          </section>
          
        </div>
        <div className="col-4 sec">
          <section className="side">
            <h2>
              <i class="fa-solid fa-bookmark"></i>Library Name{" "}
            </h2>
            <ShowLib />
          </section>
          <section className="side">
            <h2>
              <i class="fa-solid fa-message"></i>Messages{" "}
            </h2>
            <Showmessage />
          </section>
        </div>
      </div>
    </div>
  );
}
