import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Logo } from '@lada-b2c-sb/logo';
import { Button } from '@lada-b2c-sb/button';
import { SearchBig } from '@lada-b2c-sb/search-big';
import HeaderIconButton, { IHeaderIconButton } from './HeaderIconButton';
import { Container } from '../../components';
import { colors, media, mediaRevers } from '../../helpers';
import { useMq } from '../../hooks';
import HeaderBurger from './HeaderBurger';
import HeaderAvatar from './HeaderAvatar';
import { ISearchBrand, ISearchCategory, ISearchHint, ITab } from '../Header';
import { MediaQuery } from '@lada-b2c-sb/media-query';
import { IconButton } from '@lada-b2c-sb/icon-button';

export interface IHeaderTop {
  ordersCount?: number;
  favoritesCount?: number;
  cartCount: number;
  buttons: IHeaderIconButton[];
  avatarMenuList: IAvatarMenuList[];
  isMenuOpen: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onMenuClick: () => void;
  onBurgerClick: () => void;
  onInput: (arg: number | string) => void;
  onHintClick: (hint: ISearchHint | ISearchCategory | ISearchBrand) => void;
  onCategoryChange?: (tab: ITab) => void;
  onSearch: () => void;
  user?: {
    image: string;
    name: string;
  };
}

export interface IAvatarMenuList {
  label: string;
  path: string;
}

const StyledHeaderTop = styled.div`
  padding: 4px 0 12px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  z-index: 10;
  background-color: ${colors.white};

  ${media.tablet} {
    flex-direction: row;
    align-items: center;
    padding: 12px 0;
  }
  ${media.laptop} {
    padding: 16px 0;
  }
`;

const StyledLogo = styled.div`
  margin-right: 32px;
`;

const StyledSearch = styled.div`
  width: 100%;

  ${media.laptop} {
    width: 472px;
    min-width: 471px;
  }
  ${media.desktop} {
    width: 647px;
    min-width: 647px;
  }
`;

const StyledButton = styled.div`
  margin-right: 16px;
  max-width: 109px;
  button {
    padding: 14px 16px;
  }
`;

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;

  ${mediaRevers.tablet} {
    margin-bottom: 16px;
  }
`;

const StyledAvatarWrapper = styled(MediaQuery)`
  align-items: center;
  flex: 1;
`;

const searchTabs = [
  {
    name: 'Детали',
    value: 'parts',
    nameMobile: 'деталям',
    placeholder: 'Поиск по названию, артикулу, бренду',
  },
  {
    name: 'VIN',
    nameMobile: 'VIN',
    value: 'vin',
    placeholder: 'Поиск по VIN-номеру',
  },
];

const HeaderTop: React.VFC<IHeaderTop> = (props): JSX.Element => {
  const {
    user,
    buttons,
    avatarMenuList,
    isMenuOpen,
    onLogin,
    onLogout,
    onMenuClick,
    onBurgerClick,
    onInput,
    onHintClick,
    onCategoryChange,
    onSearch,
  } = props;
  const mq = useMq();
  const [searchValue, setSearchValue] = useState<string | number>('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    onInput(searchValue);
  }, [searchValue]);

  return (
    <Container>
      <StyledHeaderTop>
        {!isSearchActive ? (
          <StyledLogoWrapper>
            <MediaQuery media={['tablet', 'mobile']}>
              <HeaderBurger isActive={false} onClick={onBurgerClick} />
            </MediaQuery>
            <StyledLogo>
              <Link href="/">
                <Logo />
              </Link>
            </StyledLogo>
          </StyledLogoWrapper>
        ) : (
          <></>
        )}
        <MediaQuery media={['desktop', 'laptop']}>
          <StyledButton>
            <Button
              variant="primary"
              color="brand"
              iconLeft={isMenuOpen ? 'cross' : 'menu'}
              size="l"
              onClick={onMenuClick}
            >
              Каталог
            </Button>
          </StyledButton>
        </MediaQuery>
        <StyledSearch>
          <SearchBig
            tabs={searchTabs}
            value={searchValue}
            onHintClick={onHintClick}
            onCategoryChange={onCategoryChange}
            onSearchClick={onSearch}
            onInput={setSearchValue}
            onFocus={() => mq === 'mobile' && setIsSearchActive(true)}
            onBack={() => mq === 'mobile' && setIsSearchActive(false)}
          />
        </StyledSearch>
        <StyledAvatarWrapper media={['desktop', 'laptop']} display="flex">
          <>
            <StyledButtons>
              {buttons.map((button, index) => (
                <HeaderIconButton key={index} {...button} />
              ))}
            </StyledButtons>
            <HeaderAvatar
              user={user}
              menuList={avatarMenuList}
              onLogin={onLogin}
              onLogout={onLogout}
            />
          </>
        </StyledAvatarWrapper>
      </StyledHeaderTop>
    </Container>
  );
};

export default HeaderTop;
