import React, { useState } from 'react';
import styled from '@emotion/styled';
import TreeItem, { IItem } from './components/TreeItem';

export interface ITree {
  tree: IItem[];
  onClick: (arg: IItem) => void;
}

const StyledTree = styled.div`
`;

const Tree: React.VFC<ITree> = (props): JSX.Element => {
  const { tree, onClick } = props;
  const [selectedItem, setSelectedItem] = useState<IItem | undefined>();

  const handleClick = (item: IItem) => {
    setSelectedItem(item);
    onClick(item);
  }

  return (
    <StyledTree>
      {tree.map((item, index) => (
        <TreeItem
          key={index}
          item={item}
          selectedItem={selectedItem}
          level={0}
          onClick={handleClick}
        />
      ))}
    </StyledTree>
  );
};

export { Tree };
