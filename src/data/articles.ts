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
  {
    id: '0x03',
    slug: 'brazil-bureaucracy',
    tag: 'culture',
    date: '2026.02.10',
    mins: 3,
    title: 'Brazil: A Punch of Ignorance and Endless Bureaucracy',
    dek: 'On how regulatory bodies like Anatel kill innovation, block useful devices with no technical basis, and keep Brazilians alienated from their own freedom.',
    toc: [],
    body: [
      {
        t: 'p',
        x: "You must already know that Brazil is the country of bureaucracy. If you don't, maybe it's time to open your eyes and see reality. Every year more and more companies give up doing business in the Brazilian market (like Google with the Pixel) due to the high demands of regulatory bodies like Anatel, whose goal is to show who's in charge — creating an illusory image that Brazil is a rigorous, well-ordered country — which ends up pushing away great opportunities for technological growth and development.",
      },
      {
        t: 'p',
        x: "It's been a while since we've seen Brazilian bureaucracy reach levels that go beyond real necessity, directly and indirectly affecting the life of every Brazilian. The real reason behind all this remains unknown, but one thing is certain: it kills our market and makes life very difficult for many enthusiasts and researchers.",
      },
      {
        t: 'p',
        x: 'Anatel has been blocking various interesting devices with ignorant and baseless arguments. The case of the Flipper Zero is a perfect example — labeled a "threat to public safety" for having radio capabilities that supposedly allowed a criminal to "steal your car" or "open your gate." Something that in practice is not possible.',
      },
      {
        t: 'p',
        x: "Anatel most likely didn't bother to look away from fake TikTok trends and conduct actual studies about the device — studies that would have uncovered simple concepts like basic RF, encryption, rolling keys, 5G bands. Things any curious kid knows. Things they apparently don't.",
      },
      {
        t: 'p',
        x: "This may be the result of placing people incapable of understanding what they're doing into these agencies — people who entered through public service exams that serve no purpose other than funneling unqualified individuals with no real knowledge of the work they perform day to day.",
      },
      {
        t: 'p',
        x: "Brazil is a country where rebellion and opposition to the state becomes more necessary every day, so we don't become its accessories. Brazilians need to fight harder for their freedom and understand how alienated they are by speeches of diplomacy, false order, and peace. The government doesn't want your well-being — it wants your belongings. The Brazilian people grow more lost and alienated every day, and that cannot continue.",
      },
      {
        t: 'p',
        x: "This post is nothing technical — no tutorial, no news. It's an appeal for you, the reader, to reflect on your role in Brazilian society and understand once and for all that you are being used and deprived of your freedom and happiness with every breath.",
      },
    ],
  },
  {
    id: '0x04',
    slug: 're-tools-malware',
    tag: 'malware, re, tools',
    date: '2025.04.05',
    mins: 5,
    title: 'A Quick Dive Into RE Tools for Malware Analysis',
    dek: 'Static and dynamic tools every malware analyst needs — from strings and binwalk to Ghidra and REMnux.',
    toc: ['Static Analysis', 'Dynamic Analysis', 'Advanced Frameworks', 'Bonus Resources'],
    body: [
      LEGAL,
      {
        t: 'p',
        x: 'Malware analysis and reverse engineering are no longer niche skills. As adversaries get more sophisticated, defenders need to be able to look inside the binaries they encounter. The right toolset matches the phase of investigation — you static-analyze first, dynamic-analyze second, and pull out the heavy frameworks when the simpler tools hit their ceiling.',
      },
      { t: 'h', x: 'Static Analysis' },
      {
        t: 'p',
        x: 'Static analysis means examining a binary without running it. These tools let you extract indicators, understand file structure, and disassemble code safely.',
      },
      {
        t: 'list',
        x: [
          'strings — extracts readable character sequences from a binary. Great first pass for hardcoded URLs, registry keys, and other IOCs.',
          'binwalk — analyzes firmware and extracts embedded files from binary images. Useful when a sample packages additional payloads.',
          'exiftool — parses metadata from a wide range of file formats. Often reveals author info, creation timestamps, and origin clues.',
          'peStudio — analyzes Windows PE files for suspicious indicators: imports, strings, entropy sections, and MITRE ATT&CK mappings.',
          'objdump — disassembles executables. Part of GNU Binutils, available on every Linux install.',
          'hexdump — displays raw binary data in hex and ASCII. Low-level but indispensable for spotting magic bytes and manual analysis.',
        ],
      },
      { t: 'h', x: 'Dynamic Analysis' },
      {
        t: 'p',
        x: 'Dynamic analysis runs the sample in a controlled environment and observes its behavior. Sandbox it or run it on an isolated VM — never on your daily machine.',
      },
      {
        t: 'list',
        x: [
          'any.run — cloud-based interactive sandbox. Upload the sample and watch it execute in a real Windows environment without risking your own machine.',
          'strace — traces system calls on Linux. Reveals what files a process opens, what network connections it makes, and what signals it receives.',
          'ltrace — traces library calls. Complements strace for understanding higher-level behavior.',
          'GDB + pwndbg — GNU Debugger with the pwndbg plugin. Enhanced output and commands for stepping through binaries and inspecting memory.',
          'Sysinternals Suite — Windows monitoring tools (Process Monitor, Process Explorer, Autoruns). Essential for watching what a Windows sample does live.',
        ],
      },
      { t: 'h', x: 'Advanced Frameworks' },
      {
        t: 'p',
        x: "Ghidra is the NSA-developed open-source reverse engineering suite and my personal favorite. It handles disassembly and decompilation across multiple architectures, supports collaborative analysis, and has a plugin ecosystem. It's free, actively maintained, and comparable to IDA Pro for most analysis tasks.",
      },
      { t: 'h', x: 'Bonus Resources' },
      {
        t: 'list',
        x: [
          'Godbolt (compiler explorer) — paste source code and see the assembly output across different compilers and optimization levels. Useful for understanding what high-level code actually compiles to.',
          'Dogbolt (decompiler explorer) — paste a binary and compare decompiler output from multiple tools side-by-side.',
          'REMnux — a Linux VM preloaded with malware analysis tools. If you want a ready-to-go environment instead of installing everything manually, start here.',
        ],
      },
    ],
  },
  {
    id: '0x05',
    slug: 'hacker-movies',
    tag: 'culture',
    date: '2023.02.23',
    mins: 3,
    title: 'Recommendations on Movies/Series About Hackers',
    dek: 'The films and series that shaped how I think about hacking — and why Mr. Robot is still the best thing on the subject.',
    toc: ['Hackers (1995)', 'The Matrix', 'Mr. Robot', 'Who Am I'],
    body: [
      {
        t: 'p',
        x: 'I always liked how hackers were represented in movies — even when the depiction was completely wrong. Some of these productions inspired me to get into cybersecurity in the first place. Here are the ones I recommend, along with what to actually take from each of them.',
      },
      {
        t: 'note',
        x: 'These are entertainment, not training. Real ethical hacking happens on contracted targets with written permission — nothing like what you see on screen.',
      },
      { t: 'h', x: 'Hackers (1995)' },
      {
        t: 'p',
        x: "Probably one of the most famous hacker films. It's got Angelina Jolie, captures the 1980s underground culture, and features a deliberately exaggerated, almost cartoonish depiction of what hacking looks like. Don't watch it for technical accuracy — watch it for the culture and the energy. It's fun.",
      },
      { t: 'h', x: 'The Matrix' },
      {
        t: 'p',
        x: "Essential viewing. The Matrix isn't really about hacking in the technical sense — it's about human resistance against machine control and a protagonist who fights threats inside a simulated digital world. The themes of systems, control, and breaking free from imposed realities resonate deeply in hacker culture.",
      },
      { t: 'h', x: 'Mr. Robot' },
      {
        t: 'p',
        x: "The best series I've ever seen on this subject. Full stop. What sets it apart is the technical realism — developed with actual security professionals, using real tools, real commands, real attack techniques. Elliot runs actual exploits. The social engineering scenes are accurate. If you watch one thing from this list, make it this.",
      },
      { t: 'h', x: 'Who Am I' },
      {
        t: 'p',
        x: 'A German film focused heavily on social engineering within hacker culture. It starts confusing and takes a while to click, but it rewards patience. The way it portrays manipulation, identity, and the human element of hacking makes it worth seeing.',
      },
    ],
  },
  {
    id: '0x06',
    slug: 'rauth-ctf',
    tag: 'ctf, re, crypto',
    date: '2026.06.04',
    mins: 20,
    title: 'rauth — CTF Reverse Engineering Writeup',
    dek: 'A Rust binary gates access with Salsa20. Extract the hardcoded key and nonce, recover the password, and get the flag.',
    toc: [
      'Overview',
      'Initial Recon',
      'Loading in Ghidra',
      'Analysing rauth::main',
      'Rename Variables',
      'Extract Key, Nonce, and Ciphertext',
      'Salsa20 Primer',
      'Decrypt the Password',
      'Verify and Connect',
      'Key Takeaways',
    ],
    body: [
      LEGAL,
      {
        t: 'ascii',
        x: 'Category: Reverse Engineering\nFlag:     HTB{▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒}\nPassword: ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n\n!! SECTOR READ ERROR — CHECKSUM MISMATCH !!',
      },
      { t: 'h', x: 'Overview' },
      {
        t: 'p',
        x: 'rauth is a Rust binary that acts as an authentication gate. It prompts for a password, encrypts your input with the Salsa20 stream cipher using a hardcoded key and nonce, and compares the result to a hardcoded ciphertext. If they match, it decrypts and prints a flag.',
      },
      {
        t: 'p',
        x: 'The goal: identify the cipher, extract the hardcoded key/nonce/ciphertext from the binary, decrypt the ciphertext to recover the password, and connect to the remote server to get the real flag.',
      },
      {
        t: 'list',
        x: [
          'Ghidra — static analysis and decompilation',
          'Python 3 — cryptographic decryption',
          'netcat (nc) — final server connection',
          'Standard Linux shell utilities: file, strings, readelf, xxd',
        ],
      },
      { t: 'h', x: 'Initial Recon' },
      {
        t: 'p',
        x: 'Run the binary to understand its behaviour, then check what kind of file it is:',
      },
      {
        t: 'code',
        label: 'Run the binary',
        lines: [
          { t: 'cmd', x: './rauth' },
          { t: 'out', x: 'Welcome to secure login portal!' },
          { t: 'out', x: 'Enter the password to access the system:' },
          { t: 'out', x: 'hello' },
          { t: 'out', x: 'You entered a wrong password!' },
          { t: 'cmd', x: 'file rauth' },
          {
            t: 'out',
            x: 'rauth: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, ...',
          },
        ],
      },
      {
        t: 'code',
        label: 'strings recon',
        lines: [
          { t: 'cmd', x: 'strings rauth | grep -iE "htb|flag|salsa|cipher|auth|password"' },
          { t: 'out', x: 'salsa20' },
          { t: 'out', x: 'Successfully Authenticated' },
          { t: 'out', x: 'Enter the password to access the system:' },
          { t: 'out', x: 'You entered a wrong password!' },
          {
            t: 'out',
            x: '/home/w3th4nds/.cargo/registry/src/github.com-1ecc6299db9ec823/salsa20-0.8.0/src/core.rs',
          },
          {
            t: 'out',
            x: '/home/w3th4nds/.cargo/registry/src/github.com-1ecc6299db9ec823/salsa20-0.8.0/src/salsa.rs',
          },
        ],
      },
      {
        t: 'p',
        x: 'Two things stand out immediately: the cipher is Salsa20 from the Rust crate salsa20 v0.8.0, and the crate source paths confirm the exact version. This tells us exactly what we are dealing with before we even open a disassembler.',
      },
      { t: 'h', x: 'Loading in Ghidra' },
      {
        t: 'p',
        x: 'Open the binary in Ghidra: File → New Project → Non-Shared Project. File → Import File → select rauth. Accept defaults and let Auto Analysis run to completion. Then open the Symbol Tree (Window → Symbol Tree) and search for main.',
      },
      {
        t: 'list',
        x: [
          '0x00106460 — rauth::main (the actual program logic)',
          '0x00106bd0 — main (the ELF entry point, the Rust runtime shim)',
        ],
      },
      {
        t: 'p',
        x: 'Double-click 0x00106bd0 — it just calls rauth::main via lang_start_internal. The standard Rust runtime bootstrap. All the real code is at 0x00106460.',
      },
      { t: 'h', x: 'Analysing rauth::main' },
      {
        t: 'p',
        x: "Double-click 0x00106460 to open it in the decompiler. The raw output is messy — Rust's optimiser reuses stack space aggressively and Ghidra gets confused by the Salsa20 struct type. Work through it section by section.",
      },
      {
        t: 'p',
        x: "The function prints the banner, reads a line from stdin, then strips the trailing newline by unconditionally truncating the last character (Rust's String::truncate(len - 1)). Critical pitfall: always pipe input with a trailing newline using echo, not echo -n. With echo -n the last character of your actual password gets stripped instead.",
      },
      {
        t: 'p',
        x: 'In the disassembly (press D to switch to listing view), the 32-byte key is loaded from .rodata address 0x139ca0 with two MOVAPS instructions. The 8-byte nonce is a hardcoded 64-bit immediate:',
      },
      {
        t: 'code',
        label: 'Key and nonce load (disassembly excerpt)',
        lines: [
          { t: 'out', x: '001065c3:  MOVAPS XMM0, xmmword ptr [0x00139ca0]' },
          { t: 'out', x: '001065ca:  MOVAPS xmmword ptr [RSP + 0x90], XMM0    ; key bytes 0..16' },
          { t: 'out', x: '001065d2:  MOVDQA XMM0, xmmword ptr [0x00139cb0]' },
          { t: 'out', x: '001065da:  MOVDQA xmmword ptr [RSP + 0xa0], XMM0    ; key bytes 16..32' },
          {
            t: 'out',
            x: '001065e3:  MOV RAX, 0x3361303732633464             ; nonce → LE bytes: d4c270a3',
          },
          { t: 'out', x: '001065ed:  MOV qword ptr [RSP + 0xc0], RAX' },
        ],
      },
      {
        t: 'p',
        x: 'The 32-byte ciphertext lives at .rodata address 0x139cc0. Disassembling Core::new at 0x105900 confirms the standard Salsa20 state layout — 16 × u32, little-endian. The four sigma constants spell "expand 32-byte k", the standard constant for 256-bit keys.',
      },
      {
        t: 'code',
        label: 'Salsa20 state layout (from Core::new at 0x105900)',
        lines: [
          { t: 'out', x: 'state[0]  = 0x61707865  ("expa")   — sigma' },
          { t: 'out', x: 'state[1]  = key[0..4]' },
          { t: 'out', x: 'state[2]  = key[4..8]' },
          { t: 'out', x: 'state[3]  = key[8..12]' },
          { t: 'out', x: 'state[4]  = key[12..16]' },
          { t: 'out', x: 'state[5]  = 0x3320646e  ("nd 3")   — sigma' },
          { t: 'out', x: 'state[6]  = nonce[0..4]' },
          { t: 'out', x: 'state[7]  = nonce[4..8]' },
          { t: 'out', x: 'state[8]  = counter_lo  (starts 0)' },
          { t: 'out', x: 'state[9]  = counter_hi  (starts 0)' },
          { t: 'out', x: 'state[10] = 0x79622d32  ("2-by")   — sigma' },
          { t: 'out', x: 'state[11] = key[16..20]' },
          { t: 'out', x: 'state[12] = key[20..24]' },
          { t: 'out', x: 'state[13] = key[24..28]' },
          { t: 'out', x: 'state[14] = key[28..32]' },
          { t: 'out', x: 'state[15] = 0x6b206574  ("te k")   — sigma' },
        ],
      },
      {
        t: 'p',
        x: 'On success, the binary decrypts the flag using the same Salsa20 instance with pos reset to 0. The flag is XORed with keystream bytes [0..24] — the same bytes used for the first 24 bytes of password encryption. You can decrypt the flag without knowing the password.',
      },
      { t: 'h', x: 'Rename Variables' },
      {
        t: 'p',
        x: 'Before extracting bytes, rename variables in Ghidra to make the decompiler output readable. Right-click any variable name in the decompiler panel and select Rename Variable.',
      },
      {
        t: 'list',
        x: [
          'local_108 → nonce (hardcoded 8-byte Salsa20 nonce)',
          'local_138 → key_lo (first 16 bytes of key)',
          'local_128 → key_hi (last 16 bytes of key)',
          'ppuVar8 → ciphertext_buf (32-byte allocation with expected ciphertext)',
          'local_100 → salsa20_cipher (the Salsa<R> struct on the stack)',
          'puVar10 → flag_buf (24-byte encrypted flag allocation)',
          'bVar11 → auth_success (boolean result of comparison)',
        ],
      },
      { t: 'h', x: 'Extract Key, Nonce, and Ciphertext' },
      {
        t: 'p',
        x: 'The binary has a single LOAD segment mapped from file offset 0x0 to virtual address 0x0, but Ghidra sets its default image base to 0x100000. File offset = Ghidra address − 0x100000. Verify the bytes with xxd before writing the solver:',
      },
      {
        t: 'code',
        label: 'Verify addresses with xxd',
        lines: [
          { t: 'cmd', x: 'xxd -s $((0x139ca0 - 0x100000)) -l 32 rauth' },
          {
            t: 'out',
            x: '00039ca0: 6566 3339 6634 6632 3065 3736 6533 3362  ef39f4f20e76e33b',
          },
          {
            t: 'out',
            x: '00039cb0: 6432 3566 3464 6233 3338 6538 3162 3130  d25f4db338e81b10',
          },
          { t: 'cmd', x: 'xxd -s $((0x139cc0 - 0x100000)) -l 32 rauth' },
          {
            t: 'out',
            x: '00039cc0: 0505 5fb1 a329 a8d5 58d9 f556 a6cb 31f3  .._...).X..V..1.',
          },
          {
            t: 'out',
            x: '00039cd0: 2443 2a31 c99d ec72 e33e b66f 62ad 1bf9  $C*1...r.>.ob...',
          },
          { t: 'cmd', x: 'xxd -s $((0x139cf0 - 0x100000)) -l 16 rauth' },
          {
            t: 'out',
            x: '00039cf0: 1939 7889 9768 a08f 66d3 9017 b2e0 40c2  .9x..h..f.....@.',
          },
        ],
      },
      {
        t: 'p',
        x: 'The key bytes 65 66 33 39 ... are all printable ASCII — the key is literally the string ef39f4f20e76e33bd25f4db338e81b10. Same for the nonce: d4c270a3. Both are ASCII hex strings stored raw in the binary. The last 8 bytes of the encrypted flag are a hardcoded immediate in the flag_buf allocation: 0x61e281c563371937 (little-endian).',
      },
      { t: 'h', x: 'Salsa20 Primer' },
      {
        t: 'p',
        x: 'A 4×4 matrix of 32-bit words (64 bytes) forms the state. For 256-bit keys the four sigma constants are the four 32-bit words of "expand 32-byte k". The Quarter Round is the fundamental mixing operation on 4 words:',
      },
      {
        t: 'code',
        label: 'Quarter Round',
        lines: [
          { t: 'out', x: 'b ^= rotl32(a + d,  7)' },
          { t: 'out', x: 'c ^= rotl32(b + a,  9)' },
          { t: 'out', x: 'd ^= rotl32(c + b, 13)' },
          { t: 'out', x: 'a ^= rotl32(d + c, 18)' },
        ],
      },
      {
        t: 'p',
        x: 'A Double Round applies the Quarter Round to each column of the 4×4 matrix then to each row. Salsa20 runs 10 double rounds (20 total). After 20 rounds, add the original state to the mixed state word-by-word (mod 2³²) and serialise as 64 little-endian bytes. The add-back step makes the operation non-invertible from the output alone. Generate blocks sequentially by incrementing the counter. XOR with plaintext to encrypt; XOR again to decrypt.',
      },
      { t: 'h', x: 'Decrypt the Password' },
      {
        t: 'p',
        x: 'Since Salsa20 is a stream cipher, decryption is identical to encryption: password = ciphertext XOR keystream[0..32] and flag = enc_flag XOR keystream[0..24]. Both use the same first 64-byte keystream block.',
      },
      {
        t: 'code',
        label: 'solve.py',
        lines: [
          { t: 'out', x: 'import struct' },
          { t: 'out', x: '' },
          { t: 'out', x: 'def rotl32(v, n):' },
          { t: 'out', x: '    return ((v << n) | (v >> (32 - n))) & 0xFFFFFFFF' },
          { t: 'out', x: '' },
          { t: 'out', x: 'def quarter_round(a, b, c, d):' },
          { t: 'out', x: '    b ^= rotl32((a + d) & 0xFFFFFFFF,  7)' },
          { t: 'out', x: '    c ^= rotl32((b + a) & 0xFFFFFFFF,  9)' },
          { t: 'out', x: '    d ^= rotl32((c + b) & 0xFFFFFFFF, 13)' },
          { t: 'out', x: '    a ^= rotl32((d + c) & 0xFFFFFFFF, 18)' },
          { t: 'out', x: '    return a, b, c, d' },
          { t: 'out', x: '' },
          { t: 'out', x: 'def salsa20_block(state):' },
          { t: 'out', x: '    x = list(state)' },
          { t: 'out', x: '    for _ in range(10):' },
          {
            t: 'out',
            x: '        x[0],  x[4],  x[8],  x[12] = quarter_round(x[0],  x[4],  x[8],  x[12])',
          },
          {
            t: 'out',
            x: '        x[5],  x[9],  x[13], x[1]  = quarter_round(x[5],  x[9],  x[13], x[1])',
          },
          {
            t: 'out',
            x: '        x[10], x[14], x[2],  x[6]  = quarter_round(x[10], x[14], x[2],  x[6])',
          },
          {
            t: 'out',
            x: '        x[15], x[3],  x[7],  x[11] = quarter_round(x[15], x[3],  x[7],  x[11])',
          },
          {
            t: 'out',
            x: '        x[0],  x[1],  x[2],  x[3]  = quarter_round(x[0],  x[1],  x[2],  x[3])',
          },
          {
            t: 'out',
            x: '        x[5],  x[6],  x[7],  x[4]  = quarter_round(x[5],  x[6],  x[7],  x[4])',
          },
          {
            t: 'out',
            x: '        x[10], x[11], x[8],  x[9]  = quarter_round(x[10], x[11], x[8],  x[9])',
          },
          {
            t: 'out',
            x: '        x[15], x[12], x[13], x[14] = quarter_round(x[15], x[12], x[13], x[14])',
          },
          {
            t: 'out',
            x: '    return b"".join(struct.pack("<I", (x[i] + state[i]) & 0xFFFFFFFF) for i in range(16))',
          },
          { t: 'out', x: '' },
          { t: 'out', x: 'def salsa20_keystream(key, nonce, length):' },
          { t: 'out', x: '    SIGMA = b"expand 32-byte k"' },
          { t: 'out', x: '    s = [struct.unpack_from("<I", SIGMA, i*4)[0] for i in range(4)]' },
          { t: 'out', x: '    k = [struct.unpack_from("<I", key,   i*4)[0] for i in range(8)]' },
          { t: 'out', x: '    n = [struct.unpack_from("<I", nonce, i*4)[0] for i in range(2)]' },
          {
            t: 'out',
            x: '    base = [s[0],k[0],k[1],k[2], k[3],s[1],n[0],n[1], 0,0,s[2],k[4], k[5],k[6],k[7],s[3]]',
          },
          { t: 'out', x: '    keystream, counter = b"", 0' },
          { t: 'out', x: '    while len(keystream) < length:' },
          { t: 'out', x: '        state = list(base)' },
          { t: 'out', x: '        state[8]  = counter & 0xFFFFFFFF' },
          { t: 'out', x: '        state[9]  = (counter >> 32) & 0xFFFFFFFF' },
          { t: 'out', x: '        keystream += salsa20_block(state)' },
          { t: 'out', x: '        counter += 1' },
          { t: 'out', x: '    return keystream[:length]' },
          { t: 'out', x: '' },
          { t: 'out', x: 'with open("rauth", "rb") as f:' },
          { t: 'out', x: '    BASE = 0x100000' },
          { t: 'out', x: '    f.seek(0x139ca0 - BASE); key        = f.read(32)' },
          { t: 'out', x: '    f.seek(0x139cc0 - BASE); ciphertext = f.read(32)' },
          { t: 'out', x: '    f.seek(0x139cf0 - BASE); flag_lo    = f.read(16)' },
          { t: 'out', x: '' },
          { t: 'out', x: 'nonce    = struct.pack("<Q", 0x3361303732633464)' },
          { t: 'out', x: 'flag_hi  = struct.pack("<Q", 0x61e281c563371937)' },
          { t: 'out', x: 'enc_flag = flag_lo + flag_hi' },
          { t: 'out', x: '' },
          { t: 'out', x: 'ks       = salsa20_keystream(key, nonce, 64)' },
          { t: 'out', x: 'password = bytes(a ^ b for a, b in zip(ciphertext, ks[:32]))' },
          { t: 'out', x: 'flag     = bytes(a ^ b for a, b in zip(enc_flag,   ks[:24]))' },
          { t: 'out', x: 'print("Password:", password.decode())' },
          { t: 'out', x: 'print("Flag:    ", flag.decode())' },
        ],
      },
      {
        t: 'code',
        label: 'Run solve.py',
        lines: [
          { t: 'cmd', x: 'python3 solve.py' },
          { t: 'out', x: 'Password: ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒' },
          { t: 'out', x: 'Flag:     ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒' },
        ],
      },
      {
        t: 'note',
        x: 'The local flag is a placeholder — the real flag lives on the server, which runs the same binary logic with different embedded crypto material.',
      },
      { t: 'h', x: 'Verify and Connect' },
      {
        t: 'code',
        label: 'Verify locally',
        lines: [
          { t: 'cmd', x: "echo '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒' | ./rauth" },
          { t: 'out', x: 'Welcome to secure login portal!' },
          { t: 'out', x: 'Enter the password to access the system:' },
          { t: 'ok', x: 'Successfully Authenticated' },
          { t: 'out', x: 'Flag: "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒"' },
        ],
      },
      {
        t: 'p',
        x: 'The server runs the binary as a raw TCP service — not HTTP. Use netcat. The -q2 flag tells nc to wait 2 seconds after stdin closes before disconnecting, giving the server time to send its response.',
      },
      {
        t: 'code',
        label: 'Connect to the server',
        lines: [
          { t: 'cmd', x: "echo '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒' | nc -q2 154.57.164.70 30193" },
          { t: 'out', x: 'Welcome to secure login portal!' },
          { t: 'out', x: 'Enter the password to access the system:' },
          { t: 'ok', x: 'Successfully Authenticated' },
          { t: 'ok', x: 'Flag: "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒"' },
        ],
      },
      { t: 'h', x: 'Key Takeaways' },
      {
        t: 'list',
        x: [
          'strings is your first move. The embedded Rust crate path salsa20-0.8.0 immediately identified the cipher before opening a disassembler.',
          "Stream cipher decryption = encryption. plaintext = ciphertext XOR keystream. You don't need to reverse the cipher logic — just re-run it with the extracted key and nonce.",
          'Disassemble the crypto init function (Core::new at 0x105900), not just the caller. The decompiler output for the caller is confused by type reuse. The raw assembly reveals the exact state layout.',
          'The echo -n pitfall. The binary unconditionally strips the last character of input. Using echo -n means the last character of your password is stripped. Always pipe with a trailing newline.',
          'Ghidra image base. This binary loads with Ghidra base 0x100000. File offset = Ghidra address − 0x100000.',
          'Local flag ≠ server flag. The binary you analyse locally has a placeholder flag. The real flag comes from the challenge server.',
          'Raw TCP vs HTTP. The challenge server speaks the protocol directly over TCP. curl will not work — use nc.',
        ],
      },
    ],
  },
  {
    id: "0x07",
    slug: "linux-larpers",
    tag: "linux, future, open-source, criticism",
    date: "2026.08.26",
    mins: 5,
    pinned: false,
    title: "The Linux \"larper\" situation",
    dek: "My opinion on Linux larpers and the bipolarization of the open-source community.",
    toc: [
      "What is Larping?",
      "But, what\\'s wrong with that?",
      "That was expected",
      "What we should expect for the future of Linux?"
    ],
    body: [
    {
      t: "p",
      x: "Hey, how you going? I'm here, at midnight, 01:36 AM writing this because I want to expose a situation that is making me confused among the Linux community: **LARPING**.",
    },
    {
      t: "h",
      x: "What is Larping?",
    },
    {
      t: "p",
      x: "According to Know-your-meme:",
    },
    {
      t: "note",
      x: "While the term dates back to at least the 1970s, its meaning has shifted significantly in the internet age. Today, it’s often used online to accuse someone of pretending to be something they’re not.",
    },
    {
      t: "p",
      x: "So basically a larper is someone who never touched, in our case, any OS based on the Linux kernel, and pretends to be a Linux advanced user or experienced by often showing exaggerated graphical interfaces with lots of animations, transparency, the terminal showing the output of fastfetch, btop, cava etc, while their hardware is screaming for help and there isn't enough RAM to open a simple HTML page on Chrome. That's what we call Linux larpers.",
    },
    {
      t: "p",
      x: "There's already some distros made specially for larpers... not gonna say the names of them directly but... oh march!",
    },
    {
      t: "h",
      x: "But, what's wrong with that?",
    },
    {
      t: "p",
      x: "Ok, people like that are annoying and they don't even know how to compile a custom kernel, they use Wayland and sure enough... systemd... but that's expected right? Average end-users just want it to work. Remember when I said \"I want to expose a situation that is making me confused\"? So, what exactly is making me confused? The answer is simple: back in 2010 when I started using Linux and became an active member of the open-source community, I remember people screaming \"STOP USING WINDOWS, USE LINUX INSTEAD\", even I was someone who told that to a lot of people, so why are we complaining about people migrating from Windows to Linux now? I can't understand.",
    },
    {
      t: "h",
      x: "That was expected",
    },
    {
      t: "p",
      x: "When we shouted \"COME TO LINUX\" we should've expected that results... right? Well, no. Actually the days before the pandemic were very different. Some people might not remember that now but before the pandemic the Internet was completely different from what we have today. People who used the Internet back then were mostly nerds and weird people who knew at least a bit about computers, not like today... today any idiot uses the Internet to post their burger photo, or photos of their asses on Instagram, gym videos and all that normie stuff we see today.",
    },
    {
      t: "h",
      x: "What we should expect for the future of Linux?",
    },
    {
      t: "p",
      x: "To be honest, I have no idea. Anything can happen, and things are happening fast paced! The open-source community is very politically driven. They care more about aesthetics than functionality and performance. They care more about \"how many LGBT people we have on our team?\" instead of \"how reliable and well made our code is?\". So the future of Linux and the open-source community is really unknown, but I'm sure we should expect the worst.",
    },
    {
      t: "p",
      x: "That's all! This post was more my opinion than anything else. Thank you for reading and have a nice day.",
    }
    ],
  },
  {
    id: "0x08",
    slug: "php2shell",
    tag: "php, rce, vulnerability, news",
    date: "2026.10.26",
    mins: 10,
    pinned: false,
    title: "PHP2Shell: two critical bugs in PHP's core",
    dek: "CVE-2026-109618 and CVE-2026-109619: a leaked embargo, a decade of affected versions, and unauthenticated RCE against WordPress, Drupal and Joomla.",
    toc: [
      "TL;DR",
      "What is PHP2Shell?",
      "The root cause: dying halfway through a job",
      "The bugs",
      "A 22-year-old idea",
      "From bug to shell",
      "The leak and the timeline",
      "Who is affected?",
      "Detection",
      "What to do right now",
      "The AI angle",
      "Final thoughts",
    ],
    body: [
      {
        t: "note",
        x: "Defensive write-up. This article is a summary of three public analyses (Huntress, Calif and Wiz) and contains no exploit code. Patch your systems, and only test what you own or have written permission to test.",
      },
      { t: "h", x: "TL;DR" },
      {
        t: "list",
        x: [
          "Two critical flaws in the PHP engine itself: CVE-2026-109618 and CVE-2026-109619, CVSS v4.0 9.2.",
          "Unauthenticated remote code execution as the web worker user, plus a separate remote memory disclosure.",
          "Not a CMS bug. WordPress, Drupal, Joomla, MediaWiki, Roundcube, Magento, phpMyAdmin, Nextcloud, Laravel and Symfony all sit on top of the same engine.",
          "Paths reach back to PHP 5.4. Wiz says every PHP version released in the last decade has at least one of these bugs.",
          "Fixed in PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35, released October 21, 2026. Minimal source backports exist for 7.4, 8.0 and 8.1.",
          "The embargo leaked a day early. Patch first, read the write-ups second.",
        ],
      },
      { t: "h", x: "What is PHP2Shell?" },
      {
        t: "p",
        x: "PHP2Shell is the name researchers gave to a pair of critical vulnerabilities in the core of PHP, the language behind roughly 70% of websites according to Wiz. As Huntress put it, a name like that “usually means one thing”: send a request to a website, get a shell on the server behind it.",
      },
      {
        t: "p",
        x: "The bugs were found by Calif together with OpenAI, and independently by Wiz Research. Both were handled through the PHP security team and shipped in the PHP October 2026 Security Release. What makes this different from the usual “WordPress plugin has SQLi” news is the layer. These flaws live below the application, so hardening your app, auditing your plugins or putting a login in front of it does not help. The vulnerable code runs before your code does.",
      },
      {
        t: "p",
        x: "According to the PHP advisory, the mod_php exploit lets an unauthenticated request trigger the attack before any application code runs, and complete RCE was validated over HTTP with default input and memory limits and with normal multi-worker prefork configurations.",
      },
      { t: "h", x: "The root cause: dying halfway through a job" },
      {
        t: "p",
        x: "Every bug in this family shares one idea, and it is a good one to remember because it shows up everywhere. PHP enforces memory_limit. When an allocation would cross it, PHP raises a fatal error and bails out. The problem is what the engine was in the middle of doing at that exact moment.",
      },
      {
        t: "p",
        x: "Calif describes the pattern in general terms: when code publishes or destroys some state and then does fallible work, a fatal error in the middle can skip the commit or the rollback step. The request heap gets thrown away, but a global pointer still points into it. A half-built object is treated as a finished one during cleanup. Then the next request on the same worker walks into the leftovers.",
      },
      {
        t: "code",
        label: "The shape of the bug (pseudocode, not PHP source)",
        lines: [
          { t: "out", x: "publish(state)          // global now points at request memory" },
          { t: "out", x: "allocate(...)           // <-- exceeds memory_limit, fatal error" },
          { t: "out", x: "// commit/rollback never runs" },
          { t: "out", x: "// request heap freed, global still points into it" },
          { t: "out", x: "// next request on this worker trusts the stale pointer" },
        ],
      },
      {
        t: "p",
        x: "That is a use-after-free that survives across requests. Make the attacker choose what lands in the freed memory and you have a classic heap-corruption primitive, now reachable over plain HTTP.",
      },
      { t: "h", x: "The bugs" },
      {
        t: "p",
        x: "The three write-ups describe the issues from different angles and do not map them one-to-one onto the two CVE IDs, so treat the grouping below as a description of the bug classes rather than an official CVE table. Wiz documents four bugs, and Calif describes the same family of problems from the research side. Wiz also says other variants likely exist and that the patch addresses the underlying issue.",
      },
      {
        t: "list",
        x: [
          "Upload-progress unserializer use-after-free. A fatal allocation failure during session decoding on the upload-progress path destroys the request heap but leaves the unserializer's global bookkeeping published. A later request on the same worker treats attacker-reclaimed memory as live state. That is the memory-corruption primitive.",
          "Remote process-memory disclosure. During early multipart parsing, session state can publish a session ID (PS(id)). If an out-of-memory error frees the heap while that pointer survives, a later multipart request trusts the stale pointer and length, and the reclaimed heap bytes are URL-encoded into a PHPSESSID response cookie. It works even if the application never calls session_start().",
          "Fatal-error backtrace use-after-free. PHP keeps the backtrace of the last fatal error in EG(last_fatal_error_backtrace). After an OOM, that global can still point at freed memory, and an early diagnostic in the next request follows the dangling pointer.",
          "OPcache type confusion. OPcache stores compiled structures in shared memory and hands out indices into per-worker runtime-pointer maps. An allocation failure inside zend_accel_script_persist() advances the process-local frontier but not the shared one, so another worker can reuse a slot and get a cross-worker type confusion.",
        ],
      },
      {
        t: "p",
        x: "Calif adds some of the plumbing that makes the bugs reachable in the first place:",
      },
      {
        t: "list",
        x: [
          "post_max_size is checked against the declared Content-Length, not the bytes actually consumed. Chunked HTTP/1.1, lengthless HTTP/2 requests and some input-decompression setups can slip past it.",
          "Many empty-filename upload parts with deeply nested field names can eat the heap while staying under post_max_size, which lets an attacker make a chosen later allocation hit memory_limit.",
          "In the hash table insertion routine, the element count is incremented before the key is allocated. If that allocation dies, teardown treats a half-built bucket as live.",
          "Session upload-progress can initialize session state during multipart parsing, before modules are activated. If parsing dies, the cleanup callback is skipped and the session globals keep pointers into freed memory.",
          "The generic unserializer's shared bookkeeping can survive a fatal error, and a signed counter in the destructor-list helper can be pushed out of range by a later request.",
        ],
      },
      { t: "h", x: "A 22-year-old idea" },
      {
        t: "p",
        x: "The most interesting part of the Calif write-up is the history, because it shows this was never unknown territory.",
      },
      {
        t: "list",
        x: [
          "2004: Stefan Esser finds the first PHP memory-limit remote vulnerability. Calif says he withheld his exploit and that two commercial exploit vendors later built private ones.",
          "2020: Bug #78876 reports that long variables in multipart/form-data can cause out-of-memory conditions and leave temporary files uncleaned. It is treated as low severity and patched upstream.",
          "2024: An OSTIF/Quarkslab audit rediscovers a related OOM issue. Exploitation is not proven, so it is not fixed.",
          "2026: Calif builds on those leads and finds exploitable paths.",
        ],
      },
      {
        t: "p",
        x: "Calif also notes that HHVM was checked, and that the 2020 upstream patch had already mitigated the issue there. The lesson I take from this: “not exploitable as far as we can show” is a statement about the researcher's afternoon, not about the bug. A reliable crash in a memory-unsafe runtime is a vulnerability waiting for someone with more patience.",
      },
      { t: "h", x: "From bug to shell" },
      {
        t: "p",
        x: "The write-ups deliberately stay conceptual here, and so will I. At a high level the chain looks like this:",
      },
      {
        t: "list",
        x: [
          "Trigger memory exhaustion using the request-size bypass and the nested empty-upload records so a chosen allocation hits memory_limit.",
          "Make the fatal error land at a useful point, one that leaves stale state behind.",
          "mod_php: the worker survives the failed request and the next request consumes the stale data. Calif describes this as RCE against arbitrary PHP scripts.",
          "PHP-FPM: a fatal during startup kills the worker, so the route needs a fatal after successful startup, during application decoding (session_start(), session_decode() or unserialize()). A follow-up multipart upload-progress request then reuses the stale decoder state. Calif describes this as application-dependent RCE.",
          "Reliability: Wiz used the memory-disclosure primitive to remove address uncertainty, which is what turned a memory-corruption bug into a dependable exploit.",
        ],
      },
      {
        t: "p",
        x: "Calif reports pre-auth RCE against WordPress 7.1.2, Drupal 11.4.3, Joomla 6.1.4, MediaWiki 1.46.2, Roundcube 1.7.4, Magento 2.4.9, phpMyAdmin 5.2.3, Nextcloud 35.0.1, Laravel 13.11, Symfony 8.1 and WHMCS. Wiz independently demonstrated unauthenticated RCE against the latest container images of WordPress, Drupal and Joomla, combining the bugs into a single script it calls php2shell. Wiz also showed that an attacker can read sensitive process memory (passwords, tokens, API keys, certificates) without achieving code execution at all.",
      },
      {
        t: "note",
        x: "Both teams say the exploit has to be adapted to each target's memory layout, PHP version and configuration. It is not a one-click button, but it is clearly a solved problem now.",
      },
      { t: "h", x: "The leak and the timeline" },
      {
        t: "p",
        x: "The disclosure did not go as planned. On the morning of October 20, a Hacker News post claimed two critical PHP flaws were about to be disclosed. The post was pulled, but screenshots spread. watchTowr confirmed the leak, writing that “we were all supposed to wait until Thursday at 11am ET.” PHP posted an advance notice and moved its release up to Wednesday, October 21.",
      },
      {
        t: "ascii",
        x: "Calif (found)   2026-08-01  first OOM-fatal + interruption point\nCalif (report)  2026-08-11  first bug reported to PHP\nCalif (PoC)     2026-08-14  RCE PoC shared, confirmed 08-15\nWiz  (found)    2026-08-19  first PHP vulnerability discovered\nWiz  (RCE)      2026-08-20  Drupal pre-auth RCE, WordPress on 08-21\nWiz  (report)   2026-08-24  reported to the PHP security team\nPHP (ack)       2026-09-21  Wiz reports acknowledged, fix in progress\nLEAK            2026-10-20  embargo broken, advance notice posted\nRELEASE         2026-10-21  patched versions and public write-ups",
      },
      {
        t: "p",
        x: "Two teams finding the same family of bugs within days of each other in August is worth pausing on. If two groups found it, it is reasonable to assume others could have too.",
      },
      {
        t: "p",
        x: "On the exploitation front, the picture changed quickly. As of 10 AM ET on October 21, Huntress had not seen in-the-wild exploitation across its partner base, while others reported attacks emerging. Calif and Wiz published full technical write-ups later that afternoon. Since the write-ups are public and the exploit chain is described, assume the window is short.",
      },
      { t: "h", x: "Who is affected?" },
      {
        t: "p",
        x: "Short answer: anything that serves web requests through PHP. Early reports said PHP 5, 6, 7 and 8. PHP later widened it to all installations serving web requests, including PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP and LiteSpeed. Calif says the earliest affected path dates to PHP 5.4.0, and that under default configurations the bugs are always exploitable, with the exact path depending on the PHP version and SAPI.",
      },
      {
        t: "p",
        x: "The part people will miss: PHP does not only live in the sites you know about. It is inside shared hosting, control panels, vendor appliances, Windows software and plenty of products that never advertise being written in PHP. Huntress specifically calls out inventorying all of those.",
      },
      {
        t: "p",
        x: "PHP 8.1 and earlier are no longer supported. Distributions may backport fixes, and PHP released minimal source backports for 7.4, 8.0 and 8.1, but official full releases are only for the supported branches.",
      },
      { t: "h", x: "Detection" },
      {
        t: "p",
        x: "Because the exploitation happens below the application, your app logs may show very little. Wiz recommends watching for the side effects:",
      },
      {
        t: "list",
        x: [
          "Unusual multipart requests followed by memory-limit errors",
          "Repeated HTTP 500 responses",
          "Unusually large or malformed PHPSESSID response cookies",
          "Unexplained PHP worker churn",
        ],
      },
      {
        t: "p",
        x: "For post-exploitation, Huntress (citing Florian Roth) suggests looking for PHP worker processes (php-fpm, php-cgi, php-cgi.exe, httpd, apache2) spawning children they should never spawn:",
      },
      {
        t: "list",
        x: [
          "Shells: sh, bash, cmd.exe, powershell.exe",
          "Interpreters: python, perl",
          "Download and network tools: curl, wget, nc, certutil.exe",
          "Reverse shell patterns in command lines: /dev/tcp/, fsockopen, mkfifo",
          "Recon from the web server: whoami, id, uname -a, ipconfig",
          "After an intrusion: webshells and new files in the web root, new cron jobs or scheduled tasks, new accounts",
        ],
      },
      {
        t: "note",
        x: "At the time of the Huntress post, its IOC table read “TBD”. There are no confirmed, PHP2Shell-specific indicators yet, so behavioral detection of a web worker spawning a shell is your best bet. Huntress also plans to publish Sigma and YARA rules in the huntresslabs/threat-intel repository.",
      },
      { t: "h", x: "What to do right now" },
      {
        t: "p",
        x: "Patch. Everyone involved says the same thing, and Calif ends its post with “But seriously: patch.”",
      },
      {
        t: "list",
        x: [
          "Update to PHP 8.5.12, 8.4.27, 8.3.36 or 8.2.35. Linux distributions and LTS vendors received patches early, so check your vendor packages.",
          "If you use rpms.remirepo.net, note that updated packages were not available on October 21. Move to distribution packages or build from source.",
          "Inventory every PHP install, including bundled ones in appliances, control panels and Windows software, then patch internet-facing systems first.",
          "Take end-of-life PHP offline, or put it behind a VPN or a WAF.",
          "Alert on PHP workers launching shells, interpreters or download tools.",
          "If you find compromise: isolate the server and preserve the web server and PHP logs before touching anything.",
        ],
      },
      {
        t: "p",
        x: "If you truly cannot patch yet, there are interim, partial measures. Calif lists them for PHP-FPM and mod_php:",
      },
      {
        t: "code",
        label: "Temporary mitigations (php.ini), not a substitute for patching",
        lines: [
          { t: "prompt", x: "; PHP-FPM", p: "php.ini" },
          { t: "out", x: "session.upload_progress.enabled = 0" },
          { t: "out", x: "memory_limit = -1" },
          { t: "prompt", x: "; mod_php", p: "php.ini" },
          { t: "out", x: "memory_limit = -1" },
        ],
      },
      {
        t: "note",
        x: "Calif is explicit that “these changes do not replace a patch”, and setting memory_limit to -1 removes a safety net, which raises the risk of plain memory exhaustion. For end-of-life PHP, PHP's own guidance is to set session.upload_progress.enabled = Off, which may need a service restart. Unofficial community patches exist, but Huntress could not evaluate how effective they are.",
      },
      {
        t: "p",
        x: "Wiz also notes that vendors including Cloudflare, Fastly, Google, Vercel, Microsoft, Akamai, AWS, Imperva and Automattic published guidance or out-of-the-box mitigations for customers who cannot patch immediately. If you sit behind one of them, check what is already switched on, but treat it as a stopgap.",
      },
      { t: "h", x: "The AI angle" },
      {
        t: "p",
        x: "This disclosure is also a data point in the AI-and-vulnerability-research debate, and the two research teams read it differently. Wiz credits Wiz Atlas, Gemini 4 Argon and GPT-5.6 Sol with contributions to discovery, exploit development, attack detection and patch validation. It claims one researcher did in about a week what would previously have taken a team months, and argues that frontier models lower the barrier to adapting complex memory exploits across targets.",
      },
      {
        t: "p",
        x: "Calif is more measured. Its author writes that “know your target” still applies in the LLM-dominated vulnerability research era, and that “no model is simply capable of unearthing ‘all bugs’ with simple prompts.” In other words, the models helped, but the winning ingredient was someone who understood PHP's memory model and the history of its memory-limit bugs.",
      },
      {
        t: "note",
        x: "These are the vendors' own accounts of their tooling. I'm relaying them, not verifying them.",
      },
      {
        t: "p",
        x: "Both takes can be true at once. The part defenders should care about is the practical one: the time between “bug exists” and “working exploit against popular software” is shrinking, so the time between “patch released” and “patch deployed” needs to shrink with it.",
      },
      { t: "h", x: "Final thoughts" },
      {
        t: "p",
        x: "PHP2Shell is not a clever new class of attack. It is an old one, memory exhaustion leaving dangling state behind, that was reported, downgraded, rediscovered, left unproven and finally chained into something serious. The leak turned a coordinated disclosure into a race, and the public write-ups mean the race is now on for everyone who has not updated.",
      },
      {
        t: "p",
        x: "So: check your PHP version today, including the boxes you forgot you had, patch what faces the internet first, and watch for web workers spawning shells. I'll update this post if confirmed indicators or in-the-wild exploitation details get published.",
      },
      { t: "h", x: "Sources" },
      {
        t: "list",
        x: [
          "Huntress (John Hammond): huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities",
          "Calif (Ryan Austin, with a comic by Michal Zalewski): calif.io/php2shell",
          "Wiz Research: wiz.io/blog/php2shell-php-rce",
        ],
      },
    ],
  },
]

export function byId(id: string): Article {
  return ARTICLES.find((a) => a.id === id) ?? ARTICLES[0]!
}
