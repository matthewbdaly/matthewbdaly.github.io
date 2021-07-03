module.exports = {
  siteMetadata: {
    title: `Matthew Daly`,
    author: {
      name: `Matthew Daly`,
      summary: `who lives in Norfolk and works in Norwich (except during the lockdown, when he's been working from home).`,
    },
    description: `I'm a web developer in Norfolk. This is my blog...`,
    siteUrl: `https://matthewdaly.co.uk`,
    social: {
      twitter: `mattbd`,
    },
  },
	plugins: [
		"gatsby-plugin-netlify-cms",
		"gatsby-plugin-robots-txt",
		`gatsby-plugin-postcss`,
		"gatsby-plugin-image",
		{
			resolve: "gatsby-plugin-opensearch",
			options: {
				shortName: "Matthew Daly",
				description: "Search matthewdaly.co.uk",
				searchTemplate: "/search?s={searchTerms}",
				searchForm: "/search",
			}
		},
		{
			resolve: "gatsby-plugin-local-search",
			options: {
				name: 'posts',
				engine: 'flexsearch',
				engineOptions: {
					suggest: true,
				},
				query: `
					{
						allMdx (
							filter: { frontmatter: {layout: {eq: "post"}}}
						) {
							nodes {
								id
								frontmatter {
									title
									categories
								}
								fields {
									path
								}
								body
							}
						}
					}
				`,
				ref: 'id',
				index: ['title', 'categories', 'body'],
				store: ['id', 'path', 'title'],
				normalizer: ({ data }) => 
				data.allMdx.nodes.map(node => ({
					id: node.id,
					path: node.fields.path,
					title: node.frontmatter.title,
					body: node.body,
				})),
			},
		},
		{
			resolve: "gatsby-plugin-google-analytics",
			options: {
				trackingId: "UA-17043630-1",
			},
		},
		{
			resolve: "gatsby-plugin-feed",
			options: {
				query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
							}
						}
					}
				`,
				feeds: [{
					serialize: ({ query: { site, allMdx } }) => {
						return allMdx.edges.map(edge => {
							return Object.assign({}, edge.node.frontmatter, {
								description: edge.node.html,
								date: edge.node.frontmatter.date,
								url: site.siteMetadata.siteUrl + edge.node.fields.path,
								guid: site.siteMetadata.siteUrl + edge.node.fields.path,
								custom_elements: [{ "content:encoded": edge.node.html }],
							})
						})
					},
					query: `
						{
							allMdx (
								sort: { order: DESC, fields: [frontmatter___date] },
								filter: { frontmatter: {layout: {eq: "post"}}}
								limit: 10
								) {
									edges {
										node {
											excerpt
											html
											fields {
												path
											}
											frontmatter {
												title
												date
											}
										}
									}
								}
						}
					`,
					output: `/rss.xml`,
					title: "Matthew Daly"
				}]
			},
		},

		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: `src/images/icon.png`,
				name: `Matthew Daly's Blog`,
				short_name: `Matthew Daly`,
				start_url: `/`,
				background_color: `white`,
				theme_color: `black`,
				display: `standalone`
			},
		},
		"gatsby-plugin-offline",
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [`.mdx`, `.md`],
				gatsbyRemarkPlugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1200,
						}
					}
				]
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		"gatsby-remark-images",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "content",
				path: "./src/content/pages/",
			},
			__key: "content",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "posts",
				path: "./src/content/posts/",
			},
			__key: "posts",
		},
	],
};
