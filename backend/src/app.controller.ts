import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CrawlerService } from './wsc.service';
import { IArtistData } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly wsc: CrawlerService,
  ) {}

  @Get('/random-youtube/:qty')
  getRandomYT(@Param('qty') qty: string) {
    return this.appService.getRandomYT(+qty);
  }

  @Get('/init-data')
  getInitData() {
    return this.appService.getInitData();
  }

  @Get('/artist/:id')
  async gatArtistData(@Param('id') id: string): Promise<IArtistData> {
    const artistsData = await this.appService.getArtistData(+id);
    const wscResult = await this.wsc.scrape(artistsData.wikipedia_suffix);
    artistsData.wiki_info = wscResult.info;
    artistsData.wiki_image = wscResult.image;
    return artistsData;
  }

  @Get('/release/:id')
  getReleaseData(@Param('id') id: string) {
    return this.appService.getReleaseData(+id);
  }
}
