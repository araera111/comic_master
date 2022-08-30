import { ReactNode } from 'react';
import { nodeDirname, nodeFsStats } from '../../../nodeUtil/node-api';
import { useViewerStore } from '../../Viewer/stores/viewerStore';
import { fixPage } from '../../Viewer/utils/viewerUtil';
import { getDirectoryImageFiles, getFileIndexFromFileName, mergeUrlFileName, unzip } from '../utils/dropOperationUtil';

type FileDropZoneProps = {
  children: ReactNode;
};

interface FileAddPath extends File {
  path: string;
}

export const FileDropZone = ({ children }: FileDropZoneProps) => {
  const setPageItems = useViewerStore((state) => state.setPageItems);
  const resetPage = useViewerStore((state) => state.resetPage);
  const setPage = useViewerStore((state) => state.setPage);
  const mode = useViewerStore((state) => state.mode);
  const directory = async (path: string) => {
    const [imageFiles, fileNames] = await getDirectoryImageFiles(path);
    const pageItems = mergeUrlFileName(imageFiles, fileNames);
    setPageItems(pageItems);
    resetPage();
  };
  const zip = async (path: string) => {
    const [imageFiles, fileNames] = await unzip(path);
    const pageItems = mergeUrlFileName(imageFiles, fileNames);
    setPageItems(pageItems);
    resetPage();
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={async (e) => {
        e.preventDefault();
        const item0 = e.dataTransfer.files.item(0);
        if (item0 === null) return;
        const { path, type } = item0 as FileAddPath;
        const stats = await nodeFsStats(path);
        const isDir = stats.isDirectory();
        if (isDir) {
          console.log({ isDir });
          directory(path);
          return;
        }
        if (type === 'application/x-zip-compressed' || type === 'application/zip') {
          zip(path);
        }

        if (type === 'image/jpeg') {
          const directory = await nodeDirname(path);
          const [imageFiles, fileNames] = await getDirectoryImageFiles(directory);
          const pageItems = mergeUrlFileName(imageFiles, fileNames);
          setPageItems(pageItems);
          const fileIndex = getFileIndexFromFileName(fileNames, path);
          const fixedPage = fixPage(fileIndex, imageFiles.length, mode);
          setPage(fixedPage);
        }
      }}
    >
      {children}
    </div>
  );
};
