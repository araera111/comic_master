import { FileDropZone } from './features/DropOperation/components/FileDropZone';
import { KeyOperation } from './features/KeyOperation/components/KeyOperation';
import { Viewer } from './features/Viewer/components/Viewer';

export const App = () => (
  <div>
    <FileDropZone>
      <Viewer />
    </FileDropZone>
    <KeyOperation />
  </div>
);
