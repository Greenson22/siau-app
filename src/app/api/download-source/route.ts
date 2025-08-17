// Lokasi: src/app/api/download-source/route.ts
import { NextResponse } from 'next/server';
import archiver from 'archiver';
import path from 'path';
import { Readable } from 'stream';

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not Found', { status: 404 });
  }

  const archive = archiver('zip');
  const nodeStream = archive;
  const webStream = Readable.toWeb(nodeStream);
  const sourceDirectory = path.join(process.cwd(), 'src');

  archive.glob('**/*', {
    cwd: sourceDirectory,
    
    // Abaikan seluruh folder 'api' dan isinya
    ignore: [
      'app/api/**', // <-- UBAH POLA IGNORE DI SINI
    ],
  });

  archive.finalize();

  return new NextResponse(webStream as any, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="source-code.zip"`,
    },
  });
}