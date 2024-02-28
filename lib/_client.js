import { GraphQLClient } from 'graphql-request'

const hygraphClient = (preview = false) =>
  {
    return new GraphQLClient(process.env.HYGRAPH_ENDPOINT, {
      headers: {
        ...(process.env.GRAPHCMS_TOKEN && {
          Authorization: `Bearer ${
            preview
              ? process.env.GRAPHCMS_PREVIEW_TOKEN
              : process.env.GRAPHCMS_TOKEN
          }`
        })
      }
    })
  }

export { hygraphClient }