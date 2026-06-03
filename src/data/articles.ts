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
]

export function byId(id: string): Article {
  return ARTICLES.find((a) => a.id === id) ?? ARTICLES[0]!
}
