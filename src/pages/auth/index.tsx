import React, { FC, useState } from 'react';

import View from './view';

const Container: FC = (): JSX.Element => {
  const [isSignin, setIsSignin] = useState(true);

  const handleSetIsSignin = () => {
    setIsSignin(true);
  };

  const handleSetIsSignup = () => {
    setIsSignin(false);
  };

  return (
    <View
      isSignin={isSignin}
      setIsSignin={handleSetIsSignin}
      setIsSignup={handleSetIsSignup}
    />
  );
};

export default Container;
