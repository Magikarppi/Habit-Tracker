import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const ContainerDiv = styled.div``;

const Loader = () => {
  const spinnerStyles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  });

  return (
    <ContainerDiv>
      <animated.div style={{ borde }} />
    </ContainerDiv>
  );
};
