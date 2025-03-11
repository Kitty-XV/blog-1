export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-screen-xl px-6 py-6">
        <div className="flex items-center justify-between">
          {/* 左侧版权信息 */}
          <div className="text-sm font-light text-foreground/30">
            © {new Date().getFullYear()} Renne. All rights reserved.
          </div>
          
          {/* 右侧社交图标 */}
          <div className="flex items-center gap-6">
            {/* RSS订阅按钮 */}
            <a
              href="/rss"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-foreground/40 transition-colors duration-150 ease-out hover:text-foreground"
              aria-label="RSS Feed"
            >
              <span className="absolute -inset-2 -z-10 scale-50 rounded-lg bg-foreground/5 opacity-0 transition-all duration-150 ease-out group-hover:scale-100 group-hover:opacity-100" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 transition-transform duration-150 ease-out group-hover:-translate-y-0.5">
                <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z" />
                <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </a>
            <a
              href="mailto:zhzh02190775@gmail.com"
              className="group relative text-foreground/40 transition-colors duration-150 ease-out hover:text-foreground"
              aria-label="Email"
            >
              <span className="absolute -inset-2 -z-10 scale-50 rounded-lg bg-foreground/5 opacity-0 transition-all duration-150 ease-out group-hover:scale-100 group-hover:opacity-100" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 transition-transform duration-150 ease-out group-hover:-translate-y-0.5">
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
            </a>
            <a
              href="https://github.com/Kitty-XV"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-foreground/40 transition-colors duration-150 ease-out hover:text-foreground"
              aria-label="GitHub"
            >
              <span className="absolute -inset-2 -z-10 scale-50 rounded-lg bg-foreground/5 opacity-0 transition-all duration-150 ease-out group-hover:scale-100 group-hover:opacity-100" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 transition-transform duration-150 ease-out group-hover:-translate-y-0.5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://x.com/renne0775?s=11"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-foreground/40 transition-colors duration-150 ease-out hover:text-foreground"
              aria-label="Twitter"
            >
              <span className="absolute -inset-2 -z-10 scale-50 rounded-lg bg-foreground/5 opacity-0 transition-all duration-150 ease-out group-hover:scale-100 group-hover:opacity-100" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 transition-transform duration-150 ease-out group-hover:-translate-y-0.5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 