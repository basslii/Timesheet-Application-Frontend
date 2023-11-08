export interface CoreTableColoumn {
    header: string;
    field: string;
    template: number;
    width: string;
    type: string;
}

export interface NewTaskData {
    title: string;
    edit: boolean;
    fields: InputDialogFields;
    multiple: boolean[];
    date: boolean[];
    users: User[];
    status: Status[];
}

interface InputDialogFields {
    [key: string]: any;
}

export interface TimesheetData {
    id: number;
    project: string;
    task: string;
    assignedTo: User;
    startDate: string;
    endDate: string;
    status: Status;
}

export interface TimeSheetReqBody {
    id: number;
    project: string;
    task: string;
    assignedTo: User;
    startDate: Date;
    endDate: Date;
    status: Status;
}

export interface TimeSheetErrorResponse {
    message: string[];
    error: string;
    statusCode: number;
}

export interface CoreTableColoumnOption {
    icon: string;
    tooltip?: string;
    fieldtip?: string;
    action: (value: any) => void;
}

export interface User {
    id?: number;
    name?: string;
}

export interface Status {
    id?: number;
    status?: string;
}
