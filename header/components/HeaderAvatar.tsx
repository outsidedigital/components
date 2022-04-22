import React, { useState } from 'react';
import styled from '@emotion/styled';
import HeaderIconButton from './HeaderIconButton';
import { UserProfile } from '@lada-b2c-sb/user-profile';
import { colors } from '../../helpers';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TextButton } from '@lada-b2c-sb/text-button';
import Link from 'next/link';
import ClickAwayListener from 'react-click-away-listener';

interface IHeaderAvatar {
  menuList: {
    label: string;
    path: string;
  }[];
  user?: {
    image: string;
    name: string;
  };
  onLogin: () => void;
  onLogout: () => void;
}

const StyledHeaderAvatar = styled.div`
  position: relative;
  cursor: pointer;

  .list-enter {
    transform: translate(-50%, 10%);
    opacity: 0;
  }
  .list-enter-active {
    transform: translate(-50%, 0);
    transition: 0.2s ease-out;
    opacity: 1;
  }
  .list-exit {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  .list-exit-active {
    transform: translate(-50%, 10%);
    transition: 0.2s ease-in;
    opacity: 0;
  }
`;

const StyledTextButton = styled(TextButton)`
  justify-content: flex-start;
  width: max-content;
`;

const StyledList = styled.div`
  background-color: ${colors.white};
  box-shadow: var(--shadow-small);
  border-radius: var(--corner-24);
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transition: 0.2s;
  transform: translateX(-50%);
  white-space: nowrap;
  text-align: left;
`;

const StyledLogoutButton = styled.button`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: ${colors.gray300};
  transition: 0.2s;
  width: max-content;

  &:hover,
  &:active {
    color: ${colors.red200};
  }
`;

const HeaderAvatar: React.VFC<IHeaderAvatar> = (props): JSX.Element => {
  const { user, menuList, onLogin, onLogout } = props;
  const [isListShow, setIsListShow] = useState(false);

  return (
    <StyledHeaderAvatar>
      {!user ? (
        <HeaderIconButton
          label="Войти"
          path="/profile"
          icon="profile"
          onClick={onLogin}
        />
      ) : (
        <UserProfile
          name={user.name}
          image={user.image}
          size="s"
          isDisabled={true}
          onClick={() => setIsListShow(!isListShow)}
        />
      )}

      <TransitionGroup className="tabs-slide">
        {isListShow ? (
          <CSSTransition key={1} timeout={350} classNames="list">
            <ClickAwayListener onClickAway={() => setIsListShow(false)}>
              <StyledList>
                {menuList.map((item, index) => (
                  <Link key={index} href={item.path}>
                    <StyledTextButton size="m" color="black">
                      {item.label}
                    </StyledTextButton>
                  </Link>
                ))}
                <StyledLogoutButton onClick={onLogout}>
                  Выйти
                </StyledLogoutButton>
              </StyledList>
            </ClickAwayListener>
          </CSSTransition>
        ) : (
          <></>
        )}
      </TransitionGroup>
    </StyledHeaderAvatar>
  );
};

export default HeaderAvatar;
