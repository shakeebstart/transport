import React from 'react'

export default function Loader() {
  return (
    <div id="preloader-active">
    <div className="preloader d-flex align-items-center justify-content-center">
        <div className="preloader-inner position-relative">
            <div className="preloader-circle"></div>
            <div className="preloader-img pere-text">
                <img src="./img/logo/loder.jpg" alt=""/>
            </div>
        </div>
    </div>
</div>
  )
}
