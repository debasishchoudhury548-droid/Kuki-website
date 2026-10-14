import { useEffect } from 'react'
import markup from './markup.html?raw'
import { init } from './magic'

// Scenes are authored as markup (src/markup.html); behaviour lives in src/magic.ts; words live in src/content.ts.
export default function App() {
  useEffect(() => { init() }, [])
  return <div dangerouslySetInnerHTML={{ __html: markup }} />
}
