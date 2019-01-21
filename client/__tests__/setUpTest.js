import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

document.execCommand = () => {};

jest.setTimeout(10000);

Enzyme.configure({ adapter: new Adapter() });
