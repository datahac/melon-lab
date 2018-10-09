const takeLast = stream$ =>
  new Promise((resolve, reject) => {
    stream$.take(1).subscribe(resolve, reject);
  });

export default takeLast;
