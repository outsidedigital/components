import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Container } from '../../../components';
import Link from "next/link";
import HeaderNavigationColumn from './HeaderNavigationColumn';
import { media } from '../../../helpers';

export interface IHeaderNavigationDesktop {
  menu: IMenuItem[];
  banner: {
    image: string;
    path: string;
  };
}

export interface IMenuItem {
  label: string;
  path: string;
  icon?: string;
  children?: IMenuItem[];
}

const StyledHeaderNavigationDesktop = styled.div`
  flex: 1;
  overflow: hidden;
  min-height: 724px;
  grid-template-columns: 336px 297px 297px 304px;
  gap: 4px;
  transform: translateY(0);
  padding: 16px 0 36px;
  display: none;

  ${media.desktop} {
    display: grid;
  }
`;

const StyledContainer = styled(Container)`
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const StyledBanner = styled.div<{ image: string }>`
  position: absolute;
  right: 0;
  top: 16px;
  height: 672px;
  width: 304px;
  background: url("${({ image }) => image}") no-repeat;
  background-size: contain;
  cursor: pointer;
`;

const HeaderNavigationDesktop: React.VFC<IHeaderNavigationDesktop> = (
  props
): JSX.Element => {
  const { menu, banner } = props;
  const [columnsToRender, setColumnsToRender] = useState<IMenuItem[][]>([menu]);
  const [activeColumnsItemIndexes, setActiveColumnsItemIndexes] = useState<
    number[]
  >([]);

  const handleColumnItemClick = (
    item: IMenuItem,
    columnIndex: number,
    rowIndex: number
  ) => {
    if (!item.children?.length) return;

    let newColumnsArray = [...columnsToRender];
    let newIndexesArray = [...activeColumnsItemIndexes];

    if (newColumnsArray[columnIndex + 1]) {
      newColumnsArray[columnIndex + 1] = item.children;
      newColumnsArray = newColumnsArray.slice(0, columnIndex + 2);
    } else newColumnsArray.push(item.children);

    if (typeof newIndexesArray[columnIndex] !== 'undefined') {
      newIndexesArray[columnIndex] = rowIndex;
      newIndexesArray = newIndexesArray.slice(0, columnIndex + 1);
    } else newIndexesArray.push(rowIndex);

    setColumnsToRender(newColumnsArray);
    setActiveColumnsItemIndexes(newIndexesArray);
  };

  return (
    <StyledContainer>
      <StyledHeaderNavigationDesktop>
        {columnsToRender.map((column, index) => (
          <HeaderNavigationColumn
            key={index}
            list={column}
            isMain={index === 0}
            activeIndexes={activeColumnsItemIndexes}
            currentColumnIndex={index}
            onCategorySelected={(item, itemIndex) =>
              handleColumnItemClick(item, index, itemIndex)
            }
          />
        ))}
        {columnsToRender.length < 4 ? (
          <Link href={banner.path}>
            <StyledBanner image={banner.image} />
          </Link>
        ) : (
          <></>
        )}
      </StyledHeaderNavigationDesktop>
    </StyledContainer>
  );
};

export { HeaderNavigationDesktop };
