import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { Item } from './HeaderBottom';
import { colors, media } from '../../helpers';
import Link from 'next/link';
import { Icon } from '@lada-b2c-sb/icon';
import { Paragraph } from '@lada-b2c-sb/paragraph';
import bg from '../../../../../apps/lada-b2c-sb/src/assets/images/catalog-button-bg.jpg';
import { TextButton } from '@lada-b2c-sb/text-button';

interface IHeaderSideMenu {
  location: Item;
  buttons: Item[];
  catalogLink: string;
  onClose: () => void;
}

const StyledHeaderSideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  transform: none;
  padding: 16px 24px;
  width: 238px;
  height: 100%;
  background-color: ${colors.white};
  opacity: 1;

  ${media.tablet} {
    padding: 24px 48px 24px 68px;
    width: 396px;
  }
`;

const StyledCatalogButton = styled.button<{ bg: string }>`
  border-radius: 24px;
  overflow-y: hidden;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.gray100}
    url('data:image/jpeg;base64,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')
    no-repeat;
  background-size: 102% 102%;
  width: 100%;
  background-position: -1px -1px;
`;

const HeaderSideMenu: React.VFC<IHeaderSideMenu> = (props): JSX.Element => {
  const { location, buttons, catalogLink, onClose } = props;

  return (
    <StyledHeaderSideMenu>
      <div className="space-32" onClick={onClose}>
        <Icon name="cross" color="gray-300" size={24} />
      </div>
      <div className="space-24">
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
      </div>
      <div className="space-32">
        <Link href={catalogLink}>
          <StyledCatalogButton bg={bg}>
            <Paragraph size={16} weight={500} color="black">
              Каталог
            </Paragraph>
            <Icon name="arrow-right" size={16} color="black" />{' '}
          </StyledCatalogButton>
        </Link>
      </div>
      {buttons.map((button, index) => (
        <div className="space-24" key={index}>
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
        </div>
      ))}
    </StyledHeaderSideMenu>
  );
};

export default HeaderSideMenu;
