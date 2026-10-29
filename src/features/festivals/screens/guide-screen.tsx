import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art } from '@/components/art/art';
import { AppText } from '@/components/ui/app-text';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { CheckRow } from '@/components/ui/check-row';
import { FeatureRow } from '@/components/ui/feature-row';
import { Hero } from '@/components/ui/hero';
import { Icon } from '@/components/ui/icon';
import { MenuRow } from '@/components/ui/menu';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Screen } from '@/components/ui/screen';
import { SectionLabel } from '@/components/ui/section-label';
import { ShareButton } from '@/components/ui/share-button';
import { Toggle } from '@/components/ui/toggle';
import { getTrack, usePlayerStore } from '@/features/aarti';
import { usePracticeStore } from '@/features/practice';
import { getProduct } from '@/features/shop';
import { Colors, FontSize, Radius, Size, Spacing } from '@/constants/theme';
import { goToTab } from '@/services/navigation';
import { inr } from '@/utils/format';

import { getGuide, GUIDES } from '../data';
import { useFestivalStore } from '../store/festival-store';

/** -1 is the overview; 0..n-1 are steps; n is "Puja complete". */
const OVERVIEW = -1;

type GuideScreenProps = {
  id?: string;
};

export function GuideScreen({ id }: GuideScreenProps) {
  const guide = getGuide(id) ?? GUIDES[0];
  const [step, setStep] = useState(OVERVIEW);
  const checks = useFestivalStore((state) => state.guideChecks[guide.id]);
  const saved = useFestivalStore((state) => !!state.savedGuides[guide.id]);
  const toggleItem = useFestivalStore((state) => state.toggleGuideItem);
  const toggleSaved = useFestivalStore((state) => state.toggleSavedGuide);
  const logPractice = usePracticeStore((state) => state.log);
  const currentTrack = usePlayerStore((state) => state.currentId);
  const playing = usePlayerStore((state) => state.playing);
  const play = usePlayerStore((state) => state.play);
  const total = guide.steps.length;

  if (step === OVERVIEW) {
    const ready = guide.items.filter((_, i) => checks?.[i]).length;
    const kit = getProduct(guide.kit);
    return (
      <Screen footer={<Button label={`Start guide · ${total} steps`} onPress={() => setStep(0)} />}>
        <Hero art={guide.art} variant={guide.artVariant} shade back height={Size.heroDetail}>
          <AppText variant="eyebrow" color={Colors.gold}>
            PUJA GUIDE · {guide.duration}
          </AppText>
          <AppText variant="displayHero" color={Colors.onImage} accessibilityRole="header">
            {guide.name}
          </AppText>
          <AppText size={FontSize.lg} color={Colors.peach}>
            {guide.languages}
          </AppText>
        </Hero>
        <View style={styles.body}>
          <AppText variant="xs" muted style={styles.intro}>
            Reviewed by [editorial reviewer]. {guide.regional}
          </AppText>
          <MenuRow
            label="Save for offline"
            sub="Use it without internet during the puja"
            right={
              <Toggle
                value={saved}
                onChange={() => toggleSaved(guide.id)}
                accessibilityLabel="Save for offline"
              />
            }
          />
          <SectionLabel
            right={
              <AppText variant="small" muted>
                {ready} of {guide.items.length} ready
              </AppText>
            }
          >
            ITEMS NEEDED
          </SectionLabel>
          {guide.items.map(([item, qty], index) => (
            <CheckRow
              key={item}
              label={item}
              detail={qty}
              checked={!!checks?.[index]}
              onToggle={() => toggleItem(guide.id, index)}
            />
          ))}
          <FeatureRow
            art={kit.art}
            artVariant={kit.artVariant}
            title="Missing something?"
            subtitle={`${kit.name} · ${inr(kit.price)}`}
            onPress={() => router.push(`/product/${kit.id}`)}
          />
        </View>
      </Screen>
    );
  }

  if (step >= total) {
    return (
      <Screen
        footer={
          <>
            <Button label="Home" variant="soft" flex onPress={() => goToTab('/')} />
            <Button
              label="Log to practice"
              flex
              onPress={() => logPractice('prayer', 'Logged to today’s practice')}
            />
          </>
        }
      >
        <View style={styles.success}>
          <View style={styles.okCircle}>
            <Icon name="check" size={46} color={Colors.ok} />
          </View>
          <AppText variant="displayMd" accessibilityRole="header">
            Puja complete
          </AppText>
          <AppText muted align="center" style={styles.narrow}>
            Take a quiet moment before you clear up, and share prasad with your family.
          </AppText>
          <ShareButton text={`We completed ${guide.name} today with the DivyaPath guide.`} />
        </View>
      </Screen>
    );
  }

  const current = guide.steps[step];
  const track = getTrack(current.audio);
  const trackPlaying = !!track && currentTrack === track.id && playing;

  return (
    <Screen
      footer={
        <>
          <Button
            label={step === 0 ? 'Overview' : 'Previous'}
            variant="soft"
            flex
            onPress={() => setStep(step - 1)}
          />
          <Button
            label={step === total - 1 ? 'Finish' : 'Next'}
            flex
            onPress={() => setStep(step + 1)}
          />
        </>
      }
    >
      <View style={styles.progressRow}>
        <BackButton
          icon="close"
          accessibilityLabel="Close guide"
          onPress={() => setStep(OVERVIEW)}
        />
        <View style={styles.progress}>
          <ProgressBar value={(step + 1) / total} accessibilityLabel="Guide progress" />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.stepImage}>
          <Art kind={guide.art} variant={guide.artVariant} />
        </View>
        <AppText variant="eyebrow" style={styles.stepNumber}>
          STEP {step + 1} OF {total}
        </AppText>
        <AppText variant="displayMd" accessibilityRole="header" style={styles.stepTitle}>
          {current.title}
        </AppText>
        <AppText variant="lead" style={styles.stepDetail}>
          {current.detail}
        </AppText>
        {track ? (
          <Pressable
            onPress={() => play(track.id)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.audio, pressed && styles.pressed]}
          >
            <Icon name={trackPlaying ? 'pause' : 'play'} size={18} color={Colors.accent} />
            <AppText weight="semibold" size={FontSize.sm} color={Colors.accent} style={styles.flex}>
              {trackPlaying ? 'Pause' : 'Play'}: {track.title}
            </AppText>
          </Pressable>
        ) : null}
        {current.alternative ? (
          <View style={styles.alternative}>
            <AppText weight="bold" size={FontSize.sm} color={Colors.warn}>
              If you don’t have it
            </AppText>
            <AppText size={FontSize.sm} color={Colors.warn}>
              {current.alternative}
            </AppText>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: Spacing.gutter,
  },
  intro: {
    marginTop: Spacing.four,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three + 2,
    paddingHorizontal: Spacing.gutter,
    paddingTop: Spacing.four,
  },
  progress: {
    flex: 1,
  },
  stepImage: {
    height: 180,
    borderRadius: Radius.xl + 2,
    overflow: 'hidden',
    marginTop: Spacing.three + 2,
  },
  stepNumber: {
    marginTop: Spacing.five,
  },
  stepTitle: {
    marginTop: Spacing.one + 2,
  },
  stepDetail: {
    marginTop: Spacing.three,
  },
  audio: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.two,
    minHeight: Size.chip,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.line,
    marginTop: Spacing.four,
    maxWidth: '100%',
  },
  flex: {
    flexShrink: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  alternative: {
    backgroundColor: Colors.warnBg,
    borderRadius: Radius.md,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    marginTop: Spacing.four,
  },
  success: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: 60,
    paddingHorizontal: Spacing.gutter,
  },
  okCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.okBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  narrow: {
    maxWidth: 300,
  },
});
