import React, { useEffect, useRef, useState } from 'react';
import {
  StyledMenu,
  StyledMainMenu,
  StyledBottomMenu,
  StyledMenuHeader,
  StyledControlRow,
  StyledBackButton,
  StyledSwitch,
  StyledLogo,
  StyledCollapseButton,
  StyledAlert,
} from './Menu.style';
import {IMenu, IMenuItem} from '../declarations/interfaces';
import { MenuItemPrimary } from './components/MenuItemPrimary';
import { MenuItemSecondary } from './components/MenuItemSecondary';
import { Logo } from '@yamaha-admin-sb/logo';
import { IconButton } from '@yamaha-admin-sb/icon-button';
import { Switch } from '@yamaha-admin-sb/switch';
import { MenuAvatar } from './components/MenuAvatar';
import { Button } from '@yamaha-admin-sb/button';

export const Menu: React.VFC<IMenu> = (props): JSX.Element => {
  const {
    user,
    logo,
    mainMenu = [],
    bottomMenu = [],
    isDarkTheme = false,
    currentPath,
    onItemCLick,
    onSubItemCLick,
    onNotificationClick,
    onThemeToggle,
    onUserMenuItemClick,
    onProfileLogout,
    onProfileEdit,
  } = props;
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isMenuPinned, setIsMenuPinned] = useState(true);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [isMainMenuItemSelected, setIsMainMenuSelected] = useState(false);
  const [currentSelectedPrimaryItem, setCurrentSelectedPrimaryItem] = useState('');
  const menuRef = useRef(null);

  const handleCollapseButtonClick = () => {
    setIsMenuPinned(!isMenuPinned);

    if (!isMenuPinned) setIsMenuCollapsed(false);
    else setIsMenuCollapsed(!isMenuCollapsed);
  };

  const handlePrimaryMenuItemClick = (item: IMenuItem) => {
    setCurrentSelectedPrimaryItem(item.path);
    setIsMainMenuSelected(true);

    if (!item.subMenu?.length) {
      onItemCLick(item);
      setIsSubMenu(false);
      return;
    }

    setIsSubMenu(true);
  }

  const handleMenuMouseOver = () => {
    if (isMenuPinned) return;
    setIsMenuCollapsed(false);
  };

  const handleMenuMouseLeave = () => {
    if (isMenuPinned) return;
    setIsMenuCollapsed(true);
  };

  useEffect(() => {
    if (menuRef && menuRef.current) {
      setTimeout(() => {
        menuRef.current.addEventListener(
          'mouseover',
          handleMenuMouseOver,
          false
        );
        menuRef.current.addEventListener(
          'mouseleave',
          handleMenuMouseLeave,
          false
        );
      }, 300);
    }

    return () => {
      if (menuRef && menuRef.current) {
        menuRef.current.removeEventListener('mouseover', handleMenuMouseOver);
        menuRef.current.removeEventListener('mouseleave', handleMenuMouseLeave);
      }
    };
  }, [isMenuPinned]);

  useEffect(() => {
    mainMenu.forEach((item) => {
      if (item.subMenu?.length) {
        item.subMenu.forEach((subItem) => {
          if (subItem.path === currentPath) {
            setIsSubMenu(true);
            setIsMainMenuSelected(true);
            setCurrentSelectedPrimaryItem(item.path)
          }
        });
      } else {
        if (item.path === currentPath) {
          setIsSubMenu(false);
          setIsMainMenuSelected(true);
          setCurrentSelectedPrimaryItem(item.path)
        }
      }
    })
  }, [mainMenu, currentPath]);

  return (
    <StyledMenu isCollapsed={isMenuCollapsed} ref={menuRef}>
      <StyledMenuHeader isCollapsed={isMenuCollapsed}>
        <StyledLogo>
          <Logo {...logo} />
        </StyledLogo>
        <StyledCollapseButton>
          <IconButton
            color="gray"
            icon={
              isMenuPinned && !isMenuCollapsed
                ? 'double-chevron-left'
                : 'double-chevron-right'
            }
            onClick={handleCollapseButtonClick}
          />
        </StyledCollapseButton>
      </StyledMenuHeader>
      <StyledMainMenu isCollapsed={isMenuCollapsed}>
        {(isMainMenuItemSelected && isSubMenu) && (
          <StyledBackButton isCollapsed={isMenuCollapsed}>
            <Button
              variant="tertiary"
              color="gray"
              icon="arrow-left"
              onClick={setIsMainMenuSelected.bind(null, false)}
            >
              Назад
            </Button>
          </StyledBackButton>
        )}
        {mainMenu.map((item, index) => (
          <MenuItemPrimary
            key={index}
            {...item}
            isSomeSubMenuSelected={isMainMenuItemSelected && isSubMenu}
            isActive={currentSelectedPrimaryItem === item.path}
            isHighlight={currentSelectedPrimaryItem === item.path && !isSubMenu}
            isHidden={currentSelectedPrimaryItem && currentSelectedPrimaryItem !== item.path}
            currentPath={currentPath}
            isCollapsed={isMenuCollapsed}
            onItemCLick={() => handlePrimaryMenuItemClick(item)}
            onSubItemCLick={onSubItemCLick}
          />
        ))}
      </StyledMainMenu>
      <StyledBottomMenu isCollapsed={isMenuCollapsed}>
        {bottomMenu.map((item, index) => (
          <MenuItemSecondary
            key={index}
            {...item}
            currentPath={currentPath}
            isActive={currentPath === item.path}
            isCollapsed={isMenuCollapsed}
            onItemCLick={() => onItemCLick(item)}
            onSubItemCLick={onSubItemCLick}
          />
        ))}
      </StyledBottomMenu>
      {/* <StyledControlRow isCollapsed={isMenuCollapsed}>
        <MenuAvatar
          isCollapsed={isMenuCollapsed}
          user={user}
          onLogout={onProfileLogout}
          onEdit={onProfileEdit}
        />
        {!isMenuCollapsed ? (
          <>
            <StyledAlert>
              <IconButton
                icon="bell"
                size="m"
                variant="tertiary"
                color="gray"
                onClick={onNotificationClick}
              />
            </StyledAlert>
            <StyledSwitch>
              <Switch
                value={isDarkTheme}
                name="theme"
                offIcon="sun"
                onIcon="moon"
                onInput={onThemeToggle}
              />
            </StyledSwitch>
          </>
        ) : null}
      </StyledControlRow> */}
    </StyledMenu>
  );
};
