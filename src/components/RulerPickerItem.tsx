/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';

export type RulerPickerItemProps = {
  /**
   * Gap between steps
   *
   * @default 10
   */
  gapBetweenSteps: number;
  /**
   * Height of the short step
   *
   * @default 20
   */
  shortStepHeight: number;
  /**
   * Height of the long step
   *
   * @default 40
   */
  longStepHeight: number;
  /**
   * Width of the steps
   *
   * @default 2
   */
  stepWidth: number;
  /**
   * Color of the short steps
   *
   * @default 'lightgray'
   */
  shortStepColor: string;
  /**
   * Color of the long steps
   *
   * @default 'gray'
   */
  longStepColor: string;
  /**
   * Function to format tick values
   * @default (value) => value.toString()
   */
  formatTickValue?: (value: number) => string;
  /**
   * Number of steps between long ticks
   * @default 10
   */
  tickStep?: number;
  min: number;
  step: number;
};

type Props = {
  index: number;
  isLast: boolean;
} & RulerPickerItemProps;

export const RulerPickerItem = React.memo(
  ({
    isLast,
    index,
    gapBetweenSteps,
    shortStepHeight,
    longStepHeight,
    stepWidth,
    shortStepColor,
    longStepColor,
    min,
    step,
    formatTickValue = (value) => value.toString(),
    tickStep = 10,
  }: Props) => {
    const isLong = index % tickStep === 0;
    const height = isLong ? longStepHeight : shortStepHeight;
    const value = min + index * step;

    return (
      <View
        style={[
          {
            width: stepWidth,
            height: '100%',
            justifyContent: 'center',
            marginRight: isLast ? 0 : gapBetweenSteps,
            marginTop: shortStepHeight,
          },
        ]}
      >
        <View
          style={[
            {
              width: '100%',
              height: height,
              backgroundColor: isLong ? longStepColor : shortStepColor,
              marginTop: isLong ? 0 : shortStepHeight,
            },
          ]}
        />

        {isLong && (
         <Text
            style={{
              position: 'absolute',
              bottom: 33,
              width: 40,
              textAlign: 'center',
              color: 'black',
              fontWeight: '400',
              fontSize: 17,
              transform: [{ translateX: -20 + stepWidth / 2 }],
            }}
            numberOfLines={1}
          >
            {formatTickValue(value)}
          </Text>
        )}
        
      </View>
    );
  }
);
