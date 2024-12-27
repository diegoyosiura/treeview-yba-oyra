import { Memoty } from './Memoty';
import { YbaOyra } from './YbaOyra';

declare global {
    interface Window {
        Memoty: typeof Memoty;
        YbaOyra: typeof YbaOyra;
    }
}
