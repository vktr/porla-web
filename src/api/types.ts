export type SessionsSettingsGetInput = {
  name: string;
}

export type SessionsSettingsGetOutput = {
  settings: SessionsSettingsGetData;
}

export type SessionsSettingsGetData = {
  active_checking: number;
}
