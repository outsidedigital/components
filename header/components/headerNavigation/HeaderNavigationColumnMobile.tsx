import React from 'react';
import styled from '@emotion/styled';
import { IMenuItem } from './HeaderNavigationDesktop';
import { colors, media } from '../../../helpers';
import Link from 'next/link';
import { Paragraph } from '@lada-b2c-sb/paragraph';
import { Icon } from '@lada-b2c-sb/icon';

interface IHeaderNavigationColumnMobile {
  parentItem: IMenuItem;
  list?: IMenuItem[];
  onCategorySelected: (arg: IMenuItem, arg2: number) => void;
  onBack: () => void;
}

const StyledHeaderNavigationColumnMobile = styled.div`
  overflow-y: auto;
  padding: 12px 0;

  ${media.desktop} {
    display: none;
  }
`;

const StyledItem = styled.div`
  border-top: 1px solid ${colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const StyledTopItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`;

const StyledBack = styled.div`
  margin-right: 12px;
`;

const HeaderNavigationColumnMobile: React.VFC<IHeaderNavigationColumnMobile> = (
  props
): JSX.Element => {
  const { list, parentItem, onCategorySelected, onBack } = props;

  const handleItemClick = (item: IMenuItem, index: number) => {
    item.children?.length && onCategorySelected(item, index);
  };

  const renderItem = (item: IMenuItem, key: number) => (
    <StyledItem
      key={key}
      onClick={() => item.children?.length && handleItemClick(item, key)}
    >
      <Paragraph size={16} weight={500} color="black">
        {item.label}
      </Paragraph>
      {item.children?.length ? (
        <Icon name="chevron-right" color="gray-300" size={24} />
      ) : (
        <></>
      )}
    </StyledItem>
  );

  return (
    <StyledHeaderNavigationColumnMobile>
      {parentItem ? (
        <StyledTopItem onClick={onBack}>
          <StyledBack>
            <Icon name="arrow-left" color="black" />
          </StyledBack>
          <Paragraph size={16} weight={700} color="black">
            {parentItem.label}
          </Paragraph>
        </StyledTopItem>
      ) : (
        <></>
      )}
      {list?.map((item, index) =>
        item.children?.length ? (
          renderItem(item, index)
        ) : (
          <Link href={item.path}>{renderItem(item, index)}</Link>
        )
      )}
    </StyledHeaderNavigationColumnMobile>
  );
};

export default HeaderNavigationColumnMobile;
