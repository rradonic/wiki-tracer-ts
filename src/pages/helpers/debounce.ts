export const debounce = <T>(target: (evt: T) => void, delay: number) => {
  let timer: number;

  return (evt: T) => {
    window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      target(evt);
    }, delay);
  };
};

// function wfp<T>(p: T) {
//   console.log(p);
// }

// wfp("234");
