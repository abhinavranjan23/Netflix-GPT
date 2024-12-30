export const scrollContainer = (ref, direction) => {
  if (!ref.current) return;
  ref.current.scrollBy({ left: direction * 300, behavior: "smooth" });
};
