import React from 'react'
import Sidenav from './Sidenav';
import './About.css';
import  vishal from './vishal.jpg' ;
import  harsh from './harsh.jpeg' ;
import aryan from './aryan2.jpg'
import  aman from './Aman.jpeg' ;
import abtmbg from './abtusbg.png'
import { useState, useEffect } from 'react';


function About() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const renderCard = () => {
        setLoading(false);
    };

    const divStyle = {
        backgroundColor: 'blue',
        // padding: '10px',
        // color: 'white',
      };

    return (
        <div   > 
            <Sidenav / >
            <div class="company" >
                <div class="img" >
                    <img src={abtmbg} alt="" />
                </div>
                <div class="company-info">
                    <span>VIDEOS <span class="our">FOR EVERYONE</span></span>
                    {/* <p>
                        <b>Pico</b> is a India-based website dedicated for sharing stock photography under the Pico license. Pico allows
                        photographers to upload photos to its website, which are then curated by a team of photo editors. In Pico we are
                        aspiring to be one of the largest photography suppliers on the internet.
                    </p> */}
                </div>
            </div>
            {/* <div class="team"><span>MENTOR</span></div>
            <div class="cunt">
                <div class="card">

                <div class={loading ? "card-image loading" : "card-image"}>
                    <img src={vishal} alt="" /></div>
                    <div class="card-info">
                        <h3 class="card-title "><span>Dr Vishal Krishna <span class="yellow-surname">Singh</span></span></h3>
                        <p class="card-description ">
                            <span class="personal-info">
                                <span class="info">Project Supervisor</span> <br />
                                Email: <a href="mailto:'vks@iiitl.ac.in'">vks@iiitl.ac.in</a>
                            </span>
                        </p>
                        <div class="card-mediaIcons">
                            <a href="#" target="on_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://www.linkedin.com/search/results/people/?firstName=Aman&lastName=Garg&origin=SEO_PSERP&sid=Pc0" target="on_blank"><i>
                                <img  src="https://www.freeiconspng.com/uploads/linkedin-logo-3.png" alt="Pico" /></i></a>
                               
                            <a href="https://www.instagram.com/yashfalke77/" target="on_blank">
                                <i class="fab fa-instagram"></i></a>

                        </div>
                    </div>
                </div>
            </div> */}



            <div class="team"><span>OUR TEAM</span></div>

            <div class="container">
                <div class="card">


                    <div class={loading ? "card-image loading" : "card-image"}>
                    <img src= {aman} alt="" /></div>
                    <div class="card-info">
                        <h3 class="card-title "><span>Aman <span class="yellow-surname">Garg</span></span></h3>
                        <p class="card-description ">
                            <span class="personal-info">
                                <span class="info">Web developing head</span> <br />
                                {/* Pursuing IT Engineering (VIT Mumbai) <br /> */}
                                Email: <a href="mailto:'lci2020031@iiitl.ac.in'">lci2020031@iiitl.ac.in</a>
                            </span>
                        </p>
                        <div class="card-mediaIcons">
                            <a href="#" target="on_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://www.linkedin.com/in/aman-garg-5a0767203/" target="on_blank"><i><img
                                src="https://www.freeiconspng.com/uploads/linkedin-logo-3.png" alt="Pico" /></i></a>
                            <a href="https://www.instagram.com/yashfalke77/" target="on_blank">
                                <i class="fab fa-instagram"></i></a>

                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class={loading ? "card-image loading" : "card-image"}>
                        <img class = "harsha" src= {harsh} alt="" /></div>
                    <div class="card-info">
                        <h3 class="card-title "><span>Harsh <span class="yellow-surname">Singh</span></span></h3>
                        <p class="card-description ">
                            <span class="personal-info">
                                <span class="info">ML Ops</span> <br />
                                {/* Pursuing IT Engineering (VIT Mumbai) <br /> */}
                                Email: <a href="mailto:'lci2020003@iiitl.ac.in'">lci2020003@iiitl.ac.in</a>
                            </span>
                        </p>
                        <div class="card-mediaIcons">
                            <a href="#" target="on_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://www.linkedin.com/in/harsh-singh-882398199/" target="on_blank"><i><img
                                src="https://www.freeiconspng.com/uploads/linkedin-logo-3.png" alt="Pico" /></i></a>
                            <a href="https://www.instagram.com/harshsunwani/" target="on_blank"><i
                                class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class={loading ? "card-image loading" : "card-image"} ><img src={aryan} alt="" /></div>
                    <div class="card-info">
                        <h3 class="card-title "><span>Aryan <span class="yellow-surname">Kumar</span></span></h3>
                        <p class="card-description ">
                            <span class="personal-info">
                                <span class="info">Backend developer</span> <br />
                                 {/* <br /> */}
                                Email: <a href="mailto:'lci2020004@iiitl.ac.in'">lci2020004@iiitl.ac.in</a>
                            </span>
                        </p>
                        <div class="card-mediaIcons">
                            <a href="#" target="on_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="" target="on_blank"><i><img
                                src="https://www.freeiconspng.com/uploads/linkedin-logo-3.png" alt="Pico" /></i></a>
                            <a href="https://www.linkedin.com/in/aryan-kumar-795528202/" target="on_blank"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default About;