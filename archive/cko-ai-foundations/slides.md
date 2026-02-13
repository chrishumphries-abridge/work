# CKO AI Foundations
## Slides

---

# AI Foundations for Commercial

Chris Humphries | RevOps

---

# Why We're Here

We're an AI company.

But what does that actually mean for how we work?

This is a conversation, not a lecture.
Ask questions. Share what's working. Be honest about what isn't.

---

# SECTION 1
## Where Are You?

---

# Quick Poll

How often do you use AI tools?

- Daily
- Weekly
- Rarely
- Never

[QR Code]

No wrong answers. We're just taking the temperature.

---

# What Do You Use It For?

[QR Code]

---

# The Spectrum

```
Doing nothing ←————————————————→ Vibe coding
```

Most people are somewhere in the middle.

Today's goal: help you find your spot — or move it if you want to.

---

# SECTION 2
## How AI Actually Works

---

# What is a Large Language Model?

A system trained on massive amounts of text
that predicts the most likely next word.

Think: **autocomplete on steroids.**

---

# The Key Insight

Reframe how you think about AI:

**"AI thinks"** → **"AI predicts"**

It doesn't know things. It predicts likely responses.

This is powerful — and also why it makes stuff up.

---

# What This Means for You

**Good news:** AI can pattern-match across more information than any human.

**Bad news:** It has no idea if what it says is true.

**Your job:** Guide it well. Verify what matters.

---

# Generative AI

**Creates content** based on your prompt.

- "Write me an email to follow up on our call"
- "Summarize this 30-page contract"
- "Draft talking points for my QBR"

You prompt → It generates → You review.

---

# Agentic AI

**Takes actions** autonomously.

- Research an account and update Salesforce
- Monitor for job changes at target accounts
- Draft and schedule follow-up sequences

This is where AI is heading. You'll hear more about it.

---

# Generative vs Agentic

| Generative | Agentic |
|------------|---------|
| Creates content | Takes actions |
| You prompt each time | Works on its own |
| "Write this email" | "Manage my prospecting" |

Both are useful. Know the difference.

---

# Five Terms You'll Hear

**Prompt** — Your instruction to the AI

**Hallucination** — When AI confidently makes things up

**Context window** — How much AI can "remember" (~500 pages for Claude)

**Token** — How AI measures text (roughly 1 word)

**RAG** — AI that can search your docs before answering

---

# Common Concerns

**"AI is coming for my job"**
AI changes jobs. People who use AI well are more valuable, not less.

**"AI knows everything"**
It doesn't. It has knowledge cutoffs and makes things up. Verify.

**"It's too hard to learn"**
Basic prompting takes 10 minutes. You'll get better with practice.

---

# SECTION 3
## Prompting 101

---

# Why This Matters

Same AI. Wildly different results.

The difference? How you ask.

---

# The RCTF Framework

**R**ole — Tell it who to be
**C**ontext — Give background
**T**ask — Be specific about what you want
**F**ormat — Specify the output structure

---

# Role

Tell the AI who to be.

"You are a sales strategist at an AI healthcare company."

"You are a skeptical CFO evaluating this proposal."

"You are an Abridge AE preparing for a discovery call."

This shapes how it responds.

---

# Context

Give relevant background.

- Who is the customer?
- What's the situation?
- What do you already know?
- What constraints exist?

More relevant context = better output.

---

# Task

Be specific about what you want.

**Vague:** "Help me with this account"

**Specific:** "Write 3 discovery questions that uncover
their current documentation workflow pain points"

Vague tasks = vague outputs.

---

# Format

Specify how you want the output.

- "As a bulleted list"
- "In 3 short paragraphs"
- "As a table with columns for X, Y, Z"
- "Keep it under 200 words"

This prevents rambling.

---

# Bad Prompt

"Write me a prep doc"

What you get: Generic. Probably useless.

---

# Good Prompt

You are a sales strategist at Abridge, an AI clinical documentation company.

I have a meeting tomorrow with Acme Health System, a 500-physician organization in the Midwest. They're evaluating AI documentation tools and have concerns about physician adoption.

Write a 1-page meeting prep doc:
- 3 key stakeholders to research
- 2 likely objections and how to address them
- 3 discovery questions about their workflow

