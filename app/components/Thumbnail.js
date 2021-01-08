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
      doActiveItem
    } = this.props;

    // binding component fucntion
    this.onThumbClick = this.onThumbClick.bind(this);
    this.adjustScroll = this.adjustScroll.bind(this);

    // init component state
    this.state = {
      activeIndex: activeIndex,
      doActiveItem: doActiveItem,
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
    let itemWidth = $(".thumb-slide").width() + parseInt($(".thumb-slide").css('marginTop'));
    let adjustment =  $(".thumb-slider").width() / itemWidth / 2;
    $(".thumb-slider").animate({
      scrollLeft: (index - adjustment + 0.5) * itemWidth
    },
    300);
  }

  // display the click item on the carousel
  onThumbClick(key) {
    if (this.state.activeIndex === key) {
      return;
    };
    if(typeof this.state.doActiveItem  === 'function') {
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
