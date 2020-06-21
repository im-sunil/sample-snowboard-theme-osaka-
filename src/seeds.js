export default {
  title: "API",
  title: "My API",
  groups: [],
  resources: [
    {
      title: "Movies | Films Collection",
      permalink: "r~movies~or~films~collection",
      description:
        "+ Paramter\n\n   + website_id - load data by subdomain\n   + os  -\n   + device   - unique device identification\n   + genres (optional) - by generes e.g &genres=1,3,5\n   + is_featured (optional) - only featured films\n   + limit (otional)  - limit number of recored paginate\n   + query (optional) - by title and description\n   + director (optional) -\n   + lang (optional) - by language  e.g &lang=english\n   + cast (optional)\n   + is_adult (optional)\n   + has_episode (optional) -  e.g only episode when values = 1",
      transitions: [
        {
          title: "List All Movies",
          permalink: "t~movies~or~films~collection~get~api~movies",
          method: "GET",
          path: "/api/movies",
          meta: {
            resource: {
              title: "Movies | Films Collection",
              permalink: "r~movies~or~films~collection",
            },
          },
        },
      ],
    },
    {
      title: "Show Film",
      permalink: "r~show~film",
      description: "+ Paramter\n\n   + id - film unique id",
      transitions: [
        {
          title: "Show film result",
          permalink: "t~show~film~get~api~movies~id",
          method: "GET",
          path: "/api/movies/{id}",
          meta: {
            resource: {
              title: "Show Film",
              permalink: "r~show~film",
            },
          },
        },
      ],
    },
    {
      title: "Genres Collection",
      permalink: "r~genres~collection",
      description: "+ Paramter\n\n   + website_id - load data by subdomain",
      transitions: [
        {
          title: "List all genres",
          permalink: "t~genres~collection~get~api~genres~os~and~parent",
          method: "GET",
          path: "/api/genres?os=&parent=",
          meta: {
            resource: {
              title: "Genres Collection",
              permalink: "r~genres~collection",
            },
          },
        },
      ],
    },
    {
      title: "User register",
      permalink: "r~user~register",
      description: "",
      transitions: [
        {
          title: "User register",
          permalink: "t~user~register~post~api~auth~register",
          method: "POST",
          path: "/api/auth/register",
          meta: {
            resource: {
              title: "User register",
              permalink: "r~user~register",
            },
          },
        },
      ],
    },
    {
      title: "User login",
      permalink: "r~user~login",
      description: "",
      transitions: [
        {
          title: "User login",
          permalink: "t~user~login~post~api~auth~login",
          method: "POST",
          path: "/api/auth/login",
          meta: {
            resource: {
              title: "User login",
              permalink: "r~user~login",
            },
          },
        },
      ],
    },
  ],
  descriptionToc: [],
};
