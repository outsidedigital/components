import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../helpers';

interface IHeaderBurger {
  isActive: boolean;
  onClick: () => void;
}

const StyledHeaderBurger = styled.div`
  position: relative;
  width: 18px;
  height: 15px;
  cursor: pointer;
  z-index: 1;
  margin-right: 24px;
`;

const StyledLine = styled.div<{ isActive: boolean }>`
  pointer-events: none;
  display: block;
  width: 18px;
  height: 2px;
  border-radius: 1px;
  position: relative;
  background: ${colors.black};
  z-index: 1;
  transform-origin: 4px 0px;

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

  &:first-of-type {
    transform-origin: 0% 0%;
  }
  &:not(:last-of-type) {
    margin-bottom: 4px;
  }

  &:not(:first-of-type):not(:last-of-type) {
    transform-origin: 0% 100%;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1;
      transform: rotate(-45deg) translate(1px, -1px);
      transform-origin: 3px 0px;

      &:first-of-type {
        transform: rotate(45deg) translate(0px, 0px);
        transform-origin: 0px 3px;
      }

      &:not(:first-of-type):not(:last-of-type) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
    `};
  }
`;

const HeaderBurger: React.VFC<IHeaderBurger> = (props): JSX.Element => {
  const { isActive, onClick } = props;
  return (
    <StyledHeaderBurger onClick={onClick}>
      <StyledLine isActive={isActive} />
      <StyledLine isActive={isActive} />
      <StyledLine isActive={isActive} />
    </StyledHeaderBurger>
  );
};

export default HeaderBurger;
