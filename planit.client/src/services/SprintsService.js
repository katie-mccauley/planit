import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {

  async getAllSprints(id) {
    const res = await api.get('api/projects/' + id + '/sprints')
    logger.log(res.data)
  }

}
export const sprintsService = new SprintsService()