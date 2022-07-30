import createCache from '@emotion/cache';
import { isClientSide } from './utils';

export default function createEmotionCache() {
  let insertionPoint: HTMLElement | undefined;

  if (isClientSide) {
    const emotionInsertionPoint: HTMLElement | null = document.querySelector(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}
