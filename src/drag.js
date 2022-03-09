import { spring } from 'svelte/motion'

export function drag(node, params) {
  let x, y;

  const coordinates = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 });

  // default directions
  let directions = { x: true, y: true };
  if (params?.direction === 'x') {
    directions.y = false;
  } else if (params?.direction === 'y') {
    directions.x = false
  }

  coordinates.subscribe(($coords) => {
    node.style.transform = `translate3d(${$coords.x}px, ${$coords.y}px, 0)`;
  });

  // MOUSE
  // -----
  function handleMouseDown(event) {
    x = event.clientX;
    y = event.clientY;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event) {
    // deltas
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.clientX;
    y = event.clientY;
    coordinates.update(($coords) => {
      return {
        x: directions.x ? $coords.x + dx : 0,
        y: directions.y ? $coords.y + dy: 0
      }
    })
  }

  function handleMouseUp() {
    // reset values (leave this out to keep object in new location)
    x = 0;
    y = 0;
    coordinates.update(() => {
      return { x, y }
    })
    // remove event listeners
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  // TOUCH
  // -----
  function handleTouchStart(event) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    node.addEventListener("touchmove", handleTouchMove);
    node.addEventListener("touchend", handleTouchEnd);
  }

  function handleTouchMove(event) {
    event.preventDefault();
    // deltas
    const dx = event.touches[0].clientX - x;
    const dy = event.touches[0].clientY - y;
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    coordinates.update(($coords) => {
      return {
        x: directions.x ? $coords.x + dx : 0,
        y: directions.y ? $coords.y + dy : 0,
      };
    });
  }

  function handleTouchEnd() {
    // reset values (leave this out to keep object in new location)
    x = 0;
    y = 0;
    coordinates.update(() => {
      return { x, y };
    });
    // remove event listeners
    node.removeEventListener("touchmove", handleMouseMove);
    node.removeEventListener("touchend", handleMouseUp);
  }


  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("touchstart", handleTouchStart);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("touchstart", handleTouchStart);
    }
  }
}