import React, { useEffect, useState } from 'react';
import { HiddenNavigation } from '@yamaha-admin-sb/hidden-navigation';
import { Icon } from '@yamaha-admin-sb/icon';
import { IMenuItemComponent } from '../../declarations/interfaces';
import {
  StyledMenuItemPrimary,
  StyledIcon,
  StyledMenuItemSecondarySubItem,
  StyledPrimarySelectedSubMenu,
} from '../Menu.style';

export const MenuItemPrimary: React.VFC<
  IMenuItemComponent & { isSomeSubMenuSelected: boolean; isHidden: boolean }
> = (props): JSX.Element => {
  const {
    icon,
    title,
    currentPath,
    isSomeSubMenuSelected,
    isHidden = false,
    subMenu = [],
    isDisabled = false,
    isActive = false,
    isCollapsed = false,
    isHighlight = false,
    onItemCLick,
    onSubItemCLick,
  } = props;
  const [isSubMenuSelected, setIsSubMenuSelected] = useState(false);

  useEffect(() => {
    setIsSubMenuSelected(!!subMenu.find((item) => item.path === currentPath));
  }, [currentPath, subMenu, isSomeSubMenuSelected]);

  return (
    <>
      {!isSomeSubMenuSelected || (isSubMenuSelected && !isHidden) || isActive ? (
        <>
          <HiddenNavigation
            items={subMenu}
            onSelected={onSubItemCLick}
            isDisabled={isDisabled || !subMenu.length || isSomeSubMenuSelected}
            placement="right-end"
            offset={[0, 0]}
            delayHide={50}
            delayShow={300}
            trigger="hover"
            onVisibleChange={() => ({})}
          >
            <StyledMenuItemPrimary
              isHighlight={isHighlight}
              isPassive={isSomeSubMenuSelected}
              isCollapsed={isCollapsed}
              isDisabled={isDisabled}
              isExpandable={!!subMenu.length}
              onClick={onItemCLick}
            >
              <>
                <StyledIcon>
                  <Icon name={icon} size={24} />
                </StyledIcon>
                {title}
              </>
            </StyledMenuItemPrimary>
          </HiddenNavigation>
          {isSomeSubMenuSelected && (isSubMenuSelected || isActive) ? (
            <StyledPrimarySelectedSubMenu isCollapsed={isCollapsed}>
              {subMenu.map((item, index) => (
                <StyledMenuItemSecondarySubItem
                  key={index}
                  onClick={() => onSubItemCLick(item)}
                  isActive={item.path === currentPath}
                >
                  {item.title}
                </StyledMenuItemSecondarySubItem>
              ))}
            </StyledPrimarySelectedSubMenu>
          ) : null}
        </>
      ) : null}
    </>
  );
};
