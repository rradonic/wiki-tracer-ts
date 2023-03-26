export class Page {
  title: string | undefined;
  text: string | undefined;
  links: Array<string> | undefined;

  private regex = /\[\[(.+?)\]\]/g;

  processLinks() {
    if (this.text === undefined) {
      throw new Error("Can't process links, text is empty!");
    }

    this.links = [];

    const iterator = this.text.matchAll(this.regex);
    let result = iterator.next();

    while (!result.done) {
      if (!result.value[1].startsWith("File:")) {
        this.links.push(result.value[1].split("|")[0].toLowerCase());
      }

      result = iterator.next();
    }
  }
}
