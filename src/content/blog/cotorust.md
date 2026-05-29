---
title: 'C to Rust - Thoughts of the past, and the future'
excerpt: 'My thoughts on modern programming with Rust'
image: ''
date: 'May 28, 2026'
readTime: '15 min read'
author: 'Ryan Wilson'
category: ['Development'] 
tags: ['Rust','programming']
draft: false
---

I've written C (a lot of it), survived C++ (barely), and spent most of my time in TypeScript, Go, and Python. So why did I spend months fighting a compiler that treats me like a suspect? Because the future demanded it — and honestly, so did my past.

---

## 01 — It Started With a Clan Website and a Copy of PC Gamer

My father worked in IT. At eight years old, I built my first PC. That same era gave me Medal of Honor: Allied Assault, online gaming clans, freewebs.com, clansitemanager, and proboards — the go-to platforms for every group of teenagers who wanted to look like they took their Moh:AA or CoD military-style gaming groups seriously.

At some point I decided I wanted to build my own site with real code. I opened Microsoft Word, looked up HTML tags on MSN/Yahoo, and produced something I was inexplicably proud of — a page that rendered text in Internet Explorer. I didn't know what CSS was. JavaScript was new and limited. Flash and Perl were everywhere and RoR was the only thing around, only a few years old, that only the pros knew about. I had no idea what I was doing, and I went back to Freewebs pretty quickly.

But the curiosity was there. By the time I was ten, cplusplus.com was where everyone said you learned to program. I got as far as namespaces, if statements, and conditionals before giving up. At least, I told myself, I could reinstall Windows XP for all my friends when Limewire gave them viruses.

---

## 02 — The Class I Was Sure I Would Fail

Years later, after not knowin what I wanted to do with my life and going on nothing more than "I like computers", I enrolled in an Associate's program in Information Technology with a concentration in Network Administration which at the time, was the only option. First semester: electrical engineering, logic gates, breadboards, and Cisco Packet Tracer topologies. I was the first to finish every exam. Networking made sense to me in a way that felt almost instinctive.

When it came time to choose a track — Microsoft or Linux — I went Linux. Partly because of a classmate, partly because a speaker from Rackspace who was a graduate from the program, came through and I hung on every word he said. I wanted exactly what he was describing.

What the Linux track came with that the Microsoft track didn't: C programming.

I hated it. Every second of it. Pointers made no sense. I couldn't get the concept to land no matter how many times it was explained. I sat with that for weeks, certain I was about to fail, and then the professor announced the final project: write a packet sniffer in C. Minimum viable tcpdump. Under 100 lines of sample code, go figure it out, good luck.

> That project forced me to know every layer. To create buffers, read headers byte by byte, pull out source and destination ports, sequence numbers, flags, checksums. If you don't understand TCP/IP, the code doesn't work. If your code doesn't work, you don't understand TCP/IP. If your compiler wouldn't compile, or you had a segfault, you didn't know C. There was nowhere to hide.

I finished with an A-. Granted, it was graded gratiously. Good C code takes years of practice to write well, not a single college semester. More importantly, something had clicked — and it has never unclicked. C is still my favorite language, and I always feel like I'm reuniting with an old friend. I wish I had more excuses to use it, but I have almost none nowadays. What learning C gave me, and refusing to quit gave me, was the ability to analytically reason about what's happening under the hood of any language. When a framework does something that looks like magic, I can at least form a hypothesis about what's actually going on. That matters more than people realize, especially when things break. And with C, that was often. Debugging C code can quickly become one of the most frustrating experiences someone learning to program can experience. C is the land of segfaults. 

---

## 03 — The Languages I Actually Lived In

C++ was always nearby, and I know enough to navigate it. But I've largely avoided committing to it as a primary language — the footguns are legendary. Templates that produce error messages spanning multiple pages. RAII that behaves subtly differently depending on which committee decision made it into which compiler version. The language has grown so large over decades that no one person fully knows it anymore. It's powerful, but it's sharp in ways that feel accidental rather than intentional. It's so big, that even professional C++ programmers don't know the language. I've never experienced it, but I would imagine code reviews would not be fun. Or, reading the source code from someone who does things completely different than one is used to seeing.

