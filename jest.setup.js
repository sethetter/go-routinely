const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, `.env.testing`) })

const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })
