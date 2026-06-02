export interface CodeLine {
  t: 'cmd' | 'out' | 'ok' | 'prompt'
  x: string
  p?: string
}

export interface ArticleBlock {
  t: 'h' | 'p' | 'code' | 'ascii' | 'note' | 'list'
  x?: string | string[]
  label?: string
  lines?: CodeLine[]
}

export interface Article {
  id: string
  slug: string
  tag: string
  date: string
  mins: number
  pinned?: boolean
  title: string
  dek: string
  toc: string[]
  body: ArticleBlock[]
}

const LEGAL: ArticleBlock = {
  t: 'note',
  x: 'Authorized targets only. Everything here assumes a signed scope or your own lab. Don’t point tools at systems you don’t own or have written permission to test.',
}

export const ARTICLES: Article[] = [
  {
    id: '0x01',
    slug: 'reverse-engineering',
    tag: 'reversing',
    date: '2026.06.01',
    mins: 14,
    title: 'Reverse Engineering: Techniques & Tools',
    dek: 'A field guide to pulling apart an unknown binary — from first triage to a clean control-flow graph.',
    toc: ['intro', 'first triage', 'static vs dynamic', 'the toolchain', 'takeaways'],
    body: [
      LEGAL,
      {
        t: 'p',
        x: 'Reverse engineering is just reading — slowly, with the wrong language and no comments. The skill is not memorizing opcodes; it is building a loop where every pass tells you a little more about what the program wants. Triage, hypothesize, confirm, repeat.',
      },
      { t: 'h', x: '01 · first triage' },
      {
        t: 'p',
        x: 'Before a disassembler, answer the cheap questions. What is it? How is it packed? What strings leak out? Five minutes here saves an hour of staring at the wrong function.',
      },
      {
        t: 'code',
        label: 'recon',
        lines: [
          { t: 'cmd', x: 'file ./firmware.bin && stat -c%s ./firmware.bin' },
          { t: 'out', x: 'firmware.bin: ELF 32-bit LSB executable, ARM, statically linked' },
          { t: 'out', x: '262144' },
          { t: 'cmd', x: 'strings -n 8 firmware.bin | grep -iE "key|pass|http|/dev"' },
          { t: 'out', x: '/dev/ttyS0   POST /api/v1/auth   firmware-update.sig' },
        ],
      },
      {
        t: 'p',
        x: 'Entropy is your packer detector. A flat, high-entropy blob usually means compression or encryption — unpack before you analyze, or you are reading noise.',
      },
      { t: 'h', x: '02 · static vs dynamic' },
      {
        t: 'p',
        x: 'Static analysis reads the program without running it: safe, complete, and blind to runtime state. Dynamic analysis runs it under a microscope: honest about what actually executes, but only along the paths you trigger. Real work braids the two — use static to find the interesting function, dynamic to watch it breathe.',
      },
      {
        t: 'list',
        x: [
          'Static — disassembly, decompilation, string & xref maps. Start here.',
          'Dynamic — debugger breakpoints, syscall/strace, emulation under QEMU.',
          'Symbolic — let a solver walk the branches when input space is small.',
        ],
      },
      { t: 'h', x: '03 · the toolchain' },
      {
        t: 'p',
        x: 'Tools are interchangeable; the workflow is not. Load, auto-analyze, rename as you understand, annotate so future-you can read it. This is radare2, but Ghidra or Binary Ninja get you to the same control-flow graph.',
      },
      {
        t: 'code',
        label: 'radare2',
        lines: [
          { t: 'cmd', x: 'r2 -A ./firmware.bin' },
          { t: 'out', x: '[x] Analyze all flags using analysis.fcn (aaa)' },
          { t: 'prompt', p: '[0x00008000]>', x: 'afl | grep -i auth' },
          { t: 'out', x: '0x00008410  61  sym.check_auth' },
          { t: 'prompt', p: '[0x00008000]>', x: 's sym.check_auth; pdf' },
          { t: 'ok', x: ';-- comparing user hash against burned-in constant — patchable' },
        ],
      },
      {
        t: 'p',
        x: 'The moment a function gets a real name, the graph stops being hieroglyphics. check_auth comparing against a baked-in constant is the whole story: a hardcoded credential you would never have found by fuzzing the front door.',
      },
      {
        t: 'ascii',
        x: '   entry ──▶ parse_cfg ──▶ check_auth ──┬─▶ [ok]  unlock_shell\n                                        └─▶ [bad] reboot()',
      },
      { t: 'h', x: '04 · takeaways' },
      {
        t: 'list',
        x: [
          'Triage first — file, strings, entropy. Never disassemble blind.',
          'Name things the instant you understand them; the graph clears up fast.',
          'Static finds the function, dynamic proves the behavior. Use both.',
          'Document as you go. A reversed binary you can’t re-read is a binary you have to reverse twice.',
        ],
      },
    ],
  },
  {
    id: '0x02',
    slug: 'esp32-marauder',
    tag: 'hardware',
    date: '2026.05.28',
    mins: 9,
    title: 'ESP32 Marauder: A Device Anyone Should Know',
    dek: 'A $15 board that turns Wi-Fi and BLE reconnaissance into a pocket-sized teaching tool.',
    toc: ['what it is', 'why it matters', 'flashing', 'in the field'],
    body: [
      LEGAL,
      {
        t: 'p',
        x: 'The Marauder is firmware that turns a cheap ESP32 into a Wi-Fi and Bluetooth survey tool: scan, list, sniff, and — in a lab — demonstrate why open networks are open in every sense. It is the friendliest on-ramp to RF security there is.',
      },
      { t: 'h', x: '01 · why it matters' },
      {
        t: 'p',
        x: 'Most people never see the radio layer. The Marauder makes it tangible: a list of every beacon in the room, the probe requests phones leak by name, the way a deauth frame is just an unauthenticated management packet nobody checks. Seeing it once changes how you think about “connected.”',
      },
      { t: 'h', x: '02 · flashing' },
      {
        t: 'code',
        label: 'flash',
        lines: [
          {
            t: 'cmd',
            x: 'esptool.py --chip esp32 --port /dev/ttyUSB0 write_flash 0x0 marauder.bin',
          },
          { t: 'out', x: 'Connecting........ Chip is ESP32-D0WD (revision 1)' },
          { t: 'ok', x: 'Hash of data verified. Hard resetting via RTS pin...' },
        ],
      },
      {
        t: 'p',
        x: 'A touchscreen build gives you a menu; a headless build talks over serial. Either way you are one boot away from a spectrum you could never see before.',
      },
      { t: 'h', x: '03 · in the field' },
      {
        t: 'p',
        x: 'In an authorized assessment it is a recon multiplier: map the APs, spot rogue access points impersonating the corporate SSID, and quantify how much a phone announces about its owner before it ever connects. In a classroom it is the cheapest “oh” moment in security.',
      },
    ],
  },
  {
    id: '0x03',
    slug: 'advanced-pentest',
    tag: 'pentest',
    date: '2026.05.19',
    mins: 21,
    title: 'A Glimpse Into Real Advanced Penetration Testing',
    dek: 'Past the vuln scanner: chaining low-severity findings into a story that ends at domain admin.',
    toc: ['the myth', 'recon', 'the chain', 'the report'],
    body: [
      LEGAL,
      {
        t: 'p',
        x: 'Advanced pentesting is rarely a single magic exploit. It is patience and bookkeeping: a dozen “medium” findings nobody fixed, assembled in the right order, until the sum is critical. The exploit is the punchline; the recon is the joke.',
      },
      { t: 'h', x: '01 · the myth' },
      {
        t: 'p',
        x: 'Scanners find vulnerabilities. Pentesters find paths. A report full of CVEs with no narrative is a to-do list; a report with one attack chain is a wake-up call. The difference is whether you stopped at “this is broken” or kept going to “and here is what that costs you.”',
      },
      { t: 'h', x: '02 · recon' },
      {
        t: 'p',
        x: 'Enumeration is the whole game. Hosts, services, versions, names, trust relationships — catalogued, not skimmed. The finding that ends the engagement is almost always something boring you wrote down on day one.',
      },
      {
        t: 'code',
        label: 'enum',
        lines: [
          { t: 'cmd', x: 'nmap -sV -p- --min-rate 2000 10.10.0.0/24 -oA scope' },
          { t: 'out', x: '10.10.0.14  445/tcp  microsoft-ds   (SMB signing: disabled)' },
          { t: 'out', x: '10.10.0.31  8080/tcp jenkins        (auth: anonymous read)' },
          { t: 'ok', x: 'two mediums. on their own, noise. together, a path.' },
        ],
      },
      { t: 'h', x: '03 · the chain' },
      {
        t: 'list',
        x: [
          'Anonymous Jenkins read → leaked build creds in a job config.',
          'Reused creds → valid SMB login on an unsigned share.',
          'Writable share → staged payload → a service account executes it.',
          'Service account → local admin → token to a domain admin session.',
        ],
      },
      {
        t: 'p',
        x: 'No step is a zero-day. Every step is a default left on, a password reused, a permission too wide. That is what real engagements look like.',
      },
      { t: 'h', x: '04 · the report' },
      {
        t: 'p',
        x: 'The deliverable is not proof you are clever — it is proof they can fix it. Tell the story once as a chain, then break each link into a finding the right team can own. A great report gets patched. A flashy one gets framed.',
      },
    ],
  },
  {
    id: '0x04',
    slug: 'wifi-deauth',
    tag: 'wireless',
    date: '2026.05.07',
    mins: 5,
    title: 'WiFi Deauth: Lab Notes',
    dek: 'Why an unauthenticated management frame can knock a client offline — and what 802.11w does about it.',
    toc: ['the frame', 'the fix'],
    body: [
      LEGAL,
      {
        t: 'p',
        x: 'A deauthentication frame is a management packet that, in classic 802.11, carries no authentication of its own. Anyone who can transmit on the channel can forge one and tell a client the AP has dropped it. The client believes it, because there was never anything to verify.',
      },
      { t: 'h', x: '01 · the fix' },
      {
        t: 'p',
        x: 'Protected Management Frames (802.11w) sign these packets so a forged deauth is simply ignored. The lesson generalizes: any control plane that trusts unauthenticated input is a control plane you do not really control.',
      },
    ],
  },
  {
    id: '0x05',
    slug: 'osint-ghost-recon',
    tag: 'osint',
    date: '2026.04.22',
    mins: 11,
    title: 'OSINT: Ghost Recon on a Budget',
    dek: 'How much of an org’s attack surface is sitting in public records, waiting to be read.',
    toc: ['the surface', 'discipline'],
    body: [
      LEGAL,
      {
        t: 'p',
        x: 'Open-source intelligence is the unglamorous half of recon: certificate transparency logs, DNS history, job postings that name the exact stack, and metadata in published PDFs. None of it touches the target. All of it shapes the attack.',
      },
      { t: 'h', x: '01 · discipline' },
      {
        t: 'p',
        x: 'The trap is collecting everything and concluding nothing. Good OSINT is a question with a budget: what do I need to know to plan the next step, and what is the cheapest public source that answers it?',
      },
    ],
  },
  {
    id: '0x06',
    slug: 'weak-crypto',
    tag: 'crypto',
    date: '2026.04.03',
    mins: 16,
    title: 'Cracking Weak Crypto for Fun',
    dek: 'ECB penguins, reused nonces, and homemade ciphers — a tour of how crypto fails in practice.',
    toc: ['it’s never the math', 'patterns'],
    body: [
      LEGAL,
      {
        t: 'p',
        x: 'Crypto rarely breaks because the algorithm is weak. It breaks because someone used it wrong: a block mode that leaks structure, a nonce reused until it is not a nonce, a key derived from a four-digit PIN. The attack is pattern recognition, not number theory.',
      },
      { t: 'h', x: '01 · patterns' },
      {
        t: 'p',
        x: 'Identical plaintext blocks producing identical ciphertext blocks is ECB, and ECB tells you the shape of the data. Once you can see structure through a cipher, you are no longer attacking the cipher — you are reading around it.',
      },
    ],
  },
  {
    id: '0x07',
    slug: 'hardware-implant',
    tag: 'hardware',
    date: '2026.03.18',
    mins: 8,
    title: 'Soldering a Hardware Implant',
    dek: 'Tapping a UART header you were never meant to find, on a board you are authorized to open.',
    toc: ['find the header', 'listen'],
    body: [
      LEGAL,
      {
        t: 'p',
        x: 'Most embedded devices ship with a debug UART the manufacturer forgot to remove — four unlabeled pads near the SoC. Find ground, find the one that idles high, and you have likely found TX. Hardware hacking often starts with a multimeter, not an exploit.',
      },
      { t: 'h', x: '01 · listen' },
      {
        t: 'p',
        x: 'Hook a logic analyzer, guess the baud rate, and watch the boot log scroll by. Bootloaders are chatty; they will tell you the architecture, the OS, and sometimes a root shell prompt that was never meant to be reachable.',
      },
    ],
  },
  {
    id: '0x08',
    slug: 'hacker-manifesto',
    tag: 'culture',
    date: '1986.01.08',
    mins: 3,
    pinned: true,
    title: 'The Conscience of a Hacker',
    dek: "The Mentor's 1986 manifesto — written the night of his arrest. The text that defined what a hacker is.",
    toc: ['the manifesto'],
    body: [
      {
        t: 'ascii',
        x: '==Phrack Inc.==\nVolume One, Issue 7, Phile 3 of 10\n+++The Mentor+++  ·  January 8, 1986',
      },
      {
        t: 'note',
        x: 'The following was written shortly after his arrest. Reproduced from Phrack Issue 7 (1986). Originally titled "The Conscience of a Hacker."',
      },
      {
        t: 'p',
        x: 'Another one got caught today, it\'s all over the papers. "Teenager Arrested in Computer Crime Scandal", "Hacker Arrested after Bank Tampering"...',
      },
      { t: 'p', x: "Damn kids. They're all alike." },
      {
        t: 'p',
        x: "But did you, in your three-piece psychology and 1950's technobrain, ever take a look behind the eyes of the hacker? Did you ever wonder what made him tick, what forces shaped him, what may have molded him?",
      },
      { t: 'p', x: 'I am a hacker, enter my world...' },
      {
        t: 'p',
        x: "Mine is a world that begins with school... I'm smarter than most of the other kids, this crap they teach us bores me...",
      },
      { t: 'p', x: "Damn underachiever. They're all alike." },
      {
        t: 'p',
        x: "I'm in junior high or high school. I've listened to teachers explain for the fifteenth time how to reduce a fraction. I understand it. \"No, Ms. Smith, I didn't show my work. I did it in my head...\"",
      },
      { t: 'p', x: "Damn kid. Probably copied it. They're all alike." },
      {
        t: 'p',
        x: "I made a discovery today. I found a computer. Wait a second, this is cool. It does what I want it to. If it makes a mistake, it's because I screwed it up. Not because it doesn't like me...",
      },
      {
        t: 'list',
        x: [
          'Or feels threatened by me...',
          "Or thinks I'm a smart ass...",
          "Or doesn't like teaching and shouldn't be here...",
        ],
      },
      { t: 'p', x: "Damn kid. All he does is play games. They're all alike." },
      {
        t: 'p',
        x: "And then it happened... a door opened to a world... rushing through the phone line like heroin through an addict's veins, an electronic pulse is sent out, a refuge from the day-to-day incompetencies is sought... a board is found.",
      },
      { t: 'p', x: '"This is it... this is where I belong..."' },
      {
        t: 'p',
        x: "I know everyone here... even if I've never met them, never talked to them, may never hear from them again... I know you all...",
      },
      { t: 'p', x: "Damn kid. Tying up the phone line again. They're all alike..." },
      {
        t: 'p',
        x: "You bet your ass we're all alike... we've been spoon-fed baby food at school when we hungered for steak... the bits of meat that you did let slip through were pre-chewed and tasteless. We've been dominated by sadists, or ignored by the apathetic. The few that had something to teach found us willing pupils, but those few are like drops of water in the desert.",
      },
      {
        t: 'p',
        x: "This is our world now... the world of the electron and the switch, the beauty of the baud. We make use of a service already existing without paying for what could be dirt-cheap if it wasn't run by profiteering gluttons, and you call us criminals. We explore... and you call us criminals. We seek after knowledge... and you call us criminals. We exist without skin color, without nationality, without religious bias... and you call us criminals. You build atomic bombs, you wage wars, you murder, cheat, and lie to us and try to make us believe it's for our own good, yet we're the criminals.",
      },
      {
        t: 'p',
        x: 'Yes, I am a criminal. My crime is that of curiosity. My crime is that of judging people by what they say and think, not what they look like. My crime is that of outsmarting you, something that you will never forgive me for.',
      },
      {
        t: 'p',
        x: "I am a hacker, and this is my manifesto. You may stop this individual, but you can't stop us all... after all, we're all alike.",
      },
    ],
  },
]

export function byId(id: string): Article {
  return ARTICLES.find((a) => a.id === id) ?? ARTICLES[0]!
}
