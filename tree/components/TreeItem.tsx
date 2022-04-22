import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@lada-b2c-sb/icon-button';
import { Icon } from '@lada-b2c-sb/icon';
import { css } from '@emotion/react';
import { Paragraph } from '@lada-b2c-sb/paragraph';
import { colors } from '../../helpers';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useMq } from '../hooks';

export interface ITreeItem {
  item: IItem;
  level: number;
  selectedItem?: IItem;
  onClick: (arg: IItem) => void;
  onToggle?: () => void;
}

export interface IItem {
  label: string;
  slug: string;
  children?: IItem[];
}

const StyledTreeItem = styled.div`
  .item-expand-enter {
    transition: 0.2s ease-out;
    opacity: 0;
  }
  .item-expand-enter-active {
    opacity: 1;
    //padding: ;
  }
  .item-expand-exit {
    opacity: 1;
    //padding: ;
  }
  .item-expand-exit-active {
    opacity: 0;
    //padding: 0;
    transition: 0.2s ease-in;
  }
`;

const StyledText = styled.div<{
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  hasChildren: boolean;
}>`
  font-size: ${({ level }) => (level === 0 ? 16 : 14)}px;
  line-height: ${({ level }) => (level === 0 ? 18 : 20)}px;
  font-weight: ${({ hasChildren, level }) =>
    level === 0 || hasChildren ? 700 : 400};
  transition: 0.2s;
  color: ${({ isExpanded, isSelected, hasChildren }) =>
    !isExpanded && !isSelected
      ? colors.black
      : hasChildren
      ? colors.brand
      : colors.purple200};
`;

const StyledTop = styled.div<{ level: number; hasChildren: boolean }>`
  display: flex;
  align-items: center;
  border-bottom: ${({ level }) =>
    level === 0 ? `1px solid ${colors.gray100}` : 'none'};
  cursor: pointer;

  &:hover {
    ${StyledText} {
      color: ${({ hasChildren }) =>
        hasChildren ? colors.brand : colors.purple200};
    }
  }

  ${({ level }) =>
    level === 0
      ? css`
          padding: 16px 24px;
        `
      : css`
          padding: 8px 24px 8px ${28 + level * 28}px;
        `};
`;

const StyledIcon = styled.div<{ isRoot: boolean }>`
  margin-right: ${({ isRoot }) => (isRoot ? 16 : 12)}px;
`;

const StyledItems = styled.div`
  opacity: 1;
  transition: 0.2s;
`;

const StyledCount = styled.div<{ isRoot: boolean }>`
  margin-left: auto;
  margin-right: 6px;

  ${({ isRoot }) =>
    isRoot &&
    css`
      margin-right: 0;
      padding: 3px 6px;
      background-color: ${colors.gray200};
      border-radius: 4px;
    `};
`;

const TreeItem: React.VFC<ITreeItem> = (props): JSX.Element => {
  const { item, level, selectedItem, onClick, onToggle } = props;
  const itemsRef = useRef<HTMLDivElement>(null);
  const isRoot = level === 0;
  const isSelected = selectedItem === item;
  const hasChildren = !!item?.children?.length;
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(0);

  const mq = useMq();
  const touchDevice = useMemo(() => mq === 'mobile' || mq === 'tablet', [mq]);

  const handleExpand = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    touchDevice && e?.stopPropagation();
    hasChildren && setIsExpanded(!isExpanded);
  };
  const handleSelect = () => {
    handleExpand();
    (!hasChildren || !isExpanded) && onClick(item);
  };

  const handleChildExpanded = () => {
    setCurrentHeight(itemsRef?.current?.clientHeight || 0);
    if (onToggle) onToggle();
  };

  useEffect(() => {
    if (onToggle) onToggle();
  }, [isExpanded]);

  return (
    <StyledTreeItem>
      <StyledTop level={level} hasChildren={hasChildren} onClick={handleSelect}>
        {hasChildren && (
          <StyledIcon isRoot={isRoot} onClick={handleExpand}>
            {isRoot ? (
              <IconButton
                icon={isExpanded ? 'minus' : 'plus'}
                variant={isExpanded ? 'primary' : 'secondary'}
                color="blue"
                size="m"
              />
            ) : (
              <Icon
                name={isExpanded ? 'minus' : 'plus'}
                color="brand"
                size={16}
              />
            )}
          </StyledIcon>
        )}
        <StyledText
          level={level}
          isExpanded={isExpanded}
          isSelected={isSelected}
          hasChildren={hasChildren}
        >
          {item.label}
        </StyledText>
        {hasChildren ? (
          <StyledCount isRoot={isRoot}>
            <Paragraph
              size={14}
              weight={700}
              color={isRoot ? 'white' : 'gray-200'}
            >
              {item?.children?.length || 0}
            </Paragraph>
          </StyledCount>
        ) : (
          <></>
        )}
      </StyledTop>
      <TransitionGroup className="item-expand">
        {isExpanded ? (
          <CSSTransition key={1} timeout={100} classNames="item-expand">
            <StyledItems>
              {item.children?.map((subItem, index) => (
                <TreeItem
                  key={index}
                  item={subItem}
                  selectedItem={selectedItem}
                  level={level + 1}
                  onClick={onClick}
                  onToggle={handleChildExpanded}
                />
              ))}
            </StyledItems>
          </CSSTransition>
        ) : (
          <></>
        )}
      </TransitionGroup>
    </StyledTreeItem>
  );
};

export default TreeItem;
