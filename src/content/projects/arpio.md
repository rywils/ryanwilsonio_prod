---
title: "Arpio"
description: "A Fast, minimal LAN discovery tool using ARP and mDNS."
image: "/noimage.png"
tags: ["Go"]
github: "https://github.com/rywils/arpio"
category: ["Systems/Cloud", "Development" ]
technologies: ["Go"]
featured: true
publishDate: 2025-12-17T00:00:00.000Z
---


(Linux + MacOS)
Fast, minimal LAN discovery using ARP and mDNS.
Single binary.



### Features

* Active ARP discovery (Linux + macOS)
* Passive ARP listening
* mDNS hostname discovery
* Live watch mode
* JSON output
* Auto interface detection or manual override


Build
```bash
go build
```

> ARP requires elevated privileges.



### Usage
Active scan
```bash
sudo ./arpio scan
```

Passive scan (listen only)
```bash
sudo ./arpio scan --passive
```
JSON output
```bash
sudo ./arpio scan --json
```
Select interface
```bash
sudo ./arpio scan --iface en0
```
Disable mDNS
```bash
sudo ./arpio scan --mdns=false
```



Watch mode (live table)
```bash
sudo ./arpio watch
sudo ./arpio watch --iface en0 --interval 2s
```

Passive watch:
```bash
sudo ./arpio watch --passive
```



Notes

* Linux uses native ARP sockets
* macOS uses pcap for ARP capture and injection
* Results depend on network activity and privileges

