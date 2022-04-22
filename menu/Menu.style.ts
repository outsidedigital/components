import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IMenuItem, IStyledMenuItem } from '../declarations/interfaces';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 12px 40px;
  background-color: ${({ theme }) => theme.color['neutral-white']};
  z-index: 1000;
`;

export const StyledMenu = styled.div<{ isCollapsed: boolean }>`
  position: sticky;
  top: 0;
  width: ${({ isCollapsed }) => (isCollapsed ? '64' : '268')}px;
  transition: 0.4s;
  background-color: ${({ theme }) => theme.color['neutral-white']};
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const WithSeparator = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color['gray-300']};
`;

export const StyledIcon = styled.div`
  margin-right: 12px;
`;

export const StyledBackButton = styled.div<{ isCollapsed: boolean }>`
  margin: ${({ isCollapsed }) =>
    isCollapsed ? '16px 7px' : '16px 0 16px 16px'};
  transition: 0.4s;

  ${({ isCollapsed }) =>
    isCollapsed &&
    css`
      button {
        color: transparent;
      }
    `}
`;

export const StyledPrimarySelectedSubMenu = styled.div<{
  isCollapsed: boolean;
}>`
  margin-top: 2px;
  padding-left: 32px;
  transition: 0.4s;

  ${({ isCollapsed }) =>
    isCollapsed &&
    css`
      opacity: 0;
    `}
`;

export const StyledIconExpand = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.4s;
  width: 16px;
  overflow: hidden;
`;

export const StyledCollapseButton = styled.div`
  margin-left: auto;
`;

export const StyledLogo = styled.div`
  position: absolute;
  left: 40px;
  top: 50%;
  transition: 0.2s;
  transform: translateY(-50%);
`;

export const StyledMenuHeader = styled.div<{ isCollapsed: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ isCollapsed }) =>
    isCollapsed ? '16px' : '16px 8px 16px 40px'};

  ${({ isCollapsed }) =>
    isCollapsed &&
    css`
      ${StyledLogo} {
        opacity: 0;
        width: 0;
        margin: 0;
      }
    `}
`;

export const StyledMainMenu = styled(WithSeparator)<{ isCollapsed: boolean }>`
  max-height: 505px;
  flex: 1;
  overflow: auto;
  padding: ${({ isCollapsed }) => (isCollapsed ? '0 4px' : '0 12px')};
`;

export const StyledBottomMenu = styled(WithSeparator)<{ isCollapsed: boolean }>`
  max-height: 178px;
  overflow: auto;
  margin-top: auto;
  padding: ${({ isCollapsed }) => (isCollapsed ? '0 4px' : '0 12px')};
`;

export const StyledControlRow = styled(WithSeparator)<{ isCollapsed: boolean }>`
  height: 96px;
  display: flex;
  align-items: center;
  transition: 0.4s;
  padding: ${({ isCollapsed }) => (isCollapsed ? '24px 8px' : '24px 28px')};
`;

export const StyledSwitch = styled.div`
  margin-left: 16px;
`;

export const StyledAlert = styled.div`
  margin-left: auto;
`;

export const StyledMenuItemSecondaryList = styled.div<{ isExpanded: boolean }>`
  padding-left: 64px;
  height: 0;
  opacity: 0;
  transition: 0.4s;
  overflow: hidden;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      height: max-content;
      opacity: 1;
    `}
`;

export const StyledMenuItemSecondarySubItem = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  margin: 6px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color['gray-600']};
  transition: 0.4s;
  white-space: nowrap;

  ${({ isActive, theme }) =>
    !isActive
      ? css`
          &:hover {
            color: ${theme.color['blue-300']};
          }

          &:active {
            color: ${theme.color['blue-400']};
          }
        `
      : css`
          color: ${theme.color['blue-400']};
        `}
`;

export const StyledMenuItem = styled.div<
  Partial<Pick<IStyledMenuItem, 'isDisabled' | 'isCollapsed'>>
>`
  margin: 4px 0;
  display: flex;
  align-items: center;
  height: 48px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  transition: 0.4s;
  width: 100%;
  border-radius: var(--border-radius-8);
  background-color: ${({ theme }) => theme.color['neutral-white']};
  padding: 0 28px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  svg {
    transition: 0.4s;
  }

  ${({ isDisabled, isCollapsed, theme }) =>
    isDisabled &&
    css`
      cursor: not-allowed;
      color: ${isCollapsed ? 'transparent' : theme.color['gray-400']};

      svg {
        filter: grayscale(1);
        fill: ${theme.color['gray-400']};
      }
    `}

  ${({ isCollapsed }) =>
    isCollapsed &&
    css`
      color: transparent;
      padding: 12px 16px;
    `}
`;

export const StyledMenuItemPrimary = styled(StyledMenuItem)<
  Pick<IStyledMenuItem, 'isExpandable'> & {
    isPassive: boolean;
    isHighlight: boolean;
  }
>`
  ${({ isDisabled, theme }) =>
    !isDisabled &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${theme.color['blue-100']};
      }

      &:active {
        background-color: ${theme.color['blue-200']};
      }
    `};
  ${({ isPassive, theme }) =>
    isPassive &&
    css`
      cursor: default;

      &:hover {
        background-color: ${theme.color['neutral-white']};
      }

      &:active {
        background-color: ${theme.color['neutral-white']};
      }
    `};
  ${({ isHighlight, theme }) =>
    isHighlight &&
    css`
      background-color: ${theme.color['blue-100']};

      ${StyledIconExpand} {
        svg {
          fill: ${theme.color['gray-700']};
        }
      }
    `};
`;

export const StyledMenuItemSecondaryTrigger = styled(StyledMenuItem)`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledMenuItemSecondary = styled.div<
  Required<Pick<IMenuItem, 'isDisabled' | 'isActive'>> & {
    isExpanded: boolean;
    isExpandable: boolean;
    isCollapsed: boolean;
  }
>`
  ${({ isCollapsed }) =>
    css`
      ${StyledMenuItemSecondaryTrigger} {
        padding: ${isCollapsed ? '12px 16px' : '0 28px'};
      }
    `}

  ${({ isDisabled, isActive, isCollapsed, theme }) =>
    !isDisabled &&
    css`
      ${StyledMenuItemSecondaryTrigger} {
        cursor: pointer;
        color: ${isCollapsed ? 'transparent' : theme.color['gray-700']};

        &:hover,
        &:active {
          background-color: ${theme.color['blue-100']};

          ${StyledIconExpand} {
            svg {
              fill: ${theme.color['gray-700']};
            }
          }
        }

        &:active {
          color: ${isCollapsed ? 'transparent' : theme.color['blue-400']};

          svg {
            fill: ${theme.color['blue-400']};
          }
        }
      }

      ${isActive &&
      css`
        ${StyledMenuItemSecondaryTrigger} {
          color: ${isCollapsed ? 'transparent' : theme.color['blue-400']};

          ${StyledIcon} {
            svg {
              fill: ${theme.color['blue-400']};
            }
          }
        }
      `};
    `};

  ${({ isCollapsed }) =>
    isCollapsed &&
    css`
      ${StyledIconExpand} {
        opacity: 0;
        width: 0;
        margin: 0;
      }
    `}

  ${({ isExpanded, theme }) =>
    isExpanded &&
    css`
      ${StyledMenuItemSecondaryTrigger} {
        background-color: ${theme.color['blue-100']};
      }
      ${StyledIconExpand} {
        transform: translateY(-50%) rotate(90deg);

        svg {
          fill: ${theme.color['gray-700']};
        }
      }
    `}
`;
