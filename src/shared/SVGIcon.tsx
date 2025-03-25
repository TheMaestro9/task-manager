import React, { lazy, Suspense } from "react";

const SVGIcon: React.FC<{ name: string }> = ({ name }) => {
  const svgImg = (name: string) =>
    lazy(() =>
      import(`../assets/icons/${name}.svg?react`)
        .then((module) => ({ default: module.default })) // Ensure default export
        .catch((err) => {
          console.error(`Failed to load SVG: ${name}`, err);
          return { default: () => null };
        })
    ); // Fallback component }));

  const SVGComponent = svgImg(name);
  return (
    <Suspense fallback="<div>Loading</div>">
      <SVGComponent></SVGComponent>
    </Suspense>
  );
};

export default SVGIcon;
