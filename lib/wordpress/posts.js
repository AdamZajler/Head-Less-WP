export const GET_ALL_POSTS = `query MyQuery {
  posts {
    edges {
      node {
        id
        title
        excerpt
        slug
      }
    }
  }
}
`;

export const GET_ALL_SLUGS = `query MyQuery {
  posts {
    edges {
      node {
        slug
      }
    }
  }
}
`;

export const GET_SINGLE_POST = `query MyQuery ($id: ID!){
  post(id: $id, idType: SLUG) {
    id
    title
    content
    slug
  }
}
`;
