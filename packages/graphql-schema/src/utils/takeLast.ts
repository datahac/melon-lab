import { take } from 'rxjs/operators';

const takeLast = stream$ =>
  new Promise((resolve, reject) => {
    stream$.pipe(take(1)).subscribe(resolve, reject);
  });

export default takeLast;
