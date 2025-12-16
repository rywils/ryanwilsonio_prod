---
title: 'My Journey from Next.js to Astro (Via Several Existential Crises)'
excerpt: 'Building with Astro coming from React, the differences, and the lessons.'
image: ''
date: 'December 14, 2025'
readTime: '3 min read'
author: 'Ryan Wilson'
category: ['Development'] 
tags: ['React', 'Astro', 'Next.js']
draft: false
---

### How it started

I heard great things about Astro. The performance numbers were impressive, the developer experience was supposedly top-notch, and the community couldn't stop raving about it. So naturally, I decided to rebuild my entire website with it.

What could go wrong?

### Attempt #1: The "Wait, This Is Just React" Phase

I dove in headfirst, creating my first Astro project with the confidence of someone who definitely should have opened Figma first. But design planning is for people with impulse control, and I was busy writing code.

Three days in, I realized something alarming: I was literally just writing React components. Every single one. `.astro` files? Nah, `.tsx` all the way. Client directives? Sure, but `client:load` on everything because I didn't trust anything else yet.

Then came the coffee-fueled epiphany: if I was going to write everything in React anyway, why exactly did I abandon Next.js? The framework I actually know?

*Delete. Restart.*

### Attempts #2 Through... I Lost Count

What followed was a beautiful cycle of enthusiasm, confusion, and the mounting realization that not having a design plan was, in fact, a terrible idea.

Each iteration started the same way: "This time will be different." And each iteration ended with me staring at a half-finished site that looked completely different from the last one. Minimalist portfolio? Maximalist blog? Something that would make a design system cry? Who knows—I certainly didn't.

The problem wasn't Astro. The problem was me trying to learn a new framework while also figuring out what I even wanted the site to look like. No Figma mockups, no design plan—just vibes and increasingly questionable color choices.

### The Breakthrough: Actually Learning Astro

Eventually, somewhere between "I've lost all sense of time" and "maybe I should just use WordPress," something clicked. I stopped trying to force my React patterns into Astro and started actually *using* Astro components the way they were intended.

Props flowing down, HTML-like syntax, keeping things static by default, sprinkling in interactivity only where needed. It felt different, but good. Like switching from an automatic to a manual transmission—more thinking involved, but more control too.

### The Verdict: It's Complicated (But In a Good Way)

Here's where I landed: Astro is genuinely fantastic. The speed is absolutely no joke. The component model makes sense once you stop fighting it. The ability to mix frameworks when needed is genuinely clever.

But sometimes React is just *faster* for certain interactive pieces. My muscle memory is strong, and occasionally I need to ship something quickly. That's fine. Astro doesn't judge.

For context: Svelte is still my favorite when I want to feel like a programming wizard. Vue is right behind it. Next.js remains my daily driver because old habits die hard, and it's a great framework that I know inside and out.

But Astro? Astro feels like the framework that's making me a better developer by forcing me to think about what actually needs to be interactive. It feels... vanilla in a way? Or maybe that's just my inexperience talking. Either way, there's something refreshingly straightforward about it.

### Moving Forward

Will I rebuild everything in Astro? Probably not. Will I reach for it on new projects? Absolutely. Do I regret the seven false starts and design-by-chaos approach?

Well, let's just say I've learned the value of opening Figma *before* opening VS Code.

But honestly? No regrets. Every scrapped attempt taught me something, whether it was about Astro's architecture or my own tendency to overthink color palettes. And now I've got a website that's fast, a framework I'm genuinely excited to use more, and a slightly embarrassing git history.

Welcome to the site. It loads fast because Astro is brilliant. If you find any bugs, well, those are mine.