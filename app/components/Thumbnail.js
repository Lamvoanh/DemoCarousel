/*
 * this component display the thumbnail of the carousel
 */
import React from 'react';
import Item from './Item';
import './thumbnail.css';
import arrowL from './imgs/thumb-arrow-l.png';
import arrowR from './imgs/thumb-arrow-r.png';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    const {
      activeIndex,
      doActiveItem
    } = this.props;

    // binding component fucntion
    this.onThumbClick = this.onThumbClick.bind(this);
    this.adjustScroll = this.adjustScroll.bind(this);
    this.onScrollLeft = this.onScrollLeft.bind(this);
    this.onScrollRight = this.onScrollRight.bind(this);
    this.onStopScroll = this.onStopScroll.bind(this);

    // init component state
    this.state = {
      activeIndex: activeIndex,
      doActiveItem: doActiveItem,
      isSwipe: false,
      startSwipePoint: null,
      endSwipePoint: null,
    };

    this.timer = null;
  }
  // When compnent mounted
  componentDidMount() {
    this.adjustScroll(this.props.activeIndex);
  }

  // When compnent updated
  componentDidUpdate(prevProps) {
    if(this.state.activeIndex !== this.props.activeIndex) {
      this.setState({activeIndex: this.props.activeIndex});
      this.adjustScroll(this.props.activeIndex);
    }
  }

  // adjust scroll of the thumbnail bar when view next of previous items
  adjustScroll(index) {
    let thumbSlider = document.querySelector(".thumb-slider");
    let thumbSlide = document.querySelector(".thumb-slide");
    let itemWidth = thumbSlide.offsetWidth + 2*thumbSlide.offsetLeft;
    let adjustment =  thumbSlider.offsetWidth / itemWidth / 2;

    let currentScrollValue = thumbSlider.scrollLeft;
    let adjustValue = ((index - adjustment + 0.5) * itemWidth);

    adjustValue = (adjustValue - currentScrollValue) / 10;
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        thumbSlider.scrollLeft = currentScrollValue + i*adjustValue;
      }, i * 10);
    }
  }

  onScrollLeft() {
    let thumbSlide = document.querySelector(".thumb-slide");
    let itemWidth = thumbSlide.offsetWidth + 2*thumbSlide.offsetLeft;
    document.querySelector(".thumb-slider").scrollLeft -= itemWidth;
    this.timer = setTimeout(this.onScrollLeft, 50);
  }

  onScrollRight() {
    let thumbSlide = document.querySelector(".thumb-slide");
    let itemWidth = thumbSlide.offsetWidth + 2*thumbSlide.offsetLeft;
    document.querySelector(".thumb-slider").scrollLeft += itemWidth;
    this.timer = setTimeout(this.onScrollRight, 50);
  }

  onStopScroll() {
    clearTimeout(this.timer);
  }

  // display the click item on the carousel
  onThumbClick(key) {
    if (this.state.activeIndex === key) {
      return;
    };
    if(typeof this.state.doActiveItem  === 'function') {
      this.state.doActiveItem(key);
    }
    this.setState({activeIndex: key});
  }
  render() {
    const {
      items,
    } = this.props;

    const {
      activeIndex,
    } = this.state;

    return (
      <div className='thumb-slider-wrap'>
        <button className={'thumb-btn thumb-left-btn'}
          onMouseDown={this.onScrollLeft}
          onMouseUp={this.onStopScroll}>
          <img src={arrowL}/>
        </button>
        <div className='thumb-slider'>
          {items.map((item, index) => {
            return (
              <div className={index === activeIndex ? 'thumb-slide active' : 'thumb-slide'}
                key={index}
                onClick={() => this.onThumbClick(index)}>
                <Item item={item} itemClass={'thumb-item'} />
              </div>
            );
          })}
        </div>
        <button className={'thumb-btn thumb-right-btn'}
          onMouseDown={this.onScrollRight}
          onMouseUp={this.onStopScroll}>
          <img src={arrowR}/>
        </button>
      </div>
    );
  };
};

export default Thumbnail;
