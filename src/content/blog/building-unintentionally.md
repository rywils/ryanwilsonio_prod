---
title: 'How I unintentionally, intentionally built a vulnerability scanner'
excerpt: 'The story behind Bitprobe, kinda...'
image: ''
date: 'December 17, 2025'
readTime: '3 min read'
author: 'Ryan Wilson'
category: ['Development', 'Cybersecurity'] 
tags: ['python','programming']
draft: false
---
## Building BitProbe

I didn’t set out to build a security scanner.

Honestly, BitProbe started as a side effect of crap tooling. I like to tinker, I like to lab, and when I say there's a lot of primo-garbo out there, I mean it. I toyed with the idea a bit and started building bits and pieces and I hit a point where I was like, "okay... I'm actually building this I guess". A lot of tools aren't maintained, are poorly designed, or they don't do what I want it to do. They’re just dumping information and calling it “insight.”

When everything is labeled “high” or “critical,” nothing really is. I wanted something I could trust, and just maybe other people would like it too.


### The Problem I Was Trying to Solve

In professional security work, noise is often more dangerous than blind spots. Many scanners flag issues on infrastructure the organization does not control, treat edge or CDN behavior as origin risk, and roll everything into a single score that appears precise but lacks context.

As a result, practitioners learn to mentally filter results. Findings are discounted, severity is recalibrated by hand, and “critical” alerts stop carrying weight. At that point, the tool is no longer doing its job.

BitProbe turned into an attempt to address that problem directly.

### A Different Approach to Accuracy

Eventually, I designed and planned around a simple principle: uncertainty should not be hidden.

Instead of suppressing false positives or quietly excluding edge infrastructure, BitProbe makes those distinctions explicit. Edge and CDN infrastructure is detected, clearly labeled, and scored separately rather than ignored.

Risk is calculated twice: once assuming every finding is real and exploitable, and again accounting for what the organization actually owns and controls. The result is not a quieter report, but a more honest one.

This approach preserves visibility while improving accuracy.

### What I Learned While Building It

One of the clearest lessons was that accuracy matters more than cleverness. It is easy to build impressive-looking tooling. It is much harder to build something you would confidently defend in front of a client, an auditor, or your own team.

Every feature in BitProbe had to answer a straightforward question: would I trust this result if it were describing my own environment? If the answer was no, it had to go.

Another lesson was that false positives themselves are not the real problem. Ambiguity is. Edge infrastructure, shared services, and third-party platforms all represent risk, but not in the same way as owned systems. Treating them identically leads to poor prioritization and wasted effort. Making that distinction visible turned out to be more valuable than trying to eliminate noise entirely.

Finally, I was reminded that a single number is never enough. Risk scoring is useful, but only when the inputs and assumptions are clear. BitProbe exposes severity, likelihood, and business impact separately. The score exists to guide prioritization, not replace judgment.


### Drawing the Line

One of the harder parts of building BitProbe was deciding what not to include.

There’s a lot of tooling in security that lives in gray areas — ethically, legally, or both. As developers, engineers, practitioners, red-teamers, blue or purple teamers, *insert label/title here*, intentionally keeping this in mind is crucial. We have to remember, we're testing systems for a specific purpose. We also have to take into account the reality we live in and ask ourselves, how easily is our tool weaponized? Say somebody who meant harm had something with the capability to do a lot of damage, would they be able to destroy someones everything, with the very thing you built to try to protect it? I have plenty of my own weaponized tools that I use when practicing witin a lab environment or running CTF's, but I made them for that specific purpose, just for me. I didn't turn 12 years old one day and decide I'm going to download some tool online and try to attack everything ([Villager is heavy on my mind](https://cybersecuritynews.com/villager-ai-powered-pentesting-tool/)). They were built with intention. The intention is just as firm as not freely handing them out to anybody and everybody. So where do we draw the lines when we are building out tools?


### Where This Goes Next

BitProbe isn’t meant to be everything.

It’s an external, edge-aware scanner that focuses on accuracy and prioritization. Future work will revolve around:

* continuous monitoring

* better reporting workflows

* clearer executive summaries

* tighter correlation between exposure and impact

The longer I build the more ideas as "features" come to mind. But I remember, other capabilities belong in other tools — and that separation is intentional.

### Closing Thoughts

Building BitProbe reminded me that good security tooling isn’t about finding more issues. It’s about helping people make better decisions with the information they already have.

If BitProbe saves someone time, reduces noise, or helps them explain risk more clearly to a non-technical audience, then it’s doing its job.

That’s enough for me.