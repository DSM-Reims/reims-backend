import { GoodsService } from 'src/services/goods.service';
import { AsyncHandler } from 'src/shared/decorators/async-handler.decorator';

export class GoodsController {
  constructor(private readonly service: GoodsService) {}

  @AsyncHandler()
  async getGoods() {
    return;
  }
}
