import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IMenuItem } from './HeaderNavigationDesktop';
import { colors } from '../../../helpers';
import { css } from '@emotion/react';
import { CatalogComponents } from '@lada-b2c-sb/catalog-components';
import { Paragraph } from '@lada-b2c-sb/paragraph';
import Link from 'next/link';

interface IHeaderNavigationColumn {
  list?: IMenuItem[];
  isMain?: boolean;
  activeIndexes: number[];
  currentColumnIndex: number;
  onCategorySelected: (arg: IMenuItem, arg2: number) => void;
}

const StyledItem = styled.div``;

const StyledHeaderNavigationColumn = styled.div<{ isMain: boolean }>`
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar-track {
    width: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${colors.gray100};
  }

  &:not(:first-of-type) {
    padding-left: 24px;
    border-left: 1px solid ${colors.gray100};
  }

  ${StyledItem} {
    &:not(:last-of-type) {
      margin-bottom: ${({ isMain }) => (isMain ? 6 : 12)}px;
    }
  } ;
`;

const HeaderNavigationColumn: React.VFC<IHeaderNavigationColumn> = (
  props
): JSX.Element => {
  const {
    list,
    isMain = false,
    activeIndexes,
    currentColumnIndex,
    onCategorySelected,
  } = props;

  const handleItemMouseOver = (item: IMenuItem, index: number) => {
    item.children?.length && onCategorySelected(item, index);
  };

  return (
    <StyledHeaderNavigationColumn isMain={isMain}>
      {list?.map((item, index) => (
        <StyledItem key={index}>
          <Link href={item.path}>
            <CatalogComponents
              label={item.label}
              icon={item.icon}
              withoutArrow={!item.children?.length}
              isSecondary={!isMain}
              isSelected={index === activeIndexes[currentColumnIndex]}
              onMouseEnter={() => handleItemMouseOver(item, index)}
            />
          </Link>
        </StyledItem>
      ))}
    </StyledHeaderNavigationColumn>
  );
};

export default HeaderNavigationColumn;
