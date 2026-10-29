import { Chip } from '@/components/ui/chip';
import { HScroll } from '@/components/ui/h-scroll';
import { nextDays, shortDate } from '@/utils/format';

import { BOOKING_DAYS } from '../data';

type DateChipsProps = {
  value: number;
  onChange: (dayIndex: number) => void;
  light?: boolean;
  /** Inside a padded box (reschedule panel). */
  flush?: boolean;
};

/** The next 7 days as chips. `value` is the day index (0 = today). */
export function DateChips({ value, onChange, light, flush }: DateChipsProps) {
  return (
    <HScroll accessibilityLabel="Date" flush={flush}>
      {nextDays(BOOKING_DAYS).map((date, index) => (
        <Chip
          key={index}
          variant={light ? 'dateLight' : 'date'}
          label={shortDate(date)}
          selected={value === index}
          onPress={() => onChange(index)}
        />
      ))}
    </HScroll>
  );
}
