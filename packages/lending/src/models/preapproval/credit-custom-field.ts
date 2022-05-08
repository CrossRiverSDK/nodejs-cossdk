import { CustomFieldType } from "./custom-field-type";

export interface CreditCustomField {
    customFieldId?: CustomFieldType;
    content?: string | null;
}
