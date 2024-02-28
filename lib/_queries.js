import { gql } from "graphql-request";

const blogPageQuery = gql`
  fragment BlogPostFields on BlogPost {
    id
    authors {
      id
      name
      photo {
        id
        url
      }
      role
    }
    category
    content {
      raw
    }
    coverImage {
      id
      height
      url(transformation: {image: {resize: {height: 336, width: 640, fit: crop}}})
      width
    }
    excerpt
    published
    slug
    title
    seo {
      id
      keywords
      noIndex
      title
      description
      image {
        id
        height
        width
        url
      }
      openGraph {
        url
        title
        stage
        image {
          url
        }
        description
        id
      }
      twitter {
        card
        description
        id
        publisherHandle
        title
      }
    }
  }

  query BlogPageQuery() {
    page( where: { slug: "blog" }) {
      id
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      navigation {
        id
        slug
        pages(where: { slug_not_in : ["home", "404", "privacy-policy"] }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
      id
      keywords
      noIndex
      title
      description
      image {
        id
        height
        width
        url
      }
      openGraph {
        url
        title
        stage
        image {
          url
        }
        description
        id
      }
      twitter {
        card
        description
        id
        publisherHandle
        title
      }
    }
      subtitle
      title
    }
    posts: blogPosts(orderBy: published_DESC) {
      ...BlogPostFields
    }
  }
`;

const servicePageQuery = gql`
  fragment ServicePostFields on Service {
    id
    content
    image {
      id
      height
      url
      width
    }
    excerpt
    slug
    title
    darkIcon {
        id
        url
        height
        width
      }
      lightIcon {
        id
        url
      }
  }

  
query ServicePageQuery() {
    page( where: { slug: "services" }) {
      id
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      navigation {
        id
        slug
        pages(where: { slug_not_in : ["home", "404", "privacy-policy"] }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
      id
      keywords
      noIndex
      title
      description
      image {
        id
        height
        width
        url
      }
      openGraph {
        url
        title
        stage
        image {
          url
        }
        description
        id
      }
      twitter {
        card
        description
        id
        publisherHandle
        title
      }
    }
      subtitle
      title
      hero {
        title
        subtitle
        id
        buttons {
          id
          href
          label
          theme
        }
        image {
          id
          height
          url
          width
        }
        slug
      }
    }
    service: services(orderBy: updatedAt_ASC) {
      ...ServicePostFields
    }
  }
`;

const blogPostQuery = gql`
  query BlogPostQuery($slug: String!) {
    allPosts: blogPosts(orderBy: published_ASC) {
      id
      slug
      title
      content {
        raw
      }
    }
    page(where: { slug: "blog" }) {
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      navigation {
        id
        slug
        pages(where: { slug_not_in: ["home", "404", "privacy-policy"] }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
        id
        keywords
        noIndex
        title
        description
        image {
          id
          height
          width
          url
        }
        openGraph {
          url
          title
          stage
          image {
            url
          }
          description
          id
        }
        twitter {
          card
          description
          id
          publisherHandle
          title
        }
      }
    }
    post: blogPost(where: { slug: $slug }) {
      id
      authors {
        id
        name
        photo {
          id
          url
        }
        role
      }
      category
      coverImage {
        id
        height
        url
        width
      }
      excerpt
      published
      seo {
        id
        keywords
        noIndex
        title
        description
        image {
          id
          height
          width
          url
        }
        openGraph {
          url
          title
          stage
          image {
            url
          }
          description
          id
        }
        twitter {
          card
          description
          id
          publisherHandle
          title
        }
      }
      slug
      title
      content {
        raw
      }
    }
  }
`;

