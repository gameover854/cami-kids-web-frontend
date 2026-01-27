export function validateImage(FileSize: number, FileType: string) {
  const fileSizeInBytes = Number(FileSize) / (1024 * 1024);
  const maxAllowedSizeInBytes = 5 * (1024 * 1024);
  return fileSizeInBytes <= maxAllowedSizeInBytes && FileType.startsWith("image/");
}

export function convertToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
