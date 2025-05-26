import { writeFile } from "fs/promises";
import path from "path";

export async function saveImage(file: File): Promise<string | null> {
  // バイナリデータをBufferに変換
  // Buffer.from(arrayBuffer) で Node.jsのBufferに変換
  const buffer = Buffer.from(await file.arrayBuffer()); 
  // ファイル名生成 日時_ファイル名
  const fileName = `${Date.now()}_${file.name}`; 
  // アップロードフォルダ
  const uploadDir = path.join(process.cwd(), "public/images"); 
  
  try {
    const filePath = path.join(uploadDir, fileName); // 保存先の完全なファイル名
    await writeFile(filePath, buffer); // 指定パスにファイル(buffer)を書き込む
    return `/images/${fileName}`; // URLパスを返す
  } catch (error) {
    console.error("画像保存エラー:", error);
    return null;
  }
}