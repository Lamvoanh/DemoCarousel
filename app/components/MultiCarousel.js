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
      showBtn
    } = this.props;

    // binding component fucntion
    this.doActiveItem = this.doActiveItem.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.prevItem = this.prevItem.bind(this);
    this.calcCarouselTransform = this.calcCarouselTransform.bind(this);
    this.calcItemTransform = this.calcItemTransform.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.dragItem = this.dragItem.bind(this);


    let activeIdx = !activeIndex ? 0 : activeIndex;
    // init component state
    let items = React.Children.toArray(children);

    this.state = {
      items: items,
      activeIndex: activeIdx,
      styleProps: styleProps,
      showBtn: items.length <= 1 ? false : showBtn || true,
    };

    this.isSwipe = false;
    this.startSwipePoint = 0;
    this.endSwipePoint = 0;
  }

  // When compnent mounted
  componentDidMount() {
    this.calcItemTransform();
    window.addEventListener("resize", this.calcItemTransform.bind(this));
  }

  // When compnent will unmounted
  componentWillUnmount() {
    window.removeEventListener("resize", this.calcItemTransform.bind(this));
  }

  // When compnent updated
  componentDidUpdate(prevProps) {
    // If update children
    if(prevProps.children !== this.props.children) {
      let items = React.Children.toArray(children);
      this.setState({
        items: items,
        showBtn: items.length <= 1 ? false : showBtn || true,
      });
    }

    // if update active item
    if(prevProps.activeIndex !== this.props.activeIndex) {
      this.setState({activeIndex: this.props.activeIndex});
    }

    // if update active styleProps
    if(prevProps.prevProps !== this.props.prevProps) {
      this.setState({prevProps: this.props.prevProps});
    }
    this.calcItemTransform();
  }

  // view an item by index
  doActiveItem(index) {
    this.setState({
      activeIndex: index,
      startSwipePoint: 0,
      endSwipePoint: 0,
    });
    // pause playing video
    setTimeout(() => {$('video').trigger('pause');}, 500);
  }

  // view next item
  // if it is overflow the list items, move to the first
  nextItem() {
    let newIndex = (this.state.activeIndex + 1);
    this.doActiveItem(newIndex);
  }

  // view previous item
  // if it is overflow the list items, move to the last
  prevItem() {
    let newIndex = (this.state.activeIndex - 1);
    this.doActiveItem(newIndex);
  }

  // calculate the transform for the carousel
  calcCarouselTransform(activeIndex) {
    let rotateY = activeIndex / this.state.items.length * -360;
    return {transform: 'rotateY(' + rotateY +'deg)'};
  }
  // calculate the transform for each item
  calcItemTransform() {
    let itemLength = this.state.items.length;
    $('.carousel .main-slider .slide').each(function(index, elm ) {
      let rotateY = index / itemLength * 360;
      let translateZ = ($('.carousel .main-slider').width() / 2) / Math.tan(Math.PI / itemLength);
      elm.style.transform = 'rotateY(' + rotateY +'deg) translateZ( '+ translateZ + 'px)';
    });
  }

  // The item flow the swiping when mouse down and drag or when touch swiping
  dragItem() {
    let itemLength = this.state.items.length;
    let r = ($('.carousel .main-slider').width() / 2) / Math.tan(Math.PI / itemLength);
    let rotateY = this.state.activeIndex / itemLength * -360;
    rotateY -= (this.startSwipePoint - this.endSwipePoint)*180 / (Math.PI * r)
    $('.carousel .main-slider').css('transition', 'transform 1ms');
    $('.carousel .main-slider').css('transform', 'rotateY(' + rotateY +'deg)');
  }

  // handle touch event
  onTouchStart(event) {
    this.isSwipe = true;
    this.startSwipePoint = event.targetTouches[0].screenX;
    this.endSwipePoint = event.targetTouches[0].screenX;
  }

  // handle touch move event
  onTouchMove(event) {
    if (!this.isSwipe) {
      return;
    }
    event.preventDefault();
    this.endSwipePoint = event.targetTouches[0].screenX;
    this.dragItem();
  }

  // handle touch and swipe, detemine the swipe direction
  onTouchEnd() {
    $('.carousel .main-slider').css('transition', 'transform 500ms');
    if (this.isSwipe) {
      if (this.startSwipePoint < this.endSwipePoint) {
        // if swipe from left to right
        this.prevItem();
      } else if (this.startSwipePoint > this.endSwipePoint) {
        // if swipe from right to left
        this.nextItem();
      }
    }

    this.isSwipe = false;
  }

  // handle swipe by mouse - when mouse down
  onMouseDown(mouseDownEvent) {
    mouseDownEvent.preventDefault();
    this.isSwipe = true;
    this.startSwipePoint = mouseDownEvent.clientX;
    this.endSwipePoint = mouseDownEvent.clientX;
  }

  // handle swipe by mouse - when mouse down and move
  onMouseMove(mouseMoveEvent) {
    if (!this.isSwipe) {
      return;
    }
    mouseMoveEvent.preventDefault();
    this.endSwipePoint = mouseMoveEvent.clientX;
    this.dragItem();
  }

  // handle mouse down and swipe, detemine the swipe direction
  onMouseUp(mouseUpEvent) {
    mouseUpEvent.preventDefault();
    this.onTouchEnd();
  }

  onMouseLeave(mouseLeaveEvent) {
    mouseLeaveEvent.preventDefault();
    this.onTouchEnd();
  }


  render() {
    const {
      items,
      activeIndex,
      styleProps,
      showBtn,
      startSwipePoint,
      endSwipePoint,
    } = this.state;

    if(items.length <= 0) {
      return '';
    }

    return (
      <div className='carousel' style={styleProps}>
        <BsChevronCompactLeft className={showBtn ? 'left-btn' : 'left-btn hide'} onClick={this.prevItem} />
        <BsChevronCompactRight className={showBtn ? 'right-btn' : 'right-btn hide'} onClick={this.nextItem} />
        <section className='main-slider'
          style={this.calcCarouselTransform(activeIndex)}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}
          >
          {items.map((item, index) => {
            return (
              <div
                className={'slide'}
                key={index}
              >
                <Item item={item} itemClass={'item'} />
              </div>
            );
          })}
        </section>
        <Thumbnail items={items} activeIndex={this.state.activeIndex % items.length} doActiveItem={this.doActiveItem} />
      </div>
    );
  }
}
export default MultiCarousel;
