import { notesService } from "./notes.service";
import { mockNotesService } from "./mockNotesService";
import config from "../config/environment";

/**
 * Service factory that returns either mock or real service based on configuration
 * @returns
 */

export const getNotesService = () => {
  if (config.useMockData) {
    return mockNotesService;
  } else {
    return notesService;
  }
};

export const activeNotesService = getNotesService();
