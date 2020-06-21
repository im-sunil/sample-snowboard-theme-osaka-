import React from "react";
import "regenerator-runtime/runtime";
import { compose, mount, route, withView } from "navi";
import { NotFoundError } from "navi";
import { View } from "react-navi";
import { findGroup, findResource } from "snowboard-theme-helper";
import axios from "axios";
import Home from "./pages/Home";
import Group from "./pages/Group";
import Resource from "./pages/Resource";
import Transition from "./pages/Transition";
import Layout from "./components/Layout";
import { toPermalink } from "./lib/helper";

const basePath = "/__json__/";

const prefix = {
  group: "g",
  resource: "r",
  transition: "t",
};

export async function fetchJSON(uuid) {
  const fullPath = `${basePath}${uuid}.json`;
  console.log("fullPath", fullPath);
  const { data } = await axios.get(fullPath);

  return data;
}

function getResource(ctx, req) {
  const permalink = toPermalink(req.originalUrl);
  return findResource(permalink, ctx.resources, ctx.groups);
}

function routeHome(req, ctx) {
  return {
    title: ctx.title,
    view: <Home title={ctx.title} description={ctx.description} />,
  };
}

async function routeGroup(req, ctx) {
  const permalink = toPermalink(req.originalUrl);

  const group = findGroup(permalink, ctx.groups);

  if (!group) {
    throw new NotFoundError();
  }

  return {
    title: `${group.title} - ${ctx.title}`,
    view: <Group group={group} />,
  };
}

async function routeResource(req, ctx) {
  console.log("req, ctx");
  const { resource, group } = getResource(ctx, req);

  if (!resource) {
    throw new NotFoundError();
  }

  return {
    title: `${resource.title} - ${ctx.title}`,
    view: <Resource resource={resource} group={group} />,
  };
}

async function routeTransition(req, ctx) {
  console.log("req, ctx", req, ctx);

  const permalink = toPermalink(req.originalUrl);
  console.log("permalink", permalink);

  console.log("ctx", ctx);
  //const uuid = ctx.uuids[permalink];
  let uuid = "4hMa_NtcBLhpp4LhtHJ58";
  /* return {
    title: "111",
    view: <h1>{permalink}</h1>,
  };*/
  if (!uuid) {
    throw new NotFoundError();
  }

  const transition = {
    title: "List All Questions",
    description: "",
    permalink: "t~questions~collection~get~questions",
    uuid: "4hMa_NtcBLhpp4LhtHJ58",
    method: "GET",
    path: "/questions",
    pathTemplate: "/questions",
    parameters: [],
    meta: {
      resource: {
        title: "Questions Collection",
        permalink: "r~questions~collection",
      },
    },
    transactions: [
      {
        request: {
          title: "",
          description: "",
          method: "GET",
          headers: [],
        },
        response: {
          title: "",
          description: "",
          statusCode: "200",
          contentType: "application/json",
          headers: [
            {
              name: "Content-Type",
              example: "application/json",
              required: false,
              schema: {
                type: "string",
              },
            },
          ],
          body:
            '[\n    {\n        "question": "Favourite programming language?",\n        "published_at": "2015-08-05T08:40:51.620Z",\n        "choices": [\n            {\n                "choice": "TT",\n                "votes": 2048\n            }, {\n                "choice": "Python",\n                "votes": 1024\n            }, {\n                "choice": "Objective-C",\n                "votes": 512\n            }, {\n                "choice": "Ruby",\n                "votes": 256\n            }\n        ]\n    }\n]\n',
        },
      },
    ],
  };
  console.log("transition", transition);

  return {
    title: `${transition.title} - ${ctx.title}`,
    view: <Transition config={ctx.config} transition={transition} />,
  };
}

export default compose(
  withView((req, ctx) => {
    return (
      <Layout ctx={ctx}>
        <View />
      </Layout>
    );
  }),
  mount({
    [`/`]: route(routeHome),
    [`/${prefix.group}/:id`]: route(routeGroup),
    [`/${prefix.resource}/:id`]: route(routeResource),
    [`/${prefix.transition}/:id`]: route(routeTransition),
  })
);
