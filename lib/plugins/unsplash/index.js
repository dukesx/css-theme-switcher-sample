class Unsplash {
  static get toolbox() {
    return {
      title: "Add an Image From Unsplash",
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg>',
    };
  }

  constructor({ data, api, config }) {
    this.data = data;
    this.wrapper = undefined;
  }
  render() {
    this.wrapper = this._make("div", ["container"], null, null);
    if (
      this.data &&
      this.data.Authorurl &&
      this.data.author &&
      this.data.imageUrl
    ) {
      const imageHolder = this._make("div", ["image-holder"], null, null);
      const image = this._make(
        "img",
        ["unsplash-image", "object-cover", "cursor-0pointer"],
        null,
        null
      );

      image.addEventListener("click", (event) => {
        document.location.href = this.data.imageProfileUrl;
      });

      const authorHolder = this._make("div", ["author-holder"], null, null);
      const username = this._make(
        "div",
        ["author-username"],
        `<div><a className="mr-1 capitalize" href="${this.data.Authorurl}">${
          this.data.author.split("/")[0]
        }</a> / <a href="https://unsplash.com/?utm_source=The_Hybrid_Mag&utm_medium=referral">${
          this.data.author.split("/")[1]
        }</a></div>`,
        null
      );
      const link = this._make(
        "div",
        ["author-link"],
        `<a href=${this.data.Authorurl}>${
          this.data.Authorurl.split("?")[0]
        }</a>`,
        null
      );
      authorHolder.appendChild(username);
      authorHolder.appendChild(link);
      image.src = this.data.imageUrl;
      // image.setAttribute("data-url", this.data.imageProfile);

      imageHolder.appendChild(image);
      imageHolder.appendChild(authorHolder);
      this._appendImageToEditor(imageHolder, this.data.imageUrl);
    } else {
      const searchButton = this._make(
        "button",
        ["ant-btn", "ant-btn-primary", "search-button"],
        "Search",
        null
      );
      searchButton.setAttribute("type", "button");
      const input = this._make(
        "input",
        ["unsplash-search-input", "ant-input"],
        null,
        "Write Search Term and Press Enter"
      );
      const unsplashImageHolder = this._make(
        "div",
        ["unsplash-image-holder", "p-1"],
        null,
        null
      );
      this.wrapper.appendChild(input);
      this.wrapper.appendChild(searchButton);
      this.wrapper.appendChild(unsplashImageHolder);

      input.addEventListener("paste", (event) => {
        this._makeSearchResults(input.value, unsplashImageHolder);
      });

      //
      //
      //
      // Deprecared To Save Number of Requests/Hour For Unsplash API
      //
      //

      // input.addEventListener("input", (event) => {
      //   this._makeSearchResults(input.value, unsplashImageHolder);
      // });

      input.addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
          this._makeSearchResults(event.target.value, unsplashImageHolder);
        }
      });

      searchButton.addEventListener("click", (event) => {
        this._makeSearchResults(input.value, unsplashImageHolder);
      });
    }
    return this.wrapper;
  }

  _makeSearchResults(data, unsplashImageHolder) {
    const text = this._make(
      "div",
      ["text-center", "mt-2", "font-semibold"],
      "Loading Search Results ..."
    );
    const imageContainer = this._make(
      "div",
      ["text-center", "mx-auto", "w-16", "ant-icon-large", "ant-icon-loading"],
      `<svg viewBox="0 0 1024 1024" focusable="false" className="anticon-spin" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" fill="#0c89f5"></path></svg>`
    );

    fetch("/api/unsplash", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        search: data,
      }),
    })
      .then((res) => {
        this.wrapper.appendChild(imageContainer);
        this.wrapper.appendChild(text);
        return res.json().then((reso) => {
          this.wrapper.removeChild(imageContainer);
          this.wrapper.removeChild(text);
          unsplashImageHolder.innerHTML = "";

          reso.results.map((mapped) => {
            const imageHolder = this._make("div", ["image-holder"], null, null);
            const image = this._make(
              "img",
              ["unsplash-image", "object-cover", "cursor-0pointer"],
              null,
              null
            );

            const authorHolder = this._make(
              "div",
              ["author-holder"],
              null,
              null
            );
            const username = this._make(
              "div",
              ["author-username"],
              `<div><a className="mr-1 capitalize" href="${
                mapped.user.links.html +
                `?utm_source=The_Hybrid_Mag&utm_medium=referral`
              }">@ ${
                mapped.user.username
              }</a> / <a href="https://unsplash.com/?utm_source=The_Hybrid_Mag&utm_medium=referral">Unsplash</a></div>`,
              null
            );
            const link = this._make(
              "div",
              ["author-link"],
              `<a href=${
                mapped.user.links.html +
                `?utm_source=The_Hybrid_Mag&utm_medium=referral`
              }>${mapped.user.links.html}</a>`,
              null
            );
            authorHolder.appendChild(username);
            authorHolder.appendChild(link);
            image.src = mapped.urls.regular;
            image.setAttribute("data-url", mapped.links.html);
            image.setAttribute("data-blur-hash", mapped.blur_hash);

            imageHolder.addEventListener("click", () => {
              image.addEventListener("click", (event) => {
                document.location.href = mapped.links.html;
              });
              this._appendImageToEditor(imageHolder, image.src);
            });
            imageHolder.appendChild(image);
            imageHolder.appendChild(authorHolder);
            unsplashImageHolder.appendChild(imageHolder);
            return unsplashImageHolder;
          });
        });
      })
      .then((res1) => {})
      .catch((err) => console.log(err));
  }

  _make(type, classa, inner, placeholder) {
    var el = document.createElement(type);

    classa ? classa.map((mapped) => el.classList.add(mapped)) : null;
    inner ? (el.innerHTML = inner) : null;
    placeholder ? (el.placeholder = placeholder) : null;
    return el;
  }
  _appendImageToEditor(imageHolder, src) {
    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(imageHolder);
  }

  save(blockContent) {
    const authorUsername = blockContent.querySelector(".author-username");
    const authorLink = blockContent.querySelector(".author-link");
    const image = blockContent.querySelector(".unsplash-image");

    return {
      Authorurl:
        this.data && this.data.Authorurl
          ? this.data.Authorurl
          : authorLink
          ? authorLink.textContent +
            "?utm_source=The_Hybrid_Mag&utm_medium=referral"
          : null,
      author:
        this.data && this.data.author
          ? this.data.author
          : authorUsername
          ? authorUsername.textContent
          : null,
      imageProfileUrl:
        this.data && this.data.imageProfileUrl
          ? this.data.imageProfileUrl +
            "?utm_source=The_Hybrid_Mag&utm_medium=referral"
          : image
          ? image.getAttribute("data-url")
          : null,
      imageUrl:
        this.data && this.data.imageUrl
          ? this.data.imageUrl
          : image
          ? image.src
          : null,
      blur_hash:
        this.data && this.data.blur_hash
          ? this.data.blur_hash
          : image
          ? image.getAttribute("data-blur-hash")
          : null,
    };
  }

  //   validate(savedData) {
  //     if (!savedData.url.trim()) {
  //       return false;
  //     }

  //     return true;
  //   }
}

export default Unsplash;
