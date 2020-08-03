export const heroVariants = {
  hidden: {
    // y: "-100vw",
    opacity: 0,
  },
  visible: {
    // y: 0,
    opacity: 1,
    // transition: { type: "spring", stiffness: 50 },
  },
  exit: {
    opacity: 0,
  },
};

export const svgVariants = {
  initial : {
    x:-300,
    opacity:0
  },
  visible: {
    x:0,
    opacity: 1,
    transition: {duration:1.5}
  }
}
