import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';

interface IWikiData {
  info: string;
  image: string;
}

@Injectable()
export class CrawlerService {
  constructor(private readonly crawler: NestCrawlerService) {}
  public async scrape(wiki_suffix: string): Promise<IWikiData> {
    const wiki_url = 'https://en.wikipedia.org/wiki/' + wiki_suffix;

    const data: IWikiData = await this.crawler.fetch({
      target: wiki_url,
      fetch: {
        info: {
          selector: 'p',
        },
        image: {
          selector: 'td.infobox-image',
          how: 'html',
        },
      },
    });

    const wikiInfo = data.info
      .replace(/\[.+?]/g, '')
      .split(`\n`)
      .splice(0, 10)
      .join(`<br />`);
    let wikiImage: string;
    if (data.image) {
      wikiImage = data.image
        .replace(/<span .+?>/g, '')
        .replace(/<a .+?>/g, '')
        .replace(/<\/span>/g, '')
        .replace(/<\/a>/g, '')
        .replace(/\[ .+?]/g, '')
        .replace('div', 'figcaption');
    }

    return { info: wikiInfo, image: wikiImage };
  }
}
