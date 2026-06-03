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
        x: 'Starting from version 7.6.x, FortiOS drops SSL-VPN entirely. SSL-VPN had design-level vulnerabilities that were baked into the protocol itself (as expected from Fortinet\'s track record), so they finally decided to go all-in on IPSec. If you\'re running anything below 7.6.x and planning to upgrade, migrating your VPN configs is not optional.',
      },
      {
        t: 'p',
        x: 'The good news: IPSec is the right call. The bad news: FortiClient still sucks, and there are enough gotchas in the migration to ruin someone\'s Friday. This guide covers FortiClient as a dialup client, the standard remote access use case.',
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
        x: 'Fortinet provides a VPN Wizard that generates the Phase 1, Phase 2, address objects, and firewall policies automatically. Use it for the initial setup. It\'s the fastest path and it generates sane defaults. Manual config comes later when you need to tune things.',
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
        x: 'On the final Review page, the wizard shows every object it\'s about to create. Check it before hitting Submit. After creation, verify under VPN > IPsec Tunnels that Phase 1 and Phase 2 entries are both present.',
      },
      {
        t: 'h',
        x: 'Under the Hood — Phase 1',
      },
      {
        t: 'p',
        x: 'Phase 1 is the IKE negotiation, where both sides agree on how to authenticate and establish the control channel. For FortiClient as a dialup client, the FortiGate acts as a responder with a dynamic Phase 1 that accepts incoming connections from any IP. Here\'s the CLI representation of what the wizard builds:',
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
          { t: 'out', x: '        set proposal aes128-sha256 aes256-sha256 aes128-sha1 aes256-sha1' },
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
        x: 'Phase 2 negotiates the actual data tunnel, the encryption for your traffic and the selectors that define what flows through. For full tunnel (all client traffic through the FortiGate), the selector is 0.0.0.0/0. For split tunnel, you\'d list only the subnets that should go through the VPN.',
      },
      {
        t: 'code',
        label: 'FortiGate CLI — Phase 2',
        lines: [
          { t: 'prompt', x: 'FortiGate # show vpn ipsec phase2-interface FC-VPN' },
          { t: 'out', x: 'config vpn ipsec phase2-interface' },
          { t: 'out', x: '    edit "FC-VPN"' },
          { t: 'out', x: '        set phase1name "FC-VPN"' },
          { t: 'out', x: '        set proposal aes128-sha1 aes256-sha1 aes128-sha256 aes256-sha256 aes128gcm aes256gcm chacha20poly1305' },
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
        x: 'For full tunnel, add a VPN-to-WAN policy with NAT enabled. Without this, clients in full-tunnel mode connect successfully and then have no internet access, a classic FortiClient mystery that wastes an hour of everyone\'s life:',
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
          'Remote Gateway → your FortiGate\'s public IP or FQDN',
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
          { t: 'out', x: '  0.0.0.0    0.0.0.0    10.10.10.1    10.10.10.10    25   ← full tunnel default route' },
          { t: 'out', x: '  10.0.0.0   255.0.0.0  10.10.10.1    10.10.10.10    25   ← or split tunnel subnet' },
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
          { t: 'out', x: 'bound_if=<if_id> lgwy=static/1 tun=intf/0 mode=dial_inst/2 encap=none/576 ...' },
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
          'Google meets don\'t let you stablish a connection. So if you are using Google meets when trying to connect to the tunnel, disconnect from the call first, otherwise the tunnel will not be established.'
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
]

export function byId(id: string): Article {
  return ARTICLES.find((a) => a.id === id) ?? ARTICLES[0]!
}
