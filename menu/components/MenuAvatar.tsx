import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  HiddenNavigation,
  IHiddenNavigationItem,
} from '@yamaha-admin-sb/hidden-navigation';
import { Icon } from '@yamaha-admin-sb/icon';
import { css } from '@emotion/react';

interface IMenuAvatar {
  user: {
    avatar: string;
    id: number;
  };
  size: 40 | 48;
  isCollapsed: boolean;
  onLogout: () => void;
  onEdit: () => void;
}

const StyledAvatarWrapper = styled.div<{size: number}>`
  ${({size}) => css`
    width: ${size}px;
    height: ${size}px;
  `}
  border-radius: 50%;
  overflow: hidden;
`;

const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledIcon = styled.div<{ isExpanded: boolean }>`
  margin-left: 8px;
  transition: 0.4s;

  svg {
    transition: 0.4s;
    ${({ isExpanded }) =>
      isExpanded &&
      css`
        transform: rotate(180deg);
      `}
  }
`;

const StyledMenuAvatar = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ isCollapsed }) => isCollapsed && css`
    ${StyledIcon} {
      opacity: 0;
      width: 0;
      margin: 0;
    }
  `}

  &:hover {
    ${StyledIcon} {
      svg {
        fill: ${({ theme }) => theme.color['gray-600']};
      }
    }
  }
`;

export const MenuAvatar: React.VFC<IMenuAvatar> = (props): JSX.Element => {
  const { user, onEdit, onLogout, isCollapsed = false, size } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const menu: IHiddenNavigationItem[] = [
    {
      title: 'Редактировать профиль',
      icon: 'edit',
      value: 'edit',
    },
    {
      title: 'Выйти',
      icon: 'logout',
      type: "gray",
      value: 'logout',
    },
  ];

  const handleAvatarClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuItemClick = (item: IHiddenNavigationItem) => {
    if (item.value === 'logout') onLogout();
    else onEdit();
  };

  return (
    <div onClick={handleAvatarClick}>
      <HiddenNavigation
        items={menu}
        trigger="click"
        placement="top-end"
        offset={[55, 10]}
        onSelected={(item) => handleMenuItemClick(item)}
        onVisibleChange={(value) => setIsExpanded(value)}
      >
        <StyledMenuAvatar isCollapsed={isCollapsed}>
          <StyledAvatarWrapper size={size}>
            <StyledAvatar src={user.avatar} alt="Аватар пользователя" />
          </StyledAvatarWrapper>
          <StyledIcon isExpanded={isExpanded}>
            <Icon name="chevron-down" size={24} color="gray-700" />
          </StyledIcon>
        </StyledMenuAvatar>
      </HiddenNavigation>
    </div>
  );
};
