
export interface BoardType {
    id: string;
    name: string;
    category: string;
    totalProduced: number;
    inStock: number;
    checkpoints: string[];
}

const COMMON_CHECKPOINTS = [
    "Control Program",
    "ESP Program",
    "N58 Program",
    "ESP Provisioning",
    "N58 Functionality",
    "Control Functionality",
    "Display"
];

export const BOARD_TYPES: BoardType[] = [
    { id: 'bt_01', name: 'Napvend 194 mk2.0 v.1.0', category: 'Vending', totalProduced: 1200, inStock: 450, checkpoints: COMMON_CHECKPOINTS },
    { id: 'bt_02', name: 'Basevend mk1.0 v1.0', category: 'Vending', totalProduced: 800, inStock: 120, checkpoints: COMMON_CHECKPOINTS.slice(0, 5) },
    { id: 'bt_03', name: 'Dual Channel Temperature Controller', category: 'Controller', totalProduced: 500, inStock: 50, checkpoints: ["Temp Sensor 1", "Temp Sensor 2", "Display", "Relay 1", "Relay 2"] },
    { id: 'bt_04', name: 'Single Channel Temp Controller', category: 'Controller', totalProduced: 1500, inStock: 600, checkpoints: ["Temp Sensor", "Display", "Relay"] },
    { id: 'bt_05', name: '12V 15A SMPS', category: 'Power Supply', totalProduced: 3000, inStock: 200, checkpoints: ["Voltage Output", "Load Test", "Ripple Noise"] },
];

export interface DeliveryLog {
    id: string;
    serialNumber: string;
    boardName: string;
    customerName: string;
    deliveryDate: string;
    status: 'Delivered' | 'Pending' | 'Returned';
}

export const DELIVERY_LOGS: DeliveryLog[] = [
    { id: 'dl_01', serialNumber: 'S1A0042', boardName: 'Napvend 194 mk2.0', customerName: 'Acme Corp', deliveryDate: '2023-10-15', status: 'Delivered' },
    { id: 'dl_02', serialNumber: 'S1A0043', boardName: 'Napvend 194 mk2.0', customerName: 'Acme Corp', deliveryDate: '2023-10-15', status: 'Delivered' },
    { id: 'dl_03', serialNumber: 'B1B0102', boardName: 'Basevend mk1.0', customerName: 'Vending Solutions', deliveryDate: '2023-10-20', status: 'Returned' },
    { id: 'dl_04', serialNumber: 'D2C0055', boardName: 'Dual Channel Controller', customerName: 'Heating Sys Inc', deliveryDate: '2023-10-22', status: 'Pending' },
    { id: 'dl_05', serialNumber: 'S1A0099', boardName: 'Napvend 194 mk2.0', customerName: 'Private Client', deliveryDate: '2023-11-01', status: 'Delivered' },
];

export interface ServiceLog {
    id: string;
    serialNumber: string;
    complaint: string;
    returnDate: string;
    testReport: 'Serviceable' | 'Replace' | 'Pending';
    actionReport: string;
    completionDate?: string;
    status: 'Open' | 'In Progress' | 'Completed' | 'Returned';
}

export const SERVICE_LOGS: ServiceLog[] = [
    { id: 'sl_01', serialNumber: 'B1B0102', complaint: 'Display not working', returnDate: '2023-11-05', testReport: 'Serviceable', actionReport: 'Replaced OLED module', completionDate: '2023-11-07', status: 'Returned' },
    { id: 'sl_02', serialNumber: 'S1A0020', complaint: 'Overheating', returnDate: '2023-11-10', testReport: 'Pending', actionReport: '', status: 'Open' },
    { id: 'sl_03', serialNumber: 'S1A0099', complaint: 'No power', returnDate: '2023-11-12', testReport: 'Replace', actionReport: 'Board burnt, needs replacement', status: 'In Progress' },
];
