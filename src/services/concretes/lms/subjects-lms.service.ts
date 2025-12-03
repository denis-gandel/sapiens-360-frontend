import type { SubjectLms } from "../../../models";
import { LMSBaseService } from "../../bases/lms.base.service";

export class SubjectsLmsService extends LMSBaseService<SubjectLms> {
    constructor() {
        super('subjects')
    }
}