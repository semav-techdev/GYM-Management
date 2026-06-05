import api from "../lib/axios";
import { createCrudService } from "./curdService";

export default createCrudService("/equipment", api);