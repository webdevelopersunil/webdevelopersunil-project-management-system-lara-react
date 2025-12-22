import UserController from './UserController'
import Settings from './Settings'
import PortalController from './PortalController'

const Controllers = {
    UserController: Object.assign(UserController, UserController),
    Settings: Object.assign(Settings, Settings),
    PortalController: Object.assign(PortalController, PortalController),
}

export default Controllers