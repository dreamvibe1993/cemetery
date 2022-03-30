import React, { useState } from "react";
import styled from "styled-components/macro";

export const Tooltip = ({ delay, direction, children, content }) => {
  const timeoutId = React.useRef();
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeoutId.current = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeoutId.current);
    setActive(false);
  };

  React.useEffect(() => {
    return () => {
      clearInterval(timeoutId.current);
    };
  }, []);

  return (
    <TooltipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && (
        <TooltipTip className={` ${direction || "top"}`}>{content}</TooltipTip>
      )}
    </TooltipWrapper>
  );
};

const TooltipTip = styled.div`
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  color: var(--tooltip-text-color);
  background: var(--tooltip-background-color);
  font-size: 15px;
  line-height: 1;
  z-index: 998;
  width: fit-content;
  white-space: pre-line;

  /* CSS border triangles */
  &::before {
    content: " ";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: var(--tooltip-arrow-size);
    margin-left: calc(var(--tooltip-arrow-size) * -1);
  }

  /* Absolute positioning */
  &.top {
    top: calc(var(--tooltip-margin) * -1);
  }
  /* CSS border triangles */
  &.top::before {
    top: 100%;
    border-top-color: var(--tooltip-background-color);
  }

  /* Absolute positioning */
  &.right {
    left: calc(100% + var(--tooltip-margin));
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  &.right::before {
    left: calc(var(--tooltip-arrow-size) * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: var(--tooltip-background-color);
  }

  /* Absolute positioning */
  &.bottom {
    bottom: calc(var(--tooltip-margin) * -1);
  }
  /* CSS border triangles */
  &.bottom::before {
    bottom: 100%;
    border-bottom-color: var(--tooltip-background-color);
  }

  /* Absolute positioning */
  &.left {
    left: auto;
    right: calc(100% + var(--tooltip-margin));
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  &.left::before {
    left: auto;
    right: calc(var(--tooltip-arrow-size) * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: var(--tooltip-background-color);
  }
`;

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;
