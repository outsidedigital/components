import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Icon } from '@lada-b2c-sb/icon';
import { Paragraph } from '@lada-b2c-sb/paragraph';
import { colors, media } from '../../helpers';
import { useMq } from '../../hooks';
import { MediaQuery } from '@lada-b2c-sb/media-query';

export interface IHeaderIconButton {
  label: string;
  icon: string;
  path: string;
  count?: number;
  onClick?: () => void;
}

const StyledIcon = styled.div`
  margin-bottom: 4px;
  position: relative;

  svg {
    transition: 0.2s;
  }
`;

const StyledText = styled(Paragraph)`
  margin-top: 4px;
  transition: 0.2s;
`;

const StyledCount = styled.div`
  height: 16px;
  padding: 0 5px;
  min-width: 16px;
  border-radius: 8px;
  background-color: ${colors.purple200};
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  position: absolute;
  top: -16%;
  left: 50%;
`;

const StyledHeaderIconButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 16px;
  &:last-child {
    padding-rigth: 32px;
  }
  &:first-child {
    padding-rigth: 32px;
  }

  ${media.desktop} {
    min-width: 64px;
    padding: 0 12px;
    &:last-child {
      padding-rigth: 24px;
    }
    &:first-child {
      padding-rigth: 24px;
    }
  }

  &:hover {
    ${StyledText} {
      color: ${colors.brand};
    }
    ${StyledIcon} {
      svg {
        fill: ${colors.brand};
      }
    }
  }

  &:active {
    ${StyledText} {
      color: ${colors.purple400};
    }
    ${StyledIcon} {
      svg {
        fill: ${colors.purple400};
      }
    }
  }
`;

const HeaderIconButton: React.VFC<IHeaderIconButton> = (props): JSX.Element => {
  const { label, icon, path, count, onClick } = props;
  const mq = useMq();

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <StyledHeaderIconButton onClick={onClick}>
      <Link href={path}>
        <>
          <StyledIcon>
            {count ? (
              <StyledCount>{count < 100 ? count : '99+'}</StyledCount>
            ) : (
              <></>
            )}
            <Icon name={icon} size={24} color="black" />
          </StyledIcon>
          <MediaQuery media={['desktop']}>
            <StyledText size={12} color="black">
              {label}
            </StyledText>
          </MediaQuery>
        </>
      </Link>
    </StyledHeaderIconButton>
  );
};

export default HeaderIconButton;
