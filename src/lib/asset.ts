/**
 * Resolves a file in /public against the site's base path, so the site works both at a
 * domain root (wellesleyfca.com/) and under a GitHub Pages project path (user.github.io/repo/).
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
