# AID

A pump.fun launchpad where every launch is tied to a verified charity.

Pick a registered nonprofit off the register, launch its coin, and the creator
fee is pointed at that organisation at the moment the coin exists.

## The register

32 registered nonprofits with a live crypto-donation route on The Giving Block.
Real organisations, real tax IDs, real donation pages — every row links straight
to the charity's own page so you can give without touching the pad at all.

## Why it can work

pump.fun has no charity field. What it has is a creator fee vault and, since
February 2026, a choice made at launch between creator fees and trader cashback
that is permanently locked afterwards. AID always chooses creator fees, and the
vault's standing instruction is a donation route belonging to someone else.

## Fee curve

Published Dynamic Fees V1 anchors, not invented numbers:

| Market cap | Creator share |
|---|---|
| under 420 SOL | 0.30% |
| 420 – 1,470 SOL | 0.95% |
| 1,470 – 98,240 SOL | 0.95% → 0.05% |
| above 98,240 SOL | 0.05% |

## Files

| File | What it is |
|---|---|
| `index.html` | the site |
| `aid.css` | styles |
| `aid.js` | register, wallet connect, launch flow, fee calculator |
| `docs.html` | the reference |
| `vercel.json` | cache headers, nosniff, referrer policy |

## Honest

No coin has been opened, no fee has been claimed, no donation has been sent.
The counters read zero because they are zero. Charities on the register have not
agreed to anything and their logos are not used anywhere — each row carries a
mark of our own instead.
