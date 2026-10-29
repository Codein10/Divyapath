import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/ui/hero';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { TextLink } from '@/components/ui/text-link';
import { Colors, FontSize, Size, Spacing } from '@/constants/theme';
import { toast } from '@/store/toast-store';

import { useSessionStore } from '../store/session-store';
import { type AuthErrors } from '../types';
import { displayName, validateAuth } from '../utils/validate-auth';

type Mode = 'signIn' | 'signUp';

export function LoginScreen() {
  const signIn = useSessionStore((state) => state.signIn);
  const continueAsGuest = useSessionStore((state) => state.continueAsGuest);
  const [mode, setMode] = useState<Mode>('signIn');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<AuthErrors>({});
  const isSignUp = mode === 'signUp';

  const update = (field: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const enterApp = () => router.replace('/');

  const submit = () => {
    const found = validateAuth(form, mode);
    setErrors(found);
    if (Object.keys(found).length) return;
    signIn({ name: displayName(form, mode), email: form.email.trim() });
    toast('Signed in (demo)');
    enterApp();
  };

  return (
    <Screen>
      <Hero art="temple" variant={0} shade height={Size.heroLogin}>
        <AppText variant="eyebrow" color={Colors.gold}>
          ॥ DivyaPath ॥
        </AppText>
        <AppText variant="displayXl" color={Colors.onImage} accessibilityRole="header">
          Your Daily Spiritual Companion
        </AppText>
        <AppText color={Colors.heroSub}>
          Live aarti · festival pujas · online pandits · temple darshan
        </AppText>
      </Hero>

      <View style={styles.form}>
        <AppText variant="displayMd">{isSignUp ? 'Create your account' : 'Welcome back'}</AppText>
        {isSignUp ? (
          <TextField
            placeholder="Your name"
            value={form.name}
            onChangeText={update('name')}
            error={errors.name}
            autoComplete="name"
          />
        ) : null}
        <TextField
          placeholder="Email"
          value={form.email}
          onChangeText={update('email')}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextField
          placeholder="Password"
          value={form.password}
          onChangeText={update('password')}
          error={errors.password}
          secureTextEntry
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          onSubmitEditing={submit}
        />
        <Button label={isSignUp ? 'Create account' : 'Sign In'} onPress={submit} />

        <View style={styles.or}>
          <View style={styles.orLine} />
          <AppText size={FontSize.label} muted>
            or
          </AppText>
          <View style={styles.orLine} />
        </View>

        <Button
          label="Continue with phone OTP"
          variant="outline"
          onPress={() => {
            signIn({ name: 'Devotee' });
            toast('Signed in with phone OTP (demo)');
            enterApp();
          }}
        />

        <View style={styles.switchRow}>
          <AppText variant="small" muted>
            {isSignUp ? 'Already have an account?' : 'New to DivyaPath?'}
          </AppText>
          <TextLink
            label={isSignUp ? 'Sign in' : 'Create an account'}
            size={FontSize.sm}
            onPress={() => {
              setMode(isSignUp ? 'signIn' : 'signUp');
              setErrors({});
            }}
          />
        </View>
        <TextLink
          label="Explore as a guest"
          style={styles.center}
          onPress={() => {
            continueAsGuest();
            enterApp();
          }}
        />
        <AppText variant="xs" muted align="center">
          Demo sign-in. No account is created and nothing leaves this device.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.seven,
    gap: Spacing.four - 2,
  },
  or: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.line,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    flexWrap: 'wrap',
  },
  center: {
    alignSelf: 'center',
  },
});
