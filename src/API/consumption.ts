import { AxiosResponse } from "axios";

import service, { demoStatus } from ".";
import { mockConsumptionData } from "./mockData";

const getAll = async () => {
  switch (demoStatus()) {
    default:
      return await service
        .get("consumption.json")
        .then((res: AxiosResponse) =>
          Object.keys(res.data).map((key) => ({ ...res.data[key], id: key }))
        );
  }
};

const create = async (data = {}) => {
  switch (demoStatus()) {
    default:
      return await service.post("consumption.json", data);
  }
};

const remove = async (id = "") => {
  switch (demoStatus()) {
    default:
      return await service.delete(`consumption/${id}.json`);
  }
};

export { getAll, create, remove };
