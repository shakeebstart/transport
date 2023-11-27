import React from 'react'

export default function About() {
  return (
    <div className="about-low-area padding-bottom" id='about' style={{ backgroundColor:'#fff' }}>
    <div className="container">
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="about-caption mb-50">
                    {/* <!-- Section Tittle --> */}
                    <div className="section-tittle mb-35">
                        <span>About Our Company</span>
                        <h2>Safe Logistic & Transport  Solutions That Saves our Valuable Time!</h2>
                    </div>
                    <p>Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for cular ts with unlimited ustomization possibilities. Pixel-perfect replication of the designers is intended.</p>
                    <p>Brook presents your services with flexible, convefnient and chient anipurpose layouts. You can select your favorite layouts.</p>
                    <a href="about.html" className="btn">More About Us</a>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                {/* <!-- about-img --> */}
                <div className="about-img ">
                    <div className="about-font-img">
                        <img src="assets/img/gallery/about2.png" alt=""/>
                    </div>
                    <div className="about-back-img d-none d-lg-block">
                        <img src="assets/img/gallery/about1.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
