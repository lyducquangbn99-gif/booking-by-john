export const PORT_ROUTES = [
  { slug: "ho-chi-minh-to-genoa", origin: "Ho Chi Minh City, Vietnam", destination: "Genoa, Italy", port: "Genoa", country: "Italy" },
  { slug: "ho-chi-minh-to-la-spezia", origin: "Ho Chi Minh City, Vietnam", destination: "La Spezia, Italy", port: "La Spezia", country: "Italy" },
  { slug: "ho-chi-minh-to-barcelona", origin: "Ho Chi Minh City, Vietnam", destination: "Barcelona, Spain", port: "Barcelona", country: "Spain" },
  { slug: "ho-chi-minh-to-valencia", origin: "Ho Chi Minh City, Vietnam", destination: "Valencia, Spain", port: "Valencia", country: "Spain" },
  { slug: "ho-chi-minh-to-algeciras", origin: "Ho Chi Minh City, Vietnam", destination: "Algeciras, Spain", port: "Algeciras", country: "Spain" },
  { slug: "ho-chi-minh-to-fos-sur-mer", origin: "Ho Chi Minh City, Vietnam", destination: "Fos-sur-Mer, France", port: "Fos-sur-Mer", country: "France" },
  { slug: "ho-chi-minh-to-istanbul", origin: "Ho Chi Minh City, Vietnam", destination: "Istanbul, Türkiye", port: "Istanbul", country: "Türkiye" },
  { slug: "ho-chi-minh-to-izmit", origin: "Ho Chi Minh City, Vietnam", destination: "Izmit, Türkiye", port: "Izmit", country: "Türkiye" },
  { slug: "ho-chi-minh-to-mersin", origin: "Ho Chi Minh City, Vietnam", destination: "Mersin, Türkiye", port: "Mersin", country: "Türkiye" },
  { slug: "ho-chi-minh-to-durres", origin: "Ho Chi Minh City, Vietnam", destination: "Durrës, Albania", port: "Durrës", country: "Albania" },
  { slug: "ho-chi-minh-to-casablanca", origin: "Ho Chi Minh City, Vietnam", destination: "Casablanca, Morocco", port: "Casablanca", country: "Morocco" },
  { slug: "ho-chi-minh-to-tangier-med", origin: "Ho Chi Minh City, Vietnam", destination: "Tangier Med, Morocco", port: "Tangier Med", country: "Morocco" },
  { slug: "ho-chi-minh-to-kaohsiung", origin: "Ho Chi Minh City, Vietnam", destination: "Kaohsiung, Taiwan", port: "Kaohsiung", country: "Taiwan" },
  { slug: "ho-chi-minh-to-taichung", origin: "Ho Chi Minh City, Vietnam", destination: "Taichung, Taiwan", port: "Taichung", country: "Taiwan" },
  { slug: "ho-chi-minh-to-keelung", origin: "Ho Chi Minh City, Vietnam", destination: "Keelung, Taiwan", port: "Keelung", country: "Taiwan" },
  { slug: "ho-chi-minh-to-rotterdam", origin: "Ho Chi Minh City, Vietnam", destination: "Rotterdam, Netherlands", port: "Rotterdam", country: "Netherlands" },
  { slug: "ho-chi-minh-to-hamburg", origin: "Ho Chi Minh City, Vietnam", destination: "Hamburg, Germany", port: "Hamburg", country: "Germany" },
  { slug: "ho-chi-minh-to-antwerp", origin: "Ho Chi Minh City, Vietnam", destination: "Antwerp, Belgium", port: "Antwerp", country: "Belgium" },
  { slug: "ho-chi-minh-to-le-havre", origin: "Ho Chi Minh City, Vietnam", destination: "Le Havre, France", port: "Le Havre", country: "France" },
  { slug: "ho-chi-minh-to-southampton", origin: "Ho Chi Minh City, Vietnam", destination: "Southampton, United Kingdom", port: "Southampton", country: "United Kingdom" },
  { slug: "ho-chi-minh-to-felixstowe", origin: "Ho Chi Minh City, Vietnam", destination: "Felixstowe, United Kingdom", port: "Felixstowe", country: "United Kingdom" },
  { slug: "ho-chi-minh-to-london-gateway", origin: "Ho Chi Minh City, Vietnam", destination: "London Gateway, United Kingdom", port: "London Gateway", country: "United Kingdom" },
  { slug: "hai-phong-to-barcelona", origin: "Hai Phong, Vietnam", destination: "Barcelona, Spain", port: "Barcelona", country: "Spain" },
  { slug: "hai-phong-to-yokohama", origin: "Hai Phong, Vietnam", destination: "Yokohama, Japan", port: "Yokohama", country: "Japan" },
] as const;

export type PortRoute = (typeof PORT_ROUTES)[number];

export function getPortRoute(slug: string) {
  return PORT_ROUTES.find((route) => route.slug === slug);
}
