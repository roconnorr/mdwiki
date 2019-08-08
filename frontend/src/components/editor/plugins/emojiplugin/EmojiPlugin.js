import createEmojiPlugin from 'draft-js-emoji-plugin';

import './EmojiPlugin.css';

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});

const { EmojiSuggestions } = emojiPlugin;

export { emojiPlugin, EmojiSuggestions };
