import { reload } from "expo-router/build/global-state/routing"

export const alertList = {
    validation_failed: {
        type: "error",
        text1: "error",
        text2: "failed to validate image",
    },
    update_success: {
        type: "ok",
        text1: "success",
        text2: "updated successfully",
    },
    update_failed: {
        type: "error",
        text1: "error",
        text2: "failed to update parameter",
    },
    save_success: {
        type: "ok",
        text1: "save success",
        text2: "saved successfully",
    },
    save_failed: {
        type: "error",
        text1: "error",
        text2: "save failed",
    },
    nfc_success: {
        type: "ok",
        text1: "success",
        text2: "nfc success",
    },
    nfc_error_invalid_device: {
        type: "warning",
        text1: "nfc error",
        text2: "nfc error invalid device",
    },
    nfc_error_not_supported: {
        type: "warning",
        text1: "nfc error",
        text2: "nfc error not supported",
    },
    nfc_error_invalid_tag: {
        type: "warning",
        text1: "nfc error",
        text2: "nfc error invalid tag",
    },
    logout: {
        type: "confirm",
        text1: "logout",
        text2: "are you sure you want to logout",
    },
    clear_data: {
        type: "confirm",
        text1: "clear data",
        text2: "are you sure you want to clear data",
    },
    open_apk_failed: {
        type: "error",
        text1: "error",
        text2: "could not open apk file",
    },
    the_latest_version: {
        type: "ok",
        text1: "error",
        text2: "this is the latest version",
    },
    update_available: {
        type: "confirm",
        text1: "new version available",
        text2: "do you want to update",
    },
    network_error: {
        type: "warning",
        text1: "error",
        text2: "network error",
    },
    login_again: {
        type: "error",
        text1: "invalid user code",
        text2: "please login again",
    },
    refresh_token_failed: {
        type: "warning",
        text1: "error",
        text2: "failed to refresh token",
    },
    delete_checklist: {
        type: "confirm",
        text1: "delete checklist",
        text2: "are you sure you want to delete checklist",
    },
    delete_checklist_item: {
        type: "confirm",
        text1: "delete checklist item",
        text2: "are you sure you want to delete checklist item",
    },
    delete_warning_time: {
        type: "confirm",
        text1: "delete warning time",
        text2: "are you sure you want to delete warning time",
    },
    delete_error_time: {
        type: "confirm",
        text1: "delete error time",
        text2: "are you sure you want to delete error time",
    },
    no_device_selected: {
        type: "warning",
        text1: "no device selected",
        text2: "please select a device",
    },
    exit_gauge: {
        type: "confirm",
        text1: "exit confirmation",
        text2: "are you sure to exit the process checking",
    },
    na_value: {
        type: "confirm",
        text1: "n/a value",
        text2: "choose a value",
    },
    LSL_less_than_USL: {
        type: "warning",
        text1: "error",
        text2: "LSL must be less than or equal to USL",
    },
    unable_check_another_machine: {
        type: "warning",
        text1: "unable to check another machine",
        text2: "you can only check the machine you are currently on",
    },
    gauge_already_checked: {
        type: "warning",
        text1: "gauge already checked",
        text2: "this gauge has already been checked",
    },
    please_select_repair_time: {
        type: "warning",
        text1: "please select repair time",
        text2: "repair start and end time are required",
    },
    fill_all_fields: {
        type: "warning",
        text1: "fill all fields",
        text2: "please fill all required fields",
    },
    fill_decline_reason: {
        type: "warning",
        text1: "fill decline reason",
        text2: "please fill decline reason",
    },
    reset_settings: {
        type: "confirm",
        text1: "reset settings",
        text2: "are you sure you want to reset settings",
    },
    help: {
        type: "confirm",
        text1: "are you need help",
        text2: "this actions will open the help page",
    },
    repair_start_time_must_before_end_time: {
        type: "warning",
        text1: "repair start time must before end time",
        text2: "please select a valid repair start and end time",
    },
    camera_permission_denied: {
        type: "error",
        text1: "camera permission denied",
        text2: "please allow camera permission in settings",
    },
    microphone_permission_denied: {
        type: "error",
        text1: "microphone permission denied",
        text2: "please allow microphone permission in settings",
    },
    leave_screen: {
        type: "confirm",
        text1: "leave screen",
        text2: "are you sure you want to leave this screen"
    },
    please_select_determination: {
        type: "warning",
        text1: "please select determination",
        text2: "you must select a determination before proceeding",
    },
    please_fill_note_for_ng: {
        type: "warning",
        text1: "please fill note for NG",
        text2: "you must fill a note for NG before proceeding",
    },
    please_upload_required_image: {
        type: "warning",
        text1: "please upload required image",
        text2: "you must upload a required image before proceeding",
    },
    please_select_delay_reason: {
        type: "warning",
        text1: "please select delay reason",
        text2: "you must select a delay reason before proceeding",
    },
    please_fill_delay_detail: {
        type: "warning",
        text1: "please fill delay detail",
        text2: "you must fill a delay detail before proceeding",
    },
    create_checklist_first: {
        type: "warning",
        text1: "create checklist first",
        text2: "you must create a checklist before proceeding",
    },
    please_select_machine: {
        type: "warning",
        text1: "please select machine",
        text2: "you must select a machine before proceeding",
    },
    please_scan_dmc_product: {
        type: "warning",
        text1: "please scan DMC product",
        text2: "you must scan a DMC product before proceeding",
    },
    password_mismatch: {
        type: "error",
        text1: "password mismatch",
        text2: "the passwords do not match, please try again",
    },
    accept_request: {
        type: "confirm",
        text1: "accept request",
        text2: "are you sure you want to accept this request",
    },
    reject_request: {
        type: "confirm",
        text1: "reject request",
        text2: "are you sure you want to reject this request",
    },
    start_repair: {
        type: "confirm",
        text1: "start repair",
        text2: "are you sure you want to start repair for this request",
    },
    unrepaired_request: {
        type: "confirm",
        text1: "unrepaired request",
        text2: "are you sure you want to mark this request as unrepaired",
    },
    confirm_repair: {
        type: "confirm",
        text1: "confirm repair",
        text2: "are you sure you want to confirm repair for this request",
    },
    logout_device: {
        type: "confirm",
        text1: "logout device",
        text2: "are you sure you want to logout of this device",
    },
    department_verify: {
        type: "confirm",
        text1: "department verify",
        text2: "are you sure you want to verify for this request",
    },
    gauges_not_found: {
        type: "warning",
        text1: "gauges not found",
        text2: "no gauges found for this device",
    },
    mark_all_as_read: {
        type: "confirm",
        text1: "mark all as read",
        text2: "are you sure you want to mark all notifications as read",
    },
    submit_form: {
        type: "confirm",
        text1: "submit",
        text2: "are you sure you want to submit the form",
    },
    capture_image_failed: {
        type: "error",
        text1: "capture image failed",
        text2: "unable to capture image, please try again",
    },
    reset_data: {
        type: "confirm",
        text1: "reset data",
        text2: "are you sure you want to reset exhibition data",
    },
    bluetooth_permission_denied: {
        type: "error",
        text1: "bluetooth permission denied",
        text2: "please allow bluetooth permission in settings",
    },
    bluetooth_permission_error: {
        type: "error",
        text1: "bluetooth permission error",
        text2: "an error occurred while checking bluetooth permission",
    },
    bluetooth_not_initialized: {
        type: "error",
        text1: "bluetooth not initialized",
        text2: "bluetooth manager is not initialized",
    },
    please_input_actual_value: {
        type: "warning",
        text1: "please input actual value",
        text2: "you must input an actual value before proceeding",
    },
    device_not_connectable: {
        type: "error",
        text1: "device not connectable",
        text2: "the selected device is not connectable",
    },
    reload_data: {
        type: "confirm",
        text1: "reload data",
        text2: "are you sure you want to reload data",
    },
    fail_to_parse_nfc: {
        type: "error",
        text1: "nfc error",
        text2: "failed to parse credentials from NFC tag",
    },
} as const

export type AlertType = keyof typeof alertList