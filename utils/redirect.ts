import Router from 'next/router';

export default (context, target) => {
  if (!process.browser) {
    // server
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replace({ pathname: target });
  }
};
