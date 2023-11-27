import React from 'react'

export default function Service() {
  return (
    <div className="categories-area section-padding30" id='services' style={{ backgroundColor:'white' }}>
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                {/* <!-- Section Tittle --> */}
                <div className="section-tittle text-center mb-80">
                    <span>Our Services</span>
                    <h2>What We Can Do For You</h2>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="single-cat text-center mb-50">
                    <div className="cat-icon">
                        <span className="flaticon-shipped"></span>
                    </div>
                    <div className="cat-cap">
                        <h5><a href="services.html">Land Transport</a></h5>
                        <p>The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to.</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="single-cat text-center mb-50">
                    <div className="cat-icon">
                        <span className="flaticon-ship"></span>
                    </div>
                    <div className="cat-cap">
                        <h5><a href="services.html">Ship Transport</a></h5>
                        <p>The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to.</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="single-cat text-center mb-50">
                    <div className="cat-icon">
                        <span className="flaticon-plane"></span>
                    </div>
                    <div className="cat-cap">
                        <h5><a href="services.html">Air Transport</a></h5>
                        <p>The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
