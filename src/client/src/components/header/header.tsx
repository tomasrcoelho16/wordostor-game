import { SVGLogo } from '../icons/logo'

export function Header() {
  return (
    <nav className="h-14 bg-white flex items-center gap-8 px-6">
      <SVGLogo classname="h-12 w-12" />
      <ul className="text-black flex gap-3">
        <li>Home</li>
        <li>Settings</li>
      </ul>
    </nav>
  )
}
