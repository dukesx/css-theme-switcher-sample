class Frame {
  static get toolbox() {
    return {
      title: "Link Embeds",
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.083 10.5l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm0 4.7l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zM12.514 1.309l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0z"/></svg>',
    };
  }
  constructor({ data, api, config }) {
    this.data = data;
    this.wrapper = undefined;
    this.url = null;
    this.val = undefined;
  }
  render() {
    this.wrapper = document.createElement("div");
    if (this.data && this.data.url) {
      this.url = this.data.url;
      this._createIframe(this.data.url);
    } else {
      const input = document.createElement("input");
      input.classList.add("ant-input");
      this.wrapper.classList.add("container");
      this.wrapper.appendChild(input);

      input.placeholder = "Paste Media/Website URL...";
      input.value = this.data && this.data.url ? this.data.url : "";

      input.addEventListener("paste", (event) => {
        this.url = event.clipboardData.getData("text");
        this._createIframe(event.clipboardData.getData("text"));
      });
      input.addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
          // Cancel the default action, if needed
          // Trigger the button element with a click
          this.url = event.target.value;
          this._createIframe(event.target.value);
        }
        // this.url = event.target.value;
        // this._createIframe(event.target.value);
      });
    }
    return this.wrapper;
  }

  _createIframe(url) {
    this.wrapper.innerHTML = "";

    const text = this._make(
      "div",
      ["text-center", "mt-2", "font-semibold"],
      "Loading Embed..."
    );
    const imageContainer = this._make(
      "div",
      ["text-center", "mx-auto", "w-16", "ant-icon-large", "ant-icon-loading"],
      `<svg viewBox="0 0 1024 1024" focusable="false" className="anticon-spin" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" fill="#0c89f5"></path></svg>`
    );

    imageContainer.appendChild(text);
    this.wrapper.appendChild(imageContainer);
    this.wrapper.appendChild(text);
    this._createFrame(url, imageContainer, text);
  }

  _make(type, classa, inner) {
    var el = document.createElement(type);

    classa ? classa.map((mapped) => el.classList.add(mapped)) : null;
    inner ? (el.innerHTML = inner) : null;
    return el;
  }

  _createFrame(url, imageContainer, text) {
    const frame = this._make("iframe");
    frame.classList.add("embed-frame");
    var data = null;
    frame.width = "100%";
    fetch(`https://embeds.thehybridmag.com/iframely?url=${url}`).then((res) => {
      res
        .json()
        .then((reso) => {
          this.wrapper.removeChild(imageContainer);
          this.wrapper.removeChild(text);
          console.log(reso);

          if (reso && reso.html) {
            if (url.includes("instagram")) {
              frame.src = url + "embed";
            } else {
              if (url.includes("facebook")) {
                frame.src = `https://www.facebook.com/plugins/post.php?href=${url}&show_text=true&width=552&appId=397798247908704&height=350`;
              } else {
                frame.contentWindow.document.write(reso.html);
              }
            }
            frame.scrolling = "no";
            frame.frameborder = "0";

            // frame.height =
            //   frame.contentWindow.document.scrollHeight == 150
            //     ? 550
            //     : frame.contentWindow.document.body.scrollHeight;
          } else {
            this.wrapper.removeChild(frame);

            this._makeCard(reso);
          }
        })
        .catch((err) => console.log(err));
    });

    this.wrapper.appendChild(frame);
  }

  resizeIframe(frame) {
    // obj.style.height = obj.contentWindow.document.body.scrollHeight + "px";

    alert("loaded");
  }
  _makeCard(data) {
    const card = this._make(
      "div",
      [
        "shadow-xl",
        "flex",
        "flex-col",
        "m-auto",
        "rounded-md",
        "xxs:w-full",
        "ant-card",
        "ant-card-bordered",
      ],
      null
    );
    card.style.minWidth = "320px";
    card.style.maxWidth = "450px";
    const cardHeader = this._make(
      "img",
      ["w-full", "object-cover", "rounded-md", "card-header"],
      null
    );
    cardHeader.style.height = "280px";
    const cardBody = this._make("div", ["mt-1", "card-body"], null);
    const cardTitle = this._make(
      "div",
      ["mt-3", "text-lg", "clamp-2", "font-semibold"],
      data.meta.title
    );
    const cardMeta = this._make(
      "div",
      ["mt-3", "clamp-2"],
      data.meta.description
    );
    cardHeader.src =
      data.links.thumbnail && data.links.thumbnail[0]
        ? data.links.thumbnail[0].href
        : data.links.icon[0].href;
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardMeta);
    this.wrapper.appendChild(card);
  }

  save() {
    return {
      url: this.url,
    };
  }
}

export default Frame;

//Old Code
// const text = document.createElement("div");
// text.innerHTML = "Loading Embed";
// text.classList.add("text-center");
// text.classList.add("mt-2");
// text.classList.add("font-semibold");
// const imageContainer = document.createElement("div");
// imageContainer.innerHTML = `<svg viewBox="0 0 1024 1024" focusable="false" className="anticon-spin" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" fill="#0c89f5"></path></svg>`;
// imageContainer.classList.add("w-16");
// imageContainer.classList.add("mx-auto");
// imageContainer.classList.add("ant-icon-large");
// imageContainer.classList.add("ant-icon-loading");
