// Progressive media lazy loading is newer than Astro's bundled HTML typings.
declare namespace astroHTML.JSX {
  interface VideoHTMLAttributes {
    loading?: 'eager' | 'lazy';
  }
}
