
export const toastList = {
  login_success: {
    type: "success",
    text1: "login success",
    text2: "welcome back",
  },
  login_failed: {
    type: "error",
    text1: "login failed",
    text2: "please check your credentials",
  },
  sign_up_success: {
    type: "success",
    text1: "sign up success",
    text2: "created account successfully",
  },
  logout_success: {
    type: "success",
    text1: "logout success",
    text2: "see you later",
  },
  update_success: {
    type: "success",
    text1: "update success",
    text2: "updated successfully",
  },
  logout_failed: {
    type: "error",
    text1: "logout failed",
    text2: "please try again",
  },
  update_failed: {
    type: "error",
    text1: "update failed",
    text2: "please try again",
  },
  save_failed: {
    type: "error",
    text1: "save failed",
    text2: "failed to save result",
  },
  fill_all_fields: {
    type: "error",
    text1: "please fill all fields",
    text2: "",
  },
  save_data_successfully: {
    type: "success",
    text1: "save data successfully",
    text2: "",
  },
  added_fail: {
    type: "error",
    text1: "added fail",
    text2: "",
  },
  reject_success: {
    type: "success",
    text1: "reject success",
    text2: "",
  },
  submit_success: {
    type: "success",
    text1: "submit success",
    text2: "",
  },
  submit_fail: {
    type: "error",
    text1: "submit failed",
    text2: "",
  },
  add_participant_success: {
    type: "success",
    text1: "add members success",
    text2: "added members successfully",
  },
  add_participant_failed: {
    type: "error",
    text1: "add members failed",
    text2: "failed to add members",
  },
  please_scan_nfc_tag_first: {
    type: "error",
    text1: "please scan nfc tag first",
    text2: "",
  },
  checklist_created: {
    type: "success",
    text1: "checklist created",
    text2: "created checklist successfully",
  },
  checklist_created_failed: {
    type: "error",
    text1: "checklist created failed",
    text2: "",
  },
  checklist_updated: {
    type: "success",
    text1: "checklist updated",
    text2: "checklist updated successfully",
  },
  checklist_updated_failed: {
    type: "error",
    text1: "checklist updated failed",
    text2: "",
  },
  checklist_deleted: {
    type: "success",
    text1: "checklist deleted",
    text2: "deleted checklist successfully",
  },
  checklist_deleted_failed: {
    type: "error",
    text1: "checklist deleted failed",
    text2: "",
  },
  delete_success: {
    type: "success",
    text1: "delete success",
    text2: "",
  },
  delete_failed: {
    type: "error",
    text1: "delete failed",
    text2: "",
  },
  create_success: {
    type: "success",
    text1: "create success",
    text2: "",
  },
  create_failed: {
    type: "error",
    text1: "create failed",
    text2: "",
  },
  get_status_success: {
    type: "success",
    text1: "get status success",
    text2: "",
  },
  get_status_failed: {
    type: "error",
    text1: "get status failed",
    text2: "",
  },
  cannot_change_determination: {
    type: "error",
    text1: "cannot change determination",
    text2: "",
  },
  write_success: {
    type: "success",
    text1: "write success",
    text2: "nfc tag written successfully",
  },
  write_failed: {
    type: "error",
    text1: "write failed",
    text2: "failed to write nfc tag",
  },
  add_device_success: {
    type: "success",
    text1: "add device success",
    text2: "",
  },
  add_device_failed: {
    type: "error",
    text1: "add device failed",
    text2: "",
  },
  device_not_found: {
    type: "error",
    text1: "device not found",
    text2: "please check the device name",
  },
  get_gauges_failed: {
    type: "error",
    text1: "get gauges failed",
    text2: "",
  },
  reset_settings_success: {
    type: "success",
    text1: "reset settings success",
    text2: "settings have been reset to default",
  },
  nfc_scanning_started: {
    type: "success",
    text1: "nfc scanning started",
    text2: "please hold your device near the nfc tag",
  },
  network_error: {
    type: "error",
    text1: "error",
    text2: "network error",
  },
  item_in_ng_status: {
    type: "error",
    text1: "item in ng status",
    text2: "cannot update item in ng status",
  },
  ai_detect_success: {
    type: "success",
    text1: "ai detect success",
    text2: "ai detected successfully",
  },
  validate_success: {
    type: "success",
    text1: "validate success",
    text2: "device validated successfully",
  },
  validate_fail: {
    type: "error",
    text1: "validate failed",
    text2: "device validation failed",
  },
  successfully_connected: {
    type: "success",
    text1: "successfully connected",
    text2: "",
  },
  successfully_disconnected: {
    type: "success",
    text1: "successfully disconnected",
    text2: "",
  },
  please_enter_gauge_name: {
    type: "error",
    text1: "missing field",
    text2: "please enter gauge name",
  },
  please_select_gauge_type: {
    type: "error",
    text1: "missing field",
    text2: "please select gauge type",
  },
  please_select_frequency: {
    type: "error",
    text1: "missing field",
    text2: "please select inspection frequency",
  },
  please_enter_custom_days: {
    type: "error",
    text1: "missing field",
    text2: "please enter custom number of days",
  },
  please_enter_usl: {
    type: "error",
    text1: "missing parameter",
    text2: "please enter usl (upper specification limit)",
  },
  please_enter_lsl: {
    type: "error",
    text1: "missing parameter",
    text2: "please enter lsl (lower specification limit)",
  },
  please_enter_unit: {
    type: "error",
    text1: "missing parameter",
    text2: "please enter measurement unit",
  },
  socket_connected: {
    type: "success",
    text1: "socket connected",
    text2: "real-time updates enabled",
  },
  socket_connection_failed: {
    type: "error",
    text1: "socket connection failed",
    text2: "real-time updates disabled",
  },
} as const

export type ToastType = keyof typeof toastList