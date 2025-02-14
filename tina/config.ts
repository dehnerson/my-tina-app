import { defineConfig, type Template, type TinaField } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";


const componentTemplates: Template[] = [
  {
    name: "LinkButton",
    label: "Link Button",
    fields: [
      {
        name: "text",
        label: "Text",
        type: "string",
      },
      {
        name: "to",
        label: "To",
        type: "string",
      },
    ],
  },
]

const blockTemplates: Template[] = [
  {
    name: "Container",
    label: "Container",
    fields: [
      {
        name: "children",
        label: "Content",
        type: "rich-text",
        templates: componentTemplates
      }
    ]
  },
  {
    name: "Hero",
    label: "Hero",
    fields: [
      {
        name: "accent",
        label: "Akzent",
        type: "boolean",
      },
      {
        name: "image",
        label: "Hero-Bild",
        type: "image",
      },
      {
        name: "children",
        label: "Content",
        type: "rich-text",
        templates: componentTemplates
      },
    ]
  },
]

const basePageFields: TinaField[] = [
  {
    name: "title",
    label: "Title",
    type: "string",
    isTitle: true,
    required: true,
  },
  {
    name: "description",
    label: "Beschreibung",
    type: "string",
    required: true,
  },
  {
    name: 'body',
    label: 'Content',
    type: 'rich-text',
    isBody: true,
    templates: blockTemplates
  },
]


export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "headerPage",
        label: "Page",
        path: "src/content/headerPages",
        format: 'mdx',
        fields: [...basePageFields,
        {
          type: "number",
          name: "order",
          label: "Rang",
        },
        ],
      },
    ],
  },
});
