import { FileDropZone } from './features/DropOperation/components/FileDropZone';
import { KeyOperation } from './features/KeyOperation/components/KeyOperation';
import { PageRange } from './features/PageRange/components/PageRange';
import { Viewer } from './features/Viewer/components/Viewer';
import { WheelOperation } from './features/WheelOperation/components/WheelOperation';

export const App = () => (
  <WheelOperation>
    <div className="h-screen w-screen">
      <PageRange />
      <FileDropZone>
        <Viewer />
      </FileDropZone>
      <KeyOperation />
    </div>
  </WheelOperation>
);
