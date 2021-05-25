const flexbox = (direction = 'row', justify = 'center', align = 'center') => {
  return `
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  `;
};

const theme = {
  white: '#FFFFFF',
  flexbox,
};

export default theme;