So in practice, my world shifted toward TypeScript, Go, and Python. High productivity, fast feedback loops, teams that can actually read each other's code. But a piece of me always felt the pull back towards low level control— and that's exactly where Rust grabbed me. And as a C programmer, it was a huge adjustment. But again, I was intrigued and interested.

---

## 04 — The Borrow Checker: An Adversary That Becomes an Ally

Nothing prepares you for the borrow checker. I'll be the first to admit it — I drew a picture of how it works just to make it make sense to me. I watched a lot of YouTube. I understand it now, but I still struggle sometimes, and that's an honest thing to say.

Coming from C, you think you understand memory. And you do, in a raw mechanical sense. But Rust doesn't just ask you to manage memory; it asks you to *prove* to the compiler that your management is correct, right now, at compile time, no exceptions.

```rust
// This feels reasonable coming from C or TypeScript
let s1 = String::from("hello");
let s2 = s1;
println!("{}", s1); // Error: value moved into s2
```

That error made me furious the first time. In C, you'd just have two pointers to the same memory and quietly introduce a race condition that you may or may not have to track down later on. In TypeScript, both variables happily reference the same object. Rust says: no. One owner. End of discussion.

The early weeks are humbling. You're writing simple things and hitting walls. But here's what I've come to believe — and I'm aware it's an unconventional take: Rust might actually be a good first programming language. If you can stick with it, you never pick up the bad habits that C and C++ programmers spend years trying to unlearn before they transfer them directly into Rust and call it "fighting the borrow checker." What they're really fighting is their own ingrained assumptions about memory. Someone who learned Rust first never has those assumptions.

> The borrow checker isn't your enemy. It's a formal proof engine disguised as a compiler error. Every time it rejects your code, it's telling you something true about memory that other languages were willing to ignore until runtime.

