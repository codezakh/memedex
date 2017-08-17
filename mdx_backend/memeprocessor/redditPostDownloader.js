const request = require('request');

class subredditPostDownloader {
  constructor(subreddit, count) {
    this.subreddit = subreddit;
    this.count = count;
    this.baseUri = 'https://www.reddit.com';
    this.resourceUri = `${this.baseUri}/r/${this.subreddit}/top/.json?count=${this.count}`;
  }

  parsePostJSON(rawPostJSON) {
    const postChildren = JSON.parse(rawPostJSON).data.children;
    return postChildren.map((postAsChild) => {
      const postAsChildContent = postAsChild.data;
      return {
        memeUrl: postAsChildContent.url,
        memeTitle: postAsChildContent.title,
        memeThumbnail: postAsChildContent.thumbnail };
    });
  }

  downloadPostJson() {
    return new Promise((resolve, reject) => {
      request.get(this.resourceUri, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(this.parsePostJSON(body));
        }
      });
    });
  }
}

module.exports = subredditPostDownloader;
