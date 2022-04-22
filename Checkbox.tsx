import styled, { css } from 'styled-components';
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { Typography } from '@avon-andromeda/ui/web-client/typography';
import { Icon } from '@avon-andromeda/ui/web-client/icon';


interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  isBlock?: boolean;
  isError?: boolean;
  children?: ReactNode;
}


interface IStyledCheckbox {
  isBlock: boolean;
  isDisabled: boolean;
}

const StyledCheckbox = styled.label<IStyledCheckbox>`
  display: inline-flex;
  align-items: start;

  ${({ isBlock }) => isBlock && css`width: 100%;`}

  cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};

  > :not(:last-child) {
    margin-right: 16px;
  }
`;


const StyledInput = styled.input`
  position: absolute;

  width: 1px;
  height: 1px;

  clip: rect(1px, 1px, 1px, 1px);
`;

interface IStyledCheckmark {
  isChecked: boolean;
  isDisabled: boolean;
  isError: boolean;
  isHovered: boolean;
}

const StyledCheckmark = styled.span<IStyledCheckmark>`
  display: inline-flex;
  min-width: 24px;
  min-height: 24px;

  border: 1px solid var(--color-gray-80);
  border-radius: 2px;

  transition: border-color 0.4s, background-color 0.4s;

  ${({ isChecked, isDisabled, isError, isHovered }) => {
    if (isChecked && isDisabled) return css`
      border-color: transparent;
      background-color: var(--color-black-10);
    `

    if (!isChecked && isDisabled) return css`
      border-color: var(--color-gray-80);
      background-color: var(--color-black-10);
    `

    if (isChecked && isError) return css`
      border-color: transparent;
      background-color: var(--color-red-80);
    `

    if (!isChecked && isError) return css`
      border-color: var(--color-red-80);
    `

    if (isChecked && isError && isHovered && !isDisabled) return css`
      border-color: transparent;
      background-color: var(--color-red-80);
    `

    if (!isChecked && isError && isHovered && !isDisabled) return css`
      border-color: var(--color-red-80);
    `

    if (isChecked && !isError && isHovered && !isDisabled) return css`
      border-color: transparent;
      background-color: var(--color-violet-90);
    `

    if (!isChecked && !isError && isHovered && !isDisabled) return css`
      border-color: var(--color-gray-90);
    `

    if (isChecked) return css`
      border-color: transparent;
      background-color: var(--color-violet-80);
    `
  }}
`;


const Checkbox = forwardRef<HTMLInputElement, ICheckbox>((props, ref) => {
  const {
    className,
    checked = false,
    disabled = false,
    isError = false,
    isBlock = false,
    children,
    ...rest
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const labelColor = disabled ? 'gray-80' : 'black';

  return (
    <StyledCheckbox
      className={className}
      isBlock={isBlock}
      isDisabled={disabled}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <StyledInput
        type="checkbox"
        ref={ref}
        checked={checked}
        disabled={disabled}
        {...rest}
      />

      <StyledCheckmark
        isChecked={checked}
        isDisabled={disabled}
        isError={isError}
        isHovered={isHovered}
      >
        <Icon
          name="check-24"
          color="white"
        />
      </StyledCheckmark>

      {children && (
        <Typography
          variant="paragraph-14"
          color={labelColor}
        >
          { children }
        </Typography>
      )}
    </StyledCheckbox>
  );
});

export { Checkbox };
