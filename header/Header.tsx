import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import HeaderTop, { IHeaderTop } from './components/HeaderTop';
import HeaderBottom, { Item } from './components/HeaderBottom';
import { colors } from '../helpers';
import {
  HeaderNavigationDesktop,
  IMenuItem,
} from './components/headerNavigation/HeaderNavigationDesktop';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import HeaderNavigationMobile from './components/headerNavigation/HeaderNavigationMobile';
import HeaderSideMenu from './components/HeaderSideMenu';
import { MediaQuery } from '@lada-b2c-sb/media-query';

export interface ITab {
  name: string;
  nameMobile: string;
  value: string;
  placeholder: string;
}

export interface ISearchHint {
  name: string;
  slug: string;
}

export interface ISearchCategory {
  title: string;
  category: string;
  slug: string;
}

export interface ISearchBrand {
  title: string;
  brand: string;
  vendor: string;
  slug: string;
}

export interface IHeader extends IHeaderTop {
  bottomMainButtons: Item[];
  bottomSideButtons: Item[];
  bottomLocation: Item;
  sideButtons: Item[];
  menu: IMenuItem[];
  catalogLink: string;
  onLogin: () => void;
  onLogout: () => void;
  onMenuClick: () => void;
  onBurgerClick: () => void;
  onInput: (arg: number | string) => void;
  onHintClick: (hint: ISearchHint | ISearchCategory | ISearchBrand) => void;
  onCategoryChange?: (tab: ITab) => void;
  onSearch: () => void;
  banner: {
    image: string;
    path: string;
  };
}

const StyledHeader = styled.div`
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;

  .menu {
    position: relative;
    z-index: 5;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .menu-enter {
    transform: translateY(-10%);
    opacity: 0;
  }
  .menu-enter-active {
    transform: translateY(0);
    transition: 0.2s ease-out;
    opacity: 1;
  }
  .menu-exit {
    transform: translateY(0);
    opacity: 1;
  }
  .menu-exit-active {
    transform: translateY(-10%);
    transition: 0.2s ease-in;
  }
  .left-menu-enter {
    transform: translateX(-100%);
  }
  .left-menu-enter-active {
    transform: translateX(0);
    transition: 0.2s ease-out;
  }
  .left-menu-exit {
    transform: translateX(0);
  }
  .left-menu-exit-active {
    transform: translateX(-100%);
    transition: 0.2s ease-in;
    opacity: 0;
  }
  .left-menu-bg-enter {
    opacity: 0;
  }
  .left-menu-bg-enter-active {
    transition: 0.2s ease-out;
    opacity: 1;
  }
  .left-menu-bg-exit {
    opacity: 1;
  }
  .left-menu-bg-exit-active {
    transition: 0.2s ease-in;
    opacity: 0;
  }
`;

const StyledSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray200};
  position: relative;
  z-index: 7;
`;

const StyledSideMenuBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  background: rgba(31, 28, 52, 0.8);
`;

const Header: React.VFC<IHeader> = (props): JSX.Element => {
  const {
    ordersCount,
    favoritesCount,
    cartCount,
    buttons,
    avatarMenuList,
    onLogin,
    onLogout,
    user,
    bottomMainButtons,
    bottomSideButtons,
    bottomLocation,
    sideButtons,
    menu,
    banner,
    catalogLink,
    onInput,
    onHintClick,
    onCategoryChange,
    onSearch,
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const escFunction = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setIsMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <StyledHeader>
      <HeaderTop
        cartCount={cartCount}
        buttons={buttons}
        avatarMenuList={avatarMenuList}
        isMenuOpen={isMenuOpen}
        user={user}
        favoritesCount={favoritesCount}
        ordersCount={ordersCount}
        onLogin={onLogin}
        onLogout={onLogout}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onBurgerClick={() => setIsSideMenuOpen(true)}
        onInput={onInput}
        onHintClick={onHintClick}
        onCategoryChange={onCategoryChange}
        onSearch={onSearch}
      />
      <MediaQuery media={['desktop', 'laptop']}>
        <>
          <StyledSeparator />
          <HeaderBottom
            location={bottomLocation}
            mainButtons={bottomMainButtons}
            sideButtons={bottomSideButtons}
          />
        </>
      </MediaQuery>
      <TransitionGroup className="menu">
        {isMenuOpen ? (
          <CSSTransition key={1} timeout={350} classNames="menu">
            <HeaderNavigationDesktop menu={menu} banner={banner} />
          </CSSTransition>
        ) : (
          <></>
        )}
        {isMenuOpen ? <HeaderNavigationMobile menu={menu} /> : <></>}
      </TransitionGroup>
      <MediaQuery media={['tablet', 'mobile']}>
        <TransitionGroup className="left-menu">
          {isSideMenuOpen ? (
            <CSSTransition key={1} timeout={200} classNames="left-menu">
              <HeaderSideMenu
                location={bottomLocation}
                buttons={sideButtons}
                catalogLink={catalogLink}
                onClose={() => setIsSideMenuOpen(false)}
              />
            </CSSTransition>
          ) : (
            <></>
          )}
          {isSideMenuOpen ? (
            <CSSTransition key={2} timeout={200} classNames="left-menu-bg">
              <StyledSideMenuBg onClick={() => setIsSideMenuOpen(false)} />
            </CSSTransition>
          ) : (
            <></>
          )}
        </TransitionGroup>
      </MediaQuery>
    </StyledHeader>
  );
};

export { Header };
