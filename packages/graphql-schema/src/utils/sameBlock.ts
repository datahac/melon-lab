const sameBlock = (a, b) => {
  if (a !== b) {
    return a && b && a.toString() === b.toString();
  }

  return false;
};

export default sameBlock;
