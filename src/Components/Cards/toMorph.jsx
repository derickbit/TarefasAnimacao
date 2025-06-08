import React, { useEffect, useRef } from "react";
import { animate, createScope, svg } from "animejs";

// MUDANÇA 1: Adicione { width = "30", height = "30" } aqui
const CardSuitsMorph = ({ width = "30", height = "30" }) => {
  const svgRef = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: svgRef.current }).add(() => {
      const paths = svgRef.current.querySelectorAll("path");
      const [hearts, spades, diamonds, clubs, hearts2] = paths;

      if (hearts && spades && diamonds && clubs) {
        animate(hearts, {
          keyframes: [
            { d: svg.morphTo(spades), fill: "gray", duration: 2000 },
            { d: svg.morphTo(diamonds), fill: "gray", duration: 2000 },
            { d: svg.morphTo(clubs), fill: "gray", duration: 2000 },
            { d: svg.morphTo(hearts2), fill: "gray", duration: 2000 },
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
      viewBox="0 0 325 303.5"
      // MUDANÇA 2: Use as variáveis aqui
      width={width}
      height={height}
    >
      {/* O resto do seu código permanece exatamente igual */}
      <path
        d="M162.834 91.0496C177.38 46.5362 221.956 -31.1586 283.893 14.1638C345.831 59.4863 324.717 122.074 306.417 147.703L162.834 303.5V91.0496ZM41.5995 13.7273C103.537 -31.5953 148.114 46.1007 162.66 90.614V303.063L19.077 147.267C0.777246 121.639 -20.3381 59.05 41.5995 13.7273Z"
        fill="gray"
        style={{ opacity: 1 }}
      />
      <path
        d="M164.5 0C206.75 0 241 32.9071 241 73.5C241 92.4735 233.516 109.767 221.231 122.807C229.702 119.701 238.894 118 248.5 118C290.75 118 325 150.907 325 191.5C325 232.093 290.75 265 248.5 265C219.35 265 194.008 249.335 181.096 226.289C180.993 244.933 186.849 283.756 211.626 303.5H155.626V146.51C155.584 146.505 155.542 146.5 155.5 146.495V303.5H111.5C137.1 283.1 142.5 242.333 142 224.5L141.799 223.808C128.356 244.914 104.141 259 76.5 259C34.2502 259 0 226.093 0 185.5C0 144.907 34.2502 112 76.5 112C85.5498 112 94.2323 113.511 102.29 116.282C93.2962 104.231 88 89.4602 88 73.5C88 32.9071 122.25 0 164.5 0Z"
        fill="gray"
        style={{ opacity: 0 }}
      />
      <path
        d="M163 304.75L69.4697 152.5H256.53L163 304.75ZM256.53 152.25H69.4697L163 0.75L256.53 152.25Z"
        fill="gray"
        style={{ opacity: 0 }}
      />
      <path
        d="M163.166 182.473H163.34V0.912109L306.923 147.89C325.223 172.068 346.338 231.114 284.401 273.871C248.173 298.88 217.884 284.184 196.071 259.271L205.397 304H118.12L130.022 259.327C108.24 283.954 78.1061 298.311 42.1058 273.459C-19.8316 230.702 1.2836 171.656 19.5834 147.478L163.166 0.5V182.473Z"
        fill="gray"
        style={{ opacity: 0 }}
      />
      <path
        d="M162.834 91.0496C177.38 46.5362 221.956 -31.1586 283.893 14.1638C345.831 59.4863 324.717 122.074 306.417 147.703L162.834 303.5V91.0496ZM41.5995 13.7273C103.537 -31.5953 148.114 46.1007 162.66 90.614V303.063L19.077 147.267C0.777246 121.639 -20.3381 59.05 41.5995 13.7273Z"
        fill="gray"
        style={{ opacity: 0 }}
      />
    </svg>
  );
};

export default CardSuitsMorph;
