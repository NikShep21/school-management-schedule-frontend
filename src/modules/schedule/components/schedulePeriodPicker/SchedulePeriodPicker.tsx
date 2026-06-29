import { useRef, useState } from "react";
import classNames from "classnames";
import {
  ActionBar,
  BottomSheet,
  Button,
  DatePicker,
  Drop,
  Flex,
  Text,
} from "@hh.ru/magritte-ui";
import { ChevronDownOutlinedSize16 } from "@hh.ru/magritte-ui/icon";
import { ru } from "date-fns/locale";

import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";

import styles from "./SchedulePeriodPicker.module.less";
import { formatSchedulePeriodTitle } from "@/modules/schedule/lib/formatScheduleDate";

type SchedulePeriodPickerProps = {
  value: Date;
  isMobile: boolean;
  onChange: (date: Date) => void;
};

export const SchedulePeriodPicker = ({
  value,
  isMobile,
  onChange,
}: SchedulePeriodPickerProps) => {
  const activatorRef = useRef<HTMLButtonElement>(null);

  const [displayDate, setDisplayDate] = useState(value);
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    if (!visible) {
      setDisplayDate(value);
    }

    setVisible((currentVisible) => !currentVisible);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleDateSelect = (date: Date | string | number) => {
    onChange(new Date(date));
    setVisible(false);
  };

  const datePicker = (
    <DatePicker
      enabledCalendars="dd.mm.yyyy"
      locale={ru}
      selectedDate={value}
      displayDate={displayDate}
      onDisplayDateChange={(date) => setDisplayDate(new Date(date))}
      onDateSelect={handleDateSelect}
      paddingsHorizontalDesktop={12}
    />
  );

  return (
    <>
      <Button
        ref={activatorRef}
        type="button"
        mode="tertiary"
        style="neutral"
        size="small"
        onClick={handleToggle}
      >
        <Flex align="center" gap={4}>
          <Text typography="title-5-semibold" className={styles.title}>
            {formatSchedulePeriodTitle(value)}
          </Text>

          <span className={classNames(styles.chevron, visible && styles.chevronOpened)}>
            <ChevronDownOutlinedSize16 initialColor="secondary" />
          </span>
        </Flex>
      </Button>

      <Drop
        visible={visible && !isMobile}
        activatorRef={activatorRef}
        placement="bottom-left"
        onClose={handleClose}
        width={420}
      >
        {datePicker}
      </Drop>

      <BottomSheet
        visible={visible && isMobile}
        height="content"
        onClose={handleClose}
        footer={
          <ActionBar
            type="vertical"
            primaryActions={
              <Button
                type="button"
                mode="secondary"
                style="neutral"
                onClick={handleClose}
                stretched
              >
                {scheduleTexts.common.close}
              </Button>
            }
          />
        }
      >
        {datePicker}
      </BottomSheet>
    </>
  );
};
