import React, { useEffect, useState } from "react";
import Frame from "lib/plugins/embeds";
import Unsplash from "lib/plugins/unsplash";
import { useStore } from "easy-peasy";

const Editor = (props) => {
  const [val, setVal] = useState(null);
  var editor = null;

  const onChange = (val) => {
    props.setData(val);
  };
  useEffect(() => {
    const EditorJS = require("@editorjs/editorjs");
    const Embed = require("@editorjs/embed");
    const ImageTool = require("@editorjs/image");
    const Warning = require("@editorjs/warning");
    const Table = require("@editorjs/table");
    const CodeTool = require("@editorjs/code");
    const InlineCode = require("@editorjs/inline-code");
    const List = require("@editorjs/list");
    const Checklist = require("@editorjs/checklist");
    const Quote = require("@editorjs/quote");
    const Header = require("@editorjs/header");
    const Paragraph = require("@editorjs/paragraph");
    const Marker = require("@editorjs/marker");

    editor = new EditorJS({
      holder: props.id ? props.id : "content",
      placeholder: props.placeholder
        ? props.placeholder
        : "Hello There ! Care to Start Writing ? 😁😅",
      onChange: (val) => {
        editor
          .save()
          .then((outputData) => {
            onChange(outputData);
          })
          .catch((error) => {
            // console.log("Saving failed: ", error);
          });
      },
      data: props.data
        ? {
            time: 1552744582955,
            blocks: props.data,
            version: "2.11.10",
          }
        : null,

      tools: {
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
              codepen: {
                regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
                embedUrl:
                  "https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
                html:
                  "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                height: 300,
                width: 600,
                id: (groups) => console.log(groups),
              },
            },
          },
        },
        embeds: {
          class: Frame,
        },
        unsplash: {
          class: Unsplash,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "/api/upload/image/form", // Your backend file uploader endpoint
              byUrl: "/api/upload/image/default", // Your endpoint that provides uploading by Url
            },
          },
        },
        warning: Warning,
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        quote: Quote,
        header: Header,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
      },
    });

    editor.isReady
      .then(() => {
        // console.log("Editor.js is ready to work!");
        /** Do anything you need after editor initialization */
      })
      .catch((reason) => {
        // console.log(`Editor.js initialization failed because of ${reason}`);
      });
  }, []);

  return <div id={props.id ? props.id : "content"} />;
};

export default Editor;
