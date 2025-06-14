import React, { forwardRef } from 'react';
import {
  useMergeRefs,
  FloatingArrow,
  FloatingPortal,
} from '@floating-ui/react';

import { useTooltipContext } from './TooltipContext';
import { colors } from '../../colors';

import styles from './Tooltip.module.scss';

export const TooltipContent = /*@__PURE__*/ forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & {
    maxWidth: number;
    isDisabled: boolean;
  }
>(({ style, children, maxWidth, isDisabled, ...props }, propRef) => {
  const { floatingStyles, isOpen, refs, arrowRef, context, getFloatingProps } =
    useTooltipContext();
  const ref = useMergeRefs([refs.setFloating, propRef]);

  if (isDisabled || !isOpen) {
    return null;
  }

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{
          ...floatingStyles,
          ...style,
          maxWidth,
        }}
        {...getFloatingProps({
          ...props,
          className: styles.tooltipContent,
        })}
      >
        {children}
        <FloatingArrow
          ref={arrowRef}
          context={context}
          tipRadius={1}
          fill={colors.backgroundComplementaryDefault}
          width={14}
          height={6}
        />
      </div>
    </FloatingPortal>
  );
});
