/*
 * this component display the thumbnail of the carousel
 */
import React from 'react';
import Item from './Item';
import $ from 'jquery';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    const {
      activeIndex,
      activeItem
    } = this.props;

    // binding component fucntion
    this.onThumbClick = this.onThumbClick.bind(this);
    this.adjustScroll = this.adjustScroll.bind(this);

    // init component state
    this.state = {
      activeIndex: activeIndex,
      activeItem: activeItem,
      isSwipe: false,
      startSwipePoint: null,
      endSwipePoint: null,
    };
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
    let adjustment =  $(".thumb-slider").width() / 105 / 2;
    $(".thumb-slider").animate({
      scrollLeft: (index - adjustment + 0.5) * 105
    },
    300);
  }

  // display the click item on the carousel
  onThumbClick(key) {
    if (this.state.activeIndex === key) {
      return;
    };
    if(typeof  this.state.activeItem  === 'function') {
      this.state.activeItem(key);
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
      </div>
    );
  };
};

export default Thumbnail;
