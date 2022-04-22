import styled, { css } from 'styled-components';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Typography } from '@avon-andromeda/ui/web-client/typography';


interface ISwitch extends InputHTMLAttributes<HTMLInputElement> {
  isBlock?: boolean;
  labelLeft?: string;
  labelRight?: string;
}

interface IStyledSwitch {
  isBlock: boolean;
  isDisabled: boolean;
}

const StyledSwitch = styled.label<IStyledSwitch>`
  display: inline-flex;
  align-items: center;

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

interface IStyledToggle {
  isChecked: boolean;
  isDisabled: boolean;
  isHovered: boolean;
}

const StyledToggle = styled.span<IStyledToggle>`
  position: relative;

  min-width: 28px;
  height: 16px;

  border-radius: 8px;
  background-color: var(--color-violet-80);

  transition: background-color 0.4s;

  &::before {
    content: '';

    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);

    width: 12px;
    height: 12px;

    background-color: var(--color-white);
    border-radius: 50%;
    transition: transform 0.4s, background-color 0.4s;
  }

  ${({ isChecked, isDisabled, isHovered }) => {
    if ((!isChecked || isChecked) && isDisabled) return css`
      background-color: var(--color-black-10);

      &::before {
        background-color: var(--color-gray-90);
      }
    `

    if (isChecked && isHovered && !isDisabled) return css`
      background-color: var(--color-violet-90);

      &::before {
        transform: translateY(-50%) translateX(calc(100% + 1px));
      }
    `

    if (!isChecked && isHovered && !isDisabled) return css`
      background-color: var(--color-violet-90);
    `    

    if (isChecked) return css`
      &::before {
        transform: translateY(-50%) translateX(calc(100% + 1px));
      }
    `
  }}
`;

const StyledLabel = styled(Typography)`
  transition: color 0.4s;
`;


const Switch = forwardRef<HTMLInputElement, ISwitch>((props, ref) => {
  const {
    className,
    checked = false,
    disabled = false,
    isBlock = false,
    labelLeft,
    labelRight,
    ...rest
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const labelLeftColor = !checked ? 'black' : 'gray-90';
  const labelRightColor = checked ? 'black' : 'gray-90';

  return (
    <StyledSwitch
      className={className}
      isBlock={isBlock}
      isDisabled={disabled}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {labelLeft && (
        <StyledLabel
          variant="caption-14"
          color={labelLeftColor}
        >
          { labelLeft }
        </StyledLabel>
      )}

      <StyledInput
        type="checkbox"
        ref={ref}
        checked={checked}
        disabled={disabled}
        {...rest}
      />

      <StyledToggle
        isChecked={checked}
        isDisabled={disabled}
        isHovered={isHovered}
      />

      {labelRight && (
        <StyledLabel
          variant="caption-14"
          color={labelRightColor}
        >
          { labelRight }
        </StyledLabel>
      )}
    </StyledSwitch>
  );
})

export { Switch };
