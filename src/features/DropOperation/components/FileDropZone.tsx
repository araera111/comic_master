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
  const { setPageItems, resetPage, setPage, mode, changeLoading } = useViewerStore((state) => state);
  const directory = async (path: string) => {
    const [imageFiles, fileNames, stats] = await getDirectoryImageFiles(path);
    const pageItems = mergeUrlFileName(imageFiles, fileNames, stats);
    setPageItems(pageItems);
    resetPage();
  };
  const zip = async (path: string) => {
    changeLoading(true);
    const [imageFiles, fileNames, mtimes] = await unzip(path);
    console.log({ imageFiles, fileNames, mtimes });
    const pageItems = mergeUrlFileName(imageFiles, fileNames, mtimes);
    setPageItems(pageItems);
    resetPage();
    changeLoading(false);
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
          changeLoading(true);
          directory(path);
          changeLoading(false);
          return;
        }
        if (type === 'application/x-zip-compressed' || type === 'application/zip') {
          zip(path);
        }

        if (type === 'image/jpeg') {
          changeLoading(true);
          const directory = await nodeDirname(path);
          const [imageFiles, fileNames, mtimes] = await getDirectoryImageFiles(directory);
          const pageItems = mergeUrlFileName(imageFiles, fileNames, mtimes);
          setPageItems(pageItems);
          const fileIndex = getFileIndexFromFileName(fileNames, path);
          const fixedPage = fixPage(fileIndex, imageFiles.length, mode);
          setPage(fixedPage);
          changeLoading(false);
        }
      }}
    >
      {children}
    </div>
  );
};
