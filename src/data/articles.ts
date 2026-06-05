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
    id: '0x02',
    slug: 'ip-sec',
    tag: 'vpn, ipsec, firewall',
    date: '2026.06.03',
    mins: 14,
    title: 'FortiClient IPSec VPN: Dialup Client on FortiGate 7.6.x',
    dek: "Fortinet killed SSL-VPN in 7.6.x. Here's how to configure FortiClient as a dialup IPSec client.",
    toc: [
      'Introduction',
      'Preparing the Environment',
      'Creating the VPN Tunnel',
      'Under the Hood — Phase 1',
      'Under the Hood — Phase 2',
      'IP Addressing',
      'Firewall Policies',
      'FortiClient Setup',
      'Multiple Tunnels on the Same WAN',
      'Debugging',
      'Known Gotchas',
    ],
    body: [
      {
        t: 'note',
        x: 'After FortiOS 7.6.x the SSL-VPN protocol becomes obsolete and is removed from new releases. Migrate from SSL-VPN to IPSec before upgrading to 7.6.x or you will have a very bad time.',
      },
      {
        t: 'h',
        x: 'Introduction',
      },
      {
        t: 'p',
        x: "Starting from version 7.6.x, FortiOS drops SSL-VPN entirely. SSL-VPN had design-level vulnerabilities that were baked into the protocol itself (as expected from Fortinet's track record), so they finally decided to go all-in on IPSec. If you're running anything below 7.6.x and planning to upgrade, migrating your VPN configs is not optional.",
      },
      {
        t: 'p',
        x: "The good news: IPSec is the right call. The bad news: FortiClient still sucks, and there are enough gotchas in the migration to ruin someone's Friday. This guide covers FortiClient as a dialup client, the standard remote access use case.",
      },
      {
        t: 'h',
        x: 'Preparing the Environment',
      },
      {
        t: 'note',
        x: "Before touching anything: take a full configuration backup. VPN > IPsec changes can disconnect active users and break existing tunnels. Don't fuck yourself.",
      },
      {
        t: 'p',
        x: 'Line up all of this before starting:',
      },
      {
        t: 'list',
        x: [
          'FortiGate running FortiOS 7.6.x — check under System > Dashboard > Status',
          'FortiClient installed on remote machines (free build or EMS-managed, but read the gotchas section first)',
          'WAN interface with a reachable public IP — no VIP configured on ports 500 or 4500',
          'A user or LDAP user group created under User & Authentication > User Groups',
          'A LAN subnet that remote clients need to reach',
        ],
      },
      {
        t: 'h',
        x: 'Creating the VPN Tunnel',
      },
      {
        t: 'p',
        x: "Fortinet provides a VPN Wizard that generates the Phase 1, Phase 2, address objects, and firewall policies automatically. Use it for the initial setup. It's the fastest path and it generates sane defaults. Manual config comes later when you need to tune things.",
      },
      {
        t: 'p',
        x: 'Go to VPN > IPsec Wizard. Walk through the steps:',
      },
      {
        t: 'list',
        x: [
          'Template Type → Remote Access',
          'Remote Device Type → FortiClient',
          'Tunnel Name → 13 chars max, no spaces (e.g. "FC-VPN")',
          'Incoming Interface → your WAN interface',
          'Authentication Method → Pre-Shared Key (or Certificate if you have a PKI)',
          'Pre-Shared Key → generate something long and random, not "Fortinet1"',
          'User Group → the group you created for VPN users',
          'Client Address Range → IP range to hand out to connecting clients',
          'Local Interface → your LAN interface',
          'Local Address → the subnet remote clients should reach',
        ],
      },
      {
        t: 'p',
        x: "On the final Review page, the wizard shows every object it's about to create. Check it before hitting Submit. After creation, verify under VPN > IPsec Tunnels that Phase 1 and Phase 2 entries are both present.",
      },
      {
        t: 'h',
        x: 'Under the Hood — Phase 1',
      },
      {
        t: 'p',
        x: "Phase 1 is the IKE negotiation, where both sides agree on how to authenticate and establish the control channel. For FortiClient as a dialup client, the FortiGate acts as a responder with a dynamic Phase 1 that accepts incoming connections from any IP. Here's the CLI representation of what the wizard builds:",
      },
      {
        t: 'code',
        label: 'FortiGate CLI — Phase 1',
        lines: [
          { t: 'prompt', x: 'FortiGate # show vpn ipsec phase1-interface FC-VPN' },
          { t: 'out', x: 'config vpn ipsec phase1-interface' },
          { t: 'out', x: '    edit "FC-VPN"' },
          { t: 'out', x: '        set type dynamic' },
          { t: 'out', x: '        set interface "wan1"' },
          { t: 'out', x: '        set mode aggressive' },
          { t: 'out', x: '        set peertype any' },
          { t: 'out', x: '        set net-device enable' },
          { t: 'out', x: '        set mode-cfg enable' },
          {
            t: 'out',
            x: '        set proposal aes128-sha256 aes256-sha256 aes128-sha1 aes256-sha1',
          },
          { t: 'out', x: '        set dpd on-idle' },
          { t: 'out', x: '        set xauthtype auto' },
          { t: 'out', x: '        set authusrgrp "VPN-Users"' },
          { t: 'out', x: '        set assign-ip-from name' },
          { t: 'out', x: '        set ipv4-name "FC-VPN_range"' },
          { t: 'out', x: '        set psksecret ENC xxxxxxxx' },
          { t: 'out', x: '    next' },
          { t: 'out', x: 'end' },
        ],
      },
      {
        t: 'p',
        x: 'What each of these actually does:',
      },
      {
        t: 'list',
        x: [
          'type dynamic: the FortiGate accepts connections from any source IP, required for roaming remote users',
          'mode aggressive: IKEv1 aggressive mode; the client sends its identity in the first packet which enables group pre-shared key authentication',
          'peertype any: accepts any peer ID; change to "one" with a matching peerid if you run multiple tunnels on the same WAN interface',
          'net-device enable: creates a virtual interface per connected client, enabling per-client routing and policy enforcement',
          'mode-cfg enable: after auth, the FortiGate pushes an IP address, DNS servers, and routes down to the client',
          'xauthtype auto: Extended Authentication; users authenticate with username and password on top of the pre-shared key',
          'assign-ip-from name: hands out IPs from the named firewall address object',
          'dpd on-idle: Dead Peer Detection fires when the tunnel goes idle, cleans up stale connections without waiting for a timeout',
        ],
      },
      {
        t: 'h',
        x: 'Under the Hood — Phase 2',
      },
      {
        t: 'p',
        x: "Phase 2 negotiates the actual data tunnel, the encryption for your traffic and the selectors that define what flows through. For full tunnel (all client traffic through the FortiGate), the selector is 0.0.0.0/0. For split tunnel, you'd list only the subnets that should go through the VPN.",
      },
      {
        t: 'code',
        label: 'FortiGate CLI — Phase 2',
        lines: [
          { t: 'prompt', x: 'FortiGate # show vpn ipsec phase2-interface FC-VPN' },
          { t: 'out', x: 'config vpn ipsec phase2-interface' },
          { t: 'out', x: '    edit "FC-VPN"' },
          { t: 'out', x: '        set phase1name "FC-VPN"' },
          {
            t: 'out',
            x: '        set proposal aes128-sha1 aes256-sha1 aes128-sha256 aes256-sha256 aes128gcm aes256gcm chacha20poly1305',
          },
          { t: 'out', x: '    next' },
          { t: 'out', x: 'end' },
        ],
      },
      {
        t: 'note',
        x: 'The wizard has an "Enable IPv4 Split Tunnel" checkbox. If you want all client internet traffic routed through the FortiGate (full tunnel), leave it unchecked. If you enable split tunnel, only the configured subnets go through the VPN, client internet traffic stays local. Verify the Phase 2 selectors match your intent after creation.',
      },
      {
        t: 'h',
        x: 'IP Addressing',
      },
      {
        t: 'p',
        x: 'The wizard creates a firewall address object of type iprange for the client IP pool. Mode-cfg pushes addresses from that range to connecting clients. The object gets named <tunnelname>_range and lives under Policy & Objects > Addresses. You can adjust the range after the fact without touching the Phase 1 config.',
      },
      {
        t: 'code',
        label: 'FortiGate CLI — client IP pool',
        lines: [
          { t: 'prompt', x: 'FortiGate # show firewall address FC-VPN_range' },
          { t: 'out', x: 'config firewall address' },
          { t: 'out', x: '    edit "FC-VPN_range"' },
          { t: 'out', x: '        set type iprange' },
          { t: 'out', x: '        set associated-interface "FC-VPN"' },
          { t: 'out', x: '        set start-ip 10.10.10.10' },
          { t: 'out', x: '        set end-ip 10.10.10.100' },
          { t: 'out', x: '    next' },
          { t: 'out', x: 'end' },
        ],
      },
      {
        t: 'p',
        x: "Use a range that doesn't overlap with anything on your LAN. You'd be amazed how many people hand out 192.168.1.x to VPN clients on a network that's also 192.168.1.0/24, and then spend two hours wondering why routing is broken.",
      },
      {
        t: 'h',
        x: 'Firewall Policies',
      },
      {
        t: 'p',
        x: 'The wizard generates a policy allowing VPN clients to reach the local network. If you need full tunnel (client internet traffic also routed through the FortiGate), you need to add a second policy for VPN-to-WAN. Check what was generated first under Policy & Objects > Firewall Policy.',
      },
      {
        t: 'code',
        label: 'VPN → LAN (wizard-generated)',
        lines: [
          { t: 'out', x: 'config firewall policy' },
          { t: 'out', x: '    edit <id>' },
          { t: 'out', x: '        set name "FC-VPN_local"' },
          { t: 'out', x: '        set srcintf "FC-VPN"' },
          { t: 'out', x: '        set dstintf "lan"' },
          { t: 'out', x: '        set srcaddr "FC-VPN_range"' },
          { t: 'out', x: '        set dstaddr "all"' },
          { t: 'out', x: '        set action accept' },
          { t: 'out', x: '        set schedule "always"' },
          { t: 'out', x: '        set service "ALL"' },
          { t: 'out', x: '    next' },
          { t: 'out', x: 'end' },
        ],
      },
      {
        t: 'p',
        x: "For full tunnel, add a VPN-to-WAN policy with NAT enabled. Without this, clients in full-tunnel mode connect successfully and then have no internet access, a classic FortiClient mystery that wastes an hour of everyone's life:",
      },
      {
        t: 'code',
        label: 'VPN → WAN (full tunnel internet access)',
        lines: [
          { t: 'cmd', x: 'config firewall policy' },
          { t: 'cmd', x: '    edit 0' },
          { t: 'cmd', x: '        set name "FC-VPN_internet"' },
          { t: 'cmd', x: '        set srcintf "FC-VPN"' },
          { t: 'cmd', x: '        set dstintf "wan1"' },
          { t: 'cmd', x: '        set srcaddr "FC-VPN_range"' },
          { t: 'cmd', x: '        set dstaddr "all"' },
          { t: 'cmd', x: '        set action accept' },
          { t: 'cmd', x: '        set schedule "always"' },
          { t: 'cmd', x: '        set service "ALL"' },
          { t: 'cmd', x: '        set nat enable' },
          { t: 'cmd', x: '    next' },
          { t: 'cmd', x: 'end' },
        ],
      },
      {
        t: 'h',
        x: 'FortiClient Setup',
      },
      {
        t: 'p',
        x: 'On the client machine, open FortiClient and navigate to Remote Access > Add a new connection. Set the following to match what you configured on the FortiGate:',
      },
      {
        t: 'list',
        x: [
          'VPN Type → IPsec VPN',
          "Remote Gateway → your FortiGate's public IP or FQDN",
          'Authentication Method → Pre-Shared Key',
          'Pre-Shared Key → exact same PSK set on the FortiGate',
          'Advanced Settings > Phase 1 Local ID → leave empty unless you set a specific peerid on the FortiGate; if you did, it must match exactly',
          'Advanced Settings > Enable Local LAN → enable this if you need to reach local network resources while VPN is active',
        ],
      },
      {
        t: 'p',
        x: 'After connecting, verify the routes were pushed down correctly. On Windows:',
      },
      {
        t: 'code',
        label: 'Verify pushed routes — Windows CMD',
        lines: [
          { t: 'prompt', x: 'C:\\>' },
          { t: 'cmd', x: 'route print' },
          { t: 'out', x: '...' },
          {
            t: 'out',
            x: '  0.0.0.0    0.0.0.0    10.10.10.1    10.10.10.10    25   ← full tunnel default route',
          },
          {
            t: 'out',
            x: '  10.0.0.0   255.0.0.0  10.10.10.1    10.10.10.10    25   ← or split tunnel subnet',
          },
        ],
      },
      {
        t: 'h',
        x: 'Multiple Tunnels on the Same WAN',
      },
      {
        t: 'p',
        x: 'If you run more than one IPSec dialup VPN on the same WAN interface, the FortiGate has no way to tell which incoming client belongs to which tunnel. By default, peertype is "any", the first matching Phase 1 wins. In a multi-tunnel setup this silently routes clients to the wrong tunnel and you get a fun puzzle to debug.',
      },
      {
        t: 'p',
        x: 'The fix is a unique peer ID per tunnel. In the GUI: go to VPN > IPsec Tunnels, convert the tunnel to custom, edit the Authentication section, set "Accept Types" to "Specific peer ID", and enter a unique value. The FortiClient must send that same value as its Phase 1 Local ID.',
      },
      {
        t: 'code',
        label: 'Peer ID — CLI',
        lines: [
          { t: 'cmd', x: 'config vpn ipsec phase1-interface' },
          { t: 'cmd', x: '    edit "FC-VPN"' },
          { t: 'cmd', x: '        set peertype one' },
          { t: 'cmd', x: '        set peerid "dialup1"' },
          { t: 'cmd', x: '    next' },
          { t: 'cmd', x: 'end' },
        ],
      },
      {
        t: 'p',
        x: 'In FortiClient, set Phase 1 Local ID to "dialup1" to match. Both sides have to agree or the handshake fails.',
      },
      {
        t: 'h',
        x: 'Debugging',
      },
      {
        t: 'p',
        x: 'When something breaks (and it will) use IKE debug to see exactly what\'s happening during negotiation. This is the single most useful thing you can run when FortiClient sits there "connecting" and nothing happens:',
      },
      {
        t: 'code',
        label: 'IKE debug',
        lines: [
          { t: 'cmd', x: 'diagnose debug disable' },
          { t: 'cmd', x: 'diagnose debug reset' },
          { t: 'cmd', x: 'diagnose vpn ike log-filter dst-addr4 <client-public-ip>' },
          { t: 'cmd', x: 'diagnose debug application ike -1' },
          { t: 'cmd', x: 'diagnose debug console timestamp enable' },
          { t: 'cmd', x: 'diagnose debug enable' },
          { t: 'out', x: '' },
          { t: 'out', x: '... trigger a connection from FortiClient and watch the output ...' },
          { t: 'out', x: '' },
          { t: 'cmd', x: 'diagnose debug disable' },
        ],
      },
      {
        t: 'p',
        x: 'To list active dialup sessions:',
      },
      {
        t: 'code',
        label: 'Active dialup tunnels',
        lines: [
          { t: 'cmd', x: 'diagnose vpn tunnel dialup-list FC-VPN' },
          { t: 'out', x: 'name=FC-VPN ver=1 serial=1 <wan-ip>:4500-><client-ip>:4500 tun_id=<id>' },
          {
            t: 'out',
            x: 'bound_if=<if_id> lgwy=static/1 tun=intf/0 mode=dial_inst/2 encap=none/576 ...',
          },
        ],
      },
      {
        t: 'h',
        x: 'Known Gotchas',
      },
      {
        t: 'list',
        x: [
          'Tunnel name limit: 13 characters max, no spaces. The wizard might let you enter a longer name on some builds but it will cause issues downstream. Name it short.',
          'Ports 500 and 4500: if you have a VIP forwarding either of these ports to an internal host, IKE negotiation fails. Remove the VIP or change the admin port under System > Settings.',
          'IKEv2 required for FortiClient 7.4.4+: newer FortiClient versions dropped IKEv1 support. The wizard defaults to IKEv1 aggressive mode. If your clients are on FortiClient 7.4.4 or newer, change the IKE version to Version 2 in the Phase 1 settings.',
          'UDP blocked at client site: if UDP 500/4500 is blocked, enable TCP transport in Phase 1. The default IKE TCP port is 443. Change it under System > Settings if 443 conflicts with HTTPS admin access on the same interface.',
          "Google meets don't let you stablish a connection. So if you are using Google meets when trying to connect to the tunnel, disconnect from the call first, otherwise the tunnel will not be established.",
        ],
      },
      {
        t: 'code',
        label: 'Enable IKE TCP transport (when UDP is blocked)',
        lines: [
          { t: 'cmd', x: 'config vpn ipsec phase1-interface' },
          { t: 'cmd', x: '    edit "FC-VPN"' },
          { t: 'cmd', x: '        set transport tcp' },
          { t: 'cmd', x: '    next' },
          { t: 'cmd', x: 'end' },
          { t: 'cmd', x: 'config system settings' },
          { t: 'cmd', x: '    set ike-tcp-port 443' },
          { t: 'cmd', x: 'end' },
          { t: 'ok', x: 'Done. IKE will now encapsulate over TCP/443.' },
        ],
      },
    ],
  },
  {
    id: '0x03',
    slug: 'post-skel',
    tag: 'skel',
    date: '2026.06.03',
    mins: 0,
    title: 'Post skel',
    dek: 'Skeleton of all posts',
    toc: ['Header 0x01', 'Header 0x02'],
    body: [
      {
        t: 'h',
        x: 'Header 0x01',
      },
      {
        t: 'p',
        x: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
      },
      {
        t: 'h',
        x: 'Header 0x02',
      },
      {
        t: 'list',
        x: ['Item 0x01', 'Item 0x02', 'Item 0x03', 'Item 0x04', 'Item 0x05'],
      },
      {
        t: 'code',
        label: 'hello_world.asm',
        lines: [
          { t: 'cmd', x: 'cat hello.asm' },
          { t: 'prompt', x: 'global _start' },
          { t: 'prompt', x: '' },
          { t: 'prompt', x: 'section .data' },
          { t: 'prompt', x: '    hello_text: db "Hello, world!",0x0a' },
          { t: 'prompt', x: '    text_len: equ $ - hello_text' },
          { t: 'prompt', x: '' },
          { t: 'prompt', x: 'section .text' },
          { t: 'prompt', x: '_start:' },
          { t: 'prompt', x: '    mov rax, 1' },
          { t: 'prompt', x: '    mov rdi, 1' },
          { t: 'prompt', x: '    mov rsi, hello_text' },
          { t: 'prompt', x: '    mov rdx, text_len' },
          { t: 'prompt', x: '    syscall' },
          { t: 'prompt', x: '' },
          { t: 'prompt', x: '    mov rax, 60' },
          { t: 'prompt', x: '    xor rdi, rdi' },
          { t: 'prompt', x: '    syscall' },
        ],
      },
    ],
  },
  {
    id: '0x04',
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
    id: '0x05',
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
        x: "Malware analysis and reverse engineering are no longer niche skills. As adversaries get more sophisticated, defenders need to be able to look inside the binaries they encounter. The right toolset matches the phase of investigation — you static-analyze first, dynamic-analyze second, and pull out the heavy frameworks when the simpler tools hit their ceiling.",
      },
      { t: 'h', x: 'Static Analysis' },
      {
        t: 'p',
        x: "Static analysis means examining a binary without running it. These tools let you extract indicators, understand file structure, and disassemble code safely.",
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
    id: '0x06',
    slug: 'hacker-movies',
    tag: 'culture',
    date: '2023.02.23',
    mins: 3,
    title: 'Recommendations on Movies/Series About Hackers',
    dek: "The films and series that shaped how I think about hacking — and why Mr. Robot is still the best thing on the subject.",
    toc: ['Hackers (1995)', 'The Matrix', 'Mr. Robot', 'Who Am I'],
    body: [
      {
        t: 'p',
        x: "I always liked how hackers were represented in movies — even when the depiction was completely wrong. Some of these productions inspired me to get into cybersecurity in the first place. Here are the ones I recommend, along with what to actually take from each of them.",
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
        x: "A German film focused heavily on social engineering within hacker culture. It starts confusing and takes a while to click, but it rewards patience. The way it portrays manipulation, identity, and the human element of hacking makes it worth seeing.",
      },
    ],
  },
  {
    id: '0x07',
    slug: 'chatgpt-academic',
    tag: 'ai, tools',
    date: '2023.02.23',
    mins: 3,
    title: "ChatGPT Can Be Good for Academic Research — If You Use It Right",
    dek: "Using AI to blindly write your papers is lazy and self-defeating. Using it as a thinking partner isn't.",
    toc: ['The Problem', "What It's Actually Good For", 'How I Use It'],
    body: [
      {
        t: 'p',
        x: "OpenAI's ChatGPT blew up in 2022 and everyone panicked about academic integrity. Teachers worried students would paste assignment prompts in and submit the output. Some do. That's not what I want to talk about.",
      },
      { t: 'h', x: 'The Problem' },
      {
        t: 'p',
        x: "The copy-paste approach fails on two levels. First, it produces mediocre work — ChatGPT isn't consistently reliable across all topics, especially technical ones. Second, and more importantly, you don't learn anything. The gaps that creates will catch up with you later. OpenAI built an AI classifier to detect machine-generated text, but even they admit it \"is not fully reliable and should not be used as a primary decision-making tool.\" So it's not even a reliable cheat.",
      },
      { t: 'h', x: "What It's Actually Good For" },
      {
        t: 'list',
        x: [
          'Clarifying concepts you almost understand — sometimes a second explanation from a different angle is what makes things click.',
          "Improving a paragraph you already wrote — paste your draft and ask for suggestions, then judge whether they're better.",
          'Formatting and structure — especially useful for non-native speakers organizing complex technical arguments.',
          'Code generation — useful, but verify everything for correctness and security issues before using it.',
          'Resumes and cover letters — solid at this, and the stakes for "AI-ness" are lower.',
        ],
      },
      { t: 'h', x: 'How I Use It' },
      {
        t: 'p',
        x: "For my university cybersecurity research I use ChatGPT to sharpen my own writing and to get fast explanations of concepts I'm still building intuition on. I never submit what it produces directly. The goal is to understand better, write better — not to outsource the thinking. The moment you stop doing the thinking, you stop learning. And in cybersecurity, what you don't understand is exactly where your blind spots live.",
      },
    ],
  },
  {
    id: '0x08',
    slug: 'linux-distro-expertise',
    tag: 'linux',
    date: '2023.01.26',
    mins: 3,
    title: "Does the Linux Distro You Use Determine If You're a Noob or an Expert?",
    dek: "No. And anyone who tells you otherwise is gatekeeping for ego reasons.",
    toc: ['The Gatekeeping Problem', 'What Actually Matters'],
    body: [
      {
        t: 'p',
        x: "At the beginning of my journey on Linux I ran into people who looked down on others for using Ubuntu or Linux Mint, as if running Arch or Gentoo made them a better programmer or a more skilled sysadmin. I used to take that seriously. I don't anymore.",
      },
      { t: 'h', x: 'The Gatekeeping Problem' },
      {
        t: 'p',
        x: "The distro you use doesn't matter and doesn't affect your expertise on Linux. The kernel is the same. The tools are the same. The concepts are the same. Arch teaches you more about how things fit together because you build more by hand — that's valuable — but it doesn't make you a better operator than someone who uses Ubuntu and spends that saved setup time actually learning the system.",
      },
      {
        t: 'p',
        x: "I ran Arch and Gentoo for a while. I learned a lot. I also spent too much time on breakage and configuration that had nothing to do with the skills I was actually trying to build. Now I keep a user-friendly distro as my daily driver and spin up the complex ones in VMs when I want to dig into something specific.",
      },
      { t: 'h', x: 'What Actually Matters' },
      {
        t: 'p',
        x: "The only thing that determines Linux expertise is how much time you spend studying it and how deep you go. Not which distro you picked. Choose what fits your requirements, your available time, and your patience — and then spend your energy actually learning, not justifying your distro choice to strangers on the internet.",
      },
      {
        t: 'list',
        x: [
          'Ubuntu / Linux Mint — solid daily drivers. Good community support, stable packages, low setup overhead.',
          'Arch — teaches you how the system fits together. Great in a VM for learning; exhausting as a daily driver.',
          'Gentoo — compile everything from source. Maximum control, maximum time cost. Worth trying once.',
        ],
      },
    ],
  },
  {
    id: '0x09',
    slug: 'containers-vs-vms',
    tag: 'containers, docker, linux',
    date: '2023.01.24',
    mins: 2,
    title: 'Use Containers to Make Your Life Easier',
    dek: "Why I stopped spinning up full VMs for every test and started using Docker instead.",
    toc: ['VMs vs Containers', 'When to Use Which'],
    body: [
      {
        t: 'p',
        x: "I used to test applications inside a Virtual Machine. It worked, but it was slow — every new test meant installing a full OS, waiting for it to boot, and dealing with more hardware overhead than the application itself actually needed. Containers solved that for me.",
      },
      { t: 'h', x: 'VMs vs Containers' },
      {
        t: 'p',
        x: "A Virtual Machine runs a complete guest OS managed by a Hypervisor (like Linux KVM or Microsoft Hyper-V). The hypervisor handles resource sharing across VMs on the same physical machine — this is how cloud providers like AWS run thousands of EC2 instances on shared hardware. VMs give you full isolation but come with the cost of running an entire operating system.",
      },
      {
        t: 'p',
        x: "Containers don't need a full OS. They share the host kernel and only bundle what the application itself needs. Docker is the modern standard, but the concept predates it — containers existed with LXC long before Docker was created. Docker built on top of that and made the tooling approachable.",
      },
      { t: 'h', x: 'When to Use Which' },
      {
        t: 'p',
        x: "Containers are the right call for temporary applications, testing, or production environments where the setup should be simple and repeatable. VMs are still the right call when you need full OS isolation, a different kernel, or platform-specific behavior. Know the tradeoff and pick what your problem actually requires.",
      },
    ],
  },
  {
    id: '0x0A',
    slug: 'commodore64-linux',
    tag: 'retro, linux',
    date: '2023.01.23',
    mins: 4,
    title: 'How to Install a Commodore 64 Emulator on Linux',
    dek: 'Installing VICE from source — so you can run the best-selling personal computer of 1982 on your modern machine.',
    toc: ['Prerequisites', 'Downloading & Compiling', 'Installing'],
    body: [
      {
        t: 'p',
        x: "The Commodore 64 is an 8-bit computer introduced in 1982 by Commodore International. It uses a variant of the MOS 6502 microprocessor, the MOS 6510, has 64KB of RAM, and was the top-selling personal computer of its time at around $595. Originals show up on eBay around $200 today — not cheap, and importing one is worse. So: emulation.",
      },
      {
        t: 'p',
        x: "VICE is the emulator I use. It covers everything Commodore built: C64, C128, VIC-20, and more. Here's how to build and install it from source on Linux.",
      },
      { t: 'h', x: 'Prerequisites' },
      {
        t: 'p',
        x: "Install these packages with your distro's package manager before starting:",
      },
      {
        t: 'list',
        x: ['GTK3 or SDL2 (GTK3 recommended)', 'flex', 'bison', 'dos2unix', 'xa65', 'texinfo', 'texlive', 'glew'],
      },
      { t: 'h', x: 'Downloading & Compiling' },
      {
        t: 'p',
        x: 'Download vice-3.7.tar.gz from the VICE official site. Then extract, configure, and compile:',
      },
      {
        t: 'code',
        label: 'Build VICE from source',
        lines: [
          { t: 'cmd', x: 'tar xzvf vice-3.7.tar.gz' },
          { t: 'cmd', x: 'cd vice-3.7' },
          { t: 'cmd', x: './configure' },
          { t: 'out', x: '... checking dependencies ...' },
          { t: 'cmd', x: 'make -j$(nproc)' },
          { t: 'out', x: '... compiling (time depends on your hardware) ...' },
        ],
      },
      {
        t: 'p',
        x: "The -j$(nproc) flag tells make to use all available CPU cores. If ./configure errors out, a missing package is almost always the cause — read the error, find the package name for your distro, and install it.",
      },
      { t: 'h', x: 'Installing' },
      {
        t: 'code',
        label: 'Install system-wide',
        lines: [
          { t: 'cmd', x: 'sudo make install' },
          { t: 'ok', x: 'Done. Run x64sc to launch the C64 emulator.' },
        ],
      },
      {
        t: 'p',
        x: "You can also skip the install and run binaries directly from the src/ folder — useful if you just want to try it without touching your system paths. For C64 software and ROM images, the Zimmers archive is the go-to resource: http://www.zimmers.net/anonftp/pub/cbm/",
      },
    ],
  },
  {
    id: '0x0B',
    slug: 'programming-languages-start',
    tag: 'programming',
    date: '2023.01.23',
    mins: 3,
    title: 'Programming Languages: Where to Start',
    dek: 'Start with C. Understand memory. Everything else gets easier from there.',
    toc: ['Know Thy Enemy', 'Start with C', 'Resources'],
    body: [
      {
        t: 'p',
        x: "A lot of people I know at university — and outside it — ask whether they should start with Python or JavaScript. My answer is always the same: start with C.",
      },
      { t: 'h', x: 'Know Thy Enemy' },
      {
        t: 'p',
        x: "Sun Tzu's principle applies here: know the thing you're working with at its deepest level. A programmer who doesn't understand how code executes — how it touches registers, affects RAM, loads data into the CPU — will write worse software than one who does. High-level abstractions are great, but they're built on things that follow hard rules. Understanding those rules makes everything else legible.",
      },
      { t: 'h', x: 'Start with C' },
      {
        t: 'p',
        x: "C was created by Dennis Ritchie in 1970. It's low-level enough to require you to manage memory yourself — allocating, freeing, working directly with memory addresses — but high-level enough that you can actually build things with it. That combination is exactly what makes it the right starting point.",
      },
      {
        t: 'p',
        x: "Learning C forces you to think about what the machine is actually doing. You allocate memory and you have to free it. You work with pointers. You see segfaults when you mess up. Once that mental model is solid, every other language makes more sense because you understand what's happening under the abstraction.",
      },
      {
        t: 'p',
        x: "Use a debugger early. GDB on Linux or Visual Studio's built-in debugger on Windows. Step through your code, watch what happens in memory, see how data structures actually look. This is where the real learning happens — not reading, but executing and observing.",
      },
      { t: 'h', x: 'Resources' },
      {
        t: 'list',
        x: [
          'Ben Eater (YouTube) — electronics and computer architecture from first principles. Builds a CPU on a breadboard.',
          'Low Level Learning (YouTube) — C, assembly, and systems programming explained clearly.',
        ],
      },
    ],
  },
  {
    id: '0x0C',
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
          { t: 'out', x: 'rauth: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, ...' },
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
          { t: 'out', x: '001065e3:  MOV RAX, 0x3361303732633464             ; nonce → LE bytes: d4c270a3' },
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
          { t: 'out', x: '        x[0],  x[4],  x[8],  x[12] = quarter_round(x[0],  x[4],  x[8],  x[12])' },
          { t: 'out', x: '        x[5],  x[9],  x[13], x[1]  = quarter_round(x[5],  x[9],  x[13], x[1])' },
          { t: 'out', x: '        x[10], x[14], x[2],  x[6]  = quarter_round(x[10], x[14], x[2],  x[6])' },
          { t: 'out', x: '        x[15], x[3],  x[7],  x[11] = quarter_round(x[15], x[3],  x[7],  x[11])' },
          { t: 'out', x: '        x[0],  x[1],  x[2],  x[3]  = quarter_round(x[0],  x[1],  x[2],  x[3])' },
          { t: 'out', x: '        x[5],  x[6],  x[7],  x[4]  = quarter_round(x[5],  x[6],  x[7],  x[4])' },
          { t: 'out', x: '        x[10], x[11], x[8],  x[9]  = quarter_round(x[10], x[11], x[8],  x[9])' },
          { t: 'out', x: '        x[15], x[12], x[13], x[14] = quarter_round(x[15], x[12], x[13], x[14])' },
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
          { t: 'out', x: 'Password: TheCrucialRustEngineering@2021;)' },
          { t: 'out', x: 'Flag:     HTB{F4k3_f74g_4_t3s7ing}' },
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
          { t: 'cmd', x: "echo 'TheCrucialRustEngineering@2021;)' | ./rauth" },
          { t: 'out', x: 'Welcome to secure login portal!' },
          { t: 'out', x: 'Enter the password to access the system:' },
          { t: 'ok', x: 'Successfully Authenticated' },
          { t: 'out', x: 'Flag: "HTB{F4k3_f74g_4_t3s7ing}"' },
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
          { t: 'cmd', x: "echo 'TheCrucialRustEngineering@2021;)' | nc -q2 154.57.164.70 30193" },
          { t: 'out', x: 'Welcome to secure login portal!' },
          { t: 'out', x: 'Enter the password to access the system:' },
          { t: 'ok', x: 'Successfully Authenticated' },
          { t: 'ok', x: 'Flag: "HTB{I_Kn0w_h0w_t0_5al54}"' },
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
]

export function byId(id: string): Article {
  return ARTICLES.find((a) => a.id === id) ?? ARTICLES[0]!
}
