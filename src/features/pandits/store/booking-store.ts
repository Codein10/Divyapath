import { create } from 'zustand';

import { pushNotification } from '@/features/notifications';
import { toast } from '@/store/toast-store';
import { addDays, shortDate } from '@/utils/format';

const CONFIRM_AFTER_MS = 6000;
const REPLY_AFTER_MS = 1300;

export type Booking = {
  id: string;
  pandit: string;
  ritual: string;
  date: string;
  slot: string;
  mode: 'At home' | 'Online video';
  address: string;
  total: number;
  status: string;
};

export type ChatMessage = { fromMe: boolean; text: string };

export const SAMPLE_BOOKING: Booking = {
  id: 'DP-BK-1201',
  pandit: 'Pt. Ramesh Shastri',
  ritual: 'Griha Pravesh',
  date: shortDate(addDays(1)),
  slot: '09:00 AM',
  mode: 'At home',
  address: 'Flat 4, Sai Residency, Gangapur Road, Nashik',
  total: 2399,
  status: 'Awaiting confirmation',
};

const AWAITING = 'Awaiting confirmation';

type BookingState = {
  bookings: Booking[];
  chats: Record<string, ChatMessage[]>;
  typing: Record<string, boolean>;
  /** Saves a booking; the pandit "confirms" a few seconds later (demo). */
  add: (booking: Omit<Booking, 'id' | 'status'>) => Booking;
  reschedule: (id: string, date: string, slot: string) => void;
  cancel: (id: string) => void;
  sendMessage: (id: string, text: string) => void;
  reset: () => void;
};

function firstMessage(booking: Booking): ChatMessage {
  return {
    fromMe: false,
    text: `Namaste! I’ve received your ${booking.ritual} booking for ${booking.date}. Do you already have any samagri at home?`,
  };
}

export const useBookingStore = create<BookingState>()((set, get) => {
  const updateStatus = (id: string, status: string) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    }));

  const scheduleConfirmation = (id: string) => {
    setTimeout(() => {
      const booking = get().bookings.find((b) => b.id === id);
      if (!booking || booking.status !== AWAITING) return;
      updateStatus(id, 'Confirmed');
      pushNotification(
        'book',
        `${booking.pandit} confirmed`,
        `${booking.ritual} · ${booking.date}, ${booking.slot}`,
        `/bookings/${id}`,
      );
      toast(`${booking.pandit} confirmed your booking`);
    }, CONFIRM_AFTER_MS);
  };

  return {
    bookings: [],
    chats: {},
    typing: {},
    add: (details) => {
      const booking: Booking = {
        ...details,
        id: `DP-BK-${1202 + get().bookings.length}`,
        status: AWAITING,
      };
      set((state) => ({ bookings: [booking, ...state.bookings] }));
      pushNotification(
        'book',
        'Booking requested',
        `${booking.ritual} · ${booking.date}, ${booking.slot}`,
        `/bookings/${booking.id}`,
      );
      scheduleConfirmation(booking.id);
      return booking;
    },
    reschedule: (id, date, slot) => {
      const booking = get().bookings.find((b) => b.id === id);
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === id ? { ...b, date, slot, status: AWAITING } : b,
        ),
      }));
      if (booking) {
        pushNotification(
          'book',
          'Reschedule requested',
          `${booking.ritual} · ${date}, ${slot}`,
          `/bookings/${id}`,
        );
        toast(`Reschedule request sent to ${booking.pandit}`);
      }
    },
    cancel: (id) => {
      updateStatus(id, 'Cancelled');
      toast('Booking cancelled. Full refund started.');
    },
    sendMessage: (id, text) => {
      const booking = get().bookings.find((b) => b.id === id) ?? SAMPLE_BOOKING;
      const thread = get().chats[id] ?? [firstMessage(booking)];
      set((state) => ({
        chats: { ...state.chats, [id]: [...thread, { fromMe: true, text }] },
        typing: { ...state.typing, [id]: true },
      }));
      setTimeout(() => {
        set((state) => ({
          chats: {
            ...state.chats,
            [id]: [
              ...(state.chats[id] ?? []),
              {
                fromMe: false,
                text: 'Thank you, noted. I’ll bring the remaining samagri and arrive 15 minutes early.',
              },
            ],
          },
          typing: { ...state.typing, [id]: false },
        }));
      }, REPLY_AFTER_MS);
    },
    reset: () => set({ bookings: [], chats: {}, typing: {} }),
  };
});

export function findBooking(bookings: Booking[], id: string | undefined): Booking {
  return bookings.find((b) => b.id === id) ?? bookings[0] ?? SAMPLE_BOOKING;
}

export function chatThread(chats: Record<string, ChatMessage[]>, booking: Booking): ChatMessage[] {
  return chats[booking.id] ?? [firstMessage(booking)];
}
