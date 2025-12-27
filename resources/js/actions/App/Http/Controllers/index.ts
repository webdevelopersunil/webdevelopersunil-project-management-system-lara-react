import UserController from './UserController'
import Settings from './Settings'
import PortalController from './PortalController'
import PortalRequestController from './PortalRequestController'

const Controllers = {
    UserController: Object.assign(UserController, UserController),
    Settings: Object.assign(Settings, Settings),
    PortalController: Object.assign(PortalController, PortalController),
    PortalRequestController: Object.assign(PortalRequestController, PortalRequestController),
}

export default Controllers