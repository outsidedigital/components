import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IMenuItem } from './HeaderNavigationDesktop';
import HeaderNavigationColumnMobile from './HeaderNavigationColumnMobile';
import { Container } from '../../../components';

interface IHeaderNavigationMobile {
  menu: IMenuItem[];
}

const StyledHeaderNavigationMobile = styled.div`
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;

const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;

const HeaderNavigationMobile: React.VFC<IHeaderNavigationMobile> = (
  props
): JSX.Element => {
  const { menu } = props;
  const [menuStack, setMenuStack] = useState<IMenuItem[]>([]);

  const handleItemSelect = (item: IMenuItem) => {
    setMenuStack(prevState => ([
      ...prevState,
      item
    ]))
  }

  const handleBack = () => {
    const newArr = [...menuStack];
    newArr.pop();
    setMenuStack(newArr);
  }

  return (
    <StyledHeaderNavigationMobile>
      <StyledContainer>
        <HeaderNavigationColumnMobile
          list={menuStack[menuStack.length - 1]?.children || menu}
          parentItem={menuStack[menuStack.length - 1]}
          onCategorySelected={handleItemSelect}
          onBack={handleBack}
        />
      </StyledContainer>
    </StyledHeaderNavigationMobile>
  );
};

export default HeaderNavigationMobile;
