export interface SiteData {
  siteMetadata: {
    title: string;
    siteUrl: string;
  }
}

export interface PageData {
  fields: {
    path: string;
  },
  frontmatter: {
    title: string;
    date: string;
    categories: string[];
  },
  body: string;
  excerpt: string;
  id: string;
}

export interface PageContext {
  previous: PageData;
  next: PageData;
}
