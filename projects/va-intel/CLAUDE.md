# VA Intel Slack Digest

## Summary

Automated daily digest of VA-related news and intel, delivered via Slack Canvas.

## Architecture

```
Layer 1 (Capture) → Layer 2 (LLM Vetting) → Layer 3 (Slack Canvas Digest)
```

## Sources

- Orange Slices (newsletter)
- Reddit: r/VeteransBenefits, r/Veterans, r/VeteransAffairs
- veterans.house.gov
- LinkedIn: David Shulkin, Ron Paul

## Key Files

| File | Purpose |
|------|---------|
| `VA-Intel-Slack-Digest-Options.md` | Main build doc with status |
| `LinkedIn-Monitoring-Options.md` | LinkedIn monitoring research |
| `project_VA-Intel-Digest.json` | Tray project export |

## Dependencies

- **OpenAI API key** for Layer 2 LLM vetting
- Dev team periodically rotates keys — check if digest stops working

## Tray Workflows

6 workflows across 3 layers — see `VA-Intel-Slack-Digest-Options.md` for details.

## Status

Check the **Build Status** section in `VA-Intel-Slack-Digest-Options.md` for current state.