There's another thing that's happened as I've gotten more comfortable with Rust: I read C++ differently now. I can see the ownership semantics that were always there, just unenforced. Rust may end up making me a better C++ programmer — not because I'll suddenly enjoy C++ (I won't), but because it's taught me to think about resource ownership with a precision the language itself never required.

---

## 05 — The Rust Book Is Genuinely Exceptional

Programming languages live or die by their documentation, and Rust's official book — *The Rust Programming Language*, freely available at [doc.rust-lang.org](https://doc.rust-lang.org/book/) — is one of the best pieces of technical writing I've encountered anywhere in this industry.

It doesn't just teach syntax. It teaches you *why* the language makes the choices it makes. The chapters on ownership, references, and lifetimes are patient, thorough, and built to develop intuition rather than just demonstrate mechanics. Compare that to learning C++ from Stroustrup, where you feel like you're being assessed for correctness rather than taught. (Upcoming project regarding & including this book, by the way. 3/4 of the way there so shouldn't be much longer)

The Book is also honest about where things get hard. It doesn't pretend lifetimes are intuitive or that the borrow checker is frictionless. It says: this is the tradeoff Rust made, here's why, here's how to work with it. Pair it with `rustlings` for hands-on practice and `rust-analyzer` in your editor, and you have one of the best onramps to a systems language that exists today.

---

## 06 — The Real Reason: Future-Proofing

Enjoyment aside, the honest driver behind learning Rust is strategic. The industry is moving, and it's moving fast. Multiple major organizations have formally restricted or outright prohibited new projects from being written in memory-unsafe languages — and C++ is increasingly on that list. Not to mention, AI and vibe-coding is becoming increasingly popular. Rust makes it hard to write bad code. For AI systems that tend to write a lot of slop, this is a good thing. Will it be optimized? Probably not. Will it be the best Rust code? Probably not. But will it be memory safe? Yes. Very likely.

This isn't idealism. It's policy backed by incident data. The overwhelming majority of critical CVEs in systems software trace back to memory safety issues: buffer overflows, use-after-free, race conditions, uninitialized memory reads. These are not exotic edge cases — they are the bread and butter of systems vulnerability research. Rust eliminates the entire class at the compiler level.

| Organization | Where Rust Landed |
|---|---|
| Microsoft | Windows kernel components, Azure infrastructure |
|---|---|
| Google | Android OS, core system components |
|---|---|
| AWS |          Firecracker VMM, internal services |
|---|---|
| Meta |            Backend infrastructure at scale |
|---|---|
| Linux Kernel | Official support for driver development |
|---|---|
| NSA / CISA | Published federal guidance recommending memory-safe languages |
|---|---|


The NSA and CISA have both published guidance recommending the adoption of memory-safe languages, explicitly naming Rust as a preferred alternative for systems work. When federal security agencies are making language recommendations, it's worth paying attention. Not to mention, many companies are requiring all of their new projects that they'd typically choose C++ for must be written in Rust.

For anyone working in security — offensive or defensive — Rust is increasingly the language the targets and the tools are written in. Understanding it isn't optional; it's a professional obligation. Writing tools in Rust also means writing tools that won't become CVEs themselves, which matters a great deal when you're in the business of finding vulnerabilities in other people's code.

> Memory-safe code isn't just good software engineering. In the security domain, it's the difference between a tool and a liability.

---

## 07 — About Zig: The Interesting Problem

Zig deserves to be taken seriously. It occupies a fascinating position: lower-level than Rust, no hidden control flow, `comptime` as a language feature rather than a macro system bolted on, and a refreshingly honest relationship with C interop. There's a purity to it — what you write is what runs, with almost no surprises.

But here's the honest assessment: Zig still needs a more compelling forcing function before I dedicate deep time to it. Rust already has the momentum — the toolchain, the ecosystem, the corporate backing, the government recommendations, and the job market. Zig's killer application hasn't fully crystallized yet, and until there's a clearer "this is the thing Zig enables that nothing else can," the opportunity cost of learning it before mastering Rust is hard to justify. Especially when it's so new, and most of the code basis that require a language that works on such a low level and aren't running C++ or Rust, are running C. 

That said — the Zig story isn't over, and it's worth watching. When the reason shows up, it'll be obvious. And given a background in C and systems thinking, picking it up at that point won't take long. I've been hearing a lot of good things, and I want to learn more about it. Everyone says it was created specifically to be a modern C, and once it stablizes to a point I'm not relearning the same language from scratch again a year or two after learning it once because it changed so much, then I'll likely give it a fair shot at completely replacing C for me in areas where I'd usually choose C. Which honestly, is not often anymore.

---

## The Bottom Line

The thread running through all of this — from an eight-year-old looking up HTML tags on MSN, to a student who almost failed a C programming class and instead built a packet sniffer, to someone now working through the borrow checker with hand-drawn diagrams — is that the hard things are the ones worth doing.

I may have spent my career on the systems side of things, however, programming languages are the reason we have any of this at all. Smart minds coming together, and building the software and tools we utilize today. Everybody should learn to program. If you hate it now, would you hate it if you actually learned? I don't mean learn a language, I mean actually learn to program. Thinking like a programmer is the skill, the language is just a tool.

Rust is hard. It was hard for me coming from C, and I think it's hard for everybody. But the compiler's stubbornness is exactly the point. In systems work, in security work, in anything that needs to run fast and stay safe, every wall the borrow checker puts up is a bug it found before your users did, or worse.

The future of systems programming has Rust in it. The future of secure software has Rust in it. If I felt like I understood it enough to use it exclusively, I would. Just because I know and have learned that repetition is the only way to get better. Practice. Right now Rust is in the spotlight, and somewhere along the way, and I suspect soon, Zig will have its moment too. But right now, especially for me, there's still more Rust to learn. 