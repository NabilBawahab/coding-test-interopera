import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export const TypedJs = ({ answer }) => {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [answer],
      typeSpeed: 5,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation, prevents memory leaks
      typed.destroy();
    };
  }, [answer]);

  return <span ref={el} />;
};
