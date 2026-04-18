import type { CharacterSnapshot, SessionSnapshot } from "../types/character";

type FilePickerSaveOptions = {
  suggestedName: string;
  types?: Array<{ description: string; accept: Record<string, string[]> }>;
};

type FilePickerOpenOptions = {
  multiple?: boolean;
  types?: Array<{ description: string; accept: Record<string, string[]> }>;
};

type FileSystemWritableFileStreamLike = {
  write(data: Blob | BufferSource | string): Promise<void>;
  close(): Promise<void>;
};

type SaveFileHandle = {
  createWritable(): Promise<FileSystemWritableFileStreamLike>;
};

type OpenFileHandle = {
  getFile(): Promise<File>;
};

export async function saveJsonToFile<T>(data: T, options: FilePickerSaveOptions): Promise<void> {
  const serialized = JSON.stringify(data, null, 2);
  const picker = (window as Window & typeof globalThis & {
    showSaveFilePicker?: (opts: FilePickerSaveOptions) => Promise<SaveFileHandle>;
  }).showSaveFilePicker;

  if (!picker) {
    downloadJson(serialized, options.suggestedName);
    return;
  }

  const handle = await picker({
    suggestedName: options.suggestedName,
    types: options.types
  });
  const writable = await handle.createWritable();
  await writable.write(serialized);
  await writable.close();
}

export async function openJsonFile<T>(options: FilePickerOpenOptions): Promise<T | null> {
  const picker = (window as Window & typeof globalThis & {
    showOpenFilePicker?: (opts?: FilePickerOpenOptions) => Promise<OpenFileHandle[]>;
  }).showOpenFilePicker;

  if (!picker) {
    return null;
  }

  const [handle] = await picker({
    multiple: false,
    types: options.types
  });

  if (!handle) {
    return null;
  }

  const file = await handle.getFile();
  const text = await file.text();
  return JSON.parse(text) as T;
}

function downloadJson(serialized: string, fileName: string): void {
  const blob = new Blob([serialized], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function makeSessionSnapshot(state: SessionSnapshot["state"]): SessionSnapshot {
  return {
    version: 1,
    savedAt: new Date().toISOString(),
    state
  };
}

export function makeCharacterSnapshot(character: CharacterSnapshot["character"]): CharacterSnapshot {
  return {
    version: 1,
    savedAt: new Date().toISOString(),
    character
  };
}
