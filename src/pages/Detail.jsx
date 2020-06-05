import React from 'react'

import {
  Link
} from 'react-router-dom'

import ArrowIcon from "../assets/img/Arrow.svg"
import CoverNya from "../assets/img/covernya.png"
import CoverBook from "../assets/img/covernya (1).png"

class Detail extends React.Component {
  render() {
    return (
      <>
        <div className="d-flex flex-row justify-content-between align-items-center position-absolute w-100 px-5 py-3">
          <Link to="/catalog" className="icon-arrow">
            <img src={ArrowIcon} alt="arrow" />
          </Link>
          <div id="bookControlWrapper">
            <Link to="#" className="text-white font-weight-bold">EDIT</Link>
            <Link to="#" className="text-white font-weight-bold ml-3">DELETE</Link>
          </div>
        </div>
        <div className="detail">
          <div className="thumbnail">
            <img src={CoverNya} width="100%" alt="thumbnail cover" className="thumbnail" />
          </div>

          <div className="container my-5">          
            <div className="row">
              <div className="col-sm-9">
                <div className="description">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="title-date">
                      <div className="badge badge-warning p-2 text-white">NTR :)</div>
                      <h1 className="title font-weight-bold">DILAN 1990</h1>
                      <div className="date font-weight-bold">30 Juni 2019</div>
                    </div>
                    <h5 className="status text-success font-weight-bold">Available</h5>            
                  </div>
                  <div className="sinopsis" style={{textAlign: 'justify', color: '#505050'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="w-100 h-100 d-flex justify-content-between align-items-center flex-column">
                  <img src={CoverBook} alt="Cover book" className="cover w-100" style={{marginTop: "-180px"}}/>
                  <div>
                    <button className="cta-borrow btn btn-warning text-white font-weight-bold p-3">Borrow</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Detail