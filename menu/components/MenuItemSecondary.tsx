import React, { useEffect, useState } from 'react';
import { Icon } from '@yamaha-admin-sb/icon';
import {IMenuItemComponent, IMenuSubItem} from '../../declarations/interfaces';
import {
  StyledIcon,
  StyledMenuItemSecondary,
  StyledMenuItemSecondaryTrigger,
  StyledMenuItemSecondaryList,
  StyledMenuItemSecondarySubItem,
  StyledIconExpand,
} from '../Menu.style';

export const MenuItemSecondary: React.VFC<IMenuItemComponent> = (
  props
): JSX.Element => {
  const {
    icon,
    title,
    subMenu = [],
    isDisabled = false,
    isActive = false,
    isCollapsed = false,
    onItemCLick,
    onSubItemCLick,
  } = props;
  const [isExpanded, seIsExpanded] = useState(false);
  const [isSubItemActive, setSubItemIsActive] = useState(false);

  useEffect(() => {
    if (!subMenu.length) return;

    setSubItemIsActive(!!subMenu.find((item) => item.isActive));
  }, [subMenu]);

  const handleCLick = () => {
    if (subMenu.length) {
      seIsExpanded(!isExpanded);
    } else onItemCLick();
  };

  const handleSubItemClick = (item: IMenuSubItem) => {
    seIsExpanded(false)
    onSubItemCLick(item)
  }

  return (
    <StyledMenuItemSecondary
      isDisabled={isDisabled}
      isCollapsed={isCollapsed}
      isActive={!subMenu.length ? isActive : isSubItemActive}
      isExpanded={isExpanded}
      isExpandable={!!subMenu.length}
    >
      <StyledMenuItemSecondaryTrigger onClick={handleCLick}>
        {!!subMenu.length ? (
          <StyledIconExpand>
            <Icon name="chevron-right" size={16} color="gray-600"/>
          </StyledIconExpand>
        ) : null}
        <StyledIcon>
          <Icon name={icon} size={24} />
        </StyledIcon>
        {title}
      </StyledMenuItemSecondaryTrigger>
      {subMenu.length ? (
        <StyledMenuItemSecondaryList isExpanded={isExpanded}>
          {subMenu.map((item, index) => (
            <StyledMenuItemSecondarySubItem
              key={index}
              isActive={item.isActive}
              onClick={handleSubItemClick.bind(null, item)}
            >
              {item.title}
            </StyledMenuItemSecondarySubItem>
          ))}
        </StyledMenuItemSecondaryList>
      ) : null}
    </StyledMenuItemSecondary>
  );
};
