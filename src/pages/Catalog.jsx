import React from "react"

import Profile from "../assets/img/profile.png"
import Logo from "../assets/img/book (1).svg"

class Catalog extends React.Component {
  render() {
    return (
      <div className="catalog">
        <div className="sidebar">
          <div className="profile">
            <div className="profile-img">
              <img src={Profile} alt="Profile" />
            </div>
            <div className="profile-name">Muhamad Adam</div>
          </div>
          <ul className="menu">
            <li className="item">Explore</li>
            <li className="item">History</li>
            <li className="item">Add Book</li>
          </ul>
        </div>
        <div className="content">
          <div className="navbar">
            <ul className="navbar-item">
              <li>All Categories</li>
              <li>All Time</li>
            </ul>
            <div className="search-wrapper">
              <input type="text" className="input-search" placeholder="Search a book" />
            </div>
            <div className="brand">
              <img className="icon" src={Logo} alt="Logo" width="30" height="30" />
              <div className="text">Library</div>
            </div>
          </div>
          <div className="container">
            <h3>List Books</h3>
              <div className="book-segment">
                <div className="list-book">
                  <div className="card">
                    <div className="card-image"></div>
                    <div className="card-text">
                      <div className="title">Lorem Ipsum</div>
                      <div className="desc">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-image"></div>
                    <div className="card-text">
                      <div className="title">Lorem Ipsum</div>
                      <div className="desc">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-image"></div>
                    <div className="card-text">
                      <div className="title">Lorem Ipsum</div>
                      <div className="desc">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    )
  }
}

export default Catalog
