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
    id: '0x01', slug: 'reverse-engineering', tag: 'reversing', date: '2026.06.01', mins: 14, pinned: true,
    title: 'Reverse Engineering: Techniques & Tools',
    dek: 'A field guide to pulling apart an unknown binary — from first triage to a clean control-flow graph.',
    toc: ['intro', 'first triage', 'static vs dynamic', 'the toolchain', 'takeaways'],
    body: [
      LEGAL,
      { t: 'p', x: 'Reverse engineering is just reading — slowly, with the wrong language and no comments. The skill is not memorizing opcodes; it is building a loop where every pass tells you a little more about what the program wants. Triage, hypothesize, confirm, repeat.' },
      { t: 'h', x: '01 · first triage' },
      { t: 'p', x: 'Before a disassembler, answer the cheap questions. What is it? How is it packed? What strings leak out? Five minutes here saves an hour of staring at the wrong function.' },
      { t: 'code', label: 'recon', lines: [
        { t: 'cmd', x: 'file ./firmware.bin && stat -c%s ./firmware.bin' },
        { t: 'out', x: 'firmware.bin: ELF 32-bit LSB executable, ARM, statically linked' },
        { t: 'out', x: '262144' },
        { t: 'cmd', x: 'strings -n 8 firmware.bin | grep -iE "key|pass|http|/dev"' },
        { t: 'out', x: '/dev/ttyS0   POST /api/v1/auth   firmware-update.sig' },
      ]},
      { t: 'p', x: 'Entropy is your packer detector. A flat, high-entropy blob usually means compression or encryption — unpack before you analyze, or you are reading noise.' },
      { t: 'h', x: '02 · static vs dynamic' },
      { t: 'p', x: 'Static analysis reads the program without running it: safe, complete, and blind to runtime state. Dynamic analysis runs it under a microscope: honest about what actually executes, but only along the paths you trigger. Real work braids the two — use static to find the interesting function, dynamic to watch it breathe.' },
      { t: 'list', x: [
        'Static — disassembly, decompilation, string & xref maps. Start here.',
        'Dynamic — debugger breakpoints, syscall/strace, emulation under QEMU.',
        'Symbolic — let a solver walk the branches when input space is small.',
      ]},
      { t: 'h', x: '03 · the toolchain' },
      { t: 'p', x: 'Tools are interchangeable; the workflow is not. Load, auto-analyze, rename as you understand, annotate so future-you can read it. This is radare2, but Ghidra or Binary Ninja get you to the same control-flow graph.' },
      { t: 'code', label: 'radare2', lines: [
        { t: 'cmd', x: 'r2 -A ./firmware.bin' },
        { t: 'out', x: '[x] Analyze all flags using analysis.fcn (aaa)' },
        { t: 'prompt', p: '[0x00008000]>', x: 'afl | grep -i auth' },
        { t: 'out', x: '0x00008410  61  sym.check_auth' },
        { t: 'prompt', p: '[0x00008000]>', x: 's sym.check_auth; pdf' },
        { t: 'ok', x: ';-- comparing user hash against burned-in constant — patchable' },
      ]},
      { t: 'p', x: 'The moment a function gets a real name, the graph stops being hieroglyphics. check_auth comparing against a baked-in constant is the whole story: a hardcoded credential you would never have found by fuzzing the front door.' },
      { t: 'ascii', x: '   entry ──▶ parse_cfg ──▶ check_auth ──┬─▶ [ok]  unlock_shell\n                                        └─▶ [bad] reboot()' },
      { t: 'h', x: '04 · takeaways' },
      { t: 'list', x: [
        'Triage first — file, strings, entropy. Never disassemble blind.',
        'Name things the instant you understand them; the graph clears up fast.',
        'Static finds the function, dynamic proves the behavior. Use both.',
        'Document as you go. A reversed binary you can’t re-read is a binary you have to reverse twice.',
      ]},
    ],
  },
  {
    id: '0x02', slug: 'esp32-marauder', tag: 'hardware', date: '2026.05.28', mins: 9,
    title: 'ESP32 Marauder: A Device Anyone Should Know',
    dek: 'A $15 board that turns Wi-Fi and BLE reconnaissance into a pocket-sized teaching tool.',
    toc: ['what it is', 'why it matters', 'flashing', 'in the field'],
    body: [
      LEGAL,
      { t: 'p', x: 'The Marauder is firmware that turns a cheap ESP32 into a Wi-Fi and Bluetooth survey tool: scan, list, sniff, and — in a lab — demonstrate why open networks are open in every sense. It is the friendliest on-ramp to RF security there is.' },
      { t: 'h', x: '01 · why it matters' },
      { t: 'p', x: 'Most people never see the radio layer. The Marauder makes it tangible: a list of every beacon in the room, the probe requests phones leak by name, the way a deauth frame is just an unauthenticated management packet nobody checks. Seeing it once changes how you think about “connected.”' },
      { t: 'h', x: '02 · flashing' },
      { t: 'code', label: 'flash', lines: [
        { t: 'cmd', x: 'esptool.py --chip esp32 --port /dev/ttyUSB0 write_flash 0x0 marauder.bin' },
        { t: 'out', x: 'Connecting........ Chip is ESP32-D0WD (revision 1)' },
        { t: 'ok', x: 'Hash of data verified. Hard resetting via RTS pin...' },
      ]},
      { t: 'p', x: 'A touchscreen build gives you a menu; a headless build talks over serial. Either way you are one boot away from a spectrum you could never see before.' },
      { t: 'h', x: '03 · in the field' },
      { t: 'p', x: 'In an authorized assessment it is a recon multiplier: map the APs, spot rogue access points impersonating the corporate SSID, and quantify how much a phone announces about its owner before it ever connects. In a classroom it is the cheapest “oh” moment in security.' },
    ],
  },
  {
    id: '0x03', slug: 'advanced-pentest', tag: 'pentest', date: '2026.05.19', mins: 21,
    title: 'A Glimpse Into Real Advanced Penetration Testing',
    dek: 'Past the vuln scanner: chaining low-severity findings into a story that ends at domain admin.',
    toc: ['the myth', 'recon', 'the chain', 'the report'],
    body: [
      LEGAL,
      { t: 'p', x: 'Advanced pentesting is rarely a single magic exploit. It is patience and bookkeeping: a dozen “medium” findings nobody fixed, assembled in the right order, until the sum is critical. The exploit is the punchline; the recon is the joke.' },
      { t: 'h', x: '01 · the myth' },
      { t: 'p', x: 'Scanners find vulnerabilities. Pentesters find paths. A report full of CVEs with no narrative is a to-do list; a report with one attack chain is a wake-up call. The difference is whether you stopped at “this is broken” or kept going to “and here is what that costs you.”' },
      { t: 'h', x: '02 · recon' },
      { t: 'p', x: 'Enumeration is the whole game. Hosts, services, versions, names, trust relationships — catalogued, not skimmed. The finding that ends the engagement is almost always something boring you wrote down on day one.' },
      { t: 'code', label: 'enum', lines: [
        { t: 'cmd', x: 'nmap -sV -p- --min-rate 2000 10.10.0.0/24 -oA scope' },
        { t: 'out', x: '10.10.0.14  445/tcp  microsoft-ds   (SMB signing: disabled)' },
        { t: 'out', x: '10.10.0.31  8080/tcp jenkins        (auth: anonymous read)' },
        { t: 'ok', x: 'two mediums. on their own, noise. together, a path.' },
      ]},
      { t: 'h', x: '03 · the chain' },
      { t: 'list', x: [
        'Anonymous Jenkins read → leaked build creds in a job config.',
        'Reused creds → valid SMB login on an unsigned share.',
        'Writable share → staged payload → a service account executes it.',
        'Service account → local admin → token to a domain admin session.',
      ]},
      { t: 'p', x: 'No step is a zero-day. Every step is a default left on, a password reused, a permission too wide. That is what real engagements look like.' },
      { t: 'h', x: '04 · the report' },
      { t: 'p', x: 'The deliverable is not proof you are clever — it is proof they can fix it. Tell the story once as a chain, then break each link into a finding the right team can own. A great report gets patched. A flashy one gets framed.' },
    ],
  },
  {
    id: '0x04', slug: 'wifi-deauth', tag: 'wireless', date: '2026.05.07', mins: 5,
    title: 'WiFi Deauth: Lab Notes',
    dek: 'Why an unauthenticated management frame can knock a client offline — and what 802.11w does about it.',
    toc: ['the frame', 'the fix'],
    body: [
      LEGAL,
      { t: 'p', x: 'A deauthentication frame is a management packet that, in classic 802.11, carries no authentication of its own. Anyone who can transmit on the channel can forge one and tell a client the AP has dropped it. The client believes it, because there was never anything to verify.' },
      { t: 'h', x: '01 · the fix' },
      { t: 'p', x: 'Protected Management Frames (802.11w) sign these packets so a forged deauth is simply ignored. The lesson generalizes: any control plane that trusts unauthenticated input is a control plane you do not really control.' },
    ],
  },
  {
    id: '0x05', slug: 'osint-ghost-recon', tag: 'osint', date: '2026.04.22', mins: 11,
    title: 'OSINT: Ghost Recon on a Budget',
    dek: 'How much of an org’s attack surface is sitting in public records, waiting to be read.',
    toc: ['the surface', 'discipline'],
    body: [
      LEGAL,
      { t: 'p', x: 'Open-source intelligence is the unglamorous half of recon: certificate transparency logs, DNS history, job postings that name the exact stack, and metadata in published PDFs. None of it touches the target. All of it shapes the attack.' },
      { t: 'h', x: '01 · discipline' },
      { t: 'p', x: 'The trap is collecting everything and concluding nothing. Good OSINT is a question with a budget: what do I need to know to plan the next step, and what is the cheapest public source that answers it?' },
    ],
  },
  {
    id: '0x06', slug: 'weak-crypto', tag: 'crypto', date: '2026.04.03', mins: 16,
    title: 'Cracking Weak Crypto for Fun',
    dek: 'ECB penguins, reused nonces, and homemade ciphers — a tour of how crypto fails in practice.',
    toc: ['it’s never the math', 'patterns'],
    body: [
      LEGAL,
      { t: 'p', x: 'Crypto rarely breaks because the algorithm is weak. It breaks because someone used it wrong: a block mode that leaks structure, a nonce reused until it is not a nonce, a key derived from a four-digit PIN. The attack is pattern recognition, not number theory.' },
      { t: 'h', x: '01 · patterns' },
      { t: 'p', x: 'Identical plaintext blocks producing identical ciphertext blocks is ECB, and ECB tells you the shape of the data. Once you can see structure through a cipher, you are no longer attacking the cipher — you are reading around it.' },
    ],
  },
  {
    id: '0x07', slug: 'hardware-implant', tag: 'hardware', date: '2026.03.18', mins: 8,
    title: 'Soldering a Hardware Implant',
    dek: 'Tapping a UART header you were never meant to find, on a board you are authorized to open.',
    toc: ['find the header', 'listen'],
    body: [
      LEGAL,
      { t: 'p', x: 'Most embedded devices ship with a debug UART the manufacturer forgot to remove — four unlabeled pads near the SoC. Find ground, find the one that idles high, and you have likely found TX. Hardware hacking often starts with a multimeter, not an exploit.' },
      { t: 'h', x: '01 · listen' },
      { t: 'p', x: 'Hook a logic analyzer, guess the baud rate, and watch the boot log scroll by. Bootloaders are chatty; they will tell you the architecture, the OS, and sometimes a root shell prompt that was never meant to be reachable.' },
    ],
  },
  {
    id: '0x08', slug: 'article-slug', tag: 'tag', date: '2026.06.02', mins: 0,
    title: 'Article Title',
    dek: 'One-sentence hook that tells the reader exactly what they will walk away knowing.',
    toc: ['section one', 'section two', 'section three'],
    body: [
      LEGAL,
      { t: 'p', x: 'Opening paragraph.' },
      { t: 'h', x: '01 · section one' },
      { t: 'p', x: 'Body text.' },
      { t: 'code', label: 'sh', lines: [
        { t: 'cmd', x: 'command here' },
        { t: 'out', x: 'output here' },
      ]},
      { t: 'h', x: '02 · section two' },
      { t: 'p', x: 'Body text.' },
      { t: 'list', x: [
        'Point one.',
        'Point two.',
        'Point three.',
      ]},
      { t: 'h', x: '03 · section three' },
      { t: 'p', x: 'Closing paragraph.' },
    ],
  },
]

export function byId(id: string): Article {
  return ARTICLES.find((a) => a.id === id) ?? ARTICLES[0]!
}
