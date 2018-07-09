import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Carousel} from 'react-bootstrap';
import img1 from '../images/img1.jpeg';
import img2 from '../images/img2.jpeg';
import img3 from '../images/img3.jpeg';
import img4 from '../images/img4.jpeg';
import img5 from '../images/img5.jpeg';
import img6 from '../images/img6.jpeg';

class Welcome extends Component {
render(){
    return (
        <div>
            <div className = "col-sm-12 text-center">
                <h1> Life a little too hectic? </h1>
                <h3> Welcome to Scheduler </h3>
            </div>

            <Carousel>
              <Carousel.Item>
                <img className='carousel-image' width={700} height={600} alt="700x600" src={img1} />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className='carousel-image' width={700} height={600} alt="700x600" src={img2} />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className='carousel-image' width={700} height={600} alt="700x600" src={img3} />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className='carousel-image' width={700} height={600} alt="700x600" src={img4} />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className='carousel-image' width={700} height={600} alt="700x600" src={img5} />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className='carousel-image' width={700} height={600} alt="700x600" src={img6} />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
        </div>
        )
    }
}

export default Welcome; 