export const CREATE_VM = 'Create Virtual Machine';
export const CREATE_VM_TEMPLATE = `${CREATE_VM} Template`;
export const STEP_BASIC_SETTINGS = 'Basic Settings';
export const STEP_NETWORK = 'Networking';
export const STEP_STORAGE = 'Storage';
export const STEP_RESULT = 'Result';
export const NEXT = 'Next';
export const ERROR_EMPTY_ENTITY = 'Empty entity';
export const ERROR_EMPTY_NAME = 'Name is empty';
export const ERROR_IS_REQUIRED = 'is required';

// BasicSettingsTab
export const NO_TEMPLATE = '--- No Template ---';
export const HELP_CPU = 'The number of virtual CPU cores that will be dedicated to the virtual machine.';
export const HELP_MEMORY = 'The amount of memory that will be dedicated to the virtual machine.';
export const HELP_PROVISION_SOURCE_URL =
  'An external URL to the .iso, .img, .qcow2 or .raw that the virtual machine should be created from.';
export const HELP_PROVISION_SOURCE_PXE = 'Discover provisionable virtual machines over the network.';
export const HELP_PROVISION_SOURCE_CONTAINER =
  'Ephemeral virtual machine disk image which will be pulled from container registry.';
export const HELP_OS = 'The primary operating system that will run on the virtual machine.';
export const HELP_FLAVOR =
  'The combination of processing power and memory that will be provided to the virtual machine.';
export const HELP_WORKLOAD = 'The category of work that this virtual machine will be used for.';

// NetworksTab
export const SELECT_NETWORK = '--- Select Network Definition ---';
export const REMOVE_NIC_BUTTON = 'Remove NIC';
export const CREATE_NIC_BUTTON = 'Create NIC';
export const PXE_INFO = 'Pod network is not PXE bootable';
export const SELECT_PXE_NIC = '--- Select PXE NIC ---';
export const PXE_NIC = 'PXE NIC';
export const PXE_NIC_NOT_FOUND_ERROR = 'A PXE-capable NIC could not be found';
export const HEADER_NIC_NAME = 'NIC Name';
export const HEADER_MAC = 'MAC Address';
export const HEADER_NETWORK = 'Network Configuration';
export const ERROR_NETWORK_NOT_FOUND = 'Network config not found';
export const ERROR_NETWORK_NOT_SELECTED = 'Network config must be selected';

// StorageTab
export const ERROR_NO_BOOTABLE_DISK = 'A bootable disk could not be found';
export const ERROR_POSITIVE_SIZE = 'Size must be positive';
export const ERROR_NO_STORAGE_CLASS_SELECTED = 'Storage Class not selected';
export const ERROR_NO_STORAGE_SELECTED = 'No storage is selected';
export const ERROR_STORAGE_NOT_VALID = 'Selected storage is not valid';
export const ERROR_DISK_NOT_FOUND = 'Disk configuration not found';
export const HEADER_DISK_NAME = 'Disk Name';
export const HEADER_SIZE = 'Size (GB)';
export const HEADER_STORAGE_CLASS = 'Storage Class';
export const REMOVE_DISK_BUTTON = 'Remove Disk';
export const ATTACH_DISK_BUTTON = 'Attach Disk';
export const CREATE_DISK_BUTTON = 'Create Disk';
export const BOOTABLE_DISK = 'Bootable Disk';
export const SELECT_BOOTABLE_DISK = '--- Select Bootable Disk ---';
