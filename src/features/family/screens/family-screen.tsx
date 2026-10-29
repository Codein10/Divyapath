import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { CheckRow } from '@/components/ui/check-row';
import { ConfirmBox } from '@/components/ui/confirm-box';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@/components/ui/icon';
import { InfoCard } from '@/components/ui/info-card';
import { InfoRow } from '@/components/ui/info-row';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { SectionLabel } from '@/components/ui/section-label';
import { TextField } from '@/components/ui/text-field';
import { TextLink } from '@/components/ui/text-link';
import { Colors, Spacing } from '@/constants/theme';

import { useFamilyStore } from '../store/family-store';

export function FamilyScreen() {
  const group = useFamilyStore((state) => state.group);
  const create = useFamilyStore((state) => state.create);
  const invite = useFamilyStore((state) => state.invite);
  const addItem = useFamilyStore((state) => state.addItem);
  const toggleItem = useFamilyStore((state) => state.toggleItem);
  const leave = useFamilyStore((state) => state.leave);
  const [contact, setContact] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [item, setItem] = useState('');
  const [confirmLeave, setConfirmLeave] = useState(false);

  if (!group) {
    return (
      <Screen>
        <ScreenHeader title="Family group" />
        <View style={styles.body}>
          <View style={styles.gapTop}>
            <EmptyState
              icon={<Icon name="users" size={46} color={Colors.muted} strokeWidth={1.3} />}
              title="Prepare festivals together"
              message="Share festival reminders and a shopping list for puja items. Journals and practice logs always stay private."
            >
              <Button label="Create a family group" onPress={create} style={styles.center} />
            </EmptyState>
          </View>
        </View>
      </Screen>
    );
  }

  const done = group.list.filter((x) => x.done).length;

  const sendInvite = () => {
    const error = invite(contact);
    setInviteError(error ?? '');
    if (!error) setContact('');
  };

  const add = () => {
    addItem(item);
    setItem('');
  };

  return (
    <Screen>
      <ScreenHeader title={group.name} />
      <View style={styles.body}>
        <SectionLabel>MEMBERS</SectionLabel>
        {group.members.map((member, index) => (
          <View key={`${member.name}-${index}`} style={styles.member}>
            <View style={[styles.avatar, { backgroundColor: member.color }]}>
              <AppText weight="bold" color={Colors.white}>
                {member.name.charAt(0).toUpperCase()}
              </AppText>
            </View>
            <View style={styles.flex}>
              <AppText weight="semibold">{member.name}</AppText>
              <AppText variant="small" muted>
                {member.role}
              </AppText>
            </View>
          </View>
        ))}
        <View style={styles.addRow}>
          <View style={styles.flex}>
            <TextField
              placeholder="Phone or email to invite"
              value={contact}
              onChangeText={setContact}
              onSubmitEditing={sendInvite}
              error={inviteError || undefined}
              autoCapitalize="none"
              compact
            />
          </View>
          <Button label="Invite" size="sm" onPress={sendInvite} style={styles.inlineButton} />
        </View>

        <SectionLabel
          right={
            <AppText variant="small" muted>
              {done} of {group.list.length}
            </AppText>
          }
        >
          SHARED SHOPPING LIST
        </SectionLabel>
        {group.list.map((entry, index) => (
          <CheckRow
            key={`${entry.text}-${index}`}
            label={entry.text}
            detail={entry.addedBy}
            checked={entry.done}
            onToggle={() => toggleItem(index)}
          />
        ))}
        <View style={styles.addRow}>
          <View style={styles.flex}>
            <TextField
              placeholder="Add an item"
              value={item}
              onChangeText={setItem}
              onSubmitEditing={add}
              compact
            />
          </View>
          <Button
            label="Add"
            icon="plus"
            size="sm"
            onPress={add}
            accessibilityLabel="Add item"
            style={styles.inlineButton}
          />
        </View>

        <SectionLabel>SHARED REMINDERS</SectionLabel>
        {group.reminders.map(([title, when]) => (
          <InfoRow key={title}>
            <View style={styles.reminder}>
              <AppText weight="bold" style={styles.flex}>
                {title}
              </AppText>
              <AppText muted>{when}</AppText>
            </View>
          </InfoRow>
        ))}

        <InfoCard tone="ok" style={styles.gapTop}>
          <AppText weight="bold" color={Colors.ok}>
            Your privacy
          </AppText>
          <AppText variant="small" color={Colors.okInk}>
            Journals and practice logs are never shared, even with the group admin.
          </AppText>
        </InfoCard>

        {confirmLeave ? (
          <ConfirmBox
            title={`Leave ${group.name}?`}
            message="You’ll stop seeing the shared list and reminders."
            cancelLabel="Stay"
            confirmLabel="Leave"
            onCancel={() => setConfirmLeave(false)}
            onConfirm={() => {
              setConfirmLeave(false);
              leave();
            }}
          />
        ) : (
          <TextLink
            label="Leave group"
            color={Colors.err}
            onPress={() => setConfirmLeave(true)}
            style={styles.gapTop}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  gapTop: {
    marginTop: Spacing.four,
  },
  center: {
    alignSelf: 'center',
    width: 260,
  },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three + 2,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three - 2,
    marginTop: Spacing.three,
  },
  inlineButton: {
    alignSelf: 'flex-start',
    height: 52,
  },
  reminder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
});
