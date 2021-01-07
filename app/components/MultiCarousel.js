/*
 * this component display the carousel and thumbnail bar
 * support swipe by mouse on destop and swipe guesture on mobile
 */

import React from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Item from './Item';
import Thumbnail from './Thumbnail';
import $ from 'jquery';
import './index.css';

class MultiCarousel extends React.Component {
  constructor(props) {
    super(props);
    let {
      activeIndex,
      children,
      styleProps,
    } = this.props;

    // init component variable
    this.isEmpty = children.length <= 0;
    this.itemLength = children.length;

    // binding component fucntion
    this.activeItem = this.activeItem.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.prevItem = this.prevItem.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    let activeIdx = !activeIndex ? 0 : activeIndex % this.itemLength;
    // init component state
    this.state = {
      items: children,
      activeIndex: activeIdx,
      styleProps: styleProps,
      isSwipe: false,
      startSwipePoint: null,
      endSwipePoint: null,
    };
  }

  // When compnent updated
  componentDidUpdate(prevProps) {
    // If update children
    if(prevProps.children !== this.props.children) {
      this.setState({items: this.props.children});
      this.isEmpty = this.props.children.length <= 0;
      this.itemLength = this.props.children.length;
    }

    // if update active item
    if(prevProps.activeIndex !== this.props.activeIndex) {
      this.setState({activeIndex: this.props.activeIndex});
    }

    // if update active styleProps
    if(prevProps.prevProps !== this.props.prevProps) {
      this.setState({prevProps: this.props.prevProps});
    }
  }

  // view an item by index
  activeItem(index) {
    this.setState({activeIndex: index});
    // pause playing video
    $('video').trigger('pause');
  }

  // view next item
  // if it is overflow the list items, move to the first
  nextItem() {
    let newIndex = (this.state.activeIndex + 1) % this.itemLength;
    this.activeItem(newIndex);
  }

  // view previous item
  // if it is overflow the list items, move to the last
  prevItem() {
    let newIndex = (this.state.activeIndex - 1 + this.itemLength) % this.itemLength;
    this.activeItem(newIndex);
  }

  // handle touch event
  onTouchStart(event) {
    this.setState({
      startSwipePoint: event.targetTouches[0].screenX,
    });
  }

  // handle touch move event
  onTouchMove(event) {
    this.setState({
      isSwipe: true,
      endSwipePoint: event.targetTouches[0].screenX,
    });
  }

  // handle touch and swipe, detemine the swipe direction
  onTouchEnd() {
    const { isSwipe, startSwipePoint, endSwipePoint } = this.state;

    if (isSwipe) {
      if (startSwipePoint < endSwipePoint) {
        // if swipe from left to right
        this.prevItem();
      } else if (startSwipePoint > endSwipePoint) {
        // if swipe from right to left
        this.nextItem();
      }
    }

    this.setState({isSwipe: false});
  }

  // handle swipe by mouse - when mouse down
  onMouseDown(mouseDownEvent) {
    mouseDownEvent.preventDefault();
    this.setState({
      startSwipePoint: mouseDownEvent.clientX,
    });
  }

  // handle swipe by mouse - when mouse down and move
  onMouseMove(mouseMoveEvent) {
    this.setState({
      isSwipe: true,
      endSwipePoint: mouseMoveEvent.clientX,
    });
  }

  // handle mouse down and swipe, detemine the swipe direction
  onMouseUp() {
    this.onTouchEnd();
  }

  render() {
    const {
      items,
      activeIndex,
      styleProps,
      prevIndex,
      nextIndex
    } = this.state;

    if(this.isEmpty) {
      return;
    }

    return (
      <div className='carousel' style={styleProps}>
        <BsChevronCompactLeft className='left-arrow' onClick={this.prevItem} />
        <BsChevronCompactRight className='right-arrow' onClick={this.nextItem} />
        <section className='main-slider'
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}>
          {items.map((item, index) => {
            return (
              <div
                style={{transform: 'translate3d(' + (index-activeIndex)*100 +'%, 0px, 0px)'}}
                className={index === activeIndex ? 'slide active' : 'slide'}
                key={index}
              >
                <Item item={item} itemClass={'item'} />
              </div>
            );
          })}
        </section>
        <Thumbnail items={items} activeIndex={this.state.activeIndex} activeItem={this.activeItem} />
      </div>
    );
  }
}
export default MultiCarousel;
