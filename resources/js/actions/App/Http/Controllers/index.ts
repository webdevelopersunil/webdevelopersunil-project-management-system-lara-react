import UserController from './UserController'
import PortalRequestController from './PortalRequestController'
import Settings from './Settings'
import PortalController from './PortalController'

const Controllers = {
    UserController: Object.assign(UserController, UserController),
    PortalRequestController: Object.assign(PortalRequestController, PortalRequestController),
    Settings: Object.assign(Settings, Settings),
    PortalController: Object.assign(PortalController, PortalController),
}

export default Controllers