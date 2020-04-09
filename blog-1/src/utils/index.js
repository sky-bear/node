const $to = (promise, error) =>
  promise
    .then(data => [null, data])
    .catch(err => {
      if (error) {
        Object.assign(err, error);
      }
      return [err, undefined];
    });

// let a = () => Promise.resolve(123);
// let b = () => Promise.reject(456);

// const result = async () => {
//   const res1 = await to(a());
//   const res2 = await to(b());

//   console.log(res1, res2); // [ null, 123 ] [ 456, undefined ]
// };

// result();

module.exports = {
  $to
};
