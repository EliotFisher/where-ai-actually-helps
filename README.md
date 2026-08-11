# Where AI Actually Helps

An offline-first, full-screen presentation website adapted from `Eliot_AI_Internship_Revised_Deck_v9.pptx`.

## Run locally

1. Install dependencies with `pnpm install`.
2. Start the presentation with `pnpm dev`.
3. Open the local address shown in the terminal.

## Controls

- Left/right arrows, Page Up/Page Down, and space move through scenes.
- Use the scene counter to open the overview.
- `P` opens presenter mode with timer, notes, navigation, and fullscreen controls.
- The Present button enters browser fullscreen.

All deck assets are bundled for offline use. The Ocean Evidence Commons live demo requires an internet connection; an authentic static preview and external launch link are provided as fallback.

## Deploy

Run `pnpm build` to create the production build. The included `.openai/hosting.json` keeps the project ready for OpenAI Sites hosting.
