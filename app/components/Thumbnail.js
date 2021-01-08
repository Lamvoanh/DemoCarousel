/*
 * this component display the thumbnail of the carousel
 */
import React from 'react';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import Item from './Item';
import $ from 'jquery';
import './thumbnail.css';

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
    let itemWidth = $(".thumb-slide").outerWidth() + 2*parseInt($(".thumb-slide").css('marginLeft'));
    let adjustment =  $(".thumb-slider").outerWidth() / itemWidth / 2;
    $(".thumb-slider").animate({
      scrollLeft: (index - adjustment + 0.5) * itemWidth
    },
    100);
  }

  onScrollLeft() {
    let itemWidth = $(".thumb-slide").outerWidth() + 2*parseInt($(".thumb-slide").css('marginLeft'));
    $(".thumb-slider").animate({
      scrollLeft: $(".thumb-slider").scrollLeft() - itemWidth
    },
    1);
    this.timer = setTimeout(this.onScrollLeft, 50);
  }

  onScrollRight() {
    let itemWidth = $(".thumb-slide").outerWidth() + 2*parseInt($(".thumb-slide").css('marginLeft'));
    $(".thumb-slider").animate({
      scrollLeft: $(".thumb-slider").scrollLeft() + itemWidth
    },
    1);
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
      <RiArrowLeftSFill className={'thumb-left-btn'}
        onMouseDown={this.onScrollLeft}
        onMouseUp={this.onStopScroll}/>
      <div className='thumb-slider'>
        {items.map((item, index) => {
          return (
            <div
              className={index === activeIndex ? 'thumb-slide active' : 'thumb-slide'}
              key={index}
              onClick={() => this.onThumbClick(index)}
            >
              <Item item={item} itemClass={'thumb-item'} />
            </div>
          );
        })}
      </div>
      <RiArrowRightSFill className={'thumb-right-btn'}
        onMouseDown={this.onScrollRight}
        onMouseUp={this.onStopScroll}/>
      </div>
    );
  };
};

export default Thumbnail;
