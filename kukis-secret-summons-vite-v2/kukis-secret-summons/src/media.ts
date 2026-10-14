// Finds the files you drop into Photos/, Music/ and Videos/ at build time (works in dev AND production).
const opt = { eager: true, query: '?url', import: 'default' } as const
const P = import.meta.glob<string>('../Photos/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', opt)
const A = import.meta.glob<string>('../Music/*.{mp3,m4a,wav,ogg,aac,MP3,M4A,WAV,OGG,AAC}', opt)
const V = import.meta.glob<string>('../Videos/*.{mp4,webm,m4v,mov,MP4,WEBM,M4V,MOV}', opt)
// exact name first (e.g. photo1.*); for song/video, fall back to the first file in the folder
const pick = (m: Record<string, string>, base: string, any = false) => {
  const e = Object.entries(m)
  const hit = e.find(([k]) => k.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase() === base)
  return hit ? hit[1] : any && e[0] ? e[0][1] : ''
}
export const media = {
  p1: pick(P, 'photo1'), p2: pick(P, 'photo2'), p3: pick(P, 'photo3'),
  song: pick(A, 'favorite-song', true), video: pick(V, 'spiderman-handshake', true),
}
