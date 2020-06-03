import React from 'react'

import ArrowIcon from "../assets/img/Arrow.svg"
import CoverNya from "../assets/img/covernya.png"
import CoverBook from "../assets/img/covernya (1).png"

class Detail extends React.Component {
  render() {
    return (
      <>
        <div className="icon-arrow">
          <img src={ArrowIcon} alt="arrow" />
        </div>
        <div className="detail">
          <div className="thumbnail">

            <img src={CoverNya} width="100%" alt="thumbnail cover" className="thumbnail" />
          </div>

          <div className="content">
            <div className="card">
              <div className="description">
                <div className="status-title">
                  <div className="title-date">
                    <div className="category-badge">NTR :)</div>
                    <h1 className="title">DILAN 1990</h1>
                    <div className="date">30 Juni 2019</div>
                  </div>
                  <div className="status">Available</div>            
                </div>
                <div className="sinopsis" style={{textAlign: 'justify', color: '#505050'}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
                </div>
              </div>
              <div className="cover-button">
                <img src={CoverBook} alt="Cover book" className="cover" />
                <button className="cta-borrow">Borrow</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Detail