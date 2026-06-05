import api from "../lib/axios";
import { createCrudService } from "./curdService";

export default createCrudService("/employees", api);