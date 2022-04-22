import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Container } from '../../components';
import { TextButton } from '@lada-b2c-sb/text-button';
import { useMq } from '../../hooks';
import { colors } from '../../helpers';

interface IHeaderBottom {
  location: Item;
  mainButtons: Item[];
  sideButtons: Item[];
}

export type Item = {
  path: string;
  label: string;
  icon?: string;
  color: 'black' | 'blue' | 'gray' | 'red' | 'yellow';
  weight: number;
};

const StyledHeaderBottom = styled.div`
  padding: 12px 0;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 6;
  background-color: ${colors.white};
`;

const StyledMainButtons = styled.div`
  margin-left: 70px;
  display: flex;
  align-items: center;
`;

const StyledSideButtons = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const StyledButton = styled.div`
  white-space: nowrap;

  &:not(:last-of-type) {
    margin-right: 24px;
  }
`;

const HeaderBottom: React.VFC<IHeaderBottom> = (props): JSX.Element => {
  const { location, mainButtons, sideButtons } = props;
  const mq = useMq();
  const prepareMainButtons =
    mq === 'desktop' ? mainButtons : mainButtons.slice(0, 5);

  return (
    <Container>
      <StyledHeaderBottom>
        <Link href={location.path}>
          <TextButton
            size="l"
            color={location.color}
            iconLeft={location.icon}
            weight={location.weight}
          >
            {location.label}
          </TextButton>
        </Link>
        <StyledMainButtons>
          {prepareMainButtons.map((button, index) => (
            <StyledButton key={index}>
              <Link href={button.path}>
                <TextButton
                  size="s"
                  color={button.color}
                  iconLeft={button.icon}
                  weight={button.weight}
                >
                  {button.label}
                </TextButton>
              </Link>
            </StyledButton>
          ))}
        </StyledMainButtons>
        <StyledSideButtons>
          {sideButtons.map((button, index) => (
            <StyledButton key={index}>
              <Link href={button.path}>
                <TextButton
                  size="s"
                  color={button.color}
                  iconLeft={button.icon}
                  weight={button.weight}
                >
                  {button.label}
                </TextButton>
              </Link>
            </StyledButton>
          ))}
        </StyledSideButtons>
      </StyledHeaderBottom>
    </Container>
  );
};

export default HeaderBottom;
