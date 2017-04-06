export const makeService = (time) => {
  return (data) => {
    // console.log(`${data} start`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
        // console.log(`${data} end`);
      }, time);
    });
  };
};