Keep the tone conversational, not salesy.

---

# The Difference

**Bad prompt:** AI guesses what you want

**Good prompt:** AI delivers what you need

60 seconds on a better prompt saves 10 minutes of editing garbage.

---

# Pro Tips

**Iterate** — First response isn't always best. "Try again" works.

**Show examples** — "Here's what good looks like: [example]"

**Save your winners** — Build a library of prompts that work.

---

# Exercise: Prompt Detective

**Output A:**
"I hope this email finds you well. I wanted to reach out to discuss how our solution could benefit your organization. We offer industry-leading technology that can help streamline your operations."

**Output B:**
"Dr. Chen — saw Baptist Health just announced their 2026 digital strategy focused on reducing physician burnout. Curious if documentation burden came up. We're helping similar systems cut charting time by 2+ hours/day. Worth a 15-min call?"

Which came from a better prompt?

---

# What Made the Difference?

**Output A prompt:** "Write an outreach email"

**Output B prompt:** "You're an Abridge AE. Write a 50-word cold email to Dr. Sarah Chen, CCIO at Baptist Health (12-hospital system). Reference their recent digital strategy announcement. Focus on physician burnout and documentation time. Consultative tone, not salesy."

Same AI. Wildly different results.

---

# Exercise: AI Mad Libs

Fill in the blanks:

"Write a **[LENGTH]** email to a **[PERSONA]**
in **[INDUSTRY]** highlighting **[BENEFIT]**
with a **[TONE]** tone."

Run it on your phone. Share results.

---

# SECTION 4
## The Tools

---

# The Big Three

| Tool | Best For |
|------|----------|
| **ChatGPT** | General purpose, images, voice |
| **Claude** | Writing, analysis, long documents |
| **Perplexity** | Research with citations |

---

# ChatGPT (OpenAI)

- Largest ecosystem, most integrations
- Image and video generation
- Voice conversations

**Best for:** Creative tasks, quick questions, multimedia

---

# Claude (Anthropic)

- More natural, conversational tone
- Can read entire documents (200K tokens)
- Strong reasoning and professional writing

**Best for:** Long documents, customer-facing communications

---

# Perplexity

- Built for research
- Cites sources automatically
- Access to current information

**Best for:** Account research, market intel, fact-checking

---

# My Take

**Claude** for work — writing, analysis, anything professional

**ChatGPT** for creative — images, brainstorming, exploration

**Perplexity** for research — when you need sources

Try both. Find what works for you.

---

# What Abridge Offers

**Available now:**
- Claude Code (developer license)
- API access

**Coming:**
- Enterprise Claude (TBD)

Talk to IT. They're expecting requests.

---

# A Note on Vibe Coding

Term coined by Andrej Karpathy: "Give in to the vibes. Forget the code exists."

Describe what you want → AI writes code → You test → Iterate

Non-engineers are building tools that used to require developers.

The line between "user" and "builder" is blurring.

---

# SECTION 5
## What Now?

---

# It's Not Just Work

I fed Claude my family's spending from last year.

Turns out we have a Chick-fil-A problem.

Point is: use it for whatever you're curious about.
Work. Life. That thing you've been meaning to figure out.

---

# Start Where You Are

**Write a lot of emails?** Start there. Draft, edit, send.

**Prep for meetings?** Feed it context, get a head start.

**Drown in transcripts?** Let AI pull out the action items.

**Live in Salesforce?** Describe what you want built.

Pick the thing you already do. Make it easier.

---

# Then Get Curious

Once it's helping with the routine stuff,
try something bigger.

A workflow you've been putting off.
A report nobody wants to build.
An idea you've never had time for.

You might surprise yourself.

---

# The Invitation

This isn't about becoming technical.

It's about removing friction
between what you want and what you can do.

The tools are here. Access is available.

What you do with them is up to you.

---

# Resources

**Request access:** [IT link]

**Questions:** #ai-commercial (Slack)

**This deck + prompting guide:** [link]

---

# Q&A

What have you heard about that you don't understand?

What are you curious to try?

What's holding you back?

---

# Thank You

Chris Humphries
RevOps