const pageQuery = gql`
  query PageQuery($slug: String!) {
    page(where: { slug: $slug }) {
      blocks {
        __typename
        ... on Breakpoint {
          id
          buttons {
            id
            href
            label
            theme
          }
          subtitle
          title
        }
        ... on Grid {
          id
          columns {
            __typename
            ... on BlogPost {
              id
              authors {
                id
                name
                photo {
                  id
                  url
                }
                role
              }
              category
              coverImage {
                id
                height
                url
                width
              }
              excerpt
              published
              slug
              title
            }
            ... on Faq {
              id
              content
              title
            }
            ... on Feature {
              id
              content
              icon
              image {
                id
                height
                url
                width
              }
              slug
              title
            }
            ... on Person {
              id
              name
              photo {
                id
                height
                url
                width
              }
              role
            }
            ... on PricingPlan {
              id
              annualPrice
              description
              included
              monthlyPrice
              name
            }
            ... on Stat {
              id
              label
              value
            }
          }
          columnComponent
          component
          gridHeadline: headline
          layout
          slug
          gridSubtitle: subtitle
          gridTag: tag
          theme
          gridTitle: title
          width
          image {
            id
            height
            url
            width
          }
        }
        ... on LogoCloud {
          id
          companies {
            id
            logo {
              id
              height
              url
              width
            }
            name
          }
          logoCloudTitle: title
        }
        ... on Testimonial {
          id
          content
          person {
            id
            name
            company {
              id
              logo {
                id
                height
                url
                width
              }
              name
            }
            photo {
              id
              height
              url
              width
            }
            role
          }
        }
      }
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      hero {
        title
        subtitle
        id
        buttons {
          id
          href
          label
          theme
        }
        image {
          id
          height
          url
          width
        }
        slug
      }
      id
      marketing {
        __typename
        ... on Banner {
          id
          content
          href
          slug
          theme
        }
      }
      navigation {
        id
        slug
        pages(where: { slug_not_in: ["home", "404", "privacy-policy"] }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
        id
        keywords
        noIndex
        title
        description
        image {
          id
          height
          width
          url
        }
        openGraph {
          url
          title
          stage
          image {
            url
          }
          description
          id
        }
        twitter {
          card
          description
          id
          publisherHandle
          title
        }
      }
      subtitle
      title
      content {
        raw
        html
        text
        markdown
      }
    }
    posts: blogPosts(orderBy: published_DESC) {
      id
      excerpt
      published
      slug
      title
    }
  }
`;

const serviceQuery = gql`
  query ServiceQuery($slug: String!) {
  service(where: {slug: $slug}) {
    footer {
      id
      primaryLinks {
        id
        navigationLabel
        slug
      }
      secondaryLinks {
        id
        navigationLabel
        slug
      }
      slug
      title
    }
    hero {
      title
      subtitle
      id
      buttons {
        id
        href
        label
        theme
      }
      image {
        id
        height
        url
        width
      }
      slug
    }
    blocks {
      __typename
      ... on Grid {
          id
          columns {
            __typename
            ... on Feature {
              id
              content
              icon
              image {
                id
                height
                url
                width
              }
              slug
              title
            }
          }
          columnComponent
          component
          gridHeadline: headline
          layout
          slug
          gridSubtitle: subtitle
          gridTag: tag
          theme
          gridTitle: title
          width
          image {
            id
            height
            url
            width
          }
        }
    }
    navigation {
      id
      slug
      pages(where: {slug_not_in: ["home", "404", "privacy-policy"]}) {
        id
        navigationLabel
        slug
      }
    }
    seo {
      id
      keywords
      noIndex
      title
      description
      image {
        id
        height
        width
        url
      }
      openGraph {
        url
        title
        stage
        image {
          url
        }
        description
        id
      }
      twitter {
        card
        description
        id
        publisherHandle
        title
      }
    }
    id
    excerpt
    content
    image {
      url
      width
      height
    }
    darkIcon {
      id
      url
    }
    lightIcon {
      id
      url
    }
    title
    richContent {
      raw
      markdown
      text
      html
    }
  }
}
`;

const generalQuery = gql`
  query GeneralQuery() {
    page( where: { slug: "contact-us" }) {
      id
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      navigation {
        id
        slug
        pages(where: { slug_not_in : ["home", "404", "privacy-policy"] }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
      id
      keywords
      noIndex
      title
      description
      image {
        id
        height
        width
        url
      }
      openGraph {
        url
        title
        stage
        image {
          url
        }
        description
        id
      }
      twitter {
        card
        description
        id
        publisherHandle
        title
      }
    }
      subtitle
      title
    }
  }
`;

const featuredPostQuery = gql`
  query FeaturedPostQuery {
    featuredPost: blogPosts(first: 3, orderBy: publishedAt_ASC) {
      id
      title
      coverImage {
        url
      }
      slug
    }
  }
`;

const testimonialsQuery = gql`
  query TestimonialsQuery {
    testimonials: testimonials(orderBy: publishedAt_ASC) {
      id
      content
      person {
        name
        photo {
          url
          width
          height
        }
      }
    }
  }
`;

const offerQuery = gql`
  query OfferQuery {
    offer: whatWeOffers {
      title
      subtitle
      offer {
        ... on Offer {
          id
          title
          excerpt
          image {
            height
            width
            url
          }
        }
      }
    }
  }
`;

const siteMapQuery = gql`
  query SiteMapQuery { 
    pages: pages(orderBy: updatedAt_ASC) {
      id
      slug
      title
      createdAt
    }
    blogPosts(orderBy: updatedAt_ASC) {
      id
      slug
      title
      createdAt
    }
    services(orderBy: updatedAt_ASC) {
      id
      slug
      title
      createdAt
    }
}`;

export {
  blogPageQuery,
  blogPostQuery,
  pageQuery,
  serviceQuery,
  generalQuery,
  servicePageQuery,
  featuredPostQuery,
  testimonialsQuery,
  offerQuery,
  siteMapQuery,
};
