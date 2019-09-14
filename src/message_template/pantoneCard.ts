export const getPantoneCard = value => ({
  type: "bubble",
  size: "micro",
  header: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "filler"
      }
    ],
    backgroundColor: `${value.hex}`,
    paddingBottom: "150px"
  },
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "...",
            wrap: true,
            contents: [
              {
                type: "span",
                text: "PANTONE",
                color: "#000000",
                size: "lg",
                weight: "bold"
              },
              {
                type: "span",
                text: ".",
                color: "#ffffff",
                size: "xxs"
              },
              {
                type: "span",
                text: "©",
                color: "#000000",
                size: "xs"
              }
            ]
          },
          {
            type: "text",
            text: `${value.name}`,
            color: "#000000",
            size: "md",
            weight: "bold",
            wrap: true
          },
          {
            type: "text",
            text: `${value.cmyk}`,
            color: "#000000",
            size: "sm",

            wrap: true
          },
          {
            type: "text",
            text: `${value.hex}`,
            color: "#000000",
            size: "sm",

            wrap: true
          }
        ]
      }
    ],
    paddingBottom: "16px",
    spacing: "md"
  },
  styles: {
    footer: {
      separator: false
    }
  }
});
