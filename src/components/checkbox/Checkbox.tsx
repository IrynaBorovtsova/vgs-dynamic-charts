import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin: 4px;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? '#2196f3' : '#fff')};
  border: 1px solid #2196f3;
  border-radius: 3px;
  margin-right: 4px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #90caf9;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')}
  }
`

const Checkbox = (props: any) => {
    const { className, checked, label, ...others } = props;

    return (
        <CheckboxContainer className={className}>
            <HiddenCheckbox checked={checked} {...others} />
            <StyledCheckbox checked={checked}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
    )
};

export default Checkbox;
