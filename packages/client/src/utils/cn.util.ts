const cn = (...classNames: (string | boolean | undefined)[]): string => {
  const filteredClassNames = classNames.filter((className) => className);
  return filteredClassNames.join(' ');
};

export default cn;
