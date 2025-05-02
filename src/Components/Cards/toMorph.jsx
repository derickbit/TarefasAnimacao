import React, { useEffect, useRef } from "react";
import { animate, createScope, svg } from "animejs";

const CardSuitsMorph = () => {
  const svgRef = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: svgRef }).add(() => {
      const paths = svgRef.current.querySelectorAll("path");
      const [hearts, spades, diamonds, clubs] = paths;

      if (hearts && spades && diamonds && clubs) {
        animate(hearts, {
          keyframes: [
            { d: svg.morphTo(spades), fill: "black", duration: 1000 },
            { d: svg.morphTo(diamonds), fill: "red", duration: 1000 },
            { d: svg.morphTo(clubs), fill: "black", duration: 1000 },
            { d: svg.morphTo(hearts), fill: "red", duration: 1000 },
          ],
          loop: true,
          easing: "easeInOutQuad",
          autoplay: true,
        });
      }
    });

    return () => scope.current.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="200"
      height="200"
    >
      {/* Copas ❤️ */}
      <path
        d="M100,30 C90,10, 50,30, 70,70 C100,100, 100,100, 100,100 C100,100, 130,70, 150,70 C170,30, 110,10, 100,30 Z"
        fill="red"
      />
      {/* Espadas ♠️ */}
      <path
        d="M100,30 C70,70, 130,70, 100,30 C90,50, 110,50, 100,70 L90,110 L110,110 L100,70 Z"
        fill="black"
        style={{ opacity: 0 }}
      />
      {/* Ouros ♦️ */}
      <path
        d="M100,30 L70,100 L100,170 L130,100 Z"
        fill="red"
        style={{ opacity: 0 }}
      />
      {/* Paus ♣️ */}
      <path
        d="M100,40 A20,20 0 1,1 99.9,40 M80,80 A20,20 0 1,1 120,80 A20,20 0 1,1 80,80 M90,100 L110,100 L100,140 Z"
        fill="black"
        style={{ opacity: 0 }}
      />
    </svg>
  );
};

export default CardSuitsMorph;
